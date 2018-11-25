import React from "react";
import s from "./Project.css";
import FilterButton from "./FilterButton.jsx";


export default class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			filters:[]
		}
	}

	componentDidMount() {
		fetch("api/v1/projects/filters", {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		}).then(result => result.json())
		.then(result => {
			this.setState({
				isLoaded: true,
				filters: result.filters
			})
		})

	}

	render() {
		let itemContainer = s["item-container"];
		let itemTitle = s["item-title"];
		let itemSubcontainer = s["item-subcontainer"];
		let itemEdgeHighlight = s["item-edge-highlight"];
		let itemEdgeWall = s["item-edge-wall"];

		let dud = 2;
		let titleName = "Projects Filter";
		let itemContent = s["item-content"];

		const filtersTitle ={
			marginLeft: "auto",
			marginRight: "auto",
			textAlign: "center",
			color: "#FFF",
			marginTop: "15px"
		}

		const topEdge ={
			position: "absolute",
			top: "0px",
			left: "0px",
			backgroundColor: "#404B57",
			width: "560px",
			height: "2px"
		}

		const bottomEdge ={
			position: "absolute",
			bottom: "0px",
			left: "0px",
			backgroundColor: "#A1ADBA",
			width: "560px",
			height: "2px"
		}

		const filterBox = {
			marginLeft: "auto",
			marginRight: "auto",
			position: "relative",
			backgroundColor: "#16212A",
			width: "560px",
			paddingLeft: "20px",
			paddingRight: "20px",
			paddingTop: "15px",
			paddingBottom: "15px"
		}

		const box = {
			// border: "1px dashed yellow"
			textAlign: "center"
		}

		return(
			<React.Fragment>
				<div style={filtersTitle}>PROJECT FILTERS</div>
				<div id="filterBox" style={filterBox}>
					<div id="topEdge" style={topEdge} />
					<div id="box" style={box}>
						{
							this.state.filters.map((filter) => {
								return <FilterButton key={filter[0]} title={filter[1]}/>
							})
						}
					</div>
					<div id="bottomEdge" style={bottomEdge} />
				</div>
			</React.Fragment>
		);
	}
}