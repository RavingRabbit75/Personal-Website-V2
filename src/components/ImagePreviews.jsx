import React from "react";
import s from "./ImagePreviews.scss";


export default class ImagePreviews extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			
		};

		this.myState={
			imageOnTop: "A",
			currentImageSet: 1
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		let nextImageSet = nextProps.newImageSet;
		if (nextImageSet !== this.myState.currentImageSet) {
			this.animateToNextImage(nextImageSet);
		}
		return false;
	}


	animateToNextImage(nextImageSet) {
		let topImageRef;
		let topWrapper;
		let topImgTagRef;

		let bottomImageRef;
		let bottomWrapper;
		let bottomImgTagRef;
		
		if (this.myState.imageOnTop === "A") {
			topImageRef = this.imageA;
			topWrapper = this.imageAWrapper1;
			topImgTagRef = this.imgTagA;
			
			bottomImageRef = this.imageB;
			bottomWrapper = this.imageBWrapper1;
			bottomImgTagRef = this.imgTagB;
		} else {
			topImageRef = this.imageB;
			topWrapper = this.imageBWrapper1;
			topImgTagRef = this.imgTagB;

			bottomImageRef = this.imageA;
			bottomWrapper = this.imageAWrapper1;
			bottomImgTagRef = this.imgTagA;
		}
		const imgHeight = window.getComputedStyle(topImageRef, null).getPropertyValue("height");
		const newTopLoc = "-" + imgHeight;

		const imagePathsArr = this.props.imageFilenames.filter((item) => {
			return item[1] === nextImageSet;
		}).map((item, idx) => {
			return item[0];
		});


		/////////  Loading

		bottomImgTagRef.addEventListener("load", hiddenPreviewsHandler.bind(this));
		bottomImgTagRef.src=imagePathsArr[0];

		// var hiddenPreviews = $("div[id*='" + projid + "'].bottom").find(".image");
		function hiddenPreviewsHandler() {
			bottomImgTagRef.removeEventListener("load", hiddenPreviewsHandler.bind(this));
			startAnimation.call(this);
		}
		
		function startAnimation() {
			TweenMax.to(topImageRef, 0.75, {top: newTopLoc});
			TweenMax.to(bottomWrapper, 0.3, {padding: 0, delay: .7});
			TweenMax.to(bottomWrapper, 0.3, {boxShadow: "0 0 5px rgba(0, 0, 0, .4)", delay: 1, onComplete: setClasses.bind(this)});
		}

		////////  Loading

		function setClasses() {
			const previewsRow = s["previews-row"];
			const previewsRow2 = s["previews-row2"];
			const top = s["top"];
			const bottom = s["bottom"];
			const shadowOn = s["shadow-on"];
			const shadowOff = s["shadow-off"];

			const previewSingleWrapper = s["preview-single-wrapper"];
			const previewSingleWrapper2 = s["preview-single-wrapper2"];

			topImageRef.className = previewsRow2 + " " + bottom;
			topWrapper.className = previewSingleWrapper2 + " " + shadowOff;

			bottomImageRef.className = previewsRow + " " + top;
			bottomWrapper.className = previewSingleWrapper + " " + shadowOn;
			
			TweenMax.set(topImageRef, {top: 5});
			TweenMax.set(bottomImageRef, {top: 5});
			TweenMax.set(topWrapper, {boxShadow: "0 0 0 rgba(0, 0, 0, 0)", padding: 8});
			TweenMax.set(topWrapper, {paddingTop: 5});

			if (this.myState.imageOnTop === "A") {
				this.myState.imageOnTop = "B";
			} else {
				this.myState.imageOnTop = "A";
			}

			this.myState.currentImageSet = nextImageSet;
			this.props.ready();
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

		const imagePathsArr = this.props.imageFilenames.filter((item) => {
			return item[1] === this.props.newImageSet;
		}).map((item, idx) => {
			return item[0];
		});

		let imagePathA;
		let imagePathB = "";

		imagePathA = imagePathsArr[0];

		if(this.props.layout === 1){
			if(this.props.linkOnImage) {
				layoutJSX = 
				<a href={this.props.linkOnImage[1]} target="_blank"><div className={wrapper}>	
					<div id="" className={previewsRow + " " + top} ref={div => this.imageA = div}>
						<div className={previewSingleWrapper + " " + shadowOn} ref={div => this.imageAWrapper1 = div}>
							<div className={projectImage}>
								<img className={image} 
									 src={imagePathA}
									 ref={div => this.imgTagA = div}/>
							</div>
						</div>
					</div>
					<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
						<div className={previewSingleWrapper2 + " " + shadowOff} ref={div => this.imageBWrapper1 = div}>
							<div className={projectImage}>
								<img className={image} 
									 src={imagePathB}
									 ref={div => this.imgTagB = div} />
							</div>
						</div>
					</div>
				</div></a>;
			} else {
				layoutJSX = 
				<div className={wrapper}>

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