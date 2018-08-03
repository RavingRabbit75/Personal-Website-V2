from flask_restful import Resource
import psycopg2
from flask import request, current_app as app, make_response, jsonify
from flask_httpauth import HTTPBasicAuth
import bcrypt
import os

from build.resourcesUtilities import Utils

auth = HTTPBasicAuth()


@auth.verify_password
def get_pw(username, client_password):
    cur.execute("SELECT * FROM admins WHERE username='{0}';".format(str(username)))
    if cur.rowcount==0:
        return False

    return bcrypt.checkpw(client_password.encode("utf-8"), cur.fetchone()[2].encode("utf-8"))


def connect():
    databaseName = os.environ.get("SITE_DATABASE")
    connectionString = "dbname=" + databaseName
    c=psycopg2.connect(connectionString)
    return c

conn = connect()
cur = conn.cursor()


class Users(Resource):

    @auth.login_required
    def get(self):
        cur.execute("SELECT id, username from users;")
        if cur.rowcount == 0:
            return {
                "message": "no users currently"
            }, 404

        userList=[]
        for user in cur:
            userList.append(user)

        response = make_response(jsonify({
            "number of users": len(userList),
            "users": userList
        }), 200)
        return response


class User(Resource):

    @auth.login_required
    def get(self, id):
        cur.execute("SELECT * FROM users WHERE id={0};".format(str(id)))

        if cur.rowcount == 0:
            return {
                "message": "user not found"
            }, 404

        user = cur.fetchone()

        cur.execute("""SELECT subsite_id, user_id, name, path_name, zipfile, public 
                        FROM subsites_to_users as stu 
                        INNER JOIN subsites ON stu.subsite_id = subsites.id 
                        WHERE user_id={0}""".format(str(id)))

        subsites=[]
        for subsite in cur:
            subsites.append(subsite)

        response = make_response(jsonify({
            "user id": user[0],
            "username": user[1],
            "subsites": subsites
        }), 200)
        return response