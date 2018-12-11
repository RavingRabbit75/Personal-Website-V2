import React from "react";
import s from "./Project.scss";


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
				<div id={ 'btn' + this.props.idx + '_' + this.props.dataProjid } data-imageidx={ this.props.idx } dataProjid={ this.props.dataProjid } key={ this.props.idx } className={blockButtonWrapper}>
					<div className={blockButton}></div>
				</div>
			</React.Fragment>
		);
	}

}