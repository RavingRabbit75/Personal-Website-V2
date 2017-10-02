import os
from flask import Flask, jsonify, render_template, redirect, url_for, json, request, send_from_directory

app = Flask(__name__)

if os.environ.get("ENV") == "production":
	debug=False

else:
	debug=True


@app.route("/")
def root_route():
	return redirect("/projects")


@app.route("/profile")
def profile_route():
	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))

	return render_template("profile.html", skillsProficient=data["profile"]["skills"]["proficient"]
										 , skillsExposure=data["profile"]["skills"]["exposure"]
										 , professionalExperience=data["profile"]["experience"]
										 , educationList=data["profile"]["education"]
										 , baseContent=data["baseContent"]
										 , sectionName="profile")


@app.route("/projects")
def projects_route():
	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))
	for project in data["projects"]:
		project["projid"]=project["name"].replace(" ","-")

	return render_template("projects.html", projectsData=data["projects"]
										  , baseContent=data["baseContent"]
										  , sectionName="projects")


@app.route("/projects/htmlbanners")
def projects_sublinks_route():
	# siteRoot = os.path.realpath(os.path.dirname(__file__))
	# directory=os.path.join(siteRoot, "static/links/")
	print("SHIT", url_for('static', filename='links/links.css'))
	return app.send_static_file("links/html_banners.html")


# @app.route('/projects/<string:page_name>/')
# def render_static(page_name):

#     return render_template('links/{0}/{1}.html'.format(page_name, page_name))


@app.route("/api/profile")
def api_profile():
	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))
	return jsonify(data["profile"])


@app.route("/api/projects")
def api_projects():
	projectName = request.args.get('projname', 0, type=str)
	imageIndex = request.args.get('imageidx', 0, type=str)

	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))

	projectFound=False
	nextImages=[]
	for project in data["projects"]:
		if projectName==project["name"]:
			# get the index
			if project["imagesLayout"]=="triple":
				startIdx = (int(imageIndex)-1)*3
				nextImages.append(project["images"][startIdx])
				if startIdx+1 < len(project["images"]):
					nextImages.append(project["images"][startIdx+1])
					if startIdx+2 < len(project["images"]):
						nextImages.append(project["images"][startIdx+2])

			elif project["imagesLayout"]=="double":
				startIdx = (int(imageIndex)-1)*2
				nextImages.append(project["images"][startIdx])
				if startIdx+1 < len(project["images"]):
					nextImages.append(project["images"][startIdx+1])
			else:
				nextImages.append(project["images"][int(imageIndex)-1])

			projectFound=True
			break

	if projectFound==True:
		return jsonify(nextImages)
	
	return jsonify({"results":"No project found"})


@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404


