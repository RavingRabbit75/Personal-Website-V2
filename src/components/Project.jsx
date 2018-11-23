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
		let titleName = this.props.prjName
		// if(dud==1) {
		// 	titleName = "Weather Animator"
		// } else {
		// 	titleName = "Space Bomber"
		// }

		let itemContent = s["item-content"]

		return(
			<React.Fragment>
				<div id="" className={itemContainer}>
					<div className={itemTitle}>
						{titleName}
					</div>
					<div className={itemSubcontainer}>
						<div className={itemEdgeHighlight}></div>
						<div className={itemEdgeWall}>
						</div>
						<div className="container-fluid">
							<div className={itemContent}>
								<div className="images-container">
									<div className="project-image-slot"></div>
									<div className="project-slot-clipper">

									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={itemEdgeHighlight}></div>
				</div>
			</React.Fragment>
		);
	}
}