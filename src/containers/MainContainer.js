import React, {Component} from "react";
import FontAwesomeIcon from "../components/FontAwesomeIcon";
import SideBar from "../components/SideBar";
import Counter from "../components/Counter";
export class MainContainer extends Component {

    constructor(...props) {
        super(...props);
        console.log("this.props.routes",this.props.routes);
        console.log("this.props.children",this.props.children);
        this.state = {
            toggled: true
        };
    }

    toggleHandler() {
        this.setState({
            toggled: !this.state.toggled
        });
    }

    render() {

        return (
            <div id="wrapper" className={ this.state.toggled ? 'toggled' :  null}>

                <SideBar {...this.props}/>
                {this.props.routes}
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <a onClick={ () => this.toggleHandler() }>
                            <FontAwesomeIcon icon="bars" className={ !this.state.toggled ? 'fa-rotate-90' :  null}/>
                        </a>

                        <section className="content">{this.props.children}</section>

                        <Counter count={this.props.count} users={this.props.users} addCount={this.props.addCount}
                                 subCount={this.props.subCount}/>
                        { /*<h1>Simple Sidebar</h1>
                        < p > This template has a responsive menu toggling system. The menu will appear collapsed on
                            smaller screens, and will appear non-collapsed on larger screens. When toggled using the
                            button below, the menu will appear/disappear. On small screens, the page content will be
                            pushed off canvas.</p>
                            <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                        */}
                    </div>
                </div>
            </div>
        );
    }
}
export default MainContainer;

