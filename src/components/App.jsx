import React from "react";
import style from "./app.css";
import Panel01 from "./Panel01.jsx"
import Panel02 from "./Panel02.jsx"

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		}
	}

	render() {
		return(
			<React.Fragment>
				App component
				<Panel01/>
				<Panel02></Panel02>
			</React.Fragment>
		)
	}
}