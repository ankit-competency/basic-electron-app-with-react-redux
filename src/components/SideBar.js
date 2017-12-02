import React, {Component, PropTypes} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import TodoContainer from "../containers/TodoContainer";

class SideBar extends Component {

    render() {

        return (
            <Router>
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <Link to="/todo">React...</Link>
                        </li>
                        <li>
                            <Link to="/todo">React Redux...</Link>
                        </li>
                        <li>

                            <Link to="/todo">React Flux...</Link>
                        </li>
                        <li>
                            <Link to="/todo">React Bootstrap...</Link>
                        </li>
                        <li>
                            <Link to="/about">React Router...</Link>
                        </li>
                        <li>
                            <Link to="/todo">React Thunk...</Link>
                        </li>
                        { /*<Route path="/todo" component={TodoContainer}/>*/}
                    </ul>
                </div>
            </Router>
        )
    }

}

export default SideBar;
