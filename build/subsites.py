import psycopg2

def connect():
    c=psycopg2.connect("dbname=raychow_db")
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

	