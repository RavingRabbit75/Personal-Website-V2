
mysite.projects = {

	initProjects: function() {
		mysite.projects.setupPreviewButtons();
	},

	setupPreviewButtons: function() {

		$('.block-button').click(function(evt) {
			
			console.log(evt.target.dataset.imageidx, evt.target.dataset.prjname);
			// url="/api/projects";
			// data={"imageidx":evt.target.dataset.imageidx, "prjname":evt.target.dataset.prjname};
			// $.get({
			//   url: url,
			//   data: data,
			//   success: processData,
			//   dataType: "json"
			// });

			// function processData(data) {
								
			// }

			// function moveCurrentPreviews() {
			// 	TweenMax.to(evt.target, 0.25, {opacity:0});
			// }
		});

		$(".block-button").on("mouseover", function(evt) {
			// console.log(evt.target.dataset.imageidx, evt.target.dataset.prjname);
			TweenMax.set(evt.target, {transformOrigin: "0 100% 0", scale:1});
			TweenMax.to(evt.target, 0.75, {height: "15px", ease: Power4.easeOut});
		});

		$(".block-button").on("mouseout", function(evt) {
			// console.log(evt.target.dataset.imageidx, evt.target.dataset.prjname);
			TweenMax.to(evt.target, 0.4, {height: "5px", ease: Power2.easeIn});
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

// mysite.projects.initProjects();

