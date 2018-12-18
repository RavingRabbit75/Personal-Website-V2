import React from "react";
import s from "./ImagePreviews.scss";


export default class ImagePreviews extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			imageOnTop: "imageA",
			currentImageSet: 0
		};
	}


	animateCurrentImageOut() {
		let topImageRef;
		let bottomImageRef;
		let topImageWrapperRefsArr=[];
		let bottomImageWrapperRefsArr=[];
		if (this.state.imageOnTop === "imageA") {
			topImageRef = this.imageA;
			bottomImageRef = this.imageB;
			if (this.props.layout >= 1){
				topImageWrapperRefsArr.push(this.imageAWrapper1);
				bottomImageWrapperRefsArr.push(this.imageBWrapper1);
			}
			if (this.props.layout >=2) {
				topImageWrapperRefsArr.push(this.imageAWrapper2);
				bottomImageWrapperRefsArr.push(this.imageBWrapper2);
			}
			if (this.props.layout === 3) {
				topImageWrapperRefsArr.push(this.imageAWrapper3);
				bottomImageWrapperRefsArr.push(this.imageBWrapper3);
			}
			
		} else {
			topImageRef = this.imageB;
			bottomImageRef = this.imageA;
			if (this.props.layout >= 1){
				topImageWrapperRefsArr.push(this.imageBWrapper1);
				bottomImageWrapperRefsArr.push(this.imageAWrapper1);
			}
			if (this.props.layout >=2) {
				topImageWrapperRefsArr.push(this.imageBWrapper2);
				bottomImageWrapperRefsArr.push(this.imageAWrapper2);
			}
			if (this.props.layout === 3) {
				topImageWrapperRefsArr.push(this.imageBWrapper3);
				bottomImageWrapperRefsArr.push(this.imageAWrapper3);
			}
		}
		const imgHeight = window.getComputedStyle(topImageRef, null).getPropertyValue("height");
		const newTopLoc = "-" + imgHeight;
		TweenMax.to(topImageRef, 0.75, {top: newTopLoc});

		bottomImageWrapperRefsArr.forEach((item, idx) => {
			TweenMax.to(item, 0.3, {padding: "0px", delay: .7});
			if(bottomImageWrapperRefsArr.length-1 === idx) {
				TweenMax.to(item, 0.3, {boxShadow: "0 0 5px rgba(0, 0, 0, .4)", delay: 1, onComplete: setClasses.bind(this)});
			} else {
				TweenMax.to(item, 0.3, {boxShadow: "0 0 5px rgba(0, 0, 0, .4)", delay: 1});
			}
		});

		function setClasses() {
			let newImageOnTop;
			if (this.state.imageOnTop === "imageA") {
				newImageOnTop = "imageB";
			} else {
				newImageOnTop = "imageA";
			}

			// this.setState({
			// 	currentImageSet: this.props.newImageSet,
			// 	imageOnTop: newImageOnTop
			// });
		}
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

		let imagesPathsArr=[];
		

		if (this.state.currentImageSet) {
			imagesPathsArr = this.props.imageFilenames.filter((item) => {
				return item[1] === this.props.imageSet;
			}).map((item, idx) => {
				return item[0];
			});
		} else {
			imagesPathsArr = this.props.imageFilenames.filter((item) => {
				return item[1] === 1;
			}).map((item, idx) => {
				return item[0];
			});
		}

		let newImagesPathsArr=[];
		if (this.props.newImageSet) {
			newImagesPathsArr = this.props.imageFilenames.filter((item) => {
				return item[1] === this.props.newImageSet;
			}).map((item, idx) => {
				return item[0];
			});
		}

		if (this.props.animating) {
			this.animateCurrentImageOut();
		}

		if(this.props.layout === 1){

			if(this.props.linkOnImage) {
				layoutJSX = 
				<a href={this.props.linkOnImage[1]} target="_blank"><div className={wrapper}>
					<div id="" className={previewsRow + " " + top} ref={div => this.imageA = div}>
						<div className={previewSingleWrapper + " " + shadowOn} ref={div => this.imageAWrapper1 = div}>
							<div className={projectImage}>
								<img className={image} src={imagesPathsArr[0]} alt="" />
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
						<div className={previewSingleWrapper2 + " " + shadowOff} ref={div => this.imageBWrapper1 = div}>
							<div className={projectImage}>
								<img className={image} src={newImagesPathsArr[0]} alt="" />
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
						<div className={previewDoubleWrapper + " " + shadowOn} ref={div => this.imageAWrapper1 = div}>
							<div className={projectImage}>
								<img className={image} src={imagesPathsArr[0]} alt="" />
							</div>
						</div>
						<div className={previewDoubleWrapper + " " + projectImageBuffer + " " + shadowOn} ref={div => this.imageAWrapper2 = div}>
							<div className={projectImage}>
								<img className={image} src={imagesPathsArr[1]} alt="" />
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
						<div className="preview-double-wrapper2 shadow-off" ref={div => this.imageBWrapper1 = div}>
							<div className={projectImage}>
								<img className={image} src={newImagesPathsArr[0]} alt="" />
							</div>
						</div>
						<div className={previewDoubleWrapper + " " + projectImageBuffer + " " + shadowOn} ref={div => this.imageBWrapper2 = div}>
							<div className={projectImage}>
								<img className={image} src={newImagesPathsArr[1]} alt="" />
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
						<div className={previewTripleWrapper + " " + shadowOn} ref={div => this.imageAWrapper1 = div}>
							<div className={projectImage}>
								<img className={image} src={imagesPathsArr[0]} alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper + " " + projectImageBuffer + " "+ shadowOn} ref={div => this.imageAWrapper2 = div}>
							<div className={projectImage}>
								<img className={image} src={imagesPathsArr[1]} alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper + " " + projectImageBuffer + " "+ shadowOn} ref={div => this.imageAWrapper3 = div}>
							<div className={projectImage}>
								<img className={image} src={imagesPathsArr[2]} alt=""/>
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
						<div className={previewTripleWrapper2 + " " + shadowOff} ref={div => this.imageBWrapper1 = div}>
							<div className={projectImage}>
								<img className={image} src={newImagesPathsArr[0]} alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper2 + " " + projectImageBuffer + " " + shadowOff} ref={div => this.imageBWrapper2 = div}>
							<div className={projectImage}>
								<img className={image} src={newImagesPathsArr[1]} alt=""/>
							</div>
						</div>
						<div className={previewTripleWrapper2 + " " + projectImageBuffer + " " + shadowOff} ref={div => this.imageBWrapper3 = div}>
							<div className={projectImage}>
								<img className={image} src={newImagesPathsArr[2]} alt=""/>
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