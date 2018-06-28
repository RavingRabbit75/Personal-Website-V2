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

			var notice = $("#"+projid).find(".loading");
			var tl = new TimelineMax();
			tl.to(notice, 0.75, {alpha:0.1, repeatDelay:0, repeat:-1, yoyo:true});

			showLoadingNotice(tl);

			var url="/api/projects";
			var data={"imageidx":evt.target.dataset.imageidx, "projname":projname};
			$.get({
			  url: url,
			  data: data,
			  success: processData,
			  dataType: "json"
			});

			function processData(returnedJSON) {
				var hiddenPreviews = $("div[id*='" + projid + "'].bottom").find(".image");
				var imagesLoaded=0;

				for(let x=0; x<hiddenPreviews.length; x++) {
					hiddenPreviews[x].src="";
					function hiddenPreviewsHandler() {
						imagesLoaded++;
						hiddenPreviews[x].removeEventListener("load", hiddenPreviewsHandler);
						if(imagesLoaded>=hiddenPreviews.length) {
							hideLoadingNotice(tl);
							moveCurrentPreviews(returnedJSON.length);
						}
					}
					hiddenPreviews[x].addEventListener("load", hiddenPreviewsHandler);
					hiddenPreviews[x].src="static/"+returnedJSON[x].path;
				}
				
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

				movePreviewIndicator();
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

			function movePreviewIndicator() {
				var indicator = $("#"+projid).find(".current-image-indicator");
				var newBaseXLoc=42*(data["imageidx"]-1);
				var currentXCenterPos=indicator.position().left + 19 + "px";
				TweenMax.to(indicator, 0.4, {width: "0", x: currentXCenterPos, onComplete: next01});

				function next01() {
					var newXCenterPos = newBaseXLoc + 19 + "px";
					TweenMax.to(indicator, 0, {x: newXCenterPos, onComplete: next02});
				}
				function next02() {
					TweenMax.to(indicator, 0.5, {width: "38px", x: newBaseXLoc+"px"});
				}
			}

			function showLoadingNotice(timeline) {
				notice[0].style.visibility="visible";
				timeline.play();
			}

			function hideLoadingNotice(timeline) {
				notice[0].style.visibility="hidden";
				timeline.stop();
				timeline.pause(0, true);
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
		var listOfButtons=[];
		for (let i=0; i<projectData.length; i++) {
			var targetDiv=document.getElementById(projectData[i].projid).getElementsByClassName("block-button");
			listOfButtons.push(targetDiv);
		}


	}
		
};




