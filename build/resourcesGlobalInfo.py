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
    if cur.rowcount == 0:
        return False

    return bcrypt.checkpw(client_password.encode("utf-8"), cur.fetchone()[2].encode("utf-8"))


def connect():
    databaseName = os.environ.get("SITE_DATABASE")
    connectionString = "dbname=" + databaseName
    c = psycopg2.connect(connectionString)
    return c


class GlobalInfo(Resource):

    def get(self):
        conn = connect()
        cur = conn.cursor()
        cur.execute("SELECT * FROM global_desc;")
        globalDescription = []
        globalIcons = []

        for desc in cur:
            globalDescription.append({"desc1" : desc[1], "desc2" : desc[2]})

        cur.execute("SELECT * FROM global_icons;")
        for icon in cur:
            globalIcons.append({
                "link": icon[1], 
                "filename_header": icon[2], 
                "filename_header_over": icon[3], 
                "filename_footer": icon[4], 
                "filename_footer_over": icon[5]
            })

        response = make_response(
            jsonify({
                "global_description" : globalDescription,
                "global_icons": globalIcons
            }), 200)
        cur.close()
        conn.close()
        return response
