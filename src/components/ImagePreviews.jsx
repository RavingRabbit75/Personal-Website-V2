import React from "react";
import s from "./ImagePreviews.scss";


export default class ImagePreviews extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			imageOnTop: "imageA"
		};
	}


	animateCurrentImageOut() {
		const imgHeight=window.getComputedStyle(this.imageA, null).getPropertyValue("height");
		console.log(imgHeight);
		let newImageAnim = new TimelineMax();
		// newImageAnim.to(this.imageA, 0.75, {top: "-300px"});
		// indicatorAnim.to(this.currentImageIndicator, 0.4, {width: "0", left: currentXCenterPos})
					 // .to(this.currentImageIndicator, 0, {left: newXCenterPos})
					 // .to(this.currentImageIndicator, 0.5, {width: "38px", left: newBaseXLoc+"px"});
		
	}


	render() {
		let layoutJSX;
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

		// console.log(this.props.imageFilenames);
		if(this.props.animating) {
			this.animateCurrentImageOut();
		}

		if(this.props.layout === 1){

			if(this.props.linkOnImage) {
				layoutJSX = 
				<a href={this.props.linkOnImage[1]} target="_blank"><div className={wrapper}>
					<div id="" className={previewsRow + " " + top} ref={div => this.imageA = div}>
						<div className={previewSingleWrapper + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src={this.props.imageFilenames[0][0]} alt="" />
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
						<div className={previewSingleWrapper2 + " " + shadowOff}>
							<div className={projectImage}>
								<img className={image} src="" alt="" />
							</div>
						</div>
					</div>
				</div></a>;
			} else {
				layoutJSX = 
				<div className={wrapper}>

				</div>;
			}
		} else if (this.props.layout === 2) {

			if(this.props.linkOnImage) {
				layoutJSX = 
				<a href={this.props.linkOnImage[1]} target="_blank"><div className={wrapper}>
					<div id="" className={previewsRow + " " + top} ref={div => this.imageA = div}>
						<div className={previewDoubleWrapper + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src={this.props.imageFilenames[0][0]} alt="" />
							</div>
						</div>
						<div className={previewDoubleWrapper + " " + projectImageBuffer + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src={this.props.imageFilenames[1][0]} alt="" />
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
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
				layoutJSX = 
				<div className={wrapper}>

				</div>;
			}
		} else if (this.props.layout === 3) {
			
			if(this.props.linkOnImage) {
				layoutJSX = 
				<a href={this.props.linkOnImage[1]} target="_blank"><div className={wrapper}>
					<div id="" className={previewsRow + " " + top} ref={div => this.imageA = div}>
						<div className={previewTripleWrapper + " " + shadowOn}>
							<div className={projectImage}>
								<img className={image} src={this.props.imageFilenames[0][0]} alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper + " " + projectImageBuffer + " "+ shadowOn}>
							<div className={projectImage}>
								<img className={image} src={this.props.imageFilenames[1][0]} alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper + " " + projectImageBuffer + " "+ shadowOn}>
							<div className={projectImage}>
								<img className={image} src={this.props.imageFilenames[2][0]} alt=""/>
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
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
				layoutJSX = 
				<div className="wrapper">

				</div>;
			}
		}


		return(
			<React.Fragment>
				{layoutJSX}				
			</React.Fragment>
		);
	}


}