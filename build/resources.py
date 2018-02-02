import os
from flask_restful import Resource, reqparse
import psycopg2
from flask import request, current_app as app

from flask_uploads import UploadSet, configure_uploads, IMAGES

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
		if not validateJsonReqBody(request.get_json(), "skillsData"):
			return {
				"error" : "incorrect json body structure"
			}, 400

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
				if tempDict["exp_id"] == single_exp[5]:
					tempDict["accomplishments"].append(single_exp[6])

				else:
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
		if not validateJsonReqBody(request.get_json(), "experienceData"):
			return {
				"error" : "incorrect json body structure"
			}, 400

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
		if not validateJsonReqBody(request.get_json(), "educationData"):
			return {
				"error" : "incorrect json body structure"
			}, 400
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

	def get(self):
		cur.execute("SELECT * FROM projects;")
		if cur.rowcount == 0:
			return {
				"message": "no projects found"
			}, 404
		
		projectList=[]
		for project in cur:
			projectList.append({
					"id" : project[0],
					"name" : project[1],
					"role" : project[2],
					"builtwith" : project[3],
					"description" : project[4],
					"layouttype" : project[5],
					"priority" : project[6],
					"enabled" : project[7]
				})

		return {"projects": projectList}, 200



	@auth.login_required
	def post(self):
		if (not validateJsonReqBody(request.get_json(), "projectData") or
		   not validateJsonReqBody(request.get_json(), "projectData", "name") or 
		   not validateJsonReqBody(request.get_json(), "projectData", "role") or 
		   not validateJsonReqBody(request.get_json(), "projectData", "tech") or 
		   not validateJsonReqBody(request.get_json(), "projectData", "description") or 
		   not validateJsonReqBody(request.get_json(), "projectData", "accomplishments") or 
		   not validateJsonReqBody(request.get_json(), "projectData", "imagesLayout") or 
		   not validateJsonReqBody(request.get_json(), "projectData", "priority") or 
		   not validateJsonReqBody(request.get_json(), "projectData", "images")):
			return {
				"error" : "incorrect json body structure"
			}, 400
		project=request.get_json()["projectData"]

		techString = ', '.join(project["tech"])

		sqlString = """INSERT INTO projects 
						(name, role, builtWith, description, layoutType, priority, enabled) 
						VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id;"""

		cur.execute(sqlString, 
						(project["name"], 
						project["role"], 
						techString,
						project["description"],
						project["imagesLayout"],
						project["priority"],
						True)
					)
		newId = cur.fetchone()[0]
		sqlString = """INSERT INTO project_points (project_point, project_id) VALUES (%s, %s);"""

		for accomplishment in project["accomplishments"]:
			newPoint = (accomplishment, newId)
			cur.execute(sqlString, newPoint)

		sqlString = """INSERT INTO project_urls (type, url, project_id) VALUES (%s, %s, %s);"""

		if "githubLink" in project:
			cur.execute(sqlString, ("githubLink", project["githubLink"], newId))

		if "liveLink" in project:
			cur.execute(sqlString, ("liveLink", project["liveLink"], newId))

		sqlString = """INSERT INTO project_previews (urlpath, project_id, grouping) VALUES (%s, %s, %s);"""
		for image in project["images"]:
			cur.execute(sqlString, (image["path"], newId, image["grouping"]))

		conn.commit()
		return {"message": "POST DONE"}, 200




