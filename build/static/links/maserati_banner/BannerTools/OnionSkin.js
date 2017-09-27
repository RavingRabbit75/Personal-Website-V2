
var OnionSkin = (function() {
	var onionContainer;
	var onionSkinsArray = [];
	var lastVisibleOpacityLevel;

	var consoleWindow = document.getElementById("consoleWindow");
	var onionSkinPanel = document.createElement("div");
    onionSkinPanel.style.position = "relative";
	onionSkinPanel.style.paddingTop = "3px";
	onionSkinPanel.style.paddingLeft = "3px";
	onionSkinPanel.style.margin = "0px";
    onionSkinPanel.style.boxSizing = "border-box";
	onionSkinPanel.style.borderBottom = "1px solid #666666";
    onionSkinPanel.style.right = "0px";
    onionSkinPanel.style.width = "200px";
    onionSkinPanel.style.height = "100px";
    onionSkinPanel.style.background = "#dddddd";
    consoleWindow.appendChild(onionSkinPanel);

	var title = document.createElement("div");
	title.style.fontFamily = "sans-serif";
	title.style.position = "relative";
	title.style.fontSize = "12px";
	title.style.paddingBottom = "5px";
	title.innerHTML = "Onion Skin";
	onionSkinPanel.appendChild(title);

	// set up html empty onion layer
	(function () {
		onionContainer = document.getElementById("container");
		var node = document.createElement("div");
		node.style.position = "absolute";
	    node.style.left = "0px";
	    node.style.top = "0px";
	    node.style.width = "300px";
	    node.style.height = "600px";
	    node.setAttribute("id", "onionLayer");
	    onionContainer.appendChild(node);
	    onionContainer.style.zIndex = 999999;
	})();

	var pathInputField = document.createElement("INPUT");
	pathInputField.setAttribute("type", "text");
	pathInputField.setAttribute("size", "25");
	pathInputField.setAttribute("id", "onionPath");
	onionSkinPanel.appendChild(pathInputField);

	var opacitySlider = document.createElement("INPUT");
	opacitySlider.setAttribute("type", "range");
	opacitySlider.setAttribute("min", "0");
	opacitySlider.setAttribute("max", "100");
	opacitySlider.setAttribute("id", "opacitySlider");
	opacitySlider.style.width = "170px";
	onionSkinPanel.appendChild(opacitySlider);

	opacitySlider.addEventListener("input", sliderChanged);
	opacitySlider.addEventListener("change", sliderReleased);
	function sliderChanged(event) {
		var opacityLevel = opacitySlider.value/100;
		setOnionOpacity(opacityLevel);
    }
	function sliderReleased(event) {
		var opacityLevel = opacitySlider.value;
		sessionStorage.setItem("opacityLevel", opacityLevel);
		lastVisibleOpacityLevel = opacitySlider.value;
		sessionStorage.setItem("lastVisibleOpacityLevel", lastVisibleOpacityLevel);
    }

	var buttonShow = document.createElement("button");
    var buttonHide = document.createElement("button");

    buttonShow.id = "button01";
    buttonShow.innerHTML = "Show";
    buttonHide.id = "button01";
    buttonHide.innerHTML = "Hide";
    onionSkinPanel.appendChild(buttonShow);
    onionSkinPanel.appendChild(buttonHide);

    buttonShow.addEventListener("click", buttonShowClick);
	buttonHide.addEventListener("click", buttonHideClick);

    function buttonShowClick(event) {
		var onionPath = document.getElementById("onionPath").value;
        setOnionSkin(onionPath);
		if (lastVisibleOpacityLevel == null) {
			opacitySlider.value = 100;
			setOnionOpacity(1.0);
		} else {
			opacitySlider.value = lastVisibleOpacityLevel;
			setOnionOpacity(lastVisibleOpacityLevel/100);
		}

		sessionStorage.setItem("opacityLevel", opacitySlider.value);

    }
    function buttonHideClick(event) {
		if (opacitySlider.value > 0) {
			lastVisibleOpacityLevel = opacitySlider.value;
			sessionStorage.setItem("lastVisibleOpacityLevel", lastVisibleOpacityLevel);
		}
		opacitySlider.value = 0;
		setOnionOpacity(0);
		sessionStorage.setItem("opacityLevel", 0);
    }


	var setOnionSkin = function (path) {
		document.getElementById("onionLayer").style.backgroundImage = "url("+path+")";
		sessionStorage.setItem("lastOnionSkinPath", path);
	};

	var setOnionOpacity = function (opacityLevel) {
		document.getElementById("onionLayer").style.opacity = opacityLevel;

	};

	// load session storage variables and set inital settings
	(function () {
		var lastSkinPath = sessionStorage.getItem("lastOnionSkinPath");
		if (lastSkinPath !== "" && lastSkinPath !== null) {
			pathInputField.value = lastSkinPath;
			setOnionSkin(lastSkinPath);
		}

		var opacityLevel = sessionStorage.getItem("opacityLevel");
		opacitySlider.value = opacityLevel;
		document.getElementById("onionLayer").style.opacity = opacityLevel/100;

		lastVisibleOpacityLevel = sessionStorage.getItem("lastVisibleOpacityLevel");
	})();


	function changeToVerticalLayout() {
		onionSkinPanel.style.position = "relative";
		onionSkinPanel.style.paddingTop = "3px";
		onionSkinPanel.style.paddingLeft = "3px";
		onionSkinPanel.style.margin = "0px";
	    onionSkinPanel.style.boxSizing = "border-box";
		onionSkinPanel.style.border = "none";
		onionSkinPanel.style.borderBottom = "1px solid #666666";
	    onionSkinPanel.style.right = "0px";
	    onionSkinPanel.style.width = "200px";
	    onionSkinPanel.style.height = "100px";
	    onionSkinPanel.style.background = "#dddddd";
		onionSkinPanel.style.verticalAlign = "none";
	}

	function changeToHorizontalLayout() {
		onionSkinPanel.style.display = "inline-block";

		onionSkinPanel.style.position = "relative";
		onionSkinPanel.style.paddingTop = "3px";
		onionSkinPanel.style.paddingLeft = "3px";
		onionSkinPanel.style.margin = "0px";
		onionSkinPanel.style.verticalAlign = "top";
	    onionSkinPanel.style.boxSizing = "border-box";
		onionSkinPanel.style.borderBottom = "none";
		onionSkinPanel.style.borderRight = "1px solid #666666";
	    onionSkinPanel.style.right = "auto";
		onionSkinPanel.style.top = "auto";
	    onionSkinPanel.style.width = "200px";
	    onionSkinPanel.style.height = "200px";
	    onionSkinPanel.style.background = "#dddddd";

		console.log("Onion Horizontal!");
	}

	return {
		verticalLayout: changeToVerticalLayout,
		horizontalLayout: changeToHorizontalLayout
	};

})();
