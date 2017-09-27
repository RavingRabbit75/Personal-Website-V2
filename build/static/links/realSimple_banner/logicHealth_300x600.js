// set boolean for dev or deployment status on DC servers
var finalDeployment = false;

var container = document.getElementById("container");

// frame groups
var frame1Group = document.getElementById("frame1Group");
var frame2Group = document.getElementById("frame2Group");
var frame3Group = document.getElementById("frame3Group");
var frame4Group = document.getElementById("frame4Group");

// bottom bars
var bottomTextBar = document.getElementById("bottomTextBar");
var bottomTextBar_bg = document.getElementById("bottomTextBar_bg");
var promotionCopy = document.getElementById("promotionCopy");
var smallLogo = document.getElementById("smallLogo");
var bottomBar = document.getElementById("bottomBar");

// frame 1 objects
var mainSubHeading1 = document.getElementById("mainSubHeading1");
var mainSubHeading2 = document.getElementById("mainSubHeading2");
var RealSimpleLogo_lg = document.getElementById("RealSimpleLogo_lg");
var initialBackground = document.getElementById("initialBackground");
var frame1RadialShadow = document.getElementById("frame1RadialShadow");

// frames 2, 3, 4 objects
var copyLine_1 = document.getElementById("copyLine_1");
var copyLine_2 = document.getElementById("copyLine_2");
var copyLine_3 = document.getElementById("copyLine_3");
var image01BG = document.getElementById("image01BG");
var image02BG = document.getElementById("image02BG");
var image03BG = document.getElementById("image03BG");
var frame4RadialShadow = document.getElementById("frame4RadialShadow");
var magazineCover = document.getElementById("magazineCover");
var cta = document.getElementById("cta");
var ctaCopy = document.getElementById("ctaCopy");


// folder paths and asset variables
var f01 = "Assets/";
var f02 = "SharedAssets_300x600/";
var f03 = "Health_300x600/";

var a01 = "RealSimple_Logo_300x600.png";
var a02 = "RealSimple_sm_300x600.png";
var a03 = "frame1RadialShadow_300x600.png";
var a04 = "endFrameRadialShadow_300x600.png";
var a05 = "health_bgImage_1_300x600.jpg";
var a06 = "health_bgImage_2_300x600.jpg";
var a07 = "health_bgImage_3_300x600.jpg";
var a08 = "RS_magCover_Jan2016_300x600.jpg";

var dl01 = "https://s0.2mdn.net/ads/richmedia/studio/40377907/food_bgImage_1_300x600.jpg";
var dl02 = "https://s0.2mdn.net/ads/richmedia/studio/40377907/food_bgImage_2_300x600.jpg";
var dl03 = "https://s0.2mdn.net/ads/richmedia/studio/40377907/food_bgImage_3_300x600.jpg";
var dl04 = "https://s0.2mdn.net/ads/richmedia/studio/40377907/RS_magCover_Jan2016_300x600.jpg";

var image01BG_url;
var image02BG_url;
var image03BG_url;
var magazineCover_url;
var frame1RadialShadow_url;
var endFrameRadialShadow_url;
var realSimpleLogo_lg_url;
var realsimple_sm_url

if (finalDeployment) {
    console.log("final deployment");
    image01BG_url = dl01;
    image02BG_url = dl02;
    image03BG_url = dl03;
    magazineCover_url = dl04;
    frame1RadialShadow_url = a03;
    endFrameRadialShadow_url = a04;
    realSimpleLogo_lg_url = a01;
    realsimple_sm_url = a02;
} else {
    console.log("development deployment");
    image01BG_url = f01 + f03 + a05;
    image02BG_url = f01 + f03 + a06;
    image03BG_url = f01 + f03 + a07;
    magazineCover_url = f01 + f02 + a08;
    frame1RadialShadow_url = f01 + f02 + a03;
    endFrameRadialShadow_url = f01 + f02 + a04;
    realSimpleLogo_lg_url = f01 + f02 + a01;
    realsimple_sm_url = f01 + f02 + a02;
}

function enablerInitHandler() {
    // Start ad, initialize animation,
    // load in your image assets, call Enabler methods,
    // and/or include other Studio modules.

    defineDevContent();

    function bgExitHandler(e) {
        Enabler.exit('Background Exit');
    }

}

