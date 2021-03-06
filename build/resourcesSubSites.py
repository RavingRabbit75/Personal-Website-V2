import os
import shutil
from flask_restful import Resource
import psycopg2
from flask import request, current_app as app, make_response, jsonify
import zipfile
from flask_uploads import UploadSet, configure_uploads, IMAGES

from flask_httpauth import HTTPBasicAuth
import bcrypt

from build.resourcesUtilities import Utils

auth = HTTPBasicAuth()


@auth.verify_password
def get_pw(username, client_password):
    conn = connect()
    cur = conn.cursor()
    cur.execute("SELECT * FROM admins WHERE username='{0}';".format(str(username)))
    if cur.rowcount == 0:
        return False

    return bcrypt.checkpw(client_password.encode("utf-8"), cur.fetchone()[2].encode("utf-8"))


def connect():
    databaseName = os.environ.get("SITE_DATABASE")
    connectionString = "dbname=" + databaseName
    c = psycopg2.connect(connectionString)
    return c


class SubSites(Resource):

    @auth.login_required
    def get(self):
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT * FROM subsites;")
        if cur.rowcount == 0:
            return {
                "message": "No sub-sites found."
            }, 404

        subSitesList = []

        for subsite in cur:
            subSitesList.append(subsite)

        cur.close()
        conn.close()

        response = make_response(jsonify({
            "number of subsites": len(subSitesList),
            "subsites": subSitesList
        }), 200)
        return response


    @auth.login_required
    def post(self):
        conn = connect()
        cur = conn.cursor()
        if (not Utils.validateJsonReqBody(request.get_json(), "siteData") or
           not Utils.validateJsonReqBody(request.get_json(), "siteData", "name") or 
           not Utils.validateJsonReqBody(request.get_json(), "siteData", "pathName") or 
           not Utils.validateJsonReqBody(request.get_json(), "siteData", "zipFile") or
           not Utils.validateJsonReqBody(request.get_json(), "siteData", "public")):
            return {
                "error" : "incorrect json body structure"
            }, 400

        cur.execute("SELECT path_name, zipfile FROM subsites;")
        newSiteData = request.get_json()["siteData"]

        sites = []
        if cur.rowcount != 0:
            for site in cur:
                sites.append(site)

        for site in sites:
            if site[0] == newSiteData["pathName"]:
                return {
                    "pathName" : newSiteData["pathName"],
                    "message" : "A site with the above path name already exists"
                }, 409

            if site[1] == newSiteData["zipFile"]:
                return {
                    "zipFile" : newSiteData["zipFile"],
                    "message" : "A site with the above zip file already exists"
                }, 409


        sqlString = """INSERT INTO subsites 
                        (name, path_name, zipfile, public) 
                        VALUES (%s, %s, %s, %s) RETURNING id, name, path_name;"""

        cur.execute(
            sqlString, 
            (
                newSiteData["name"], 
                newSiteData["pathName"], 
                newSiteData["zipFile"],
                newSiteData["public"]
            )
        )

        newSite = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        response = make_response(jsonify({
            "id" : newSite[0],
            "name" : newSite[1],
            "pathName" : newSite[2],
            "message" : "New site created"
        }), 200)
        return response


class SubSite(Resource):

    @auth.login_required
    def get(self, id):
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT * FROM subsites WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "Sub-site not found."
            }, 404

        subsite = cur.fetchone()

        cur.close()
        conn.close()

        response = make_response(jsonify({"subsite": subsite}), 200)
        return response


    @auth.login_required
    def put(self, id):
        conn = connect()
        cur = conn.cursor()
        if not Utils.validateJsonReqBody(request.get_json(), "public"):
            return {
                "error" : "incorrect json body structure"
            }, 400

        cur.execute("SELECT * from subsites WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "sub-site not found"
            }, 404

        siteStatus = None
        if request.get_json()["public"] is False:
            siteStatus = False

        elif request.get_json()["public"] is True:
            siteStatus = True

        else:
            return {
                "error": "invalid value"
            }, 400

        sqlString = """UPDATE subsites 
                       SET public={0} 
                       WHERE id={1};""".format(siteStatus, str(id))

        cur.execute(sqlString)
        conn.commit()
        cur.close()
        conn.close()

        response = make_response(jsonify({"message": "update successful"}), 200)
        return response


    @auth.login_required
    def delete(self, id):
        conn = connect()
        cur = conn.cursor()
        if (
            not Utils.validateJsonReqBody(request.get_json(), "siteData") or
            not Utils.validateJsonReqBody(request.get_json(), "siteData", "name") or
            not Utils.validateJsonReqBody(request.get_json(), "siteData", "pathName") or
            not Utils.validateJsonReqBody(request.get_json(), "siteData", "delete")
        ):
            return {
                "error" : "incorrect json body structure"
            }, 400

        cur.execute("SELECT * from subsites WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "sub-site not found"
            }, 404

        requestedSiteData = request.get_json()["siteData"]
        siteToDelete = cur.fetchone()

        if (
            requestedSiteData["name"] != siteToDelete[1] or
            requestedSiteData["pathName"] != siteToDelete[2]
        ):
            return {
                "error": "invalid VALUES"
            }, 400

        uploadPath = app.config.get('UPLOADED_ZIPS_DEST')

        fullPath = os.path.join(uploadPath, siteToDelete[3])
        if os.path.exists(fullPath):
            os.remove(fullPath)

        folderName = siteToDelete[3].split(".")[0]
        subsitesPath = app.config.get('SUBSITES_PATH')

        if os.path.exists(os.path.join(subsitesPath, folderName)):
            shutil.rmtree(os.path.join(subsitesPath, folderName))

        cur.execute("DELETE FROM subsites WHERE id={0};".format(str(id)))
        conn.commit()
        cur.close()
        conn.close()

        response = make_response(jsonify({"message": "delete successful"}), 200)
        return response


class SubSiteUploadZip(Resource):

    @auth.login_required
    def put(self, id):
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT * from subsites WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "sub-site not found"
            }, 422

        siteData = cur.fetchone()

        if "zipFile" not in request.files:
            return {
                "error": "zip file missing"
            }, 422

        zipList = request.files.getlist("zipFile")
        if len(zipList) != 1:
            return {
                "error": "only one zip file allowed"
            }, 422

        if zipList[0].filename != siteData[3]:
            return {
                "error": "uploaded zip file not allowed"
            }, 422

        uploadPath = app.config.get('UPLOADED_ZIPS_DEST')

        fullPath = os.path.join(uploadPath, zipList[0].filename)
        if os.path.exists(fullPath):
            os.remove(fullPath)

        folderName = zipList[0].filename.split(".")[0]

        zipSavePath = os.path.join(uploadPath, zipList[0].filename)
        zipList[0].save(zipSavePath)

        subsitesPath = app.config.get('SUBSITES_PATH')

        if os.path.exists(os.path.join(subsitesPath, folderName)):
            shutil.rmtree(os.path.join(subsitesPath, folderName))

        zfile = zipfile.ZipFile(zipSavePath)

        for file in zfile.namelist():
            if file.startswith(folderName + "/"):
                zfile.extract(file, subsitesPath)

        zfile.close()

        cur.close()
        conn.close()

        response = make_response(jsonify({"message": "update successful"}), 200)
        return response
