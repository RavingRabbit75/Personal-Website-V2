
mysite.projects = {

	initProjects: function() {
		mysite.projects.setupPreviewButtons();
	},

	setupPreviewButtons: function() {
		const mq = window.matchMedia( "(min-width: 500px)" );

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
				var currentPreviews = $("div[id*='" + data.prjname + "'].top");
				var currentHeight = $("div[id*='" + data.prjname + "'].top").height();
				var currentWrapper = $("div[id*='" + data.prjname + "'].top").find(".shadow-on");
				var hiddenPreviews = $("div[id*='" + data.prjname + "'].bottom");
				var hiddenWrapper = $("div[id*='" + data.prjname + "'].bottom").find(".shadow-off");
				var topPosition = currentPreviews.offset().top;
				// console.log(currentPreviews.offset().top)

				TweenMax.to(currentPreviews, 0.75, {top: "-"+currentHeight+"px"});
				TweenMax.to(hiddenWrapper, 0.3, {padding: "0px", delay: .7});
				TweenMax.to(hiddenWrapper, 0.3, {boxShadow: "0 0 5px rgba(0, 0, 0, .4)", delay: 1, onComplete: setClasses});

				// console.log(currentPreviews[0].classList);
				function setClasses() {
					currentPreviews[0].classList.remove("top", "previews-row");
					currentPreviews[0].classList.add("bottom", "previews-row2");
					console.log(currentPreviews.offset().top);
					currentWrapper[0].classList.remove("shadow-on");
					currentWrapper[0].classList.add("shadow-off");
					currentPreviews.css({top: "5px"});
					currentWrapper.css({padding: "8px", boxShadow: "0 0 0 rgba(0, 0, 0, .4)"})
					console.log(currentPreviews.offset().top);

					hiddenPreviews[0].classList.remove("bottom", "previews-row2");
					hiddenPreviews[0].classList.add("top", "previews-row");
					hiddenWrapper[0].classList.remove("shadow-off");
					hiddenWrapper[0].classList.add("shadow-on");

					currentPreviews.insertAfter(hiddenPreviews);

				}
				
				// hiddenPreviews

				// if (mq.matches) {
				//   // window width is at least 500px
				// } else {
				//   // window width is less than 500px
				// }
				
				
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


