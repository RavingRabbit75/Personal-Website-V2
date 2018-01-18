from flask_restful import Resource
import psycopg2

def connect():
	c=psycopg2.connect("dbname=raychow_db")
	return c

conn = connect()
cur = conn.cursor()


proficient = ["JavaScript" , 
			  "CSS3", 
			  "HTML5", 
			  "jQuery", 
			  "Boostrap", 
			  "Python", 
			  "Flask", 
			  "SQL", 
			  "PostgreSQL", 
			  "Git", 
			  "Heroku", 
			  "Socket.IO", 
			  "Pixi.js", 
			  "GreenSock", 
			  "Adobe Creative Suite (Photoshop, Illustrator, Flash)"]

exposure = ["Node.js", 
			"Express.js", 
			"Typescript", 
			"Grunt", 
			"Gulp", 
			"Sass", 
			"Java", 
			"Android SDK", 
			"Webpack", 
			"Babel", 
			"Mocha", 
			"Chai"]


class Skill(Resource):
	
	def get(self, name):
		return {
			"skill": "Javascript",
			"level": 5
		}


class SkillList(Resource):
	
	def get(self):
		return {"skills": exposure}


class ExperienceList(Resource):

	def get(self):
		return {
					"count" : 2,
					"experience" : [
						{
							"name": "AKQA",
    	 					"title": "Web Developer",
    	 					"location": "San Francisco, CA",
    	 					"years": "2015–2016",
    	 					"accomplishments": [
					    		"Built 30+ web banners utilizing JavaScript, HTML5 and CSS3 to greatly improve web presence for major worldwide brands with contracts valued at over $1.5 million.",
					    		"Crafted compelling image and text animations with JavaScript and GreenSock on > 80% of brand web content to improve user engagement and advertisement click through.",
					    		"Saved major client $20,000 annually in new banner creation by developing dynamic banners with JavaScript, HTML5 and CSS3 to source text and accompanying images directly through Google Sheets."
					    	 ]
    	
						},
						{
							"company" : "Weather Underground",
							"title" : "Web Developer",
							"location" : "San Francisco, CA",
							"years" : "2014",
							"accomplishments" : [
								"Worked on a backend system utilizing ActionScript and Autodesk Scaleform that creates custom weather forecast videos on the fly to be streamed to mobile devices and other targets.",
								"Designed dynamic videos with animations and graphs displaying differently to reflect the location and what type of forecast specified by users."
							]
						}

					]
				}