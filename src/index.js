import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
require("./index.html");

ReactDOM.render(<App sectionName={sectionName}/>, document.getElementById("app"));