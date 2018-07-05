import React from "react";
import s from "./Footer.css";
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

		}
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
						 
						<a className="" href=""><div className={icon}>
							<img className={iconPosition} src={icon_mail} alt="" />
							<img className={iconPosition_over} src={icon_mail_over} alt="" /> 
						</div></a>
						<a className="" href="" target="blank"><div className={iconMiddle}>
							<img className={iconPosition} src={icon_linkedin} alt="" />
							<img className={iconPosition_over} src={icon_linkedin_over} alt="" />
						</div></a>
						<a className="" href="" target="blank"><div className={icon}>
							<img className={iconPosition} src={icon_github} alt="" />
							<img className={iconPosition_over} src={icon_github_over} alt="" />
						</div></a>

					</div>
				</div>
			</React.Fragment>
		);
	}
}