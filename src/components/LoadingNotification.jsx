import React from "react";
import s from "./LoadingNotification.scss";



export default class LoadingNotification extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			shown: false
		};

		this.tl = new TimelineMax();
	}

	shouldComponentUpdate(nextProps, nextState) {
		let shown = nextProps.shown;

		if (shown) {
			this.showLoadingNotice();
		} else {
			this.hideLoadingNotice();
		}
		return false;
	}

	showLoadingNotice() {
		this.tl.to(this.loadingNotice, 0.75, {alpha:1.0})
			   .to(this.loadingNotice, 0.75, {alpha:0.1, repeatDelay:0, repeat:-1, yoyo:true});
		this.tl.play();
		
	}

	hideLoadingNotice() {
		this.tl.to(this.loadingNotice, 0.75, {alpha:0.0, yoyo: false, repeat: 0});
	}

	render() {
		let loading = s["loading"];
		
		return (
			<div className={loading} ref={ div => this.loadingNotice = div}>
				<div>LOADING</div>
			</div>
		);
	}

}