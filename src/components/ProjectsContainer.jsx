import React from "react";
import Project from "./Project.jsx"

export default class ProjectsContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state={

		}

	}

	componentDidMount() {

		// let fetch1 = fetch("api/v1/profile/skills", {
		// 	method: "GET",
		// 	headers: {
		// 		Accept: "application/json",
		// 	}
		// })

		// let fetch2 = fetch("api/v1/profile/experience", {
		// 	method: "GET",
		// 	headers: {
		// 		Accept: "application/json",
		// 	}
		// })

		// Promise.all([fetch1, fetch2])
		// 	.then(([results1, results2]) => Promise.all([results1.json(), results2.json()]))
		// 	.then(function([data1, data2]){
		// 		console.log(data1);
		// 		console.log(data2);
		// 	})


	}

	render() {

		return(
			<React.Fragment>
				<Project projectsData={this.state}/>
			</React.Fragment>
		)
	}

}