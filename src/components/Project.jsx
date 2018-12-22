import React from "react";
import s from "./Project.scss";
import ImagePreviews from "./ImagePreviews.jsx";
import PreviewBtn from "./PreviewBtn.jsx";
import icon_link from "./imgs/icon_link.svg";
import icon_github from "./imgs/icon_github.svg";


export default class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			lastPreviewButtonSelected: 1,
			newImageSet: 1,
			buttonsDisabled: false
		};
	}


	previewBtnClicked(imgIdx) {
		this.setState({
			lastPreviewButtonSelected: imgIdx,
			newImageSet: imgIdx,
			buttonsDisabled: true
		});

		var newBaseXLoc = 42 * (imgIdx - 1);
		let leftPosition = window.getComputedStyle(this.currentImageIndicator, null).getPropertyValue("left");
		let currentXCenterPos = parseInt(leftPosition.replace("px", ""), 10) + 19 + "px";
		let newXCenterPos = newBaseXLoc + 19 + "px";

		let indicatorAnim = new TimelineMax();
		indicatorAnim.to(this.currentImageIndicator, 0.4, {width: "0", left: currentXCenterPos})
					 .to(this.currentImageIndicator, 0, {left: newXCenterPos})
					 .to(this.currentImageIndicator, 0.5, {width: "38px", left: newBaseXLoc+"px"});

	}

	imagePreviewIsReady() {
		console.log("Final Done");
		this.setState({
			buttonsDisabled: false
		});
	}

	setupImagePreviewButtons() {
		let projectLayout;

		const previewBtnsContainer = s["preview-btns-container"];
		const previewBlockButtons = s["preview-block-buttons"];
		const previewBlockButtonsRow = s["preview-block-buttons-row"];

		const currentImageIndicator = s["current-image-indicator"];

		let stuff = () => {
			let previewBtns=[];
			let numOfPreviewBtns;
			if (this.props.projectData.layouttype === 1) {
				numOfPreviewBtns = this.props.projectData.previews.length;

			}  else if (this.props.projectData.layouttype === 2) {
				numOfPreviewBtns = this.props.projectData.previews.length/2;

			} else if (this.props.projectData.layouttype === 3) {
				numOfPreviewBtns = this.props.projectData.previews.length/3;
				
			}

			let isEnabled;
			for (let idx = 1; idx <= numOfPreviewBtns; idx++) {
				if (this.state.buttonsDisabled) {
					isEnabled = false;
				} else if (idx === this.state.lastPreviewButtonSelected) {
					isEnabled = false;
				} else {
					isEnabled = true;
				}
				previewBtns.push(
					<PreviewBtn idx={idx} 
								projId={ this.props.projectData.id} 
								key={ idx + "_" + this.props.projectData.id} 
								enabled={isEnabled}
								indicatorClickedFunc={this.previewBtnClicked.bind(this, idx)} />
			  	);
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
				<div className={currentImageIndicator} ref={div => this.currentImageIndicator = div}></div>
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
										<ImagePreviews linkOnImage={link1[0]} 
													   imageFilenames={imagesArr}
													   layout={this.props.projectData.layouttype}
													   newImageSet={this.state.newImageSet}
													   ready={this.imagePreviewIsReady.bind(this)}/>
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