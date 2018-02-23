from flask_restful import Resource
import psycopg2
from flask import request, current_app as app
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

        return {
            "number of users": len(userList),
            "users": userList
        }, 200


class User(Resource):

    @auth.login_required
    def get(self, id):
        pass