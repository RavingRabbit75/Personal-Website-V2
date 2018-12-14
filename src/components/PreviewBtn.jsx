import React from "react";
import s from "./PreviewBtn.scss";

export default class PreviewBtn extends React.Component {
	constructor(props) {
		super(props);
	}

	btnMouseOver() {
		TweenMax.to(this.blockButtonElement, 0.75, {height: "15px", ease: Power4.easeOut});
	}

	btnMouseLeave() {
		TweenMax.to(this.blockButtonElement, 0.4, {height: "5px", ease: Power2.easeIn});
	}

	btnMouseClick() {
		this.props.moveIndicatorFunc();
	}

	render() {
		let blockButtonWrapper;
		const blockButton = s["block-button"];

		if (this.props.enabled) {
			blockButtonWrapper = s["block-button-wrapper"] + " " +  s["enable-btn"];
		} else {
			blockButtonWrapper = s["block-button-wrapper"] + " " +  s["disable-btn"];
		}
		
		return(
			<React.Fragment>
				<div id={ 'btn' + this.props.idx + '_' + this.props.projId } 
					 data-imageidx={ this.props.idx } 
					 data-projid={ this.props.projId } 
					 className={blockButtonWrapper} 
					 onMouseEnter={this.btnMouseOver.bind(this)}
					 onMouseLeave={this.btnMouseLeave.bind(this)}
					 onClick={this.btnMouseClick.bind(this)}>
					 <div className={blockButton} ref={div => this.blockButtonElement = div}></div>;
				</div>
			</React.Fragment>
		);
	}

}