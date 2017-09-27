
var BannerTools = (function() {

	var body = (function () {
        var tempNode = document.getElementsByTagName("body");
        return tempNode[0];
    })();
	var consoleWindow = document.createElement("div");
	consoleWindow.id = "consoleWindow";

    consoleWindow.style.position = "absolute";
    consoleWindow.style.borderLeft = "1px solid #666666";
	consoleWindow.style.padding = "0px";
	consoleWindow.style.margin= "0px";
    consoleWindow.style.right = "0px";
    consoleWindow.style.top = "0px";
    consoleWindow.style.width = "auto";
    consoleWindow.style.height = "100%";
    consoleWindow.style.background = "#eeeeee";
    consoleWindow.style.overflowY = "auto";
	consoleWindow.style.overflowX = "hidden";
    body.insertBefore(consoleWindow, document.getElementById(""));

	var bannerToolsPanel = document.createElement("div");
    bannerToolsPanel.style.position = "relative";
    bannerToolsPanel.style.boxSizing = "border-box";
	bannerToolsPanel.style.paddingTop = "3px";
	bannerToolsPanel.style.paddingLeft = "3px";
	bannerToolsPanel.style.margin = "0px";
	bannerToolsPanel.style.borderBottom = "1px solid #666666";
    bannerToolsPanel.style.width = "200px";
    bannerToolsPanel.style.height = "100px";
    bannerToolsPanel.style.background = "#dddddd";
    consoleWindow.insertBefore(bannerToolsPanel, document.getElementById(""));

	var title = document.createElement("div");
	title.style.fontFamily = "sans-serif";
	title.style.position = "relative";
	title.style.fontSize = "14px";
	title.style.paddingBottom = "5px";
	title.innerHTML = "Banner Tools v0.1";
	bannerToolsPanel.appendChild(title);

    var moveConsoleBottomBtn = document.createElement("button");
    moveConsoleBottomBtn.id = "bottomButton";
    moveConsoleBottomBtn.innerHTML = "Bottom";
    bannerToolsPanel.appendChild(moveConsoleBottomBtn);

	var moveConsoleRightBtn = document.createElement("button");
    moveConsoleRightBtn.id = "rightButton";
    moveConsoleRightBtn.innerHTML = "Right";
    bannerToolsPanel.appendChild(moveConsoleRightBtn);

	var minimizeBtn = document.createElement("button");
    minimizeBtn.id = "minimizeButton";
    minimizeBtn.innerHTML = "Minimize";
    bannerToolsPanel.appendChild(minimizeBtn);

	minimizeBtn.addEventListener("click", minimizeBannerTools);
	moveConsoleBottomBtn.addEventListener("click", moveConsoleToBottom);
	moveConsoleRightBtn.addEventListener("click", moveConsoleToRight);

	function moveConsoleToBottom(event) {

		consoleWindow.style.position = "absolute";

		consoleWindow.style.border = "none";
	    consoleWindow.style.borderTop = "1px solid #666666";
		consoleWindow.style.padding = "0px";
		consoleWindow.style.margin= "0px";
	    consoleWindow.style.bottom = "0px";
		consoleWindow.style.top = "auto";
	    consoleWindow.style.left = "0px";
	    consoleWindow.style.width = "100%";
	    consoleWindow.style.height = "200px";
	    consoleWindow.style.background = "#eeeeee";
	    consoleWindow.style.overflowY = "hidden";
		consoleWindow.style.overflowX = "auto";

		bannerToolsPanel.style.position = "relative";
	    bannerToolsPanel.style.boxSizing = "border-box";
		bannerToolsPanel.style.display = "inline-block";
		bannerToolsPanel.style.verticalAlign = "top";
		bannerToolsPanel.style.paddingTop = "3px";
		bannerToolsPanel.style.paddingLeft = "3px";
		bannerToolsPanel.style.margin = "0px";
		bannerToolsPanel.style.border = "none";
		bannerToolsPanel.style.borderRight = "1px solid #666666";
	    bannerToolsPanel.style.width = "200px";
		bannerToolsPanel.style.maxHeight = "200px";
	    bannerToolsPanel.style.height = "200px";
	    bannerToolsPanel.style.background = "#dddddd";

		OnionSkin.horizontalLayout();
	}

	function moveConsoleToRight(event) {

		consoleWindow.style.position = "absolute";
	    consoleWindow.style.borderLeft = "1px solid #666666";
		consoleWindow.style.borderTop = "none";
		consoleWindow.style.padding = "0px";
		consoleWindow.style.margin= "0px";
		consoleWindow.style.left = "auto";
	    consoleWindow.style.right = "0px";
	    consoleWindow.style.top = "0px";
	    consoleWindow.style.width = "auto";
	    consoleWindow.style.height = "100%";
	    consoleWindow.style.background = "#eeeeee";
	    consoleWindow.style.overflowY = "auto";
		consoleWindow.style.overflowX = "hidden";

		bannerToolsPanel.style.position = "relative";
	    bannerToolsPanel.style.boxSizing = "border-box";
		bannerToolsPanel.style.paddingTop = "3px";
		bannerToolsPanel.style.paddingLeft = "3px";
		bannerToolsPanel.style.margin = "0px";
		bannerToolsPanel.style.borderBottom = "1px solid #666666";
	    bannerToolsPanel.style.width = "200px";
	    bannerToolsPanel.style.height = "100px";
	    bannerToolsPanel.style.background = "#dddddd";


		bannerToolsPanel.style.display = "block";
		bannerToolsPanel.style.verticalAlign = "top";


		bannerToolsPanel.style.borderRight = "none";
		bannerToolsPanel.style.width = "200px";
		bannerToolsPanel.style.maxHeight = "200px";



		OnionSkin.verticalLayout();
	}

	function minimizeBannerTools(event) {
		consoleWindow.style.display = "none";

		var tinyWindow = document.createElement("div");
		tinyWindow.id = "consoleWindow";
		tinyWindow.style.position = "absolute";
		tinyWindow.style.padding = "0px";
		tinyWindow.style.margin= "0px";
	    tinyWindow.style.right = "0px";
	    tinyWindow.style.top = "0px";
	    tinyWindow.style.width = "auto";
	    tinyWindow.style.height = "auto";
	    body.insertBefore(tinyWindow, document.getElementById(""));

		var openToolsBtn = document.createElement("button");
	    openToolsBtn.id = "openBannerToolsButton";
	    openToolsBtn.innerHTML = " ";
	    tinyWindow.appendChild(openToolsBtn);

		openToolsBtn.addEventListener("click", maximizeBannerTools);

		function maximizeBannerTools(event) {
			consoleWindow.style.display = "initial";
			tinyWindow.style.display = "none";
		}
	}


})();
