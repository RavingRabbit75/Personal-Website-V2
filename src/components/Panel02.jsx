import React from "react";
import style from "./panel02.scss";

export default class Panel02 extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		}
	}

	render() {
		return(
			<div id={style.panel}>
				This is Panel 2
			</div>
		)
	}
}