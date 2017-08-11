// TweenMax.min.js

var profileBtn=document.getElementById("profile-btn");
var projectsBtn=document.getElementById("projects-btn");
profileBtn.addEventListener("mouseover", sectionMouseOver);
profileBtn.addEventListener("mouseout", sectionMouseOut);
projectsBtn.addEventListener("mouseover", sectionMouseOver);
projectsBtn.addEventListener("mouseout", sectionMouseOut);

$(".iconover").mouseover(function(evt){
	TweenMax.to(evt.target, 0.5, {opacity:1});
});

$(".iconover").mouseout(function(evt){
	TweenMax.to(evt.target, 0.25, {opacity:0});
});

function sectionMouseOver(evt) {
	TweenMax.to(evt.target, 0.5, {color:"#f5b730"});
}

function sectionMouseOut(evt) {
	TweenMax.to(evt.target, 0.25, {color:"#efc978"});
}


// var width1 = $("#profile-btn").width();
// console.log(width1);

// TweenMax.to(profileBtn, 2, {opacity:0});


// function doSomething2(evt) {
// 	console.log(evt.target);
// 	window.history.pushState("object or string", "Title", "/new-url");
// }

// $.ajax({url: "/api/projects", success: function(result){
// 	$("#dud").append("<span>Crap</span>");
//     $("#dud").append(result["0"]["name"]);
//     $("#dud").append("<span>"+result["0"].name+"</span>");
//     var dud = document.getElementById("dud");
//     dud.addEventListener("click", doSomething2);
// }});



