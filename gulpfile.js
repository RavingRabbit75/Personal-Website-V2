"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var cssbeautify = require("gulp-cssbeautify");

gulp.task("sass", function(){
	return gulp.src("./scss/styles.scss")
	.pipe(sass())
	.pipe(cssbeautify())
	.pipe(gulp.dest("./build/css"));
});

gulp.task("watch", function(){
	gulp.watch("./scss/*.scss", ["sass"]);
});

gulp.task("default", ["watch", "sass"]);