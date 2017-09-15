
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


