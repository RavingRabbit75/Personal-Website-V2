import os
from flask import Flask, Blueprint, jsonify, render_template, redirect, url_for, json, request
from flask_restful import Api

from build.resourcesGlobalInfo import GlobalInfo
from build.resourcesProfile import SkillList
from build.resourcesProfile import ExperienceList
from build.resourcesProfile import EducationList
from build.resourcesProjects import Projects
from build.resourcesProjects import Project
from build.resourcesProjects import ProjectImages
from build.resourcesProjects import ProjectEnabled
from build.resourcesProjects import ProjectPriorities
from build.resourcesProjects import ProjectPriority
from build.resourcesFilters import ProjectFilters
from build.resourcesFilters import ProjectFilter
from build.resourcesFilters import Filters
from build.resourcesFilters import Filter
from build.resourcesUsers import Users
from build.resourcesUsers import User
from build.resourcesSubSites import SubSites
from build.resourcesSubSites import SubSite
from build.resourcesSubSites import SubSiteUploadZip

from build.subsites import SubSite as SS


if os.environ.get("ENV") == "production":
    debug = False
else:
    debug = True


app = Flask(__name__)
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

api_bp = Blueprint("api", __name__)
api = Api(api_bp)
api.add_resource(GlobalInfo, "/globalinfo")
api.add_resource(SkillList, "/profile/skills")
api.add_resource(ExperienceList, "/profile/experience")
api.add_resource(EducationList, "/profile/education")
api.add_resource(Projects, "/projects")
api.add_resource(Project, "/project/<int:id>")
api.add_resource(ProjectFilters, "/project/<int:id>/filters")
api.add_resource(ProjectFilter, "/project/<int:prj_id>/filter/<int:filt_id>")
api.add_resource(ProjectImages, "/project/<int:id>/uploadImage")
api.add_resource(ProjectPriorities, "/projects/priorities")
api.add_resource(ProjectPriority, "/project/<int:id>/priority")
api.add_resource(Filters, "/projects/filters")
api.add_resource(Filter, "/projects/filter/<int:id>")
api.add_resource(ProjectEnabled, "/project/<int:id>/enabled")
api.add_resource(Users, "/users")
api.add_resource(User, "/user/<int:id>")
api.add_resource(SubSites, "/subsites")
api.add_resource(SubSite, "/subsite/<int:id>")
api.add_resource(SubSiteUploadZip, "/subsite/<int:id>/uploadZip")

app.register_blueprint(api_bp, url_prefix="/api/v1")


# setup for uploading files
siteRoot = os.path.realpath(os.path.dirname(__file__ + "/../../"))
IMAGES_UPLOAD_FOLDER = "build/static/images/projects"
imagesUploadPath = os.path.join(siteRoot, IMAGES_UPLOAD_FOLDER)
app.config['UPLOADED_PHOTOS_DEST'] = imagesUploadPath

ZIP_UPLOAD_FOLDER = "build/project_zip_files"
zipsUploadPath = os.path.join(siteRoot, ZIP_UPLOAD_FOLDER)
app.config['UPLOADED_ZIPS_DEST'] = zipsUploadPath

subsitesSubPath = "build/static/subsites"
subsitesFullPath = os.path.join(siteRoot, subsitesSubPath)
app.config['SUBSITES_PATH'] = subsitesFullPath


@app.route("/")
def root_route():
    return redirect("/projects")


@app.route("/<string:section>")
def section_route(section):
    if section == "profile":
        return render_template("./react/index.html", sectionName = "profile")

    if section == "projects":
        return render_template("./react/index.html", sectionName = "projects")

    return render_template("404.html"), 404


@app.route("/images/<string:imageFile>/")
def mages_route(imageFile):
    image_file_path = "images/" + imageFile
    return app.send_static_file(image_file_path)


@app.route("/projects/images/<string:imageFile>/")
def projects_images_route(imageFile):
    image_file_path = "images/projects/" + imageFile
    return app.send_static_file(image_file_path)


@app.route('/subsites/<string:subsite>/')
def render_subsiteIndex(subsite):
    results = SS.findSubsite(subsite)
    print(results)
    if results is None:
        return render_template("404.html"), 404

    if results[4] is False:
        return render_template("404.html"), 401

    pathName = results[3].split(".")[0]
    static_file_path = "subsites/" + pathName + "/index.html"   
    return app.send_static_file(static_file_path)


@app.route('/subsites/<string:subsite>/<path:resource>')
def render_subsiteFiles(subsite, resource):
    results = SS.findSubsite(subsite)
    if results is None:
        return render_template("404.html"), 404

    if results[4] is False:
        return render_template("404.html"), 401

    pathName = results[3].split(".")[0]

    static_file_path = "subsites/" + pathName + "/" + resource
    return app.send_static_file(static_file_path)


###########################################
# API Routes

@app.route("/api/profile")
def api_profile():
    siteRoot = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(siteRoot, "static/json", "siteData.json")
    data = json.load(open(jsonUrl))
    return jsonify(data["profile"])


@app.route("/api/projects")
def api_projects():
    projectName = request.args.get('projname', 0, type=str)
    imageIndex = request.args.get('imageidx', 0, type=str)

    siteRoot = os.path.realpath(os.path.dirname(__file__))
    jsonUrl = os.path.join(siteRoot, "static/json", "siteData.json")
    data = json.load(open(jsonUrl))

    projectFound = False
    nextImages = []
    for project in data["projects"]:
        if projectName == project["name"]:
            # get the index
            if project["imagesLayout"] == "triple":
                startIdx = (int(imageIndex) - 1) * 3
                nextImages.append(project["images"][startIdx])
                if startIdx + 1 < len(project["images"]):
                    nextImages.append(project["images"][startIdx + 1])
                    if startIdx + 2 < len(project["images"]):
                        nextImages.append(project["images"][startIdx + 2])

            elif project["imagesLayout"] == "double":
                startIdx = (int(imageIndex) - 1) * 2
                nextImages.append(project["images"][startIdx])
                if startIdx + 1 < len(project["images"]):
                    nextImages.append(project["images"][startIdx + 1])
            else:
                nextImages.append(project["images"][int(imageIndex) - 1])

            projectFound = True
            break

    if projectFound is True:
        return jsonify(nextImages)

    return jsonify({"results": "No project found"})



@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404
