import React from "react";
import style from "./FilterButton.scss";

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

export default class FilterButton extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
	}

	filterMouseOverActive() {
		TweenMax.to(this.filterButtunRef, 0.5, {color: "#fff"});
	}

	filterMouseOutActive() {
		TweenMax.to(this.filterButtunRef, 0.25, {color: "#949494"});
	}

	filterMouseOverInactive() {
		TweenMax.to(this.filterButtunRef, 0.5, {color: "#949494"});
	}

	filterMouseOutInactive() {
		TweenMax.to(this.filterButtunRef, 0.25, {color: "#fff"});
	}


	render() {
		let buttonBox = null;
		let buttonStyles = null;
		let indicator = null;

		let mouseOverFunc = null;
		let mouseOffFunc = null;

		buttonBox = style["button-box"];

		if(this.props.activated) {
			buttonStyles = style["button-text"] + " " + style["button-text-active"];
			indicator = style["button-text"] + " " + style["indicator-active"];
			mouseOverFunc = this.filterMouseOverInactive.bind(this);
			mouseOffFunc = this.filterMouseOutInactive.bind(this);
		} else {
			buttonStyles = style["button-text"] + " " + style["button-text-inactive"];
			indicator = style["button-text"] + " " + style["indicator-inactive"];
			mouseOverFunc = this.filterMouseOverActive.bind(this);
			mouseOffFunc = this.filterMouseOutActive.bind(this);
		}


		return(
			<div className={buttonBox}>
				<span className={buttonStyles}
					onMouseEnter={mouseOverFunc}
					onMouseLeave={mouseOffFunc}
					onClick={this.props.toggleFilterFunc}
					ref={span => this.filterButtunRef = span}>{this.props.title}</span>
				<div className={indicator}
					ref={div => this.filterIndicatorRef = div}></div>
			</div>
		);	
	}

}