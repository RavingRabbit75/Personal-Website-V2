import React from "react";
import ReactDOM from "react-dom";
import s from "./Header.scss";
import DateTime from "./DateTime.jsx";
import Iconlink from "./Iconlink.jsx";
import SectionButton from "./SectionButton.jsx";
import header_image_name from "./images/header_image_name.png";
import header_image_laptop from "./images/header_image_laptop.png";

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

	renderIconLinks() {
		let iconLinks;
		if (this.props.globalinfo.global_icons){
			iconLinks = this.props.globalinfo.global_icons.map( (icon, idx, arr)=> {
				let rowPosition;
				if(idx === 0) {
					rowPosition = "left";
				} else if (idx === arr.length-1) {
					rowPosition = "right";
				} else {
					rowPosition = "middle";
				}
				return <Iconlink key={idx} section="header" rowPosition={rowPosition} url={icon.link} linkData={icon}/>;
			});
		}
		
		return iconLinks;
	}

	renderDeveloperTitle() {
		let dtLine = s["dt-line"];
		let developerTitle;
		if (this.props.globalinfo.global_description){
			developerTitle=
			<React.Fragment>
				<span className={dtLine}>{this.props.globalinfo.global_description[0].desc1}</span>
				<span> </span>
				<span className={dtLine}>{this.props.globalinfo.global_description[0].desc2}</span>
			</React.Fragment>;
		}

		return developerTitle;
	}

	render() {
		let headerMainBg = s["header-main-bg"];
		let heroImagesBox = s["hero-images-box"];
		let heroImages = s["hero-images"];
		let headerImage1 = s["header-image1"];
		let headerImage2 = s["header-image2"];

		let developerTitle = s["developer-title"] + " " + s["text-center"] + " " + s["text"];

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
							{this.renderDeveloperTitle()}
						</div>

						<div id="header-icon-links" className={headerIconLinks}>
							{this.renderIconLinks()}
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