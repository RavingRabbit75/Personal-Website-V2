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

	disablePreviewButtons: function(projid) {
		var buttons = $("#"+projid).find('.block-button-wrapper');
		for(let x=0; x<buttons.length; x++){
			buttons[x].classList.remove("enable-btn");
			buttons[x].classList.add("disable-btn");
		}
		
	},

	enablePreviewButtons: function(projid) {
		var buttons = $("#"+projid).find('.block-button-wrapper');
		for(let x=0; x<buttons.length; x++){
			buttons[x].classList.remove("disable-btn");
			buttons[x].classList.add("enable-btn");
		}
	},

	disableSelectedButton: function(projid, imageidx) {
		var button = $("#btn"+imageidx+"_"+projid);
		button[0].classList.remove("enable-btn");
		button[0].classList.add("disable-btn");
	},

	setupPreviewButtons: function() {

		$('.block-button-wrapper').click(function(evt) {
			var projid = evt.target.dataset.projid;
			var projname = evt.target.dataset.projid.replace(/-/g, ' ');
			mysite.projects.disablePreviewButtons(projid);

			url="/api/projects";
			data={"imageidx":evt.target.dataset.imageidx, "projname":projname};
			$.get({
			  url: url,
			  data: data,
			  success: processData,
			  dataType: "json"
			});

			function processData(returnedJSON) {
				var hiddenPreviews = $("div[id*='" + projid + "'].bottom").find(".image");
				for(let x=0; x<hiddenPreviews.length; x++) {
					hiddenPreviews[x].src="static/"+returnedJSON[x].path;
				}
				moveCurrentPreviews(returnedJSON.length);
			}

			function moveCurrentPreviews(layoutNumber) {
				var layout="";
				if(layoutNumber===1) {
					layout="single";
				} else if (layoutNumber===2) {
					layout="double";
				} else if (layoutNumber===3) {
					layout="triple";
				}

				var currentPreviews = $("div[id*='" + projid + "'].top");
				var currentHeight = $("div[id*='" + projid + "'].top").height();
				var currentWrapper = $("div[id*='" + projid + "'].top").find(".shadow-on"); // 1-3
				
				var hiddenPreviews = $("div[id*='" + projid + "'].bottom");
				var hiddenWrapper = $("div[id*='" + projid + "'].bottom").find(".shadow-off"); // 1-3

				TweenMax.to(currentPreviews, 0.75, {top: "-"+currentHeight+"px"});
				for(let x=0; x<hiddenWrapper.length; x++) {
					TweenMax.to(hiddenWrapper[x], 0.3, {padding: "0px", delay: .7});
					if(x===hiddenWrapper.length-1) {
						TweenMax.to(hiddenWrapper[x], 0.3, {boxShadow: "0 0 5px rgba(0, 0, 0, .4)", delay: 1, onComplete: setClasses});
					} else {
						TweenMax.to(hiddenWrapper[x], 0.3, {boxShadow: "0 0 5px rgba(0, 0, 0, .4)", delay: 1});
					}
				}

				function setClasses() {
					currentPreviews[0].classList.remove("top", "previews-row");
					currentPreviews[0].classList.add("bottom", "previews-row2");

					for(let x=0; x<currentWrapper.length; x++) {
						currentWrapper[x].classList.remove("shadow-on");
						currentWrapper[x].classList.add("shadow-off");
					}

					currentPreviews.css({top: "5px"});
					currentWrapper.css({padding: "8px", boxShadow: "0 0 0 rgba(0, 0, 0, .4)"});

					hiddenPreviews[0].classList.remove("bottom", "previews-row2");
					hiddenPreviews[0].classList.add("top", "previews-row");

					for(let x=0; x<currentWrapper.length; x++) {
						hiddenWrapper[x].classList.remove("shadow-off");
						hiddenWrapper[x].classList.add("shadow-on");
					}


					mysite.projects.enablePreviewButtons(projid);
					mysite.projects.disableSelectedButton(projid, data["imageidx"]);
				}
			
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
			var targetDiv=document.getElementById(projectData[i].projid).getElementsByClassName("block-button");
			listOfButtons.push(targetDiv);
		}

	},

	movePreviewIndicator: function() {

	}
		
};




mysite.profile = {
	initProfile: function() {
		
	}
};
