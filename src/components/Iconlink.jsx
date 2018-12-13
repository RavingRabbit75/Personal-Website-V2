import React from "react";
import s from "./Iconlink.scss";

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

		};

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
			rowPosition = s.divspan + " " + s["header-icon-size"] + " " + s["icon-left"];
		} else if (this.props.rowPosition === "right") {
			rowPosition = s.divspan + " " + s["header-icon-size"] + " " + s["icon-right"];
		} else {
			rowPosition = s.divspan + " " + s["header-icon-size"] + " " + s["icon-middle"];
		}

		let iconPosition = s.iconposition;
		let iconPosition_over = s.iconposition + " " + s.iconover;
		let icon_file = null;
		let icon_file_over = null;

		if (this.props.linkData){
			if (this.props.section === "header") {
				icon_file = "images/" + this.props.linkData.filename_header;
				icon_file_over = "images/" + this.props.linkData.filename_header_over;
			} else {
				icon_file = "images/" + this.props.linkData.filename_footer;
				icon_file_over = "images/" + this.props.linkData.filename_footer_over;
			}
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