import React from "react";
import s from "./Iconlink.scss";
import icon_mail from "./imgs/icon_mail.svg";
import icon_mail_over from "./imgs/icon_mail_over.svg";
import icon_linkedin from "./imgs/icon_linkedin.svg";
import icon_linkedin_over from "./imgs/icon_linkedin_over.svg";
import icon_github from "./imgs/icon_github.svg";
import icon_github_over from "./imgs/icon_github_over.svg";
import iconFooter_mail from "./imgs/iconFooter_mail.svg";
import iconFooter_mail_over from "./imgs/iconFooter_mail_over.svg";
import iconFooter_linkedin from "./imgs/iconFooter_linkedin.svg";
import iconFooter_linkedin_over from "./imgs/iconFooter_linkedin_over.svg";
import iconFooter_github from "./imgs/iconFooter_github.svg";
import iconFooter_github_over from "./imgs/iconFooter_github_over.svg";

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

export default class Iconlink extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		}

	}

	componentDidMount() {

	}

	iconMouseOver() {
		TweenMax.to(this.iconOver, 0.75, {opacity: 1});
	}

	iconMouseOut() {
		TweenMax.to(this.iconOver, 0.5, {opacity: 0});
	}

	render() {
		let rowPosition = null;

		if (this.props.rowPosition === "left") {
			rowPosition = s.divspan + " " + s["header-icon-size"] + " " + s["icon-left"]
		} else if (this.props.rowPosition === "right") {
			rowPosition = s.divspan + " " + s["header-icon-size"] + " " + s["icon-right"]
		} else {
			rowPosition = s.divspan + " " + s["header-icon-size"] + " " + s["icon-middle"]
		}

		let iconPosition = s.iconposition;
		let iconPosition_over = s.iconposition + " " + s.iconover;
		let icon_file = null;
		let icon_file_over = null;

		switch(this.props.type) {
		    case "mail":
		    	if (this.props.section==="header") {
		    		icon_file = icon_mail;
		        	icon_file_over = icon_mail_over;
		    	} else {
		    		icon_file = iconFooter_mail;
		    		icon_file_over = iconFooter_mail_over;
		    	}
		        break;

		    case "linkedin":
		    	if (this.props.section==="header") {
			    	icon_file = icon_linkedin;
			        icon_file_over = icon_linkedin_over;
			    } else {
			    	icon_file = iconFooter_linkedin;
		    		icon_file_over = iconFooter_linkedin_over;
			    }
		        break;

		    case "github":
		    	if (this.props.section==="header") {
		    		icon_file = icon_github;
		        	icon_file_over = icon_github_over;
		        } else {
		        	icon_file = iconFooter_github;
		        	icon_file_over = iconFooter_github_over;
		        }
		        break;

		    default:
		        console.log("Error: icon type not given")

		}

		return (
			<React.Fragment>
				<a className="icon-link" href={this.props.url}
					onMouseEnter={this.iconMouseOver.bind(this)} 
		 			onMouseLeave={this.iconMouseOut.bind(this)} >
					<div className={rowPosition}>
						<img className={iconPosition} src={icon_file} alt=""/>
						<img className={iconPosition_over} src={icon_file_over} alt="" 
							ref={div => this.iconOver = div}/>
					</div>
				</a>
			</React.Fragment>
		);
	}
}