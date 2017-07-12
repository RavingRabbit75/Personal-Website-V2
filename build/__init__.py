import os
from flask import Flask, render_template, redirect, url_for



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



@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404


