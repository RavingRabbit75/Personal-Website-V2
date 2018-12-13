import React from "react";
import s from "./Footer.scss";
import Iconlink from "./Iconlink.jsx";


export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	renderIconLinks() {
		let iconLinks;
		if (this.props.globalicons){
			iconLinks = this.props.globalicons.map( (icon, idx, arr)=> {
				let rowPosition;
				if(idx === 0) {
					rowPosition = "left";
				} else if (idx === arr.length-1) {
					rowPosition = "right";
				} else {
					rowPosition = "middle";
				}
				return <Iconlink key={idx} section="footer" rowPosition={rowPosition} url={icon.link} linkData={icon}/>;
			});
		}
		
		return iconLinks;
	}

	render() {

		let footer = s["footer"];

		let icon = s.divspan + " " + s["header-icon-size"];
		let iconMiddle = s.divspan + " " + s["header-icon-size"] + " " + s.iconmiddle;
		let iconPosition = s.iconposition;
		let iconPosition_over = s.iconposition + " " + s.iconover;

		let headerIconLinks = s["header-icon-links"] + " " + s["text-center"];

		return(
			<React.Fragment>
				<div id="footer" className={footer}>
					<div id="header-icon-links" className={headerIconLinks}>
						{this.renderIconLinks()}
					</div>
				</div>
			</React.Fragment>
		);
	}
}