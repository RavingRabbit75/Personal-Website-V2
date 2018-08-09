import psycopg2
import os

def connect():
	databaseName = os.environ.get("SITE_DATABASE")
	connectionString = "dbname=" + databaseName
	c=psycopg2.connect(connectionString)
	return c


class SubSite():
	
	def findSubsite(enteredPath):
		conn = connect()
        cur = conn.cursor()
		cur.execute("SELECT * FROM subsites WHERE path_name='{0}';".format(str(enteredPath)))
		if cur.rowcount == 0:
			cur.close()
        	conn.close()
			return None
		else:
			subsite = cur.fetchone()
			cur.close()
        	conn.close()
			return subsite

	