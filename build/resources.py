from flask_restful import Resource
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
			cur.execute("INSERT INTO skills_technology (skill, level) VALUES (%s, %s);", (skill["skill"],skill["level"]) )

		conn.commit()
		return {"message": "update successful"}, 200


class ExperienceList(Resource):

	def get(self):
		cur.execute("SELECT experience.exp_id, experience.company, experience.position, experience.location, experience.years, accomplishments.exp_id, accomplishments.accomplishment FROM experience, accomplishments where experience.exp_id = accomplishments.exp_id;")
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
			cur.execute("INSERT INTO experience (exp_id, company, position, location, years) VALUES (%s, %s, %s, %s, %s);", (single_exp["exp_id"], single_exp["company"], single_exp["position"], single_exp["location"], single_exp["years"]))
			for single_acc in single_exp["accomplishments"]:
				cur.execute("INSERT INTO accomplishments (exp_id, accomplishment) VALUES (%s, %s);", (single_exp["exp_id"], single_acc))


		conn.commit()
		return {"message": "update successful"}, 200


class EducationList(Resource):

	def get(self):
		cur.execute("SELECT primary_desc, secondary_desc, year FROM education;")
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

	def put(self):
		pass
