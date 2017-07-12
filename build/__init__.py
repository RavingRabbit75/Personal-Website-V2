import os
from flask import Flask, render_template, url_for



app = Flask(__name__)

if os.environ.get("ENV") == "production":
	debug=False

else:
	debug=True


@app.route("/")
def root():
	return render_template("index.html")