class Project(Resource):

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
		cur.execute("SELECT * from projects WHERE id={0};".format(str(id)))
		if cur.rowcount == 0:
			return {
				"message": "item not found"
			}, 404

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
					   WHERE p.id = {0};""".format(str(id)))

		for filterTag in cur:
			projectData["filters"].append(filterTag[0])


		cur.execute("""SELECT project_point 
					   FROM project_points as pps 
					   WHERE pps.project_id = {0};""".format(str(id)))

		for projectPoint in cur:
			projectData["points"].append(projectPoint[0])


		#  urlpath | project_id | grouping 
		cur.execute("""SELECT urlpath, grouping 
					   FROM project_previews as pp 
					   WHERE pp.project_id = {0};""".format(str(id)))

		for preview in cur:
			projectData["previews"].append(preview)


		# type | url | project_id 
		cur.execute("""SELECT type, url 
					   FROM project_urls as pu 
					   WHERE pu.project_id = {0};""".format(str(id)))

		for projectURL in cur:
			projectData["urls"].append(projectURL)


		return {
			"projectData": projectData
		}, 200




	# @auth.login_required
	def put(self, id):
		cur.execute("SELECT * from projects WHERE id={0};".format(str(id)))
		if cur.rowcount == 0:
			return {
				"message": "item not found"
			}, 404

		projectData=request.get_json()["projectData"]
		# UPDATE projects SET name='Flash Cards', role='developer' WHERE id={0};


		return {"message": "PUT DONE"}, 200




	@auth.login_required
	def delete(self, id):

		cur.execute("SELECT * FROM project_previews WHERE project_id={0};".format(str(id)))
		if cur.rowcount == 0:
			return {"message": "item not found"}, 404

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

			cur.execute("DELETE FROM project_points WHERE project_id={0};".format(str(id)))
			cur.execute("DELETE FROM project_urls WHERE project_id={0};".format(str(id)))
			cur.execute("DELETE FROM project_to_filters WHERE project_id={0};".format(str(id)))
			cur.execute("DELETE FROM project_previews WHERE project_id={0};".format(str(id)))
			cur.execute("DELETE FROM projects WHERE id={0};".format(str(id)))
			conn.commit()

		else:
			return {"file missing" : fileStatus[1]}, 404
		

		return {"Deletion Successful" : str(id)}



class ProjectImages(Resource):

	@auth.login_required
	def post (self, id):
		cur.execute("SELECT * from projects WHERE id={0};".format(str(id)))
		if cur.rowcount == 0:
			return {
				"message": "item not found"
			}, 404

		else:
			cur.execute("SELECT * from project_previews WHERE project_id={0};".format(str(id)))
			previews=[]
			for imagePreview in cur:
				previews.append(imagePreview[1])

			if "image" in request.files:
				imageList = request.files.getlist("image")

				for image in imageList:
					if image.filename not in previews:
						return {"file not allowed" : image.filename}, 404

				uploadPath = app.config.get('UPLOADED_PHOTOS_DEST')

				for image in imageList:
					fullPath = os.path.join(uploadPath, image.filename)
					if os.path.exists(fullPath):
						os.remove(fullPath)

				photos = UploadSet('photos', IMAGES)
				configure_uploads(app, photos)

				filesSaved=[]
				for image in imageList:
					filename = photos.save(image)
					filesSaved.append(filename)


		return {
			"message": "POST DONE",
			"files saved": filesSaved
		}, 200


class Filters(Resource):

	def get(self):
		sqlString="SELECT * FROM filters;"
		cur.execute(sqlString)
		numberOfFilters = cur.rowcount
		if numberOfFilters == 0:
			return {
				"message" : "no filters available"
			}, 404

		filters=[]

		for filt in cur:
			filters.append(filt)

		return {
			"message" : "success",
			"total filters" : numberOfFilters,
			"filters" : filters
		}, 200


	def post(self):
		filtersData=request.get_json()["filtersData"]
		if "add" not in filtersData:
			return {
				"error" : "incorrect json body structure"
			}, 400

		sqlString="SELECT filter_tag FROM filters;"
		cur.execute(sqlString)
		currentFilters = cursorToList(cur)

		for filt in currentFilters:
			for currFiltToAdd in filtersData["add"]:
				if currFiltToAdd.lower() == filt[0].lower():
					return {
						"error" : "filter already exists",
						"filter" : currFiltToAdd
					}, 409


		sqlString = "INSERT INTO filters (filter_tag) VALUES (%s) RETURNING id;"

		idsToReturn=[]
		for newFilter in filtersData["add"]:
			cur.execute(sqlString, (newFilter,))
			idsToReturn.append( {"filter" : newFilter, "id": cur.fetchone()[0]} )

		conn.commit()

		return {
			"message" : "success",
			"filters add" : idsToReturn
		}, 200


class Filter(Resource):

	def get(self, id):
		sqlString="SELECT * FROM filters WHERE id={0}".format(str(id))
		cur.execute(sqlString)
		if cur.rowcount==0:
			return {
				"error" : "filter not found"
			}, 404

		queriedFilter = cur.fetchone()

		return {
			"message" : "success",
			"filter" : queriedFilter[1],
			"id" : queriedFilter[0]
		}, 200


	def delete(self, id):
		sqlString="SELECT * FROM filters WHERE id={0}".format(str(id))
		cur.execute(sqlString)
		if cur.rowcount==0:
			return {
				"error" : "filter not found"
			}, 404

		filterToDelete = cur.fetchone()

		sqlString="SELECT * FROM project_to_filters WHERE filter_id={0}".format(str(id))
		cur.execute(sqlString)
		if cur.rowcount!=0:
			return {
				"error" : "filter is tied to one or more projects"
			}, 412

		sqlString="DELETE FROM filters WHERE id={0}".format(filterToDelete[0])
		cur.execute(sqlString)
		conn.commit()

		return {
			"message" : "delete successful",
			"deleted filter" : {"id": filterToDelete[0], "filter": filterToDelete[1]}
		}, 200





############## Utility Functions ##################


# takes psycopg2 cursor sql query results and puts into list for convenience and safety
def cursorToList(cursorObj):
	if cursorObj.rowcount==0:
		raise ValueError('Cursor has a row count of 0')

	newList=[]
	for item in cursorObj:
		newList.append(item)

	return newList


# takes json body and checks for specified body structure
# will take multiple args: each successive key is nested in prior key
def validateJsonReqBody(jsonBody, *args):

	def checkForKey(body, key):
		if key in body:
			return body[key]
		else:
			return None

	counter=0;
	result = checkForKey(jsonBody, args[counter])
	while counter<len(args):
		if result!= None:
			counter+=1
			if counter >= len(args):
				return True
			else:
				result=checkForKey(result, args[counter])
		else:
			return False

	