import React from "react";
import s from "./Profile.css";

export default class Profile extends React.Component {
	constructor() {
		super()
	}

	setupProficientSkills(skillsData) {
		if (skillsData !== undefined) {
			var skillsString = skillsData.skills.filter(function(item){
				if(item.level > 2) {
					return item
				}
			}).reduce(function(acc, item, idx, arr){
				var separator = ", "
				if (idx === arr.length-1) {
					separator = ""
				}
				return acc + item.skill + separator;
			}, "");

			return <React.Fragment>{skillsString}</React.Fragment>
		} 
		
		return <React.Fragment>Loading...</React.Fragment>
	}

	setupExposureSkills(skillsData) {
		if (skillsData !== undefined) {
			var skillsString = skillsData.skills.filter(item => item.level <= 2)
				.reduce(function(acc, item, idx, arr){
					var separator = ", "
					if (idx === arr.length-1) {
						separator = ""
					}
					return acc + item.skill + separator;
				}, "")

			return <React.Fragment>{skillsString}</React.Fragment>
		}

		return <React.Fragment>Loading...</React.Fragment>
	}

	setupExperienceList(expData) {
		if (expData === undefined) {
			return <React.Fragment>Loading...</React.Fragment>
		}

		var jsxData = expData.experience.map(function(item, idx, arr){
			var expTitle = s["exp-title"] + " row"

			function divFunction() {
				var accomplishmentsJsx = item.accomplishments.map(function(accomp, idx) {
					return (<li key={idx.toString()}>• { accomp }</li>)
				});

				var accomplishmentsList  = s["accomplishments-list"]
				if (idx < arr.length-1) {
					let expAccomplishments = s["exp-accomplishments"] + " " + s["exp-container-margin"]
					return (
						<div className={expAccomplishments}> 
							<ul className={accomplishmentsList}>
								{accomplishmentsJsx}
							</ul>
						</div>
					)
				} else {
					let expAccomplishments = s["exp-accomplishments"]
					return (
						<div className={expAccomplishments}> 
							<ul className={accomplishmentsList}>
								{accomplishmentsJsx}
							</ul>
						</div>
					)
				}
			}
			
			return (
				<div key={idx.toString()}>
					<div className={expTitle}>
						<div className="col-xs-9">
							<span className="">{ item.name } | </span>
							<span className="no-wrap">{ item.title } | </span>
							<span className="no-wrap">{ item.location }</span>
						</div>
						<div className="col-xs-3">
							<span className="pull-right no-wrap">{ item.years }</span>
						</div>
					</div>
					{divFunction()}
				</div>
			)
		});
		
		return jsxData;
	}

	setupEducationList(eduData) {
		if (eduData === undefined) {
			return <React.Fragment>Loading...</React.Fragment>
		}

		var jsxData = eduData.education.map(function(item, idx){

			function setSecondary(secondaryDesc) {
				if (secondaryDesc.length > 0) {
					return secondaryDesc
				} 
				return "";
			}
			
			let eduDegree = s["edu-degree"]
			let eduInstitution = s["edu-institution"]

			return (
				<div key={idx.toString()}>
					<div className={eduDegree}>
						<span>{ item.primaryDesc }</span>
						<span className="pull-right">{ item.year }</span>
					</div>
					<div className={eduInstitution}>
						{ setSecondary(item.secondaryDesc) }
					</div>
				</div>
			)
		});
		
		return jsxData
	}

	render() {	
		let itemContainer = s["item-container"]
		let itemTitle = s["item-title"]
		let itemSubcontainer = s["item-subcontainer"]
		let itemEdgeHighlight = s["item-edge-highlight"]
		let itemEdgeWall = s["item-edge-wall"]
		let itemContent = s["item-content"]

		let proficiencyTitle = s["proficiency-title"]
		let text = s["text"]

		return(
			<React.Fragment>
				<div className={itemContainer}>
					<div className={itemTitle}>
						SKILLS & TECHNOLOGIES
					</div>
					<div className={itemSubcontainer}>
						<div className={itemEdgeHighlight}></div>
						<div className={itemEdgeWall}></div>
						<div className="container-fluid">
							<div className={itemContent}>
								<div className={proficiencyTitle}>
									Proficient:
								</div>
								<div className={text}>
									{this.setupProficientSkills(this.props.data_skills)}
								</div>
								<div className={proficiencyTitle}>
									Exposure:
								</div>
								<div className={text}>
									{this.setupExposureSkills(this.props.data_skills)}
								</div>
							</div>
						</div>
					</div>
					<div className={itemEdgeHighlight}></div>
				</div>
				<div className={itemContainer}>
					<div className={itemTitle}>
						PROFESSIONAL EXPERIENCE
					</div>
					<div className={itemSubcontainer}>
						<div className={itemEdgeHighlight}></div>
						<div className={itemEdgeWall}></div>
						<div className="container-fluid">
							<div className={itemContent}>
								{ this.setupExperienceList(this.props.data_exp) }
							</div>
						</div>
					</div>
					<div className={itemEdgeHighlight}></div>
				</div>
				<div className={itemContainer}>
					<div className={itemTitle}>
						EDUCATION
					</div>
					<div className={itemSubcontainer}>
						<div className={itemEdgeHighlight}></div>
						<div className={itemEdgeWall}></div>
						<div className="container-fluid">
							<div className={itemContent}>
								{ this.setupEducationList(this.props.data_edu) }
							</div>
						</div>
					</div>
					<div className={itemEdgeHighlight}></div>
				</div>

			</React.Fragment>
		)
	}

}