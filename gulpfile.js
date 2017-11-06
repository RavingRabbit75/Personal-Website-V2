"use strict";

var gulp = require("gulp");

//  modules required for processing both js and sass
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

// modules required for process only sass
var sass = require("gulp-sass");
var cssbeautify = require("gulp-cssbeautify");
var cleanCSS = require("gulp-clean-css");

// modules required for processsing only javascript
var babel=require("gulp-babel");


//// Default development tasks

gulp.task("sass", function(){
	return gulp.src("./scss/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on("error", function(error){
			console.error("\x1b[31m\x1b[1m%s\x1b[0m", "ERROR occured:");
			console.error("\x1b[35m", error);
		})
		.pipe(cssbeautify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./build/static/css"));
});

gulp.task("scripts", function(){
	return gulp.src(["./js_src/header.js", "./js_src/projects.js", "./js_src/profile.js"])
		.pipe(sourcemaps.init())
		.pipe(concat("app.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./build/static/js/"));
});

gulp.task("watch", function(){
	gulp.watch("./scss/*.scss", ["sass"]);
	gulp.watch("./scss/modules/*.scss", ["sass"]);
	gulp.watch("./js_src/*.js", ["scripts"]);
});


////  Final build production tasks

gulp.task("processCSS", function(){
	return gulp.src("./scss/*.scss")
		.pipe(sass())
		.on("error", function(error){
			console.error("\x1b[31m\x1b[1m%s\x1b[0m", "ERROR occured:");
			console.error("\x1b[35m", error);
		})
		.pipe(cleanCSS())
		.pipe(gulp.dest("./build/static/css"));
});

gulp.task("processJS", function(){
	return gulp.src(["./js_src/header.js", "./js_src/projects.js", "./js_src/profile.js"])
		.pipe(concat("app.js"))
		.pipe(babel({presets: ["es2015"]}))
		.pipe(uglify())
		.pipe(gulp.dest("./build/static/js/"));
});



// For final production build
gulp.task("build", ["processCSS", "processJS"]);

// default development build and watch for changes
gulp.task("default", ["watch", "sass", "scripts"]);
