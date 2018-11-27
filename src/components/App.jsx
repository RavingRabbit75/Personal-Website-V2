import React from "react";
import style from "./app.scss";
import Panel01 from "./Panel01.jsx"
import Panel02 from "./Panel02.jsx"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Project from "./Project.jsx"
import ProfileContainer from "./ProfileContainer.jsx"
import ProjectsContainer from "./ProjectsContainer.jsx"

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			currentSection: "projects"
		}
	}

	componentDidMount() {
		// fetch("http://localhost:8000/api/v1/projects")
		fetch("api/v1/projects")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.projects
					});
				},
		// Note: it's important to handle errors here
		// instead of a catch() block so that we don't swallow
		// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	setSectionToProfile() {
		this.setState(state => ({
				currentSection: "profile"
			})
		)
		// this.setState({
		// 	currentSection: "profile"
		// });
	}

	setSectionToProjects() {
		this.setState({
			currentSection: "projects"
		});
	}

	setupMainContent(currentSection) {
		// var prjs = ["Bubbles", "Buttercup", "Blossom"]

		// return prjs.map(function(item, idx) {
		// 	return <Project prjName={item} key={idx.toString()}/>
		// })
		
		if (currentSection==="profile") {
			return <ProfileContainer />
		} else {
			return <ProjectsContainer style={{height: 100}}/>;
		}
	}

	render() {
		return(
			<React.Fragment>
				<Header 
					currentSection={this.state.currentSection} 
					setSectionFunc1={this.setSectionToProfile.bind(this)}
					setSectionFunc2={this.setSectionToProjects.bind(this)} 
				/>
					{ this.setupMainContent(this.state.currentSection) }
				<Footer/>
			</React.Fragment>
		)
	}
}