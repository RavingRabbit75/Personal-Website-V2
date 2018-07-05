import React from "react";
import style from "./app.css";
import Panel01 from "./Panel01.jsx"
import Panel02 from "./Panel02.jsx"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Project from "./Project.jsx"

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		}
	}


	setupProjects() {
		var prjs = ["Bubbles", "Buttercup", "Blossom"]

		return prjs.map(function(item, idx) {
			return <Project prjName={item} key={idx.toString()}/>
		})
	}

	render() {
		return(
			<React.Fragment>
				<Header/>

				{this.setupProjects()}
			{/* 
				<Panel01/>
				<Panel02></Panel02>
			*/}

				<Footer/>
			</React.Fragment>
		)
	}
}