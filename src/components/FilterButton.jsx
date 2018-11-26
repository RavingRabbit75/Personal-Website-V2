import React from "react";
import style from "./FilterButton.scss";


export default class FilterButton extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
	}

	render() {
		let buttonBox = null;
		let buttonStyles = null;
		let indicator = null;

		buttonBox = style["button-box"];

		if(this.props.activated) {
			buttonStyles = style["button-text-active"];
			indicator = style["indicator-active"];
		} else {
			buttonStyles = style["button-text-inactive"];
			indicator = style["indicator-inactive"];
		}
		
		return(
			<div className={buttonBox}>
				<span className={buttonStyles}>{this.props.title}</span>
				<div className={indicator}></div>
			</div>
		);
	
	}

}