function defineDevContent() {
    // Dynamic Content variables and sample values
    Enabler.setProfileId(1065189);
    var devDynamicContent = {};

    devDynamicContent.Time_RealSimple_Feed_Page1= [{}];
    devDynamicContent.Time_RealSimple_Feed_Page1[0]._id = 0;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].Unique_ID = 3;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].Reporting_Label = "RealSimple_Food_300x600";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].Ad_ID = "";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].Placement_ID = "";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].forRetail = false;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].Category_Grouping = "Food";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].bottomBar_color = "#ee4e73";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].bottomTextBar_bgColor = "#ee4e73";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].promotionCopy = "$1 AN ISSUE";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].f1_BgColor = "#ee4e73";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].mainSubHeading1 = "Healthy Living Inspiration";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].mainSubHeading1_color = "#ffffff";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].mainSubHeading2 = "from";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].copyLine_1 = "3 (Delicious) Natural Remedies for Your Whole Body";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image01BG = {};
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image01BG.Type = "file";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image01BG.Url = image01BG_url;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].copyLine_2 = "Busting 10 Diet Myths";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image02BG = {};
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image02BG.Type = "file";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image02BG.Url = image02BG_url;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].copyLine_3 = "Stay healthy this <br />winter with ideas from Real Simple";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image03BG = {};
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image03BG.Type = "file";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].image03BG.Url = image03BG_url;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].magazineCover = {};
    devDynamicContent.Time_RealSimple_Feed_Page1[0].magazineCover.Type = "file";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].magazineCover.Url = magazineCover_url;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].ctaCopy = "SUBSCRIBE & SAVE";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].cta_bgColor = "#ee4e73";
    devDynamicContent.Time_RealSimple_Feed_Page1[0].isDefault = false;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].isActive = false;
    devDynamicContent.Time_RealSimple_Feed_Page1[0].Exit_URL = {};
    devDynamicContent.Time_RealSimple_Feed_Page1[0].Exit_URL.Url = "http://www.realsimple.com/";
    Enabler.setDevDynamicContent(devDynamicContent);

    waitForInitFrameLoad();
}


function waitForInitFrameLoad(){

    container.addEventListener("click", bannerExitHandler, false);
    function bannerExitHandler() {
        Enabler.exitOverride("general banner exit", dynamicContent.Time_RealSimple_Feed_Page1[0].Exit_URL.Url);
    }

    // load initial frame load:

    initialBackground.style.backgroundColor = dynamicContent.Time_RealSimple_Feed_Page1[0].f1_BgColor;
    frame1RadialShadow.style.backgroundImage = "url('" + frame1RadialShadow_url + "')";
    bottomBar.style.backgroundColor = dynamicContent.Time_RealSimple_Feed_Page1[0].bottomBar_color;
    bottomTextBar_bg.style.backgroundColor = dynamicContent.Time_RealSimple_Feed_Page1[0].bottomTextBar_bgColor;
    RealSimpleLogo_lg.style.backgroundImage = "url('" + realSimpleLogo_lg_url + "')";
    document.getElementById("mainSubHeading1").innerHTML = dynamicContent.Time_RealSimple_Feed_Page1[0].mainSubHeading1;
    mainSubHeading1.style.color = dynamicContent.Time_RealSimple_Feed_Page1[0].mainSubHeading1_color;
    document.getElementById("mainSubHeading2").innerHTML = dynamicContent.Time_RealSimple_Feed_Page1[0].mainSubHeading2;

    var imgs = [frame1RadialShadow_url,
                realSimpleLogo_lg_url];
    var loaded = 0;
    for(var i = 0; i < imgs.length; i++) {
        var img = new Image();
        img.onload = function(){
            if(++loaded === imgs.length) {
                playInitFrame();
            }
        }
        img.src = imgs[i];
    }
}


function playInitFrame() {
    TweenLite.from(mainSubHeading1, 0.5, {y:"30", ease:Quad.easeOut});
    TweenLite.to(mainSubHeading1, 0.5, {opacity:1});

    TweenLite.from(mainSubHeading2, 0.5, {y:"30", ease:Quad.easeOut, delay:0.4});
    TweenLite.to(mainSubHeading2, 0.5, {opacity:0.6, delay:0.4});
    TweenLite.to(RealSimpleLogo_lg, 0.5, {opacity:1, ease:Quad.easeInOut, delay:0.8, onComplete:politeInit});
}

function politeInit(){
    //load rest of banner here:

    // load frame 1,2,3,4 data:
    document.getElementById("copyLine_1").innerHTML = dynamicContent.Time_RealSimple_Feed_Page1[0].copyLine_1;
    image01BG.style.backgroundImage = "url("+dynamicContent.Time_RealSimple_Feed_Page1[0].image01BG.Url+")";
    document.getElementById("copyLine_2").innerHTML = dynamicContent.Time_RealSimple_Feed_Page1[0].copyLine_2;
    image02BG.style.backgroundImage = "url("+dynamicContent.Time_RealSimple_Feed_Page1[0].image02BG.Url+")";
    document.getElementById("copyLine_3").innerHTML = dynamicContent.Time_RealSimple_Feed_Page1[0].copyLine_3;
    image03BG.style.backgroundImage = "url("+dynamicContent.Time_RealSimple_Feed_Page1[0].image03BG.Url+")";
    magazineCover.style.backgroundImage = "url("+dynamicContent.Time_RealSimple_Feed_Page1[0].magazineCover.Url+")";

    document.getElementById("promotionCopy").innerHTML = dynamicContent.Time_RealSimple_Feed_Page1[0].promotionCopy;
    smallLogo.style.backgroundImage = "url('" + realsimple_sm_url + "')";
    frame4RadialShadow.style.backgroundImage = "url('" + endFrameRadialShadow_url + "')";
    document.getElementById("ctaCopy").innerHTML = dynamicContent.Time_RealSimple_Feed_Page1[0].ctaCopy;

    var imgs = [realsimple_sm_url,
                endFrameRadialShadow_url,
                dynamicContent.Time_RealSimple_Feed_Page1[0].image01BG.Url,
                dynamicContent.Time_RealSimple_Feed_Page1[0].image02BG.Url,
                dynamicContent.Time_RealSimple_Feed_Page1[0].image03BG.Url];
    var loaded = 0;
    for(var i = 0; i < imgs.length; i++) {
        var img = new Image();
        img.onload = function(){
            if(++loaded === imgs.length) {
                checkVisibility();
            }
        }
        img.src = imgs[i];
    }

}

