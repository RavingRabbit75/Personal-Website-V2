"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var cssbeautify = require("gulp-cssbeautify");

gulp.task("sass", function(){
	return gulp.src("./scss/styles.scss")
	.pipe(sass())
	.on("error", function(error){
		console.error("\x1b[31m\x1b[1m%s\x1b[0m", "ERROR occured:");
		console.error("\x1b[35m", error);
	})
	.pipe(cssbeautify())
	.pipe(gulp.dest("./build/css"));
});

gulp.task("watch", function(){
	gulp.watch("./scss/*.scss", ["sass"]);
	gulp.watch("./scss/modules/*.scss", ["sass"]);
});

gulp.task("default", ["watch", "sass"]);