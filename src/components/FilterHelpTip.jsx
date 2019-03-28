import React from "react";
import style from "./FilterHelpTip.scss";



export default class FilterHelpTip extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};

		this.bub = this.fn.bind(this);
	}

	btnMouseOver() {
		this.popupBox.style["display"] = "block";
		document.addEventListener('mousemove', this.bub, false);
	}

	btnMouseLeave() {
		document.removeEventListener('mousemove', this.bub, false);
		this.popupBox.style["display"] = "none";
	}

	fn(e) {
		this.popupBox.style["left"] = e.offsetX - 10 + "px";
		this.popupBox.style["top"] = e.offsetY - 20 + "px";
	}


	render() {
		const container = style["container"];
		const outerBox = style["outer-box"];
		const questionMark = style["question-mark"];
		const popupBox = style["popup-box"];

		return(
			<div className={container}>
				<div className={popupBox} ref={div => this.popupBox = div}>
					Filters which projects to show. Click on filter to toggle on/off. 
				</div>
				<div className={outerBox}
					 onMouseEnter={this.btnMouseOver.bind(this)}
					 onMouseLeave={this.btnMouseLeave.bind(this)} >
					<span className={questionMark}>?</span>
				</div>
			</div>
		);
	};

}
;