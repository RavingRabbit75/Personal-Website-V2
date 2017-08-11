import os
from flask import Flask, jsonify, render_template, redirect, url_for, json



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
	return render_template("profile.html")


@app.route("/projects")
def projects_route():
	return render_template("projects.html")


@app.route("/api/profile")
def api_profile():
	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))
	return jsonify(data["profile"])


@app.route("/api/projects")
def api_projects():
	siteRoot = os.path.realpath(os.path.dirname(__file__))
	jsonUrl=os.path.join(siteRoot, "static/json", "siteData.json")
	data=json.load(open(jsonUrl))
	return jsonify(data["projects"])


@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404


