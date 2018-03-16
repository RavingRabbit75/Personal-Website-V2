import os
from flask_restful import Resource
import psycopg2
import zipfile


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


class SubSites(Resource):

	@auth.login_required
	def get(self):
		cur.execute("SELECT * FROM subsites;")
		if cur.rowcount == 0:
			return {
				"message": "No sub-sites found."
			}, 404

		subSitesList=[]

		for subsite in cur:
			subSitesList.append(subsite)

		return {
			"number of subsites": len(subSitesList),
			"subsites": subSitesList
		}, 200


	@auth.login_required
	def post(self):

		if "image" in request.files:
			imageList = request.files.getlist("image")


		zfile=zipfile.ZipFile("realSimple_banner.zip")

		# zfile.extractall("destination", "realSimple_banner/")

		for file in zfile.namelist():
			if file.startswith("realSimple_banner/"):
				zfile.extract(file, "destination")

		zfile.close()


class SubSite(Resource):

	@auth.login_required
	def get(self, id):
		cur.execute("SELECT * FROM subsites WHERE id={0};".format(str(id)))
		if cur.rowcount == 0:
			return {
				"message": "Sub-site not found."
			}, 404

		subsite=cur.fetchone()

		return {
			"subsite": subsite
		}, 200


	@auth.login_required
	def put(self, id):
		pass


	@auth.login_required
	def delete(self, id):
		pass

