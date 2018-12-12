import React from "react";
import s from "./DateTime.scss";

export default class DateTime extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
	}

	componentDidMount() {
		this.startTime();
		let t = setInterval(function() {
			this.startTime();
		}.bind(this), 5000);
	}

	startTime() {
		let today=new Date();
		let year=today.getFullYear();
		let month=adjustMonth(today.getMonth());
		let date=today.getDate();
		let day=adjustDay(today.getDay());
		let h=adjustHours(today.getHours());
		let antePostMeridiem=getAntePostMeridiem(today.getHours());
		let m=today.getMinutes();
		
		m = addZero(m);
		document.getElementById("current-date").innerHTML = day + " " + month+" "+ date +", " + year+"<br>\n"+h+":"+m +" "+ antePostMeridiem;

		function getAntePostMeridiem(hour){
			if(hour < 12){
				return "AM";
			} else {
				return "PM";
			}
		}

		function adjustMonth(i) {
		   let month = new Array();
		   month[0] = "January";
		   month[1] = "February";
		   month[2] = "March";
		   month[3] = "April";
		   month[4] = "May";
		   month[5] = "June";
		   month[6] = "July";
		   month[7] = "August";
		   month[8] = "September";
		   month[9] = "October";
		   month[10] = "November";
		   month[11] = "December";
		   let n = month[i];
		   return n;
		}

		function adjustDay(i) {
		   switch(i) {
			  case 0:
				 day = "Sunday";
				 break;
			  case 1:
				 day = "Monday";
				 break;
			  case 2:
				 day = "Tuesday";
				 break;
			  case 3:
				 day = "Wednesday";
				 break;
			  case 4:
				 day = "Thursday";
				 break;
			  case 5:
				 day = "Friday";
				 break;
			  case 6:
				 day = "Saturday";
				 break;
			  default:
				 console.log("no day picked");
		   }

		   return day;
		}

		function adjustHours(i){
			if (i > 12) {
				i = i - 12;
			} else if (i == 0) {
				i = 12;
			}
			return i;
		}

		function addZero(i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}
	}


	render() {
		let currentDate = s["date-text"] + " " + s["text-center"];
		
		return(
			<React.Fragment>
				<div id="current-date" className={currentDate}>Sunday January 1, 2000</div>
			</React.Fragment>
		);

	}

}