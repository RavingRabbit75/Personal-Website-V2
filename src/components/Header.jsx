import React from "react";
import ReactDOM from "react-dom";
import s from "./Header.scss";
import DateTime from "./DateTime.jsx";
import Iconlink from "./Iconlink.jsx";
import SectionButton from "./SectionButton.jsx";
import header_image_name from "./imgs/header_image_name.png";
import header_image_laptop from "./imgs/header_image_laptop.png";
import icon_mail from "./imgs/icon_mail.svg";
import icon_mail_over from "./imgs/icon_mail_over.svg";
import icon_linkedin from "./imgs/icon_linkedin.svg";
import icon_linkedin_over from "./imgs/icon_linkedin_over.svg";
import icon_github from "./imgs/icon_github.svg";
import icon_github_over from "./imgs/icon_github_over.svg";

import { 
    TweenMax,
    TimelineMax,
    AttrPlugin,
    CSSPlugin
} from "gsap";

const activated = [
    TweenMax,
    TimelineMax,
    AttrPlugin,
    CSSPlugin
];

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
	}

	componentDidMount() {
	
	}


	confirmActiveSection(sectionToTest) {
		if (this.props.currentSection===sectionToTest) {
			return true;
		} 
		return false;
	}

	// mailto:{{ baseContent.email }}
	// {{ baseContent.linkedinProfile }}
	// {{ baseContent.githubProfile }}
	render() {
		let headerMainBg = s["header-main-bg"];
		let heroImagesBox = s["hero-images-box"];
		let heroImages = s["hero-images"];
		let headerImage1 = s["header-image1"];
		let headerImage2 = s["header-image2"];

		let developerTitle = s["developer-title"] + " " + s["text-center"] + " " + s["text"];
		let dtLine = s["dt-line"];

		let headerIconLinks = s["header-icon-links"] + " " + s["text-center"];

		let sectionsLinks = s["sections-links"] + " " + s["text-bold"];

		let headerEdge = s["header-edge"];
		let headerDropoff = s["header-dropoff"];

		return(
			<React.Fragment>
			{/* A JSX comment */}
				<div id="header">
					<div className={headerMainBg}>
						<DateTime />
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
							<Iconlink section="header" rowPosition="left" type="mail" url=""/>
							<Iconlink section="header" rowPosition="middle" type="linkedin" url=""/>
							<Iconlink section="header" rowPosition="right" type="github" url=""/>
						</div>

						<div className="text-center">
							<div id="sections-links" className={sectionsLinks}>
								<SectionButton 
									section="profile" 
									text="PROFILE" 
									active={this.confirmActiveSection("profile")}
									setSectionFunc={this.props.setSectionFunc1}
								/>
								<SectionButton 
									section="projects" 
									text="PROJECTS" 
									active={this.confirmActiveSection("projects")}
									setSectionFunc={this.props.setSectionFunc2}
								/>
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