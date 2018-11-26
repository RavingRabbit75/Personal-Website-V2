import React from "react";
import styles from "./Project.scss";
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
		let itemContainer = styles["item-container"];
		let itemTitle = styles["item-title"];
		let itemSubcontainer = styles["item-subcontainer"];
		let itemEdgeHighlight = styles["item-edge-highlight"];
		let itemEdgeWall = styles["item-edge-wall"];

		let titleName = "Projects Filter";
		let itemContent = styles["item-content"];

		const filtersTitle = styles["filters-title"];

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
			paddingLeft: "10px",
			paddingRight: "10px",
			paddingTop: "15px",
			paddingBottom: "10px"
		}

		const box = {
			// border: "1px dashed yellow",
			textAlign: "center"
		}

		return(
			<React.Fragment>
				<div className={filtersTitle}>PROJECT FILTERS</div>
				<div id="filterBox" style={filterBox}>
					<div id="topEdge" style={topEdge} />
					<div id="box" style={box}>
						{
							this.state.filters.map((filter, idx) => {
								let status = false;
								if([1,3,4].indexOf(idx) > -1){
									status = true;
								}
								return <FilterButton key={filter[0]} title={filter[1]} activated={status}/>
							})
						}
					</div>
					<div id="bottomEdge" style={bottomEdge} />
				</div>
			</React.Fragment>
		);
	}
}