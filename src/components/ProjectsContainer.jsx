import React from "react";
import Project from "./Project.jsx";
import ProjectsFilter from "./ProjectsFilter.jsx";

export default class ProjectsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			projectsList: []
		};

	}

	componentDidMount() {

		let fetch1 = fetch("api/v1/projects", {
			method: "GET",
			headers: {
				Accept: "application/json",
			}
		});

		let projectsList = null;

		Promise.all([fetch1])
			.then(([results1]) => Promise.all([results1.json()]))
			.then( (data) => {
				projectsList = data[0];
				const promiseArr = data[0].projects.map((project, idx) => {
					return fetch(`api/v1/project/${project.id}/filters`, {
						method: "GET",
						headers: {
							Accept: "application/json"
						}
					});
				});
				return Promise.all(promiseArr);

			}).then((filtersResponses) => {
				const promise2Arr = filtersResponses.map((item, idx) => {
					return item.json();
				});
				return Promise.all(promise2Arr);

			}).then((data) => {
				data.forEach((item, idx) => {
					projectsList["projects"][idx]["filters"] = {"project_filters": item["project_filters"], "key": item["key"]};
					if(item["project_filters"].length === 0) {
						projectsList["projects"][idx]["hidden"] = true;
					} else {
						projectsList["projects"][idx]["hidden"] = false;
					}
				});
				this.setState({
					projectsList: projectsList["projects"]
				});
			});


	}

	updateProjectList(filterList) {
		const newProjectList = this.state.projectsList.map((project, idx) => {
			let hidden=true;
			for(let x=0; x<filterList.length; x++) {
				if(filterList[x].active) {
					for(let y=0; y<project.filters.project_filters.length; y++){
						if(project.filters.project_filters[y][1] === filterList[x].id) {
							hidden=false;
							break;
						}
					}
					if(!hidden) {
						break;
					}
				}
			}
			project.hidden=hidden;
			return  project;
		});

		this.setState({
			projectsList: newProjectList
		});
	}

	render() {
		var projectsList;
		return(
			<React.Fragment>
				<ProjectsFilter updateFunc={this.updateProjectList.bind(this)}/>
				{
					this.state.projectsList.filter((project, idx) => {
						return project.hidden === false;
					}).map((project, idx) => {
						return <Project key={project.name} projectData={project} />;
					})
				}
			</React.Fragment>
		);
	}

}