import React from "react";
import style from "./app.scss";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Project from "./Project.jsx";
import ProfileContainer from "./ProfileContainer.jsx";
import ProjectsContainer from "./ProjectsContainer.jsx";

import { 
    TweenMax,
    TimelineMax,
    AttrPlugin,
    CSSPlugin
} from "gsap";

const activated = [
    TweenMax,
    TimelineMax,
    AttrPlugin,
    CSSPlugin
];

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			currentSection: "projects",
			globalInfo: {}
		};
	}

	componentDidMount() {
		let fetch1 = fetch("api/v1/globalinfo", {
			method: "GET",
			headers: {
				Accept: "application/json",
			}
		});

		Promise.all([fetch1])
			.then(([response1]) => Promise.all([response1.json()]))
			.then( ([globalInfo]) => {
				this.setState({
					isLoaded: true,
					globalInfo: globalInfo,
				});
			});
	}

	setSectionToProfile() {
		this.setState(state => ({
				currentSection: "profile"
			})
		);
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
		if (currentSection==="profile") {
			return <ProfileContainer />;
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
					globalinfo={this.state.globalInfo} />
				{ this.setupMainContent(this.state.currentSection) }
				<Footer globalicons={this.state.globalInfo.global_icons}/>
			</React.Fragment>
		);
	}
}