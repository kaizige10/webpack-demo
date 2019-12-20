import React, {
    Component
} from "react";
import ReactDom from "react-dom";
// import Box from './box.js'
import("lodash")
import("./index.less")
import {
    add
} from './expo.js'

console.log(add(1, 2));
// _.find([]);


class App extends Component {
    render() {
        return <div > hello world  <Box></Box></div>;
    }
}

ReactDom.render(< App />, document.getElementById("app"));