
var currentSlide = 1;
var opacitySetting = 0.451;
var inTransition = false;
var browseTheLooksVisible = true;
var navButtonPressed; // left, right, radioButton

var container = document.getElementById("container");
var gap_logo = document.getElementById("gap_logo");
var cta_off = document.getElementById("cta_off");
var cta_over = document.getElementById("cta_over");

var copy_styldBy = document.getElementById("copy_styldBy");
var copy_CindyCrawford = document.getElementById("copy_CindyCrawford");
var copy_outfitDescription01 = document.getElementById("copy_outfitDescription01");
var copy_outfitDescription02 = document.getElementById("copy_outfitDescription02");
var copy_outfitDescription03 = document.getElementById("copy_outfitDescription03");

var image01= document.getElementById("image01");
var image02= document.getElementById("image02");
var image03= document.getElementById("image03");

var indicators = document.getElementById("indicators");
var eva1 = document.getElementById("eva1");
var eva2 = document.getElementById("eva2");
var eva3 = document.getElementById("eva3");
var circle_current = document.getElementById("circle_current");

var copy_browseTheLooks = document.getElementById("copy_browseTheLooks");
var arrowBackgroundLeft = document.getElementById("arrowBackgroundLeft");
var arrowBackgroundRight = document.getElementById("arrowBackgroundRight");
var arrow1 = document.getElementById("arrow1");
var arrow2 = document.getElementById("arrow2");
var magentaOverlay = document.getElementById("magentaOverlay");

var flipTime01 = 1.0;

var delayTime01 = 0.75;


function init() {

	document.getElementById('e1').addEventListener('click', function(e){

	});
	document.getElementById('e2').addEventListener('click', function(e){

	});
	document.getElementById('e3').addEventListener('click', function(e){
		
	});

    // set initial locations

    document.getElementById('e1').style.width = "100%";
    document.getElementById('e1').style.height = "100%";

    TweenLite.set(container, {transformStyle: "preserve-3d", perspective:800});
	TweenLite.to(image02, 0, {rotationY:-60, transformOrigin:"50% 50% -260px"});
	TweenLite.to(image03, 0, {rotationY:-60, transformOrigin:"50% 50% -260px"});

   	TweenLite.delayedCall(1.5, frame02);

    setupCTARollover();
}

