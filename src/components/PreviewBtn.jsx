import React from "react";
import s from "./PreviewBtn.scss";

export default class PreviewBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
	}


	render() {
		const blockButtonWrapper = s["block-button-wrapper"];
		const blockButton = s["block-button"];

		return(
			<React.Fragment>
				<div id={ 'btn' + this.props.idx + '_' + this.props.projId } data-imageidx={ this.props.idx } data-projid={ this.props.projId } className={blockButtonWrapper}>
					<div className={blockButton}></div>
				</div>
			</React.Fragment>
		);
	}

}