function checkVisibility() {
    // check to see if banner is visible, if true then start animation
    if (Enabler.isVisible()) {
        init();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, init);
    }
}

function init() {

    // set cta Y location - based on height of copy
    var textHeight = window.getComputedStyle(copyLine_3,null).getPropertyValue("height");
    var bufferSpace = 14;
    var copyLineYLoc = window.getComputedStyle(copyLine_3,null).getPropertyValue("top");
    cta.style.top = parseInt(textHeight, 10) + parseInt(copyLineYLoc, 10) + bufferSpace + "px";

    // set magazine Y location - based on cta location
    var bufferSpace2 = -19;
    var ctaYLoc = window.getComputedStyle(cta,null).getPropertyValue("top");
    magazineCover.style.top = parseInt(ctaYLoc, 10) + bufferSpace2 + "px";

    // set CTA width based on CTA text
    var ctaBufferSpace = 22; // 11 pixels for each side
    var ctaCopyLength = window.getComputedStyle(ctaCopy,null).getPropertyValue("width");
    cta.style.width = parseInt(ctaCopyLength, 10) + ctaBufferSpace + "px";

    cta.style.backgroundColor = dynamicContent.Time_RealSimple_Feed_Page1[0].cta_bgColor;
    frame2Group.style.opacity = 1;
    TweenLite.set(frame2Group, {x:300});
    TweenLite.set(bottomTextBar,{opacity:1.0, x:300});

    TweenLite.delayedCall(0.0, playAnim01);

}


function playAnim01() {
    TweenLite.to(frame1Group, 1.01, {x:-300, ease:Quad.easeInOut});
    TweenLite.to(frame2Group, 1, {x:0, ease:Quad.easeInOut});
    TweenLite.to(bottomTextBar, 1, {x:0, ease:Quad.easeInOut});

    TweenLite.delayedCall(3.0, playAnim02);

    frame3Group.style.opacity = 1;
    frame4Group.style.opacity = 2;
    TweenLite.set(frame3Group, {x:300, y:0, scaleX:0.5, scaleY:0.5, transformOrigin: "0% 0%"});
    TweenLite.set(frame4Group, {x:300, y:300, scaleX:0.5, scaleY:0.5, transformOrigin: "0% 0%"});
}

function playAnim02() {
    TweenLite.to(frame2Group, 1.56, {x:-300, scaleX:2.0, scaleY:2.0, transformOrigin: "100% 0%", ease:Quad.easeInOut});
    TweenLite.to(frame3Group, 1.5, {x:0, scaleX:1.0, scaleY:1.0, ease:Quad.easeInOut});
    TweenLite.to(frame4Group, 1.5, {x:0, y:600, scaleX:1.0, scaleY:1.0, ease:Quad.easeInOut});

    TweenLite.delayedCall(3.5, playAnim03);
}

function playAnim03() {
    TweenLite.set(magazineCover, {opacity:1, x:50, y:125, rotationZ:30});

    TweenLite.to(frame3Group, 1.51, {y:-600, ease:Quad.easeInOut});
    TweenLite.to(frame4Group, 1.5, {y:0, ease:Quad.easeInOut});
    TweenLite.to(magazineCover, 1.5, {rotationZ:-8, ease:Quad.easeInOut});
    TweenLite.to(magazineCover, 1.5, {x:-110, y:67, ease:Quad.easeInOut});

    setUpCTA();
}

function setUpCTA() {
    container.addEventListener("mouseover", bannerRollOver,false);
    container.addEventListener("mouseout", bannerRollOff, false);
}

function bannerRollOver(event) {
    TweenLite.to(cta, 0.7, {backgroundColor:"#FFFFFF"});
    TweenLite.to(ctaCopy, 0.4, {color:dynamicContent.Time_RealSimple_Feed_Page1[0].cta_bgColor});
}

function bannerRollOff(event) {
    TweenLite.to(cta, 0.4, {backgroundColor:dynamicContent.Time_RealSimple_Feed_Page1[0].cta_bgColor});
    TweenLite.to(ctaCopy, 0.2, {color:"#FFFFFF"});
}


window.onload = function() {
    if (Enabler.isInitialized()) {
        enablerInitHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT,enablerInitHandler);
    }
}
