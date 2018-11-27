import React from "react";
import ReactDOM from "react-dom";
import style from "./panel01.scss";
import { 
    TweenMax,
    TimelineMax,
    AttrPlugin,
    CSSPlugin
} from "gsap";

const activated = [
    TweenMax,
    TimelineMax,
    AttrPlugin,
    CSSPlugin
];


export default class Panel01 extends React.Component {
	constructor(props) {
		super(props);
		this.state={

		}
	}

	componentDidMount() {
		// TweenMax.to(this, 1, {x:100, y:100});
		const node = ReactDOM.findDOMNode(this);
		this.loaderTween = TweenMax.to(node, 1, {
			x: "200px", ease: Expo.easeInOut, delay: 2
		});
	}

	changeColor(){
		console.log("RED")
		TweenMax.to(this.thirdBox, 0.75, {backgroundColor: "red", ease: Expo.easeOut});
	}

	resetColor() {
		TweenMax.to(this.thirdBox, 0.5, {backgroundColor: "white", ease: Power4.easeOut});
	}

	render() {
		return(
			<div id={style.panel}>
				<div>This is Panel 1</div>
				<div className={style.box}>
					Box 1
				</div>
				<div className={style.box}>
					Box 2
				</div>
				<div className={style.box} 
					 onMouseEnter={this.changeColor.bind(this)} 
        			 onMouseLeave={this.resetColor.bind(this)}
        			 ref={div => this.thirdBox = div}>
					Box 3
				</div>
			</div>
		)
	}


}


