"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var cssbeautify = require("gulp-cssbeautify");
var concat = require("gulp-concat");

gulp.task("sass", function(){
	return gulp.src("./scss/styles.scss")
	.pipe(sass())
	.on("error", function(error){
		console.error("\x1b[31m\x1b[1m%s\x1b[0m", "ERROR occured:");
		console.error("\x1b[35m", error);
	})
	.pipe(cssbeautify())
	.pipe(gulp.dest("./build/static/css"));
});

gulp.task("scripts", function(){
	return gulp.src(["./js_src/header.js", "./js_src/projects.js"])
		.pipe(concat("app.js"))
		.pipe(gulp.dest("./build/static/js/"));
});

gulp.task("watch", function(){
	gulp.watch("./scss/*.scss", ["sass"]);
	gulp.watch("./scss/modules/*.scss", ["sass"]);
	gulp.watch("./js_src/*.js", ["scripts"]);
});

gulp.task("default", ["watch", "sass", "scripts"]);