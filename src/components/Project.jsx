import React from "react";
import s from "./Project.scss";
import icon_link from "./imgs/icon_link.svg";
import icon_github from "./imgs/icon_github.svg";

export default class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
	}

	setupImageLayout(link1, link2) {
		let layout;
		if(this.props.projectData.layouttype === 1){

			if(link1[0]) {
				layout = 
				<a href={link1[0][1]} target="_blank"><div className="wrapper">
					<div id="" className="previews-row top">
						<div className="preview-single-wrapper shadow-on">
							<div className="project-image">
								<img className="image" src="" alt="" />
							</div>
						</div>
					</div>
					<div id="" className="previews-row2 bottom">
						<div className="preview-single-wrapper2 shadow-off">
							<div className="project-image">
								<img className="image" src="" alt="" />
							</div>
						</div>
					</div>
				</div></a>;
			} else {
				layout = 
				<div className="wrapper">

				</div>;
			}
		} else if (this.props.projectData.layouttype === 2) {

			if(link1[0]) {
				layout = 
				<React.Fragment>
				<div id="" className="previews-row top">
					<div className="preview-double-wrapper shadow-on">
						<div className="project-image">
							<img className="image" src="" alt="" />
						</div>
					</div>
					<div className="preview-double-wrapper project-image-buffer shadow-on">
						<div className="project-image">
							<img className="image" src="" alt="" />
						</div>
					</div>
				</div>
				<div id="" className="previews-row2 bottom">
					<div className="preview-double-wrapper2 shadow-off">
						<div className="project-image">
							<img className="image" src="" alt="" />
						</div>
					</div>
					<div className="preview-double-wrapper2 project-image-buffer shadow-off">
						<div className="project-image">
							<img className="image" src="" alt="" />
						</div>
					</div>
				</div>
				</React.Fragment>;
			} else {
				layout = 
				<div className="wrapper">

				</div>;
			}
		} else if (this.props.projectData.layouttype === 3) {
			
			if(link1[0]) {
				layout = 
				<React.Fragment>
				<div id="" className="previews-row top">
					<div className="preview-triple-wrapper shadow-on">
						<div className="project-image">
							<img className="image" src="" alt=""/>
						</div>
					</div>
					<div className="preview-triple-wrapper project-image-buffer2 shadow-on">
						<div className="project-image">
							<img className="image" src="" alt=""/>
						</div>
					</div>
					<div className="preview-triple-wrapper project-image-buffer2 shadow-on">
						<div className="project-image">
							<img className="image" src="" alt=""/>
						</div>
					</div>
				</div>
				<div id="" className="previews-row2 bottom">
					<div className="preview-triple-wrapper2 shadow-off">
						<div className="project-image">
							<img className="image" src="" alt=""/>
						</div>
					</div>
					<div className="preview-triple-wrapper2 project-image-buffer2 shadow-off">
						<div className="project-image">
							<img className="image" src="" alt=""/>
						</div>
					</div>
					<div className="preview-triple-wrapper2 project-image-buffer2 shadow-off">
						<div className="project-image">
							<img className="image" src="" alt=""/>
						</div>
					</div>
				</div>
				</React.Fragment>;
			} else {
				layout = 
				<div className="wrapper">

				</div>;
			}
		}
		/*
		{% if project.imagesLayout=="single" %}
			{% if project.liveLink != "" %}
			<a href="{{ project.liveLink }}" target="_blank"><div class="wrapper">
			{% else %}
			<div class="wrapper">
			{% endif %}
				<div id="{{ project.projid + '_' + 'a'}}" class="previews-row top">
					<div class="preview-single-wrapper shadow-on">
						<div class="project-image">
							<img class="image" src="{{ url_for('static', filename=project.images[0].path) }}" alt="">
						</div>
					</div>
				</div>
				<div id="{{ project.projid + '_' + 'b' }}" class="previews-row2 bottom">
					<div class="preview-single-wrapper2 shadow-off">
						<div class="project-image">
							<img class="image" src="" alt="">
						</div>
					</div>
				</div>
			{% if project.liveLink != "" %}
			</div></a>
			{% else %}
			</div>
			{% endif %}
			
		{% elif project.imagesLayout=="double" %}
			{% if project.liveLink != "" %}
			<a href="{{ project.liveLink }}" target="_blank"><div class="wrapper">
			{% else %}
			<div class="wrapper">
			{% endif %}
				<div id="{{ project.projid + '_' + 'a'}}" class="previews-row top">
					<div class="preview-double-wrapper shadow-on">
						<div class="project-image">
							<img class="image" src="{{ url_for('static', filename=project.images[0].path) }}" alt="">
						</div>
					</div>
					<div class="preview-double-wrapper project-image-buffer shadow-on">
						<div class="project-image">
							<img class="image" src="{{ url_for('static', filename=project.images[1].path) }}" alt="">
						</div>
					</div>
				</div>
				<div id="{{ project.projid + '_' + 'b' }}" class="previews-row2 bottom">
					<div class="preview-double-wrapper2 shadow-off">
						<div class="project-image">
							<img class="image" src="" alt="">
						</div>
					</div>
					<div class="preview-double-wrapper2 project-image-buffer shadow-off">
						<div class="project-image">
							<img class="image" src="" alt="">
						</div>
					</div>
				</div>
			{% if project.liveLink != "" %}
			</div></a>
			{% else %}
			</div>
			{% endif %}

		{% elif project.imagesLayout=="triple" %}
			{% if project.liveLink != "" %}
			<a href="{{ project.liveLink }}" target="_blank"><div class="wrapper">
			{% else %}
			<div class="wrapper">
			{% endif %}
				<div id="{{ project.projid + '_' + 'a'}}" class="previews-row top">
					<div class="preview-triple-wrapper shadow-on">
						<div class="project-image">
							<img class="image" src="{{ url_for('static', filename=project.images[0].path) }}" alt="">
						</div>
					</div>
					<div class="preview-triple-wrapper project-image-buffer2 shadow-on">
						<div class="project-image">
							<img class="image" src="{{ url_for('static', filename=project.images[1].path) }}" alt="">
						</div>
					</div>
					<div class="preview-triple-wrapper project-image-buffer2 shadow-on">
						<div class="project-image">
							<img class="image" src="{{ url_for('static', filename=project.images[2].path) }}" alt="">
						</div>
					</div>
				</div>
				<div id="{{ project.projid + '_' + 'b' }}" class="previews-row2 bottom">
					<div class="preview-triple-wrapper2 shadow-off">
						<div class="project-image">
							<img class="image" src="" alt="">
						</div>
					</div>
					<div class="preview-triple-wrapper2 project-image-buffer2 shadow-off">
						<div class="project-image">
							<img class="image" src="" alt="">
						</div>
					</div>
					<div class="preview-triple-wrapper2 project-image-buffer2 shadow-off">
						<div class="project-image">
							<img class="image" src="" alt="">
						</div>
					</div>
				</div>
			{% if project.liveLink != "" %}
			</div></a>
			{% else %}
			</div>
			{% endif %}
		{% endif %}
		*/

		return layout;
	}

	render() {
		const itemContainer = s["item-container"];
		const itemTitle = s["item-title"];
		const itemSubcontainer = s["item-subcontainer"];
		const itemEdgeHighlight = s["item-edge-highlight"];
		const itemEdgeWall = s["item-edge-wall"];

		const itemContent = s["item-content"];
		const imagesContainer = s["images-container"];
		const projectImageSlot = s["project-image-slot"];
		const projectSlotClipper = s["project-slot-clipper"];

		const projectTextBuiltwith = s["project-text-builtwith"];
		const projectText = s["project-text"];
		const projectTextDescription = s["project-text-description"];
		const projectTextAccomplishments = s["project-text-accomplishments"];
		const projectLinks = s["project-links"];
		const projectLinksIcons = s["project-links-icons"];

		const wrapper = s["wrapper"];

		let liveLink;
		const link1 = this.props.projectData.urls.filter((item, idx) => {
			return item[0]==="liveLink";
		});
		if(link1[0]) {
			liveLink = <a href={link1[0][1]} target="_blank"><div className={projectLinksIcons}><img src={icon_link} alt="" /></div></a>;
		}

		let githubLink;
		const link2 = this.props.projectData.urls.filter((item, idx) => {
			return item[0]==="githubLink";
		});
		if(link2[0]) {
			githubLink = <a href={link2[0][1]} target="_blank"><div className={projectLinksIcons}><img src={icon_github} alt="" /></div></a>;
		}

		let imageLayout = this.setupImageLayout(link1, link2);
		
		return(
			<React.Fragment>
				<div id="" className={itemContainer}>
					<div className={itemTitle}>
						{this.props.projectData.name}
					</div>
					<div className={itemSubcontainer}>
						<div className={itemEdgeHighlight}></div>
						<div className={itemEdgeWall}>
						</div>
						<div className="container-fluid">
							<div className={itemContent}>
								<div className={imagesContainer}>
									<div className={projectImageSlot}></div>
									<div className={projectSlotClipper}>
										{imageLayout}
									</div>
								</div>

								<div className="loading">
									<div>LOADING</div>
								</div>

								{/* Below starts text portion of project */}

								<div className={projectTextBuiltwith}>
									Built with:
								</div>
								<div className={projectText}>
									{this.props.projectData.builtwith}
								</div>
								<div className={projectTextDescription}>
									{this.props.projectData.description}
								</div>
								<div className={projectTextAccomplishments}>
									<ul>
									{
										this.props.projectData.points.map((item, idx) => {
											return <li key={idx}>• {item}</li>;
										})
									}
									</ul>
								</div>
								<div className={projectLinks}>
									{liveLink}
									{githubLink}
								</div>
							</div>
						</div>

						<div className={itemEdgeHighlight}></div>
					</div>
					
				</div>
			</React.Fragment>
		);
	}
}