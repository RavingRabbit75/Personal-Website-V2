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
			marginRight: "15px",
			marginBottom: "15px",
		}

		const buttonStyles = {
			color: "#949494",
			textTransform: "uppercase",
			fontFamily: "Open Sans Condensed, sans-serif",
			fontSize: "12pt"
		}

		const indicator = {
			backgroundColor: "#FF7D7D",
			height: "2px",
			width: "0%"
		}

		if(this.props.activated) {
			indicator.width = "100%";
			buttonStyles.color="#FFF";
		}
		

		return(
			<div style={buttonBox}>
				<span style={buttonStyles}>{this.props.title}</span>
				<div style={indicator}></div>
			</div>
		);
	
	}

}