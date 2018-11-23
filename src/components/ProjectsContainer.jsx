import React from "react";
import Project from "./Project.jsx";
import ProjectsFilter from "./ProjectsFilter.jsx";

export default class ProjectsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			projectsList: []
		}

	}

	componentDidMount() {

		let fetch1 = fetch("api/v1/projects", {
			method: "GET",
			headers: {
				Accept: "application/json",
			}
		})

		Promise.all([fetch1])
			.then(([results1]) => Promise.all([results1.json()]))
			.then( ([data_projectsList]) =>
				this.setState({
					projectsList: data_projectsList["projects"]
				})
			)

		// Promise.all([fetch1, fetch2, fetch3])
		// 	.then(([results1, results2, results3]) => Promise.all([results1.json(), results2.json(), results3.json()]))
		// 	.then( ([data_skills, data_exp, data_edu]) => 
		// 		this.setState({
		// 			isLoaded: true,
		// 			skills: data_skills,
		// 			experience: data_exp,
		// 			education: data_edu
		// 		})
		// 	)

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
		var projectsList;

		console.log(projectsList);
		return(
			<React.Fragment>
				<ProjectsFilter/>
				{
					this.state.projectsList.map((project, idx) => {
						return <Project prjName={project.name}/>
					})
				}
			</React.Fragment>
		);
	}

}