mysite.profile = {
	initProfile: function() {
		
	}
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5qcyIsInByb2plY3RzLmpzIiwicHJvZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBteXNpdGU9e307XG5cbm15c2l0ZS5oZWFkZXI9e1xuXHRpbml0SGVhZGVyOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgc2VjdGlvbj0kKFwiI3NlY3Rpb25OYW1lXCIpLmRhdGEoKTtcblx0XHRteXNpdGUuaGVhZGVyLnN0YXJ0VGltZSgpO1xuXHRcdG15c2l0ZS5oZWFkZXIuc2V0dXBIZWFkZXJCdG5zKCk7XG5cdFx0bXlzaXRlLmhlYWRlci5hbmltYXRlSW5TZWN0aW9uSW5kaWNhdG9yKHNlY3Rpb24ubmFtZSk7XG5cblx0XHRzd2l0Y2goc2VjdGlvbi5uYW1lKSB7XG5cdFx0XHRjYXNlIFwicHJvZmlsZVwiOlxuXHRcdFx0XHRteXNpdGUucHJvZmlsZS5pbml0UHJvZmlsZSgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJwcm9qZWN0c1wiOlxuXHRcdFx0XHRteXNpdGUucHJvamVjdHMuaW5pdFByb2plY3RzKClcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXG5cdFx0fVxuXHR9LFxuXG5cdHNldHVwSGVhZGVyQnRuczogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHByb2ZpbGVCdG49ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9maWxlLWJ0blwiKTtcblx0XHR2YXIgcHJvamVjdHNCdG49ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy1idG5cIik7XG5cdFx0cHJvZmlsZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHNlY3Rpb25Nb3VzZU92ZXIpO1xuXHRcdHByb2ZpbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHNlY3Rpb25Nb3VzZU91dCk7XG5cdFx0cHJvamVjdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBzZWN0aW9uTW91c2VPdmVyKTtcblx0XHRwcm9qZWN0c0J0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgc2VjdGlvbk1vdXNlT3V0KTtcblxuXHRcdCQoXCIuaWNvbm92ZXJcIikubW91c2VvdmVyKGZ1bmN0aW9uKGV2dCl7XG5cdFx0XHRUd2Vlbk1heC50byhldnQudGFyZ2V0LCAwLjUsIHtvcGFjaXR5OjF9KTtcblx0XHR9KTtcblxuXHRcdCQoXCIuaWNvbm92ZXJcIikubW91c2VvdXQoZnVuY3Rpb24oZXZ0KXtcblx0XHRcdFR3ZWVuTWF4LnRvKGV2dC50YXJnZXQsIDAuMjUsIHtvcGFjaXR5OjB9KTtcblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIHNlY3Rpb25Nb3VzZU92ZXIoZXZ0KSB7XG5cdFx0XHRUd2Vlbk1heC50byhldnQudGFyZ2V0LCAwLjUsIHtjb2xvcjpcIiNmNWI3MzBcIn0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNlY3Rpb25Nb3VzZU91dChldnQpIHtcblx0XHRcdFR3ZWVuTWF4LnRvKGV2dC50YXJnZXQsIDAuMjUsIHtjb2xvcjpcIiNlZmM5NzhcIn0pO1xuXHRcdH1cblx0fSxcblxuXHRhbmltYXRlSW5TZWN0aW9uSW5kaWNhdG9yOiBmdW5jdGlvbihzZWN0aW9uKSB7XG5cdFx0c3dpdGNoKHNlY3Rpb24pIHtcblx0XHRcdGNhc2UgXCJwcm9maWxlXCI6XG5cdFx0XHRcdHZhciBzZWN0aW9uSW5kaWNhdG9yPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvZmlsZS1idG4taW5kaWNhdG9yXCIpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJwcm9qZWN0c1wiOlxuXHRcdFx0XHR2YXIgc2VjdGlvbkluZGljYXRvcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLWJ0bi1pbmRpY2F0b3JcIik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblxuXHRcdH1cblx0XHRUd2Vlbk1heC50byhzZWN0aW9uSW5kaWNhdG9yLCAxLjAsIHt3aWR0aDpcIjEwMCVcIiwgZWFzZTogUG93ZXI0LmVhc2VPdXR9KTtcblx0fSxcblxuXHRzdGFydFRpbWU6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB0b2RheT1uZXcgRGF0ZSgpO1xuXHRcdHZhciB5ZWFyPXRvZGF5LmdldEZ1bGxZZWFyKCk7XG5cdFx0dmFyIG1vbnRoPWFkanVzdE1vbnRoKHRvZGF5LmdldE1vbnRoKCkpO1xuXHRcdHZhciBkYXRlPXRvZGF5LmdldERhdGUoKTtcblx0XHR2YXIgZGF5PWFkanVzdERheSh0b2RheS5nZXREYXkoKSk7XG5cdFx0dmFyIGFudGVQb3N0TWVyaWRpZW09XCJBTVwiO1xuXHRcdHZhciBoPWFkanVzdEhvdXJzKHRvZGF5LmdldEhvdXJzKCkpO1xuXHRcdHZhciBtPXRvZGF5LmdldE1pbnV0ZXMoKTtcblx0XHRcblx0XHRtID0gYWRkWmVybyhtKTtcblx0XHQvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnQtZGF0ZVwiKS5pbm5lckhUTUwgPSBkYXkgKyBcIiBcIiArIG1vbnRoK1wiIFwiKyBkYXRlICtcIiwgXCIgKyB5ZWFyK1wiPGJyPlxcblwiK2grXCI6XCIrbSArXCIgXCIrIGFudGVQb3N0TWVyaWRpZW07XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50LWRhdGVcIikuaW5uZXJIVE1MID0gZGF5ICsgXCIgXCIgKyBtb250aCtcIiBcIisgZGF0ZSArXCIsIFwiICsgeWVhcjtcblx0XHR2YXIgdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRteXNpdGUuaGVhZGVyLnN0YXJ0VGltZSgpO1xuXHRcdH0sMTAwMDApO1xuXG5cblx0XHRmdW5jdGlvbiBhZGp1c3RNb250aChpKSB7XG5cdFx0ICAgdmFyIG1vbnRoID0gbmV3IEFycmF5KCk7XG5cdFx0ICAgbW9udGhbMF0gPSBcIkphbnVhcnlcIjtcblx0XHQgICBtb250aFsxXSA9IFwiRmVicnVhcnlcIjtcblx0XHQgICBtb250aFsyXSA9IFwiTWFyY2hcIjtcblx0XHQgICBtb250aFszXSA9IFwiQXByaWxcIjtcblx0XHQgICBtb250aFs0XSA9IFwiTWF5XCI7XG5cdFx0ICAgbW9udGhbNV0gPSBcIkp1bmVcIjtcblx0XHQgICBtb250aFs2XSA9IFwiSnVseVwiO1xuXHRcdCAgIG1vbnRoWzddID0gXCJBdWd1c3RcIjtcblx0XHQgICBtb250aFs4XSA9IFwiU2VwdGVtYmVyXCI7XG5cdFx0ICAgbW9udGhbOV0gPSBcIk9jdG9iZXJcIjtcblx0XHQgICBtb250aFsxMF0gPSBcIk5vdmVtYmVyXCI7XG5cdFx0ICAgbW9udGhbMTFdID0gXCJEZWNlbWJlclwiO1xuXHRcdCAgIHZhciBuID0gbW9udGhbaV07XG5cdFx0ICAgcmV0dXJuIG47XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRqdXN0RGF5KGkpIHtcblx0XHQgICBzd2l0Y2goaSkge1xuXHRcdFx0ICBjYXNlIDA6XG5cdFx0XHRcdCBkYXkgPSBcIlN1bmRheVwiO1xuXHRcdFx0XHQgYnJlYWs7XG5cdFx0XHQgIGNhc2UgMTpcblx0XHRcdFx0IGRheSA9IFwiTW9uZGF5XCI7XG5cdFx0XHRcdCBicmVhaztcblx0XHRcdCAgY2FzZSAyOlxuXHRcdFx0XHQgZGF5ID0gXCJUdWVzZGF5XCI7XG5cdFx0XHRcdCBicmVhaztcblx0XHRcdCAgY2FzZSAzOlxuXHRcdFx0XHQgZGF5ID0gXCJXZWRuZXNkYXlcIjtcblx0XHRcdFx0IGJyZWFrO1xuXHRcdFx0ICBjYXNlIDQ6XG5cdFx0XHRcdCBkYXkgPSBcIlRodXJzZGF5XCI7XG5cdFx0XHRcdCBicmVhaztcblx0XHRcdCAgY2FzZSA1OlxuXHRcdFx0XHQgZGF5ID0gXCJGcmlkYXlcIjtcblx0XHRcdFx0IGJyZWFrO1xuXHRcdFx0ICBjYXNlIDY6XG5cdFx0XHRcdCBkYXkgPSBcIlNhdHVyZGF5XCI7XG5cdFx0XHRcdCBicmVhaztcblx0XHRcdCAgZGVmYXVsdDpcblx0XHRcdFx0IGNvbnNvbGUubG9nKFwibm8gZGF5IHBpY2tlZFwiKTtcblx0XHQgICB9XG5cblx0XHQgICByZXR1cm4gZGF5O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFkanVzdEhvdXJzKGkpe1xuXHRcdFx0aWYgKGkgPiAxMikge1xuXHRcdFx0XHRpID0gaSAtIDEyO1xuXHRcdFx0XHRhbnRlUG9zdE1lcmlkaWVtID0gXCJQTVwiO1xuXHRcdFx0fSBlbHNlIGlmIChpID09IDApIHtcblx0XHRcdFx0aSA9IDEyO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkWmVybyhpKSB7XG5cdFx0XHRpZiAoaSA8IDEwKSB7XG5cdFx0XHRcdGkgPSBcIjBcIiArIGk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaTtcblx0XHR9XG5cdH1cblxuXHQvLyB2YXIgd2lkdGgxID0gJChcIiNwcm9maWxlLWJ0blwiKS53aWR0aCgpO1xuXG5cdC8vIGZ1bmN0aW9uIGRvU29tZXRoaW5nMihldnQpIHtcblx0Ly8gXHRjb25zb2xlLmxvZyhldnQudGFyZ2V0KTtcblx0Ly8gXHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXCJvYmplY3Qgb3Igc3RyaW5nXCIsIFwiVGl0bGVcIiwgXCIvbmV3LXVybFwiKTtcblx0Ly8gfVxuXG5cdFxuXHRcbn07XG5cbiIsIlxubXlzaXRlLnByb2plY3RzID0ge1xuXG5cdGluaXRQcm9qZWN0czogZnVuY3Rpb24oKSB7XG5cdFx0bXlzaXRlLnByb2plY3RzLnNldHVwUHJldmlld0J1dHRvbnMoKTtcblx0fSxcblxuXHRkaXNhYmxlUHJldmlld0J1dHRvbnM6IGZ1bmN0aW9uKHByb2ppZCkge1xuXHRcdHZhciBidXR0b25zID0gJChcIiNcIitwcm9qaWQpLmZpbmQoJy5ibG9jay1idXR0b24td3JhcHBlcicpO1xuXHRcdGZvcihsZXQgeD0wOyB4PGJ1dHRvbnMubGVuZ3RoOyB4Kyspe1xuXHRcdFx0YnV0dG9uc1t4XS5jbGFzc0xpc3QucmVtb3ZlKFwiZW5hYmxlLWJ0blwiKTtcblx0XHRcdGJ1dHRvbnNbeF0uY2xhc3NMaXN0LmFkZChcImRpc2FibGUtYnRuXCIpO1xuXHRcdH1cblx0XHRcblx0fSxcblxuXHRlbmFibGVQcmV2aWV3QnV0dG9uczogZnVuY3Rpb24ocHJvamlkKSB7XG5cdFx0dmFyIGJ1dHRvbnMgPSAkKFwiI1wiK3Byb2ppZCkuZmluZCgnLmJsb2NrLWJ1dHRvbi13cmFwcGVyJyk7XG5cdFx0Zm9yKGxldCB4PTA7IHg8YnV0dG9ucy5sZW5ndGg7IHgrKyl7XG5cdFx0XHRidXR0b25zW3hdLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlLWJ0blwiKTtcblx0XHRcdGJ1dHRvbnNbeF0uY2xhc3NMaXN0LmFkZChcImVuYWJsZS1idG5cIik7XG5cdFx0fVxuXHR9LFxuXG5cdGRpc2FibGVTZWxlY3RlZEJ1dHRvbjogZnVuY3Rpb24ocHJvamlkLCBpbWFnZWlkeCkge1xuXHRcdHZhciBidXR0b24gPSAkKFwiI2J0blwiK2ltYWdlaWR4K1wiX1wiK3Byb2ppZCk7XG5cdFx0YnV0dG9uWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJlbmFibGUtYnRuXCIpO1xuXHRcdGJ1dHRvblswXS5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZS1idG5cIik7XG5cdH0sXG5cblxuXHRzZXR1cFByZXZpZXdCdXR0b25zOiBmdW5jdGlvbigpIHtcblxuXHRcdCQoJy5ibG9jay1idXR0b24td3JhcHBlcicpLmNsaWNrKGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0dmFyIHByb2ppZCA9IGV2dC50YXJnZXQuZGF0YXNldC5wcm9qaWQ7XG5cdFx0XHR2YXIgcHJvam5hbWUgPSBldnQudGFyZ2V0LmRhdGFzZXQucHJvamlkLnJlcGxhY2UoLy0vZywgJyAnKTtcblx0XHRcdG15c2l0ZS5wcm9qZWN0cy5kaXNhYmxlUHJldmlld0J1dHRvbnMocHJvamlkKTtcblxuXHRcdFx0dmFyIG5vdGljZSA9ICQoXCIjXCIrcHJvamlkKS5maW5kKFwiLmxvYWRpbmdcIik7XG5cdFx0XHR2YXIgdGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblx0XHRcdHRsLnRvKG5vdGljZSwgMC43NSwge2FscGhhOjAuMSwgcmVwZWF0RGVsYXk6MCwgcmVwZWF0Oi0xLCB5b3lvOnRydWV9KTtcblxuXHRcdFx0c2hvd0xvYWRpbmdOb3RpY2UodGwpO1xuXG5cdFx0XHR2YXIgdXJsPVwiL2FwaS9wcm9qZWN0c1wiO1xuXHRcdFx0dmFyIGRhdGE9e1wiaW1hZ2VpZHhcIjpldnQudGFyZ2V0LmRhdGFzZXQuaW1hZ2VpZHgsIFwicHJvam5hbWVcIjpwcm9qbmFtZX07XG5cdFx0XHQkLmdldCh7XG5cdFx0XHQgIHVybDogdXJsLFxuXHRcdFx0ICBkYXRhOiBkYXRhLFxuXHRcdFx0ICBzdWNjZXNzOiBwcm9jZXNzRGF0YSxcblx0XHRcdCAgZGF0YVR5cGU6IFwianNvblwiXG5cdFx0XHR9KTtcblxuXHRcdFx0ZnVuY3Rpb24gcHJvY2Vzc0RhdGEocmV0dXJuZWRKU09OKSB7XG5cdFx0XHRcdHZhciBoaWRkZW5QcmV2aWV3cyA9ICQoXCJkaXZbaWQqPSdcIiArIHByb2ppZCArIFwiJ10uYm90dG9tXCIpLmZpbmQoXCIuaW1hZ2VcIik7XG5cdFx0XHRcdHZhciBpbWFnZXNMb2FkZWQ9MDtcblxuXHRcdFx0XHRmb3IobGV0IHg9MDsgeDxoaWRkZW5QcmV2aWV3cy5sZW5ndGg7IHgrKykge1xuXHRcdFx0XHRcdGhpZGRlblByZXZpZXdzW3hdLnNyYz1cIlwiO1xuXHRcdFx0XHRcdGZ1bmN0aW9uIGhpZGRlblByZXZpZXdzSGFuZGxlcigpIHtcblx0XHRcdFx0XHRcdGltYWdlc0xvYWRlZCsrO1xuXHRcdFx0XHRcdFx0aGlkZGVuUHJldmlld3NbeF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgaGlkZGVuUHJldmlld3NIYW5kbGVyKTtcblx0XHRcdFx0XHRcdGlmKGltYWdlc0xvYWRlZD49aGlkZGVuUHJldmlld3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGhpZGVMb2FkaW5nTm90aWNlKHRsKTtcblx0XHRcdFx0XHRcdFx0bW92ZUN1cnJlbnRQcmV2aWV3cyhyZXR1cm5lZEpTT04ubGVuZ3RoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aGlkZGVuUHJldmlld3NbeF0uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgaGlkZGVuUHJldmlld3NIYW5kbGVyKTtcblx0XHRcdFx0XHRoaWRkZW5QcmV2aWV3c1t4XS5zcmM9XCJzdGF0aWMvXCIrcmV0dXJuZWRKU09OW3hdLnBhdGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIG1vdmVDdXJyZW50UHJldmlld3MobGF5b3V0TnVtYmVyKSB7XG5cdFx0XHRcdHZhciBsYXlvdXQ9XCJcIjtcblx0XHRcdFx0aWYobGF5b3V0TnVtYmVyPT09MSkge1xuXHRcdFx0XHRcdGxheW91dD1cInNpbmdsZVwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGxheW91dE51bWJlcj09PTIpIHtcblx0XHRcdFx0XHRsYXlvdXQ9XCJkb3VibGVcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChsYXlvdXROdW1iZXI9PT0zKSB7XG5cdFx0XHRcdFx0bGF5b3V0PVwidHJpcGxlXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgY3VycmVudFByZXZpZXdzID0gJChcImRpdltpZCo9J1wiICsgcHJvamlkICsgXCInXS50b3BcIik7XG5cdFx0XHRcdHZhciBjdXJyZW50SGVpZ2h0ID0gJChcImRpdltpZCo9J1wiICsgcHJvamlkICsgXCInXS50b3BcIikuaGVpZ2h0KCk7XG5cdFx0XHRcdHZhciBjdXJyZW50V3JhcHBlciA9ICQoXCJkaXZbaWQqPSdcIiArIHByb2ppZCArIFwiJ10udG9wXCIpLmZpbmQoXCIuc2hhZG93LW9uXCIpOyAvLyAxLTNcblx0XHRcdFx0XG5cdFx0XHRcdHZhciBoaWRkZW5QcmV2aWV3cyA9ICQoXCJkaXZbaWQqPSdcIiArIHByb2ppZCArIFwiJ10uYm90dG9tXCIpO1xuXHRcdFx0XHR2YXIgaGlkZGVuV3JhcHBlciA9ICQoXCJkaXZbaWQqPSdcIiArIHByb2ppZCArIFwiJ10uYm90dG9tXCIpLmZpbmQoXCIuc2hhZG93LW9mZlwiKTsgLy8gMS0zXG5cblx0XHRcdFx0bW92ZVByZXZpZXdJbmRpY2F0b3IoKTtcblx0XHRcdFx0VHdlZW5NYXgudG8oY3VycmVudFByZXZpZXdzLCAwLjc1LCB7dG9wOiBcIi1cIitjdXJyZW50SGVpZ2h0K1wicHhcIn0pO1xuXHRcdFx0XHRmb3IobGV0IHg9MDsgeDxoaWRkZW5XcmFwcGVyLmxlbmd0aDsgeCsrKSB7XG5cdFx0XHRcdFx0VHdlZW5NYXgudG8oaGlkZGVuV3JhcHBlclt4XSwgMC4zLCB7cGFkZGluZzogXCIwcHhcIiwgZGVsYXk6IC43fSk7XG5cdFx0XHRcdFx0aWYoeD09PWhpZGRlbldyYXBwZXIubGVuZ3RoLTEpIHtcblx0XHRcdFx0XHRcdFR3ZWVuTWF4LnRvKGhpZGRlbldyYXBwZXJbeF0sIDAuMywge2JveFNoYWRvdzogXCIwIDAgNXB4IHJnYmEoMCwgMCwgMCwgLjQpXCIsIGRlbGF5OiAxLCBvbkNvbXBsZXRlOiBzZXRDbGFzc2VzfSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFR3ZWVuTWF4LnRvKGhpZGRlbldyYXBwZXJbeF0sIDAuMywge2JveFNoYWRvdzogXCIwIDAgNXB4IHJnYmEoMCwgMCwgMCwgLjQpXCIsIGRlbGF5OiAxfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZnVuY3Rpb24gc2V0Q2xhc3NlcygpIHtcblx0XHRcdFx0XHRjdXJyZW50UHJldmlld3NbMF0uY2xhc3NMaXN0LnJlbW92ZShcInRvcFwiLCBcInByZXZpZXdzLXJvd1wiKTtcblx0XHRcdFx0XHRjdXJyZW50UHJldmlld3NbMF0uY2xhc3NMaXN0LmFkZChcImJvdHRvbVwiLCBcInByZXZpZXdzLXJvdzJcIik7XG5cblx0XHRcdFx0XHRmb3IobGV0IHg9MDsgeDxjdXJyZW50V3JhcHBlci5sZW5ndGg7IHgrKykge1xuXHRcdFx0XHRcdFx0Y3VycmVudFdyYXBwZXJbeF0uY2xhc3NMaXN0LnJlbW92ZShcInNoYWRvdy1vblwiKTtcblx0XHRcdFx0XHRcdGN1cnJlbnRXcmFwcGVyW3hdLmNsYXNzTGlzdC5hZGQoXCJzaGFkb3ctb2ZmXCIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGN1cnJlbnRQcmV2aWV3cy5jc3Moe3RvcDogXCI1cHhcIn0pO1xuXHRcdFx0XHRcdGN1cnJlbnRXcmFwcGVyLmNzcyh7cGFkZGluZzogXCI4cHhcIiwgYm94U2hhZG93OiBcIjAgMCAwIHJnYmEoMCwgMCwgMCwgLjQpXCJ9KTtcblxuXHRcdFx0XHRcdGhpZGRlblByZXZpZXdzWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJib3R0b21cIiwgXCJwcmV2aWV3cy1yb3cyXCIpO1xuXHRcdFx0XHRcdGhpZGRlblByZXZpZXdzWzBdLmNsYXNzTGlzdC5hZGQoXCJ0b3BcIiwgXCJwcmV2aWV3cy1yb3dcIik7XG5cblx0XHRcdFx0XHRmb3IobGV0IHg9MDsgeDxjdXJyZW50V3JhcHBlci5sZW5ndGg7IHgrKykge1xuXHRcdFx0XHRcdFx0aGlkZGVuV3JhcHBlclt4XS5jbGFzc0xpc3QucmVtb3ZlKFwic2hhZG93LW9mZlwiKTtcblx0XHRcdFx0XHRcdGhpZGRlbldyYXBwZXJbeF0uY2xhc3NMaXN0LmFkZChcInNoYWRvdy1vblwiKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRteXNpdGUucHJvamVjdHMuZW5hYmxlUHJldmlld0J1dHRvbnMocHJvamlkKTtcblx0XHRcdFx0XHRteXNpdGUucHJvamVjdHMuZGlzYWJsZVNlbGVjdGVkQnV0dG9uKHByb2ppZCwgZGF0YVtcImltYWdlaWR4XCJdKTtcblx0XHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIG1vdmVQcmV2aWV3SW5kaWNhdG9yKCkge1xuXHRcdFx0XHR2YXIgaW5kaWNhdG9yID0gJChcIiNcIitwcm9qaWQpLmZpbmQoXCIuY3VycmVudC1pbWFnZS1pbmRpY2F0b3JcIik7XG5cdFx0XHRcdHZhciBuZXdCYXNlWExvYz00MiooZGF0YVtcImltYWdlaWR4XCJdLTEpO1xuXHRcdFx0XHR2YXIgY3VycmVudFhDZW50ZXJQb3M9aW5kaWNhdG9yLnBvc2l0aW9uKCkubGVmdCArIDE5ICsgXCJweFwiO1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbmRpY2F0b3IsIDAuNCwge3dpZHRoOiBcIjBcIiwgeDogY3VycmVudFhDZW50ZXJQb3MsIG9uQ29tcGxldGU6IG5leHQwMX0pO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIG5leHQwMSgpIHtcblx0XHRcdFx0XHR2YXIgbmV3WENlbnRlclBvcyA9IG5ld0Jhc2VYTG9jICsgMTkgKyBcInB4XCI7XG5cdFx0XHRcdFx0VHdlZW5NYXgudG8oaW5kaWNhdG9yLCAwLCB7eDogbmV3WENlbnRlclBvcywgb25Db21wbGV0ZTogbmV4dDAyfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZnVuY3Rpb24gbmV4dDAyKCkge1xuXHRcdFx0XHRcdFR3ZWVuTWF4LnRvKGluZGljYXRvciwgMC41LCB7d2lkdGg6IFwiMzhweFwiLCB4OiBuZXdCYXNlWExvYytcInB4XCJ9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBzaG93TG9hZGluZ05vdGljZSh0aW1lbGluZSkge1xuXHRcdFx0XHRub3RpY2VbMF0uc3R5bGUudmlzaWJpbGl0eT1cInZpc2libGVcIjtcblx0XHRcdFx0dGltZWxpbmUucGxheSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBoaWRlTG9hZGluZ05vdGljZSh0aW1lbGluZSkge1xuXHRcdFx0XHRub3RpY2VbMF0uc3R5bGUudmlzaWJpbGl0eT1cImhpZGRlblwiO1xuXHRcdFx0XHR0aW1lbGluZS5zdG9wKCk7XG5cdFx0XHRcdHRpbWVsaW5lLnBhdXNlKDAsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHQkKFwiLmJsb2NrLWJ1dHRvbi13cmFwcGVyXCIpLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0dmFyIGJsb2NrPWV2dC50YXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJsb2NrLWJ1dHRvblwiKTtcblx0XHRcdFR3ZWVuTWF4LnRvKGJsb2NrLCAwLjc1LCB7aGVpZ2h0OiBcIjE1cHhcIiwgZWFzZTogUG93ZXI0LmVhc2VPdXR9KTtcblx0XHR9KTtcblxuXHRcdCQoXCIuYmxvY2stYnV0dG9uLXdyYXBwZXJcIikub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbihldnQpIHtcblx0XHRcdHZhciBibG9jaz1ldnQudGFyZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJibG9jay1idXR0b25cIik7XG5cdFx0XHRUd2Vlbk1heC50byhibG9jaywgMC40LCB7aGVpZ2h0OiBcIjVweFwiLCBlYXNlOiBQb3dlcjIuZWFzZUlufSk7XG5cdFx0fSk7XG5cblx0XHR2YXIgcHJldmlldzE9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJXZWF0aGVyIEFuaW1hdG9yX2FcIik7XG5cdFx0dmFyIHByZXZpZXcyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiV2VhdGhlciBBbmltYXRvcl9iXCIpO1xuXHRcdHZhciBsaXN0T2ZCdXR0b25zPVtdO1xuXHRcdGZvciAobGV0IGk9MDsgaTxwcm9qZWN0RGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHRhcmdldERpdj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0RGF0YVtpXS5wcm9qaWQpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJibG9jay1idXR0b25cIik7XG5cdFx0XHRsaXN0T2ZCdXR0b25zLnB1c2godGFyZ2V0RGl2KTtcblx0XHR9XG5cblxuXHR9XG5cdFx0XG59O1xuXG5cbiIsIlxubXlzaXRlLnByb2ZpbGUgPSB7XG5cdGluaXRQcm9maWxlOiBmdW5jdGlvbigpIHtcblx0XHRcblx0fVxufTtcbiJdfQ==
