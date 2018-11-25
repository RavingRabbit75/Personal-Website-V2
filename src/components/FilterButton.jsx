import React from "react";


export default class FilterButton extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			activated: true
		}
	}

	render() {
		const buttonBox ={
			display: "inline-block",
			marginRight: "20px",
			marginBottom: "10px"
		}

		const buttonStyles = {
			color: "#FFF",
			textTransform: "uppercase"
		}

		const indicator = {
			backgroundColor: "#FF7D7D",
			height: "2px",
			width: "100%"
		}

		return(
			<div style={buttonBox}>
				<span style={buttonStyles}>{this.props.title}</span>
				<div style={indicator}></div>
			</div>
		);
	
	}

}