import os
from flask import Flask, Blueprint, jsonify, render_template, redirect, url_for, json, request, send_from_directory
from flask_restful import Api

from build.resourcesProfile import SkillList
from build.resourcesProfile import ExperienceList
from build.resourcesProfile import EducationList
from build.resourcesProjects import Projects
from build.resourcesProjects import Project
from build.resourcesProjects import ProjectImages
from build.resourcesProjects import ProjectEnabled
from build.resourcesFilters import ProjectFilters
from build.resourcesFilters import ProjectFilter
from build.resourcesFilters import Filters
from build.resourcesFilters import Filter

from other_api.todo.resources import TodoList


if os.environ.get("ENV") == "production":
	debug=False
else:
	debug=True


app = Flask(__name__)
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

api_bp = Blueprint("api", __name__)
api = Api(api_bp)
api.add_resource(SkillList, "/profile/skills")
api.add_resource(ExperienceList, "/profile/experience")
api.add_resource(EducationList, "/profile/education")
api.add_resource(Projects, "/projects")
api.add_resource(Project, "/project/<int:id>")
api.add_resource(ProjectFilters, "/project/<int:id>/filters")
api.add_resource(ProjectFilter, "/project/<int:prj_id>/filter/<int:filt_id>")
api.add_resource(ProjectImages, "/projects/<int:id>/upload")
api.add_resource(Filters, "/projects/filters")
api.add_resource(Filter, "/projects/filter/<int:id>")
api.add_resource(ProjectEnabled, "/projects/<int:id>/enabled")

app.register_blueprint(api_bp, url_prefix="/api/v1")


# setup for uploading files
siteRoot = os.path.realpath(os.path.dirname(__file__ + "/../../"))
UPLOAD_FOLDER = "temp_upload"
uploadPath = os.path.join(siteRoot, UPLOAD_FOLDER)
app.config['UPLOADED_PHOTOS_DEST'] = uploadPath


# separate test api
api_todo_bp = Blueprint("api_todo", __name__)
api_todo = Api(api_todo_bp)
api_todo.add_resource(TodoList, "/todos")

app.register_blueprint(api_todo_bp, url_prefix="/api_todo/v1")


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


