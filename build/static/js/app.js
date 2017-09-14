var mysite={};

mysite.header={
	initHeader: function() {
		var section=$("#sectionName").data();
		mysite.header.startTime();
		mysite.header.setupHeaderBtns();
		mysite.header.animateInSectionIndicator(section.name);

		switch(section.name) {
			case "profile":
				mysite.profile.initProfile();
				break;
			case "projects":
				mysite.projects.initProjects()
				break;
			default:

		}
	},

	setupHeaderBtns: function() {
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
	},

	animateInSectionIndicator: function(section) {
		switch(section) {
			case "profile":
				var sectionIndicator=document.getElementById("profile-btn-indicator");
				break;
			case "projects":
				var sectionIndicator=document.getElementById("projects-btn-indicator");
				break;
			default:

		}
		TweenMax.to(sectionIndicator, 1.0, {width:"100%", ease: Power4.easeOut});
	},

	startTime: function() {
		var today=new Date();
		var year=today.getFullYear();
		var month=adjustMonth(today.getMonth());
		var date=today.getDate();
		var day=adjustDay(today.getDay());
		var antePostMeridiem="AM";
		var h=adjustHours(today.getHours());
		var m=today.getMinutes();
		
		m = addZero(m);
		// document.getElementById("current-date").innerHTML = day + " " + month+" "+ date +", " + year+"<br>\n"+h+":"+m +" "+ antePostMeridiem;
		document.getElementById("current-date").innerHTML = day + " " + month+" "+ date +", " + year;
		var t = setTimeout(function() {
			mysite.header.startTime();
		},10000);


		function adjustMonth(i) {
		   var month = new Array();
		   month[0] = "January";
		   month[1] = "February";
		   month[2] = "March";
		   month[3] = "April";
		   month[4] = "May";
		   month[5] = "June";
		   month[6] = "July";
		   month[7] = "August";
		   month[8] = "September";
		   month[9] = "October";
		   month[10] = "November";
		   month[11] = "December";
		   var n = month[i];
		   return n;
		}

		function adjustDay(i) {
		   switch(i) {
			  case 0:
				 day = "Sunday";
				 break;
			  case 1:
				 day = "Monday";
				 break;
			  case 2:
				 day = "Tuesday";
				 break;
			  case 3:
				 day = "Wednesday";
				 break;
			  case 4:
				 day = "Thursday";
				 break;
			  case 5:
				 day = "Friday";
				 break;
			  case 6:
				 day = "Saturday";
				 break;
			  default:
				 console.log("no day picked");
		   }

		   return day;
		}

		function adjustHours(i){
			if (i > 12) {
				i = i - 12;
				antePostMeridiem = "PM";
			} else if (i == 0) {
				i = 12;
			}
			return i;
		}

		function addZero(i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}
	}

	// var width1 = $("#profile-btn").width();

	// function doSomething2(evt) {
	// 	console.log(evt.target);
	// 	window.history.pushState("object or string", "Title", "/new-url");
	// }

	
	
};



mysite.projects = {

	initProjects: function() {
		mysite.projects.setupPreviewButtons();
	},

	setupPreviewButtons: function() {

		$('.block-button-wrapper').click(function(evt) {
			
			// console.log(evt.target.dataset.imageidx, evt.target.dataset.prjname);

			url="/api/projects";
			data={"imageidx":evt.target.dataset.imageidx, "prjname":evt.target.dataset.prjname};
			$.get({
			  url: url,
			  data: data,
			  success: processData,
			  dataType: "json"
			});

			function processData(returnedJSON) {
				// console.log(returnedJSON);
				console.log(data['prjname']);
				var hiddenPreviews = $("div[id*='" + data.prjname + "'].bottom").find(".image");
				
				for(let x=0; x<hiddenPreviews.length; x++) {
					console.log(returnedJSON[x].path);
					console.log(hiddenPreviews[x].src);

				}
				// hiddenPreviews[0].src="{{ url_for('static', filename=returnedJSON[0].path) }}";
				hiddenPreviews[0].src="static/"+returnedJSON[0].path;
			}

			function moveCurrentPreviews() {
				TweenMax.to(evt.target, 0.25, {opacity:0});
			}
		});

		$(".block-button-wrapper").on("mouseover", function(evt) {
			var block=evt.target.getElementsByClassName("block-button");
			TweenMax.to(block, 0.75, {height: "15px", ease: Power4.easeOut});
		});

		$(".block-button-wrapper").on("mouseout", function(evt) {
			var block=evt.target.getElementsByClassName("block-button");
			TweenMax.to(block, 0.4, {height: "5px", ease: Power2.easeIn});
		});

		var preview1=document.getElementById("Weather Animator_a");
		var preview2=document.getElementById("Weather Animator_b");
		// console.log(projectData);
		var listOfButtons=[];
		for (let i=0; i<projectData.length; i++) {
			// console.log(projectData[i].name);
			var targetDiv=document.getElementById(projectData[i].name).getElementsByClassName("block-button");
			listOfButtons.push(targetDiv);
		}

		// var btn1=document.getElementById("btn1_Weather Animator");
		// var btn2=document.getElementById("btn2_Weather Animator");

		// $('#btn1_Weather Animator').click(function(evt) {
		// 	TweenMax.to(preview1, 0.75, {top: "-400px", ease: Power2.easeOut, onComplete: next01});
		// });

		// $('#btn2_Weather Animator').click(function(evt) {
		// 	TweenMax.to(preview2, 0.75, {top: "-400px", ease: Power2.easeOut, onComplete: next02});
		// });
		// btn1.addEventListener("click", function(evt){
		// 	TweenMax.to(preview1, 0.75, {top: "-400px", ease: Power2.easeOut, onComplete: next01});
		// });

		// btn2.addEventListener("click", function(evt){
		// 	TweenMax.to(preview2, 0.75, {top: "-400px", ease: Power2.easeOut, onComplete: next02});
		// });

		// $.ajax({url: "/api/projects", success: function(result){
	// 	$("#dud").append("<span>Crap</span>");
	//     $("#dud").append(result["0"]["name"]);
	//     $("#dud").append("<span>"+result["0"].name+"</span>");
	//     var dud = document.getElementById("dud");
	//     dud.addEventListener("click", doSomething2);
	// }});


		function next01(){
			preview1.classList.remove("top");
			preview1.style.top="0px";
			preview1.style.boxShadow="0 0 0px rgba(0, 0, 0, .0)";
			
			preview1.classList.add("bottom");

			preview2.classList.remove("bottom");
			preview2.classList.add("top");
		}

		function next02(){
			preview2.classList.remove("top");
			preview2.style.top="0px";
			preview2.classList.add("bottom");
			
			preview1.classList.remove("bottom");
			preview1.classList.add("top");
		}
	
	},

	movePreviewIndicator: function() {

	}
		
};




mysite.profile = {
	initProfile: function() {
		
	}
};
