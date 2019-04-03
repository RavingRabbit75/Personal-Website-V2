import React from "react";
import Profile from "./Profile.jsx";

export default class ProfileContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};

	}

	componentDidMount() {
		let fetch1 = fetch("api/v1/profile/skills", {
			method: "GET",
			headers: {
				Accept: "application/json",
			}
		});

		let fetch2 = fetch("api/v1/profile/experience", {
			method: "GET",
			headers: {
				Accept: "application/json",
			}
		});

		let fetch3 = fetch("api/v1/profile/education", {
			method: "GET",
			headers: {
				Accept: "application/json",
			}
		});

		Promise.all([fetch1, fetch2, fetch3])
			.then(([results1, results2, results3]) => Promise.all([results1.json(), results2.json(), results3.json()]))
			.then( ([data_skills, data_exp, data_edu]) => 
				this.setState({
					isLoaded: true,
					skills: data_skills,
					experience: data_exp,
					education: data_edu
				})
			);

	}

	render() {	
		return(
			<React.Fragment>
				<Profile data_skills={this.state.skills} data_exp={this.state.experience} data_edu={this.state.education}/>
			</React.Fragment>
		);
	}

}