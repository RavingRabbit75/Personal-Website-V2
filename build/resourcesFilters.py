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


class ProjectFilters(Resource):
    
    def get(self, id):
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT name FROM projects WHERE id={0};".format(str(id)))
        if cur.rowcount == 0:
            return {
                "message": "project not related to filter search not found"
            }, 404

        projectName = cur.fetchone()[0]

        cur.execute("""SELECT pf.id, pf.filter_id, f.filter_tag
                        FROM project_to_filters as pf
                        INNER JOIN filters as f ON pf.filter_id = f.id
                        WHERE project_id={0};""".format(str(id)))

        if cur.rowcount == 0:
            return {
                "message": "no filters found for this project",
                "project": projectName
            }, 404

        filtersForProject = []
        for filt in cur:
            filtersForProject.append(filt)

        cur.close()
        conn.close()

        response = make_response(jsonify({
            "project": projectName,
            "project_filters": filtersForProject,
            "key": "Project to Filter ID, Filter ID, Filter Name"
        }), 200)
        return response


    @auth.login_required
    def post(self, id):
        conn = connect()
        cur = conn.cursor()
        if (not Utils.validateJsonReqBody(request.get_json(), "projectName") or 
            not Utils.validateJsonReqBody(request.get_json(), "filtersToAdd")):
            return {
                "error" : "incorrect json body structure"
            }, 400

        projectNameFromReq = request.get_json()["projectName"]
        filtersToAddFromReq = request.get_json()["filtersToAdd"]

        cur.execute("SELECT name FROM projects WHERE id={0} AND name='{1}';".format(str(id), projectNameFromReq))
        if cur.rowcount == 0:
            return {
                "message": "project to add filter is not found"
            }, 404
        
        allfilters =[]
        cur.execute("SELECT * FROM filters;")
        for filt in cur:
            allfilters.append(filt)

        
        allFiltersNames=[]
        for row in allfilters:
            allFiltersNames.append(row[1])

        for filt in filtersToAddFromReq:
            if filt not in allFiltersNames:
                return {
                    "message": "filter is not in the main filter list"
                }, 404


        cur.execute("""SELECT pf.project_id, pf.filter_id, f.filter_tag FROM project_to_filters as pf 
                        INNER JOIN filters as f ON pf.filter_id = f.id 
                        WHERE project_id={0};""".format(str(id)))

        projectFilters = []
        for pf in cur:
            projectFilters.append(pf[2])

        for filt in filtersToAddFromReq:
            if filt in projectFilters:
                return {
                    "message": "filter already exists in this project"
                }, 409

        # filtersToAddFromReq ["Python", "Java"]
        filterIDs = []
        for filt in filtersToAddFromReq:
            for filt2 in allfilters:
                if filt == filt2[1]:
                    filterIDs.append(filt2[0])

        for filtID in filterIDs:
            cur.execute("INSERT INTO project_to_filters (project_id, filter_id) VALUES (%s, %s);", (str(id), filtID))
        
        conn.commit()

        filterResults=[]

        for filt in filtersToAddFromReq:
            cur.execute("""SELECT pf.id, f.filter_tag FROM project_to_filters as pf 
                            INNER JOIN filters as f ON pf.filter_id = f.id 
                            WHERE project_id={0} AND f.filter_tag='{1}';""".format(str(id), filt))
            filterResults.append(cur.fetchone())

        cur.close()
        conn.close()

        response = make_response(jsonify({
            "message": "New filters added",
            "project name": projectNameFromReq,
            "filters added": filterResults
        }), 200)
        return response


class ProjectFilter(Resource):
    
    @auth.login_required
    def delete(self, prj_id, filt_id):
        conn = connect()
        cur = conn.cursor()
        cur.execute("""SELECT p.name, pf.filter_id, f.filter_tag FROM projects as p 
                        INNER JOIN project_to_filters as pf ON p.id = pf.project_id
                        INNER JOIN filters as f ON pf.filter_id = f.id 
                        WHERE project_id={0} 
                        AND filter_id={1};""".format(str(prj_id), str(filt_id)))

        if cur.rowcount == 0:
            return {
                "message": "project filter not found"
            }, 404

        row = cur.fetchone()
        projName = row[0]
        filter_id = row[1]
        filterName = row[2]

        cur.execute("""DELETE FROM project_to_filters 
                        WHERE project_id={0} 
                        AND filter_id={1};""".format(str(prj_id), str(filt_id)))
        
        conn.commit()
        cur.close()
        conn.close()

        response = make_response(jsonify({
            "message" : "Deletion Successful",
            "project": projName,
            "filter": filterName,
            "filter_id": filter_id
        }), 200)
        return response


class Filters(Resource):

    def get(self):
        conn = connect()
        cur = conn.cursor()
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

        cur.close()
        conn.close()

        response = make_response(jsonify({
            "message" : "success",
            "total filters" : numberOfFilters,
            "filters" : filters
        }), 200)
        return response


    def post(self):
        conn = connect()
        cur = conn.cursor()
        if (not Utils.validateJsonReqBody(request.get_json(), "filtersData") or
            not Utils.validateJsonReqBody(request.get_json(), "filtersData", "add")):
                return {
                    "error" : "incorrect json body structure"
                }, 400

        filtersData=request.get_json()["filtersData"]

        sqlString="SELECT filter_tag FROM filters;"
        cur.execute(sqlString)
        currentFilters = Utils.cursorToList(cur)

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
        cur.close()
        conn.close()

        response = make_response(jsonify({
            "message" : "success",
            "filters add" : idsToReturn
        }), 200)
        return response


class Filter(Resource):

    def get(self, id):
        conn = connect()
        cur = conn.cursor()
        sqlString="SELECT * FROM filters WHERE id={0}".format(str(id))
        cur.execute(sqlString)
        if cur.rowcount==0:
            return {
                "error" : "filter not found"
            }, 404

        queriedFilter = cur.fetchone()

        cur.close()
        conn.close()

        response = make_response(jsonify({
            "message" : "success",
            "filter" : queriedFilter[1],
            "id" : queriedFilter[0]
        }), 200)
        return response


    def delete(self, id):
        conn = connect()
        cur = conn.cursor()
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
        cur.close()
        conn.close()

        response = make_response(jsonify({
            "message" : "delete successful",
            "deleted filter" : {"id": filterToDelete[0], "filter": filterToDelete[1]}
        }), 200)
        return response