function frame02() {
	document.getElementById('e1').style.width = "0%";
    document.getElementById('e1').style.height = "0%";
	document.getElementById('e2').style.width = "100%";
    document.getElementById('e2').style.height = "100%";

	TweenLite.to(image01, flipTime01, {rotationY:60, transformOrigin:"50% 50% -260px", ease:Quad.easeInOut});
	TweenLite.to(image02, flipTime01, {rotationY:0, transformOrigin:"50% 50% -260px", ease:Quad.easeInOut});
	TweenLite.to(copy_styldBy, 0.5, {opacity: 0});
	TweenLite.to(copy_CindyCrawford, 0.5, {opacity: 0});
	TweenLite.to(copy_outfitDescription01, 0.5, {opacity: 0});

	TweenLite.to(copy_styldBy, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(copy_CindyCrawford, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(copy_outfitDescription02, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(indicators, 0.5, {opacity: 1, delay: 0.75});

	TweenLite.delayedCall(2.5, frame03);
	currentSlide = 2;
	circle_current.style.left = "21px";
}

function frame03(){

	document.getElementById('e2').style.width = "0%";
    document.getElementById('e2').style.height = "0%";
	document.getElementById('e3').style.width = "100%";
    document.getElementById('e3').style.height = "100%";

	TweenLite.to(image02, flipTime01, {rotationY:60, transformOrigin:"50% 50% -260px", ease:Quad.easeInOut});
	TweenLite.to(image03, flipTime01, {rotationY:0, transformOrigin:"50% 50% -260px", ease:Quad.easeInOut});
	TweenLite.to(copy_styldBy, 0.5, {opacity: 0});
	TweenLite.to(copy_CindyCrawford, 0.5, {opacity: 0});
	TweenLite.to(copy_outfitDescription02, 0.5, {opacity: 0});

	TweenLite.to(copy_styldBy, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(copy_CindyCrawford, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(copy_outfitDescription03, 0.5, {opacity: 1, delay: 0.75});

	TweenLite.to(magentaOverlay, 0.5, {opacity: opacitySetting, delay: 0.75});
	TweenLite.to(arrow1, 0, {scaleX: 0.5, scaleY: 0.5});
	TweenLite.to(arrow2, 0, {scaleX: 0.5, scaleY: 0.5});

	TweenLite.to(arrow1, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(arrow2, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(arrowBackgroundLeft, 0.5, {opacity: opacitySetting, delay: 0.75});
	TweenLite.to(arrowBackgroundRight, 0.5, {opacity: opacitySetting, delay: 0.75});
	TweenLite.to(copy_browseTheLooks, 0.5, {opacity: 1, delay: 0.75, onComplete:setupFinalButtons});
	circle_current.style.left = "35px";
	currentSlide = 3;

}


function setupFinalButtons() {
		document.getElementById('eva1').addEventListener('click', function(e){
			
		});
		document.getElementById('eva2').addEventListener('click', function(e){
			
		});
		document.getElementById('eva3').addEventListener('click', function(e){
			
		});
		document.getElementById('arrowRight').addEventListener('click', function(e){
			
		});
		document.getElementById('arrowLeft').addEventListener('click', function(e){
			Enabler.counter('Left arrow', true);
		});

	arrowLeft.addEventListener("mouseover", goLeftRollOver, false);
    arrowLeft.addEventListener("mouseout", goLeftRollOff, false);
    arrowRight.addEventListener("mouseover", goRightRollOver, false);
    arrowRight.addEventListener("mouseout", goRightRollOff, false);

    arrowLeft.addEventListener("click", goLeftClick, false);
    arrowRight.addEventListener("click", goRightClick, false);

    eva1.addEventListener("click", indicatorClicked, false);
    eva2.addEventListener("click", indicatorClicked, false);
    eva3.addEventListener("click", indicatorClicked, false);
}


function indicatorClicked(event) {
	var nextSlide;
	if (browseTheLooksVisible) {
		turnOffBrowseTheLooks();
	}

	if (inTransition) {
		// console.log("animating in progress");
	} else {

		switch(event.target.id) {
	    case "eva1":
	    	nextSlide = 1;
	        break;
	    case "eva2":
	    	nextSlide = 2;
	        break;
	    case "eva3":
	    	nextSlide = 3;
	        break;
	    default:

		}
		if(nextSlide == currentSlide) {
			// console.log("already on that slide: " + currentSlide);
		} else {
			navButtonPressed="radioButton";
			setupTransition(nextSlide);
		}

	}
}


function goLeftClick(event) {
	if (browseTheLooksVisible) {
		turnOffBrowseTheLooks();
	}

	if (inTransition) {
		// console.log("animating in progress");
	} else {
		var nextSlide;
		if (currentSlide == 1) {
			nextSlide = 3;
		} else {
			nextSlide = currentSlide - 1;
		}
		// console.log("next slide: " + nextSlide);
		navButtonPressed = "left";
		setupTransition(nextSlide);
	}

}
function goRightClick(event) {
	if (browseTheLooksVisible) {
		turnOffBrowseTheLooks();
	}
	if (inTransition) {
		// console.log("animating in progress");
	} else {
		var nextSlide;
		if (currentSlide == 3) {
			nextSlide = 1;
		} else {
			nextSlide = currentSlide + 1;
		}
		// console.log("next slide: " + nextSlide);
		navButtonPressed = "right";
		setupTransition(nextSlide);
	}
}

function turnOffBrowseTheLooks() {
	browseTheLooksVisible = false;
	TweenLite.to(copy_browseTheLooks, 0.5, {opacity: 0});
	TweenLite.to(magentaOverlay, 0.5, {opacity: 0});
}

function setupTransition(nextSlide) {
	var nextImage;
	var nextCopyOutfit;
	switch(nextSlide) {
    case 1:
        nextImage = image01;
        nextCopyOutfit = copy_outfitDescription01;
        break;
    case 2:
        nextImage = image02;
        nextCopyOutfit = copy_outfitDescription02;
        break;

    case 3:
        nextImage = image03;
        nextCopyOutfit = copy_outfitDescription03;
        break;
    default:

	}

	switch(currentSlide) {
    case 1:
    	// console.log("hide: " + circle_current);
    	document.getElementById('e1').style.width = "0%";
    	document.getElementById('e1').style.height = "0%";
        gotoImage(nextImage, nextCopyOutfit, image01, copy_outfitDescription01, nextSlide);
        break;
    case 2:
    	// console.log("hide: " + circle_current);
    	document.getElementById('e2').style.width = "0%";
    	document.getElementById('e2').style.height = "0%";
        gotoImage(nextImage, nextCopyOutfit, image02, copy_outfitDescription02, nextSlide);
        break;
    case 3:
    	// console.log("hide: " + circle_current);
    	document.getElementById('e3').style.width = "0%";
    	document.getElementById('e3').style.height = "0%";
        gotoImage(nextImage, nextCopyOutfit, image03, copy_outfitDescription03, nextSlide);
        break;
    default:

	}
}


function gotoImage(toImage, toCopyOutfit, fromImage, fromCopyOutfit, nextSlideNum) {
	var fromImgDirection;

	switch(nextSlideNum) {
    case 1:
    	circle_current.style.left = "7px";
    	document.getElementById('e1').style.width = "100%";
    	document.getElementById('e1').style.height = "100%";
        break;
    case 2:
    	circle_current.style.left = "21px";
    	document.getElementById('e2').style.width = "100%";
    	document.getElementById('e2').style.height = "100%";
        break;
    case 3:
    	circle_current.style.left = "35px";
    	document.getElementById('e3').style.width = "100%";
    	document.getElementById('e3').style.height = "100%";
        break;
    default:

	}


	if (nextSlideNum == 1 && currentSlide == 3) {
		if (navButtonPressed=="radioButton") {
			TweenLite.to(toImage, 0, {rotationY:60, transformOrigin:"50% 50% -260px"});
			fromImgDirection = -60;
		} else {
			TweenLite.to(toImage, 0, {rotationY:-60, transformOrigin:"50% 50% -260px"});
			fromImgDirection = 60;
		}
	} else if (nextSlideNum == 3 && currentSlide == 1) {
		if (navButtonPressed=="radioButton") {
			TweenLite.to(toImage, 0, {rotationY:-60, transformOrigin:"50% 50% -260px"});
			fromImgDirection = 60;
		} else {
			TweenLite.to(toImage, 0, {rotationY:60, transformOrigin:"50% 50% -260px"});
			fromImgDirection = -60;
		}
	} else if (nextSlideNum > currentSlide) {
		TweenLite.to(toImage, 0, {rotationY:-60, transformOrigin:"50% 50% -260px"});
		fromImgDirection = 60;
	} else {
		TweenLite.to(toImage, 0, {rotationY:60, transformOrigin:"50% 50% -260px"});
		fromImgDirection = -60;
	}

	TweenLite.to(fromImage, flipTime01, {rotationY:fromImgDirection, transformOrigin:"50% 50% -260px", ease:Quad.easeInOut, onStart:setAnimateStatusTrue});
	TweenLite.to(toImage, flipTime01, {rotationY:0, transformOrigin:"50% 50% -260px", ease:Quad.easeInOut});
	TweenLite.to(copy_styldBy, 0.5, {opacity: 0});
	TweenLite.to(copy_CindyCrawford, 0.5, {opacity: 0});
	TweenLite.to(fromCopyOutfit, 0.5, {opacity: 0});

	TweenLite.to(copy_styldBy, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(copy_CindyCrawford, 0.5, {opacity: 1, delay: 0.75});
	TweenLite.to(toCopyOutfit, 0.5, {opacity: 1, delay: 0.75, onComplete:setAnimateStatusFalse});

	currentSlide = nextSlideNum;

}

function setAnimateStatusFalse() {
	inTransition = false;
}

function setAnimateStatusTrue() {
	inTransition = true;
}

function goLeftRollOver(event) {
	TweenLite.to(arrow1, 0.4, {scaleX: 0.7, scaleY: 0.7, ease:Quad.easeOut});
}

function goLeftRollOff(event) {
	TweenLite.to(arrow1, 0.4, {scaleX: 0.5, scaleY: 0.5,ease:Quad.easeOut});
}

function goRightRollOver(event) {
	TweenLite.to(arrow2, 0.4, {scaleX: 0.7, scaleY: 0.7, ease:Quad.easeOut, force3D:"auto"});
}

function goRightRollOff(event) {
	TweenLite.to(arrow2, 0.4, {scaleX: 0.5, scaleY: 0.5,ease:Quad.easeOut, force3D:"auto"});
}


function setupCTARollover() {
    container.addEventListener("mouseover", buttonRollOver, false);
    container.addEventListener("mouseout", buttonRollOff, false);
}

function buttonRollOver(event) {
   TweenLite.to(cta_over, 0.3, {opacity: 1});
}

function buttonRollOff(event) {
   TweenLite.to(cta_over, 0.3, {opacity: 0});
}

window.onload = init();
