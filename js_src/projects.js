
mysite.projects = {

	initProjects: function() {
		// var section=$("#sectionName").data();
		mysite.projects.setupPreviewButtons();
	},

	setupPreviewButtons: function() {
		$('.block-button').click(function(evt) {
			evt.preventDefault();
			// console.log(evt.target.dataset.imageidx, evt.target.dataset.prjname);
			url="/api/projects";
			data={"imageidx":evt.target.dataset.imageidx, "prjname":evt.target.dataset.prjname};
			$.get({
			  url: url,
			  data: data,
			  success: processData,
			  dataType: "json"
			});

			function processData(data) {
				
			}

			function moveCurrentPreviews() {
				TweenMax.to(evt.target, 0.25, {opacity:0});
			}
		});

		var preview1=document.getElementById("Weather Animator_a");
		var preview2=document.getElementById("Weather Animator_b");

		var btn1=document.getElementById("btn1_Weather Animator");
		var btn2=document.getElementById("btn2_Weather Animator");

		$('#btn1_Weather Animator').click(function(evt) {
			evt.preventDefault();
			console.log("PING!");
			TweenMax.to(preview1, 0.75, {top: "-400px", ease: Power2.easeOut, onComplete: next01});
		});

		$('#btn2_Weather Animator').click(function(evt) {
			evt.preventDefault();
			console.log("PING!");
			TweenMax.to(preview2, 0.75, {top: "-400px", ease: Power2.easeOut, onComplete: next02});
		});
		// btn1.addEventListener("click", function(evt){
		// 	evt.preventDefault();
		// 	console.log("PING_1");
		// 	TweenMax.to(preview1, 0.75, {top: "-400px", ease: Power2.easeOut, onComplete: next01});
		// });

		// btn2.addEventListener("click", function(evt){
		// 	evt.preventDefault();
		// 	console.log("PING_2");
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
	
	}
		
};

mysite.projects.initProjects();

