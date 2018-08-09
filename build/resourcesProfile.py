import os
from flask_restful import Resource
import psycopg2
from flask import request, jsonify, make_response
from flask_httpauth import HTTPBasicAuth
import bcrypt

from build.resourcesUtilities import Utils

auth = HTTPBasicAuth()


@auth.verify_password
def get_pw(username, client_password):
    conn = connect()
    cur = conn.cursor()
    cur.execute("SELECT * FROM admins WHERE username='{0}';".format(str(username)))
    if cur.rowcount==0:
        return False

    return bcrypt.checkpw(client_password.encode("utf-8"), cur.fetchone()[2].encode("utf-8"))


def connect():
    databaseName = os.environ.get("SITE_DATABASE")
    connectionString = "dbname=" + databaseName
    c=psycopg2.connect(connectionString)
    return c


class SkillList(Resource):
    
    def get(self):
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT * FROM skills_technology;")
        skills=[]
        for skill in cur:
            skills.append({"skill" : skill[1], "level" : skill[2]})

        response = make_response(jsonify({"skills" : skills}), 200)
        cur.close()
        conn.close()
        return response


    @auth.login_required
    def put (self):
        conn = connect()
        cur = conn.cursor()
        if not Utils.validateJsonReqBody(request.get_json(), "skillsData"):
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
        cur.close()
        conn.close()
        response = make_response(jsonify({"message": "update successful"}), 200)
        return response


class ExperienceList(Resource):

    def get(self):
        conn = connect()
        cur = conn.cursor()
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
        cur.close()
        conn.close()
        response = make_response(jsonify({"experience" : experience}), 200)
        return response


    @auth.login_required
    def put(self):
        conn = connect()
        cur = conn.cursor()
        if not Utils.validateJsonReqBody(request.get_json(), "experienceData"):
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
        cur.close()
        conn.close()
        response = make_response(jsonify({"message": "update successful"}), 200)
        return response


class EducationList(Resource):
    
    def get(self):
        conn = connect()
        cur = conn.cursor()
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
        
        cur.close()
        conn.close()
        response = make_response(jsonify({"education" : education}), 200)
        return response


    @auth.login_required
    def put(self):
        conn = connect()
        cur = conn.cursor()

        if not Utils.validateJsonReqBody(request.get_json(), "educationData"):
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
        cur.close()
        conn.close()
        response = make_response(jsonify({"message": "update successful"}), 200)
        return response
