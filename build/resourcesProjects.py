import os
from flask_restful import Resource
import psycopg2
from flask import request, current_app as app, make_response, jsonify

from flask_uploads import UploadSet, configure_uploads, IMAGES

from flask_httpauth import HTTPBasicAuth
import bcrypt

from build.resourcesUtilities import Utils

auth = HTTPBasicAuth()


@auth.verify_password
def get_pw(username, client_password):
    
    cur.execute("SELECT * FROM admins WHERE username='{0}';".format(str(username)))
    if cur.rowcount==0:
        return False

    return bcrypt.checkpw(client_password.encode("utf-8"), cur.fetchone()[2].encode("utf-8"))


def connect():
    c=psycopg2.connect("dbname=raychow_db")
    return c

conn = connect()
cur = conn.cursor()


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

        response = make_response(jsonify({"projects": projectList}), 200)
        return response



    @auth.login_required
    def post(self):
        if (not Utils.validateJsonReqBody(request.get_json(), "projectData") or
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "name") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "role") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "tech") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "description") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "accomplishments") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "imagesLayout") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "priority") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "images")):
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
                        False)
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
        response = make_response(jsonify({"message": "POST DONE"}), 200)
        return response




class Project(Resource):

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

        response = make_response(jsonify({"projectData": projectData}), 200)
        return response


    @auth.login_required
    def put(self, id):
        cur.execute("SELECT * from projects WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "item not found"
            }, 404

        if (not Utils.validateJsonReqBody(request.get_json(), "projectData") or
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "name") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "role") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "tech") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "description") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "accomplishments") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "imagesLayout") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "priority") or 
           not Utils.validateJsonReqBody(request.get_json(), "projectData", "images")):
            return {
                "error" : "incorrect json body structure"
            }, 400

        project=request.get_json()["projectData"]

        techString = ', '.join(project["tech"])

        sqlString = """UPDATE projects 
                       SET name='{0}', 
                           role='{1}',
                           builtWith='{2}',
                           description='{3}',
                           layoutType={4},
                           priority={5} 
                       WHERE id={6};""".format(project["name"], project["role"], techString, project["description"], project["imagesLayout"], project["priority"], str(id))

        cur.execute(sqlString)

        cur.execute("DELETE FROM project_points WHERE project_id={0};".format(str(id)))

        for point in project["accomplishments"]:
            cur.execute("""INSERT INTO project_points (project_point, project_id) 
                           VALUES (%s, %s);""", (point, id) )
        

        cur.execute("DELETE FROM project_urls WHERE project_id={0};".format(str(id)))
        sqlString = """INSERT INTO project_urls (type, url, project_id) VALUES (%s, %s, %s);"""

        if "githubLink" in project:
            cur.execute(sqlString, ("githubLink", project["githubLink"], str(id)))

        if "liveLink" in project:
            cur.execute(sqlString, ("liveLink", project["liveLink"], str(id)))


        conn.commit()
        response = make_response(jsonify({"message": "PUT DONE"}), 200)
        return response




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
        

        response = make_response(jsonify({"Deletion Successful" : str(id)}), 200)
        return response



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


        response = make_response(jsonify({
            "message": "POST DONE",
            "files saved": filesSaved
        }), 200)
        return response



class ProjectEnabled(Resource):

    @auth.login_required
    def put (self, id):
        cur.execute("SELECT * from projects WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "item not found"
            }, 404

        if not Utils.validateJsonReqBody(request.get_json(), "enabled"):
            return {
                "error": "incorrect json body structure",
                "message": "needs to have the key 'enabled'"
            }, 400

        if request.get_json()["enabled"] is not True and request.get_json()["enabled"] is not False:
            return {
                "error": "incorrect json body structure",
                "message": "needs to have the key 'enabled' with value of true or false"
            }, 400

        projectEnabled=request.get_json()["enabled"]

        sqlString = """UPDATE projects 
                       SET enabled={0} 
                       WHERE id={1};""".format(projectEnabled, str(id))

        cur.execute(sqlString)
        conn.commit()

        cur.execute("SELECT id, name, enabled from projects WHERE id={0};".format(str(id)))
        updatedProject = cur.fetchone()

        response = make_response(jsonify({
            "message": "Success!",
            "project_id": updatedProject[0],
            "project": updatedProject[1],
            "enabled": updatedProject[2]
        }), 200)
        return response


class ProjectPriorities(Resource):

    @auth.login_required
    def get(self):
        cur.execute("SELECT id, name, priority from projects;")

        prjPriorities = []

        for prjPriority in cur:
            prjPriorities.append(prjPriority)

        response = make_response(jsonify({"project_priorities": prjPriorities}), 200)
        return response



class ProjectPriority(Resource):

    @auth.login_required
    def get (self, id):
        cur.execute("SELECT id, name, priority from projects WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "item not found"
            }, 404

        prjPriority = cur.fetchone()

        response = make_response(jsonify({"project_priority": prjPriority}), 200)
        return response


    @auth.login_required
    def put (self, id):
        cur.execute("SELECT * from projects WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "item not found"
            }, 404

        if not Utils.validateJsonReqBody(request.get_json(), "priority"):
            return {
                "error": "incorrect json body structure",
                "message": "needs to have the key 'priority'"
            }, 400

        if type(request.get_json()["priority"]) is not int:
            return {
                "error": "incorrect json body structure",
                "message": "needs to have the key 'priority' and value of type integer"
            }, 400

        priority=request.get_json()["priority"]

        sqlString = """UPDATE projects 
                       SET priority={0} 
                       WHERE id={1};""".format(priority, str(id))

        cur.execute(sqlString)
        conn.commit()

        cur.execute("SELECT id, name, priority from projects WHERE id={0};".format(str(id)))
        updatedProject = cur.fetchone()

        response = make_response(jsonify({
            "message": "Success!",
            "project_id": updatedProject[0],
            "project": updatedProject[1],
            "priority": updatedProject[2]
        }), 200)
        return response
