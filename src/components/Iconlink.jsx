import React from "react";
import s from "./Iconlink.css";
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
		        icon_file = icon_mail;
		        icon_file_over = icon_mail_over;
		        break;
		    case "linkedin":
		    	icon_file = icon_linkedin;
		        icon_file_over = icon_linkedin_over;
		        break;

		    case "github":
		    	icon_file = icon_github;
		        icon_file_over = icon_github_over;
		        break;
		    default:
		        console.log("Error: icon type not given")

		}

		return (
			<React.Fragment>
				<a className="icon-link" href="" 
					onMouseEnter={this.iconMouseOver.bind(this)} 
		 			onMouseLeave={this.iconMouseOut.bind(this)}>
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