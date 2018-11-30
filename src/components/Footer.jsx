import React from "react";
import s from "./Footer.scss";
import Iconlink from "./Iconlink.jsx";
import icon_mail from "./imgs/iconFooter_mail.svg";
import icon_mail_over from "./imgs/iconFooter_mail_over.svg";
import icon_linkedin from "./imgs/iconFooter_linkedin.svg";
import icon_linkedin_over from "./imgs/iconFooter_linkedin_over.svg";
import icon_github from "./imgs/iconFooter_github.svg";
import icon_github_over from "./imgs/iconFooter_github_over.svg";


export default class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		};
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
						<Iconlink section="footer" rowPosition="left" type="mail" url=""/>
						<Iconlink section="footer" rowPosition="middle" type="linkedin" url=""/>
						<Iconlink section="footer" rowPosition="right" type="github" url=""/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}