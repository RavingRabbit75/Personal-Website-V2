import os
from flask_restful import Resource, reqparse
import psycopg2
from flask import request

from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()

users = {
	"ray" : "monkey"
}


@auth.get_password
def get_pw(username):
	if username in users:
		return users.get(username)

	return None


def connect():
	c=psycopg2.connect("dbname=raychow_db")
	return c

conn = connect()
cur = conn.cursor()



class SkillList(Resource):
	
	def get(self):
		cur.execute("SELECT * FROM skills_technology;")
		skills=[]
		for skill in cur:
			skills.append({"skill" : skill[1], "level" : skill[2]})

		return {"skills" : skills}, 200


	@auth.login_required
	def put (self):
		skillsData=request.get_json()["skillsData"]
		cur.execute("DELETE FROM skills_technology;")
		for skill in skillsData:
			cur.execute("""INSERT INTO skills_technology (skill, level) 
						   VALUES (%s, %s);""", 
						   (skill["skill"],skill["level"]) )

		conn.commit()
		return {"message": "update successful"}, 200


class ExperienceList(Resource):

	def get(self):
		cur.execute("""SELECT experience.exp_id, 
							  experience.company, 
							  experience.position, 
							  experience.location, 
							  experience.years, 
							  accomplishments.exp_id, 
							  accomplishments.accomplishment 
					   FROM experience, accomplishments 
					   where experience.exp_id = accomplishments.exp_id;""")

		experience=[]

		# current format of returned sql query row
		# [exp_id, company, position, location, years, acc_exp_id, accomplishment]

		tempDict = {}

		for single_exp in cur:
			if tempDict == {}:
				tempDict["exp_id"] = single_exp[0]
				tempDict["name"] = single_exp[1]
				tempDict["title"] = single_exp[2]
				tempDict["location"] = single_exp[3]
				tempDict["years"] = single_exp[4]
				tempDict["accomplishments"] = []
				tempDict["accomplishments"].append(single_exp[6])
			else:
				print(tempDict["exp_id"], single_exp[5])
				if tempDict["exp_id"] == single_exp[5]:
					print("append next accomplishment")
					tempDict["accomplishments"].append(single_exp[6])

				else:
					print("append and reset")
					experience.append(tempDict)
					tempDict = {}
					tempDict["exp_id"] = single_exp[0]
					tempDict["name"] = single_exp[1]
					tempDict["title"] = single_exp[2]
					tempDict["location"] = single_exp[3]
					tempDict["years"] = single_exp[4]
					tempDict["accomplishments"] = []
					tempDict["accomplishments"].append(single_exp[6])

		experience.append(tempDict)

		return {"experience" : experience}, 200


	@auth.login_required
	def put(self):
		experienceData=request.get_json()["experienceData"]
		cur.execute("DELETE FROM accomplishments;")
		cur.execute("DELETE FROM experience;")
		for single_exp in experienceData:
			cur.execute("""INSERT INTO experience 
							(exp_id, company, position, location, years) 
						   VALUES (%s, %s, %s, %s, %s);""", 
						   (single_exp["exp_id"], 
						   	single_exp["company"], 
						   	single_exp["position"], 
						   	single_exp["location"], 
						   	single_exp["years"]))

			for single_acc in single_exp["accomplishments"]:
				cur.execute("""INSERT INTO accomplishments 
								(exp_id, accomplishment) 
							   VALUES (%s, %s);""", 
							   (single_exp["exp_id"], 
							   	single_acc))


		conn.commit()
		return {"message": "update successful"}, 200


class EducationList(Resource):

	def get(self):
		cur.execute("""SELECT primary_desc, 
							  secondary_desc, 
							  year FROM education;""")

		education=[]
		for single_edu in cur:
			education.append(
				{
					"primaryDesc": single_edu[0],
					"secondaryDesc": single_edu[1],
					"year": single_edu[2]
				}
			)

		return {"education" : education}, 200


	@auth.login_required
	def put(self):
		educationData = request.get_json()["educationData"]
		cur.execute("DELETE FROM education;")
		for single_edu in educationData:
			cur.execute("""INSERT INTO education 
							(primary_desc, secondary_desc, year) 
						   VALUES (%s, %s, %s);""", 
						   (single_edu["primaryDescription"], 
						   	single_edu["secondaryDescription"], 
						   	single_edu["year"]))

		conn.commit()
		return {"message": "update successful"}, 200



