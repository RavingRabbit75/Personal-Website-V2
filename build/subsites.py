import psycopg2
import os

def connect():
	databaseName = os.environ.get("SITE_DATABASE")
	connectionString = "dbname=" + databaseName
	c=psycopg2.connect(connectionString)
	return c

conn = connect()
cur = conn.cursor()

class SubSite():
	
	def findSubsite(enteredPath):
		cur.execute("SELECT * FROM subsites WHERE path_name='{0}';".format(str(enteredPath)))
		if cur.rowcount == 0:
			return None
		else:
			subsite = cur.fetchone()
			return subsite

	