import React from "react";
import styles from "./ProjectsFilter.scss";
import FilterButton from "./FilterButton.jsx";
import FilterHelpTip from "./FilterHelpTip.jsx";

export default class Project extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			filters:[]
		};
	}

	componentDidMount() {
		fetch("api/v1/projects/filters", {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		}).then(result => result.json())
		.then(result => {
			const filtersList = result.filters.map((filterItem, idx) => {
				return {"id": filterItem[0], "filterName": filterItem[1], "active": true};
			});
			this.setState({
				isLoaded: true,
				filters: filtersList
			});
		});
	}

	toggleFilter(filterObj) {
		const newFiltersList = this.state.filters.map((filterItem, idx) => {
			let activeStatus = filterItem.active;
			if (filterObj.id === filterItem.id) {
				if(activeStatus){
					activeStatus = false;
				} else {
					activeStatus = true;
				}
			}
			return {"id": filterItem.id, "filterName": filterItem.filterName, "active": activeStatus};
		});
		this.setState({
			filters: newFiltersList
		});
		this.props.updateFunc(newFiltersList);
	}

	render() {
		const filtersTitleRow = styles["filters-title-row"]
		const filtersTitle = styles["filters-title"];
		const topEdge = styles["top-edge"];
		const bottomEdge = styles["bottom-edge"];
		const filterBox = styles["filter-box"];
		const box = styles["box"];

		return(
			<React.Fragment>
				<div className={filtersTitleRow}>
					<FilterHelpTip/>
					<div className={filtersTitle}>PROJECT FILTERS</div>
				</div>
				<div id="filterBox" className={filterBox}>
					<div id="topEdge" className={topEdge} />
					<div id="box" className={box}>
						{
							this.state.filters.map((filter, idx) => {
								return <FilterButton key={filter.id} title={filter.filterName} active={filter.active} toggleFilterFunc={this.toggleFilter.bind(this, filter)}/>;
							})
						}
					</div>
					<div id="bottomEdge" className={bottomEdge} />
				</div>
			</React.Fragment>
		);
	}
}