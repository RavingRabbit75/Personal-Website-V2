import os
from flask import Flask, jsonify, render_template, redirect, url_for, json, request



app = Flask(__name__)

if os.environ.get("ENV") == "production":
	debug=False

else:
	debug=True


@app.route("/")
def root_route():
	return redirect("/profile")


@app.route("/profile")
def profile_route():
	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))

	return render_template("profile.html", skillsProficient=data["profile"]["skills"]["proficient"]
										 , skillsExposure=data["profile"]["skills"]["exposure"]
										 , professionalExperience=data["profile"]["experience"]
										 , educationList=data["profile"]["education"])


@app.route("/projects")
def projects_route():
	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))
	return render_template("projects.html", projectsData=data["projects"])


@app.route("/api/profile")
def api_profile():
	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))
	return jsonify(data["profile"])


@app.route("/api/projects")
def api_projects():
	projectName = request.args.get('prjname', 0, type=str)
	imageIndex = request.args.get('imageidx', 0, type=str)

	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))

	projectFound=False
	for project in data["projects"]:
		if projectName==project["name"]:
			# get the index
			if project["imagesLayout"]=="triple":
				pass
			elif project["imagesLayout"]=="double":
				pass
			else:
				nextImages=project["images"][int(imageIndex)-1]
				print(nextImages)

			projectFound=True
			break

	if projectFound==True:
		return jsonify(nextImages)
	
	return jsonify({"results":"No project found"})


@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404


