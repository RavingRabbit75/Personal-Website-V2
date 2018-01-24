from flask_restful import Resource
from flask import request

class TodoList(Resource):
	def get(self):
		return {"todoList" : ["buy groceries", "clean kitchen", "program my head off", "cook diner"]}