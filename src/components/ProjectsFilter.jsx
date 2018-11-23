import React from "react";
import s from "./Project.css";


export default class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		}
	}

	render() {
		let itemContainer = s["item-container"]
		let itemTitle = s["item-title"]
		let itemSubcontainer = s["item-subcontainer"]
		let itemEdgeHighlight = s["item-edge-highlight"]
		let itemEdgeWall = s["item-edge-wall"]

		let dud = 2;
		let titleName = "Projects Filter"
		// if(dud==1) {
		// 	titleName = "Weather Animator"
		// } else {
		// 	titleName = "Space Bomber"
		// }
		// 16212A
		let itemContent = s["item-content"]
		const bgColor = {
			backgroundColor: "#16212A",
			width: "560px",
			height: "93px"
		}

		return(
			<React.Fragment>
				Projects Filter
				<div id="" style={bgColor}>
					some dumb block

				</div>
			</React.Fragment>
		);
	}
}