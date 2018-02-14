
############## Utility Functions ##################

class Utils():
	
	# takes psycopg2 cursor sql query results and puts into list for convenience and safety
	def cursorToList(cursorObj):
	    if cursorObj.rowcount==0:
	        raise ValueError('Cursor has a row count of 0')

	    newList=[]
	    for item in cursorObj:
	        newList.append(item)

	    return newList


	# takes json body and checks for specified body structure
	# will take multiple args: each successive key is nested in prior key
	def validateJsonReqBody(jsonBody, *args):

	    def checkForKey(body, key):
	        if key in body:
	            return body[key]
	        else:
	            return None

	    counter=0;
	    result = checkForKey(jsonBody, args[counter])
	    while counter<len(args):
	        if result!= None:
	            counter+=1
	            if counter >= len(args):
	                return True
	            else:
	                result=checkForKey(result, args[counter])
	        else:
	            return False

    