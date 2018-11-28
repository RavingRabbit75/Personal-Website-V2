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

	componentDidMount() {

	}

	componentDidUpdate(prevProps) {
		if (this.props.active){
			TweenMax.to(this.filterIndicatorRef, 0.6, {width:"100%", ease: Circ.easeOut});
		} else {
			TweenMax.to(this.filterIndicatorRef, 0.6, {width:"0%", ease: Power4.easeIn});
		}
	}

	filterMouseOverActive() {
		TweenMax.to(this.filterButtonRef, 0.5, {color: "#fff"});
	}

	filterMouseOutActive() {
		TweenMax.to(this.filterButtonRef, 0.25, {color: "#949494"});
	}

	filterMouseOverInactive() {
		TweenMax.to(this.filterButtonRef, 0.5, {color: "#949494"});
	}

	filterMouseOutInactive() {
		TweenMax.to(this.filterButtonRef, 0.25, {color: "#fff"});
	}


	render() {
		let buttonBox = null;
		let buttonStyles = null;
		let indicator = null;

		let mouseOverFunc = null;
		let mouseOffFunc = null;

		buttonBox = style["button-box"];

		if(this.props.active) {
			buttonStyles = style["button-text"] + " " + style["button-text-active"];
			indicator = style["indicator-active"];
			mouseOverFunc = this.filterMouseOverInactive.bind(this);
			mouseOffFunc = this.filterMouseOutInactive.bind(this);
		} else {
			buttonStyles = style["button-text"] + " " + style["button-text-inactive"];
			indicator = style["indicator-inactive"];
			mouseOverFunc = this.filterMouseOverActive.bind(this);
			mouseOffFunc = this.filterMouseOutActive.bind(this);
		}


		return(
			<div className={buttonBox}>
				<div className={buttonStyles}
					onMouseEnter={mouseOverFunc}
					onMouseLeave={mouseOffFunc}
					onClick={this.props.toggleFilterFunc}
					ref={div => this.filterButtonRef = div}>{this.props.title}</div>
				<div className={indicator}
					ref={div => this.filterIndicatorRef = div}></div>
			</div>
		);	
	}

}