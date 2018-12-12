import React from "react";
import s from "./Project.scss";
import PreviewBtn from "./PreviewBtn.jsx";
import icon_link from "./imgs/icon_link.svg";
import icon_github from "./imgs/icon_github.svg";


export default class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
	}

	setupImageLayout(link1, imagesLinks) {
		let layout;
		const wrapper = s["wrapper"];
		const previewsRow = s["previews-row"];
		const previewsRow2 = s["previews-row2"];
		const top = s["top"];
		const bottom = s["bottom"];
		const projectImage = s["project-image"];
		const shadowOn = s["shadow-on"];
		const shadowOff = s["shadow-off"];

		const previewSingleWrapper = s["preview-single-wrapper"];
		const previewSingleWrapper2 = s["preview-single-wrapper2"];
		const previewDoubleWrapper = s["preview-double-wrapper"];
		const previewDoubleWrapper2 = s["preview-double-wrapper2"];
		const previewTripleWrapper = s["preview-triple-wrapper"];
		const previewTripleWrapper2 = s["preview-triple-wrapper2"];
		const projectImageBuffer = s["project-image-buffer"];
		
		const image = s["image"];


		if(this.props.projectData.layouttype === 1){

			if(link1[0]) {
				layout = 
				<a href={link1[0][1]} target="_blank"><div className={wrapper}>
					<div id="" className={previewsRow + " " + top}>
						<div className={previewSingleWrapper + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src={imagesLinks[0][0]} alt="" />
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom}>
						<div className={previewSingleWrapper2 + " " + shadowOff}>
							<div className={projectImage}>
								<img className={image} src="" alt="" />
							</div>
						</div>
					</div>
				</div></a>;
			} else {
				layout = 
				<div className={wrapper}>

				</div>;
			}
		} else if (this.props.projectData.layouttype === 2) {

			if(link1[0]) {
				layout = 
				<a href={link1[0][1]} target="_blank"><div className={wrapper}>
					<div id="" className={previewsRow + " " + top}>
						<div className={previewDoubleWrapper + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src={imagesLinks[0][0]} alt="" />
							</div>
						</div>
						<div className={previewDoubleWrapper + " " + projectImageBuffer + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src={imagesLinks[1][0]} alt="" />
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom}>
						<div className="preview-double-wrapper2 shadow-off">
							<div className={projectImage}>
								<img className={image} src="" alt="" />
							</div>
						</div>
						<div className={previewDoubleWrapper + " " + projectImageBuffer + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src="" alt="" />
							</div>
						</div>
					</div>
				</div></a>;
			} else {
				layout = 
				<div className={wrapper}>

				</div>;
			}
		} else if (this.props.projectData.layouttype === 3) {
			
			if(link1[0]) {
				layout = 
				<a href={link1[0][1]} target="_blank"><div className={wrapper}>
					<div id="" className={previewsRow}>
						<div className={previewTripleWrapper + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src={imagesLinks[0][0]} alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper + " " + projectImageBuffer + " "+ shadowOn}>
							<div className={projectImage}>
								<img className={image} src={imagesLinks[1][0]} alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper + " " + projectImageBuffer + " "+ shadowOn}>
							<div className={projectImage}>
								<img className={image} src={imagesLinks[2][0]} alt=""/>
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom}>
						<div className={previewTripleWrapper2 + " " + shadowOff}>
							<div className={projectImage}>
								<img className={image} src="" alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper2 + " " + projectImageBuffer + " " + shadowOff}>
							<div className={projectImage}>
								<img className={image} src="" alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper2 + " " + projectImageBuffer + " " + shadowOff}>
							<div className={projectImage}>
								<img className={image} src="" alt=""/>
							</div>
						</div>
					</div>
				</div></a>;
			} else {
				layout = 
				<div className="wrapper">

				</div>;
			}
		}

		return layout;
	}


	setupImagePreviewButtons() {
		let projectLayout;

		const previewBtnsContainer = s["preview-btns-container"];
		const previewBlockButtons = s["preview-block-buttons"];
		const previewBlockButtonsRow = s["preview-block-buttons-row"];

		const currentImageIndicator = s["current-image-indicator"];

		let stuff = () => {
			let previewBtns=[];
			if (this.props.projectData.layouttype === 1) {
				let numOfPreviewBtns = this.props.projectData.previews.length;
				for (let idx = 1; idx <= numOfPreviewBtns; idx++) {
					previewBtns.push(
						<PreviewBtn idx={idx} projId={ this.props.projectData.id} key={ idx + "_" + this.props.projectData.id } />
				  	);
				}
				
			}  else if (this.props.projectData.layouttype === 2) {
				let numOfPreviewBtns = this.props.projectData.previews.length/2;
				for (let idx = 1; idx <= numOfPreviewBtns; idx++) {
					previewBtns.push(
						<PreviewBtn idx={idx} projId={ this.props.projectData.id } key={ idx + "_" + this.props.projectData.id }/>
				  	);
				}

			} else if (this.props.projectData.layouttype === 3) {
				let numOfPreviewBtns = this.props.projectData.previews.length/3;
				for (let idx = 1; idx <= numOfPreviewBtns; idx++) {
					previewBtns.push(
						<PreviewBtn idx={idx} projId={ this.props.projectData.id } key={ idx + "_" + this.props.projectData.id }/>
				  	);
				}
				
			} 

			return previewBtns;
		};

		if ((this.props.projectData.layouttype === 1 && this.props.projectData.previews.length > 1)
		|| (this.props.projectData.layouttype === 2 && this.props.projectData.previews.length > 2)
		|| (this.props.projectData.layouttype === 3 && this.props.projectData.previews.length > 3)) {

			projectLayout = 
			<div className={previewBtnsContainer}>
			<div className={previewBlockButtons}>
				<div className={previewBlockButtonsRow}>
					{stuff()}
				</div>
				<div className={currentImageIndicator}></div>
			</div>
			</div>;
			
		}


		return projectLayout;

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

		const loading = s["loading"];

		const projectTextBuiltwith = s["project-text-builtwith"];
		const projectText = s["project-text"];
		const projectTextDescription = s["project-text-description"];
		const projectTextAccomplishments = s["project-text-accomplishments"];
		const projectLinks = s["project-links"];
		const projectLinksIcons = s["project-links-icons"];

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

		const imagesArr = this.props.projectData.previews.map((imgItemArr, idx) => {
			return ["/projects/images/" + imgItemArr[0], imgItemArr[1]];
		});

		let imageLayout = this.setupImageLayout(link1, imagesArr);
		let imagePreviewButtons = this.setupImagePreviewButtons();
		
		return(
			<React.Fragment>
				<div id={this.props.projectData.id} className={itemContainer}>
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

								{imagePreviewButtons}

								<div className={loading}>
									<div>LOADING</div>
								</div>

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