class Projects(Resource):

	# SELECT column_name(s)
	# FROM table1
	# INNER JOIN table2 ON table1.column_name = table2.column_name;

	def get(self, id):
		projectData = {
			"name" : None,
			"role" : None,
			"builtwith" : None,
			"description" : None,
			"layouttype" : -1,
			"priority" : -1,
			"enabled" : True,
			"filters" : [],
			"points" : [],
			"previews" : [],
			"urls" : []
		}

		cur.execute("SELECT * from projects WHERE id=%s;", (str(id)))
		project = cur.fetchone()
		projectData["name"]=project[1]
		projectData["role"]=project[2]
		projectData["builtwith"]=project[3]
		projectData["description"]=project[4]
		projectData["layouttype"]=project[5]
		projectData["priority"]=project[6]
		projectData["enabled"]=project[7]

		# cur.execute("""SELECT name, substring(project_point, 1, 20), project_points.project_id 
		# 			   FROM projects 
		# 			   INNER JOIN project_points 
		# 			   ON projects.id = project_points.project_id;""")

		cur.execute("""SELECT f.filter_tag 
					   FROM filters as f 
					   INNER JOIN project_to_filters as pf ON f.id = pf.filter_id 
					   INNER JOIN projects as p ON pf.project_id = p.id 
					   WHERE p.id = %s;""", (str(id)))

		for filterTag in cur:
			projectData["filters"].append(filterTag[0])


		cur.execute("""SELECT project_point 
					   FROM project_points as pps 
					   WHERE pps.project_id = %s;""", (str(id)))

		for projectPoint in cur:
			projectData["points"].append(projectPoint[0])


		#  urlpath | project_id | grouping 
		cur.execute("""SELECT urlpath, grouping 
					   FROM project_previews as pp 
					   WHERE pp.project_id = %s;""", (str(id)))

		for preview in cur:
			projectData["previews"].append(preview)


		# type | url | project_id 
		cur.execute("""SELECT type, url 
					   FROM project_urls as pu 
					   WHERE pu.project_id = %s;""", (str(id)))

		for projectURL in cur:
			projectData["urls"].append(projectURL)


		return {
			"projectData": projectData
		}, 200


	@auth.login_required
	def put(self, id):
		pass


	@auth.login_required
	def delete(self, id):

		cur.execute("SELECT * FROM project_previews WHERE project_id=%s;", (str(id)))
		deleteImgsArr=[]
		for preview in cur:
			deleteImgsArr.append(preview)

		siteRoot = os.path.realpath(os.path.dirname(__file__))


		def checkIfAllFilesExist(imgsArr):
			for preview in imgsArr:
				fullPath = os.path.join(siteRoot, "static/images/projects/", preview[1])
				if not os.path.isfile(fullPath):
					return (False, preview[1])

			return (True, None)

		fileStatus = checkIfAllFilesExist(deleteImgsArr)
		if fileStatus[0]:
			for preview in deleteImgsArr:
				fullPath = os.path.join(siteRoot, "static/images/projects/", preview[1])
				os.remove(fullPath)

			cur.execute("DELETE FROM project_points WHERE project_id=%s;", (str(id)))
			cur.execute("DELETE FROM project_urls WHERE project_id=%s;", (str(id)))
			cur.execute("DELETE FROM project_to_filters WHERE project_id=%s;", (str(id)))
			cur.execute("DELETE FROM project_previews WHERE project_id=%s;", (str(id)))
			cur.execute("DELETE FROM projects WHERE id=%s;", (str(id)))
			conn.commit()

		else:
			return {"file missing" : fileStatus[1]}, 404
		

		return {"Deletion Successful" : str(id)}

