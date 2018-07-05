import React from "react";
import s from "./Header.css";
import header_image_name from "./imgs/header_image_name.png";
import header_image_laptop from "./imgs/header_image_laptop.png";
import icon_mail from "./imgs/icon_mail.svg";
import icon_mail_over from "./imgs/icon_mail_over.svg";
import icon_linkedin from "./imgs/icon_linkedin.svg";
import icon_linkedin_over from "./imgs/icon_linkedin_over.svg";
import icon_github from "./imgs/icon_github.svg";
import icon_github_over from "./imgs/icon_github_over.svg";

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		}
	}

	// setupButtons () {
	// 	var profileBtn=document.getElementById("profile-btn");
	// 	var projectsBtn=document.getElementById("projects-btn");
	// 	profileBtn.addEventListener("mouseover", sectionMouseOver);
	// 	profileBtn.addEventListener("mouseout", sectionMouseOut);
	// 	projectsBtn.addEventListener("mouseover", sectionMouseOver);
	// 	projectsBtn.addEventListener("mouseout", sectionMouseOut);

	// 	$(".iconover").mouseover(function(evt){
	// 		TweenMax.to(evt.target, 0.5, {opacity:1});
	// 	});

	// 	$(".iconover").mouseout(function(evt){
	// 		TweenMax.to(evt.target, 0.25, {opacity:0});
	// 	});

	// 	function sectionMouseOver(evt) {
	// 		TweenMax.to(evt.target, 0.5, {color:"#f5b730"});
	// 	}

	// 	function sectionMouseOut(evt) {
	// 		TweenMax.to(evt.target, 0.25, {color:"#efc978"});
	// 	}
	// }

	_onClick(event){
		if (this.props.whosTurn==="myTurn"){
			if(this.props.indicator==="empty"){
				this.props.returnId(this.props.gridId);
			}
		} else if (this.props.whosTurn!=="myTurn"){
			this.props.returnId(null)
		}
	}

	// mailto:{{ baseContent.email }}
	// {{ baseContent.linkedinProfile }}
	// {{ baseContent.githubProfile }}
	// "divspan header-icon-size"
	render() {
		let headerMainBg = s["header-main-bg"];
		let currentDate = s["date-text"] + " " + s["text-center"];
		let heroImagesBox = s["hero-images-box"];
		let heroImages = s["hero-images"];
		let headerImage1 = s["header-image1"];
		let headerImage2 = s["header-image2"];

		let developerTitle = s["developer-title"] + " " + s["text-center"] + " " + s["text"];
		let dtLine = s["dt-line"];

		let icon = s.divspan + " " + s["header-icon-size"];
		let iconMiddle = s.divspan + " " + s["header-icon-size"] + " " + s.iconmiddle;
		let iconPosition = s.iconposition;
		let iconPosition_over = s.iconposition + " " + s.iconover;

		let headerIconLinks = s["header-icon-links"] + " " + s["text-center"];

		let sectionsLinks = s["sections-links"] + " " + s["text-bold"];
		let sectionLinkText = s["section-link-txt"];
		let profileBtn = s["profile-btn"] + " " + s["section-btn"];
		let projectsBtn = s["projects-btn"] + " " + s["section-btn"];
		let profileBtnIndicator = s["profile-btn-indicator"];
		let projectsBtnIndicator = s["projects-btn-indicator"];

		let headerEdge = s["header-edge"];
		let headerDropoff = s["header-dropoff"];
		
		return(
			<React.Fragment>
			{/* A JSX comment */}
				<div id="header">
					<div className={headerMainBg}>
						<div id="current-date" className={currentDate}>Sunday January 1, 2000</div>
						<div id="hero-images-box" className={heroImagesBox}>
							<div id="hero-images" className={heroImages}>
								<img id="header-image1" className={headerImage1} src={header_image_name} alt=""/>
								<img id="header-image2" className={headerImage2} src={header_image_laptop} alt=""/>
							</div>
						</div>

						<div id="developer-title" className={developerTitle}>
							<span className={dtLine}>FULL STACK WEB DEVELOPER</span>
							<span> </span>
							<span className={dtLine}>with a focus on front-end</span>
						</div>

						<div id="header-icon-links" className={headerIconLinks}>
							<a className="icon-link" href="" ><div className={icon}>
								<img className={iconPosition} src={icon_mail} alt=""/>
								<img className={iconPosition_over} src={icon_mail_over} alt=""/>
							</div></a>
							<a className="icon-link" href="" target="blank"><div className={iconMiddle}>
								<img className={iconPosition} src={icon_linkedin} alt=""/>
								<img className={iconPosition_over} src={icon_linkedin_over} alt=""/>
							</div></a>
							<a className="icon-link" href="" target="blank"><div className={icon}>
								<img className={iconPosition} src={icon_github} alt=""/>
								<img className={iconPosition_over} src={icon_github_over} alt=""/>
							</div></a>
						</div>

						<div className="text-center">
							<div id="sections-links" className={sectionsLinks}>
								<div id="profile-btn" className={profileBtn}>
									<a className={sectionLinkText} href="/profile">PROFILE</a>
									<div id="profile-btn-indicator" className={profileBtnIndicator}></div>
								</div>
								<div id="projects-btn" className={projectsBtn}>
									<a className={sectionLinkText} href="/projects">PROJECTS</a>
									<div id="projects-btn-indicator" className={projectsBtnIndicator}></div>
								</div>
							</div>
						</div>
					
					</div>
					<div id="header-edge" className={headerEdge}></div>
					<div id="header-dropoff" className={headerDropoff}></div>
				</div>
			</React.Fragment>
		);
	}
}