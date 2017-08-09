// TweenMax.min.js

var profileBtn=document.getElementById("profile-btn");
var projectsBtn=document.getElementById("projects-btn");
profileBtn.addEventListener("click", doSomething);


function doSomething(evt) {
	console.log(evt.target);
}
// var width1 = $("#profile-btn").width();
// console.log(width1);

// TweenMax.to(profileBtn, 2, {opacity:0});