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
		let topWrappers=[];
		let topImgTagRefs=[];

		let bottomImageRef;
		let bottomWrappers=[];
		let bottomImgTagRefs=[];

		if (this.myState.imageOnTop === "A") {
			topImageRef = this.imageA;
			bottomImageRef = this.imageB;

			if (this.props.layout >= 1) {
				topWrappers.push(this.imageAWrapper1);
				topImgTagRefs.push(this.imgATag1);
				bottomWrappers.push(this.imageBWrapper1);
				bottomImgTagRefs.push(this.imgBTag1);
			}
			if (this.props.layout >= 2) {
				topWrappers.push(this.imageAWrapper2);
				topImgTagRefs.push(this.imgATag2);
				bottomWrappers.push(this.imageBWrapper2);
				bottomImgTagRefs.push(this.imgBTag2);
			}
			if (this.props.layout >= 3) {
				topWrappers.push(this.imageAWrapper3);
				topImgTagRefs.push(this.imgATag3);
				bottomWrappers.push(this.imageBWrapper3);
				bottomImgTagRefs.push(this.imgBTag3);
			}

		} else {
			topImageRef = this.imageB;
			bottomImageRef = this.imageA;

			if (this.props.layout >= 1) {
				topWrappers.push(this.imageBWrapper1);
				topImgTagRefs.push(this.imgBTag1);
				bottomWrappers.push(this.imageAWrapper1);
				bottomImgTagRefs.push(this.imgATag1);
			}
			if (this.props.layout >= 2) {
				topWrappers.push(this.imageBWrapper2);
				topImgTagRefs.push(this.imgBTag2);
				bottomWrappers.push(this.imageAWrapper2);
				bottomImgTagRefs.push(this.imgATag2);
			}
			if (this.props.layout >= 3) {
				topWrappers.push(this.imageBWrapper3);
				topImgTagRefs.push(this.imgBTag3);
				bottomWrappers.push(this.imageAWrapper3);
				bottomImgTagRefs.push(this.imgATag3);
			}

		}

		const imgHeight = window.getComputedStyle(topImageRef, null).getPropertyValue("height");
		const newTopLoc = "-" + imgHeight;

		const imagePathsArr = this.props.imageFilenames.filter((item) => {
			return item[1] === nextImageSet;
		}).map((item, idx) => {
			return item[0];
		});


		/////////  Loading
		let imagesLoaded=0;
		bottomImgTagRefs.forEach((item, idx) => {
			item.addEventListener("load", hiddenPreviewsHandler.bind(this));
			item.src=imagePathsArr[idx];
		});

		function hiddenPreviewsHandler(evt) {
			imagesLoaded++;
			evt.target.removeEventListener("load", hiddenPreviewsHandler.bind(this));
			if (imagesLoaded >= bottomImgTagRefs.length) {
				startAnimation.call(this);
			}
		}
		
		function startAnimation() {
			TweenMax.to(topImageRef, 0.75, {top: newTopLoc});

			bottomWrappers.forEach((item, idx, arr)=>{
				TweenMax.to(item, 0.3, {padding: 0, delay: .7});
				if (idx === arr.length-1){
					TweenMax.to(item, 0.3, {boxShadow: "0 0 5px rgba(0, 0, 0, .4)", delay: 1, onComplete: setClasses.bind(this)});
				} else {
					TweenMax.to(item, 0.3, {boxShadow: "0 0 5px rgba(0, 0, 0, .4)", delay: 1});
				}
				
			});
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
			const previewDoubleWrapper = s["preview-double-wrapper"];
			const previewDoubleWrapper2 = s["preview-double-wrapper2"];
			const previewTripleWrapper = s["preview-triple-wrapper"];
			const previewTripleWrapper2 = s["preview-triple-wrapper2"];
			const projectImageBuffer = s["project-image-buffer"];

			topImageRef.className = previewsRow2 + " " + bottom;

			topWrappers.forEach((item, idx)=>{
				let wrapperType;
				if (this.props.layout===1) {
					wrapperType = previewSingleWrapper2;
				} else if (this.props.layout===2) {
					wrapperType = previewDoubleWrapper2;
				} else if (this.props.layout===3) {
					wrapperType = previewTripleWrapper2;
				}

				if(idx !== 0) {
					item.className = wrapperType + " " + projectImageBuffer + " " + shadowOff;
				} else {
					item.className = wrapperType + " " + shadowOff;
				}
			});

			bottomImageRef.className = previewsRow + " " + top;

			bottomWrappers.forEach((item, idx, arr)=>{
				let wrapperType;
				if (this.props.layout===1) {
					wrapperType = previewSingleWrapper;
				} else if (this.props.layout===2) {
					wrapperType = previewDoubleWrapper;
				} else if (this.props.layout===3) {
					wrapperType = previewTripleWrapper;
				}

				if(idx !== 0) {
					item.className = wrapperType + " " + projectImageBuffer + " " + shadowOn;
				} else {
					item.className = wrapperType + " " + shadowOn;
				}
				
			});
			
			TweenMax.set(topImageRef, {top: 5});
			topWrappers.forEach((item, idx)=>{
				TweenMax.set(item, {boxShadow: "0 0 0 rgba(0, 0, 0, 0)", padding: 8});
				TweenMax.set(item, {paddingTop: 5});
			});

			TweenMax.set(bottomImageRef, {top: 5});

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
		let blankSrc = "";

		imagePathA = imagePathsArr[0];

		if(!this.props.linkOnImage) {

			layoutJSX = 
			<div className={wrapper}>

			</div>;

		} else {

			if (this.props.layout === 1) {

				if(this.props.linkOnImage) {
					layoutJSX = 
					<a href={this.props.linkOnImage[1]} target="_blank"><div className={wrapper}>	
						<div id="" className={previewsRow + " " + top} ref={div => this.imageA = div}>
							<div className={previewSingleWrapper + " " + shadowOn} ref={div => this.imageAWrapper1 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={imagePathA}
										 ref={div => this.imgATag1 = div}
										 alt="" />
								</div>
							</div>
						</div>
						<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
							<div className={previewSingleWrapper2 + " " + shadowOff} ref={div => this.imageBWrapper1 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={blankSrc}
										 ref={div => this.imgBTag1 = div} 
										 alt="" />
								</div>
							</div>
						</div>
					</div></a>;
				}

			} else if (this.props.layout === 2) {

				if(this.props.linkOnImage) {
					layoutJSX = 
					<a href={this.props.linkOnImage[1]} target="_blank"><div className={wrapper}>
						<div id="" className={previewsRow + " " + top} ref={div => this.imageA = div}>
							<div className={previewDoubleWrapper + " " + shadowOn} ref={div => this.imageAWrapper1 = div}>
								<div className={projectImage}>
									<img className={image}
										 src={imagePathsArr[0]}
										 ref={div => this.imgATag1 = div}
										 alt="" />
								</div>
							</div>
							<div className={previewDoubleWrapper + " " + projectImageBuffer + " " + shadowOn} ref={div => this.imageAWrapper2 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={imagePathsArr[1]}
										 ref={div => this.imgATag2 = div}
										 alt="" />
								</div>
							</div>
						</div>
						<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
							<div className="preview-double-wrapper2 shadow-off" ref={div => this.imageBWrapper1 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={blankSrc}
										 ref={div => this.imgBTag1 = div}
										 alt="" />
								</div>
							</div>
							<div className={previewDoubleWrapper + " " + projectImageBuffer + " " + shadowOn} ref={div => this.imageBWrapper2 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={blankSrc}
										 ref={div => this.imgBTag2 = div}
										 alt="" />
								</div>
							</div>
						</div>
					</div></a>;
				}

			} else if (this.props.layout === 3) {

				if(this.props.linkOnImage) {
					layoutJSX = 
					<a href={this.props.linkOnImage[1]} target="_blank"><div className={wrapper}>
						<div id="" className={previewsRow + " " + top} ref={div => this.imageA = div}>
							<div className={previewTripleWrapper + " " + shadowOn} ref={div => this.imageAWrapper1 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={imagePathsArr[0]}
										 ref={div => this.imgATag1 = div}
										 alt=""/>
								</div>
							</div>
							<div className={previewTripleWrapper + " " + projectImageBuffer + " "+ shadowOn} ref={div => this.imageAWrapper2 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={imagePathsArr[1]}
										 ref={div => this.imgATag2 = div}
										 alt=""/>
								</div>
							</div>
							<div className={previewTripleWrapper + " " + projectImageBuffer + " "+ shadowOn} ref={div => this.imageAWrapper3 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={imagePathsArr[2]}
										 ref={div => this.imgATag3 = div}
										 alt=""/>
								</div>
							</div>
						</div>
						<div id="" className={previewsRow2 + " " + bottom} ref={div => this.imageB = div}>
							<div className={previewTripleWrapper2 + " " + shadowOff} ref={div => this.imageBWrapper1 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={blankSrc}
										 ref={div => this.imgBTag1 = div}
										 alt=""/>
								</div>
							</div>
							<div className={previewTripleWrapper2 + " " + projectImageBuffer + " " + shadowOff} ref={div => this.imageBWrapper2 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={blankSrc}
										 ref={div => this.imgBTag2 = div}
										 alt=""/>
								</div>
							</div>
							<div className={previewTripleWrapper2 + " " + projectImageBuffer + " " + shadowOff} ref={div => this.imageBWrapper3 = div}>
								<div className={projectImage}>
									<img className={image} 
										 src={blankSrc}
										 ref={div => this.imgBTag3 = div}
										 alt=""/>
								</div>
							</div>
						</div>
					</div></a>;
				}

			}

		}

		return(
			<React.Fragment>
				{layoutJSX}				
			</React.Fragment>
		);
	}


}