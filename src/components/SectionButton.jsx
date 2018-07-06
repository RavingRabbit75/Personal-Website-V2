import React from "react";
import s from "./SectionButton.css";

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
			
		}
	}

	componentDidMount() {
		if (this.props.active===true) {
			TweenMax.to(this.btnIndicator, 1.0, {width:"100%", ease: Power4.easeOut, delay: 1});
		}
	}

	sectionMouseOver() {
		TweenMax.to(this.sectionBtn, 0.5, {color: "#f5b730"});
	}

	sectionMouseOut() {
		TweenMax.to(this.sectionBtn, 0.25, {color: "#efc978"});
	}

	render() {
		let sectionLinkText = s["section-link-text"];

		let btnClasses = null;
		let btnIndicatorClasses = null;

		let href=null;

		if (this.props.section==="profile") {
			btnClasses = s["profile-btn"] + " " + s["section-btn"];
			btnIndicatorClasses = s["profile-btn-indicator"];
			href = "/profile";
		} else if (this.props.section==="projects") {
			btnClasses = s["projects-btn"] + " " + s["section-btn"];
			btnIndicatorClasses = s["projects-btn-indicator"];
			href = "/projects";
		} else {
			console.log("Section does not exist")
		}
		
		return(
			<React.Fragment>
				<div id="" className={btnClasses}>
					<div className={sectionLinkText} href={href}
						onMouseEnter={this.sectionMouseOver.bind(this)} 
		 				onMouseLeave={this.sectionMouseOut.bind(this)}
		 				ref={div => this.sectionBtn = div}>
		 				{this.props.text}
					</div>
					<div id="" className={btnIndicatorClasses} ref={div => this.btnIndicator = div}></div>
				</div>
			</React.Fragment>
		);
	}
}