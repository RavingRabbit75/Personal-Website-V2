import React from "react";
import s from "./PreviewBtn.scss";

export default class PreviewBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
	}

	btnMouseOver(evt) {
		TweenMax.to(this.blockButtonElement, 0.75, {height: "15px", ease: Power4.easeOut});
	}

	btnMouseLeave(evt) {
		TweenMax.to(this.blockButtonElement, 0.4, {height: "5px", ease: Power2.easeIn});
	}

	render() {
		const blockButtonWrapper = s["block-button-wrapper"];
		const blockButton = s["block-button"];
		
		return(
			<React.Fragment>
				<div id={ 'btn' + this.props.idx + '_' + this.props.projId } 
					 data-imageidx={ this.props.idx } 
					 data-projid={ this.props.projId } 
					 className={blockButtonWrapper} 
					 onMouseEnter={this.btnMouseOver.bind(this)}
					 onMouseLeave={this.btnMouseLeave.bind(this)}
					 onClick={this.props.moveIndicatorFunc}>
					 <div className={blockButton} ref={div => this.blockButtonElement = div}></div>;
				</div>
			</React.Fragment>
		);
	}

}