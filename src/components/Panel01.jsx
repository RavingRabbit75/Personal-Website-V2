import React from "react";
import style from "./panel01.css";

export default class Panel01 extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		}
	}

	render() {
		return(
			<div id={style.panel}>
				<div>This is Panel 1</div>
				<div class={style.box}>
					Box 1
				</div>
				<div class={style.box}>
					Box 2
				</div>
				<div class={style.box}>
					Box 3
				</div>
			</div>
		)
	}
}