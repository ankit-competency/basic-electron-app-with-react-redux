import React, { Component, PropTypes } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Radium, {Style} from "radium";
const style = {
        ".container": {
            // backgroundColor: "#E3E4E9",
            // border: "1px solid #ccc",
            // padding: "15px",
            // position: "fixed",
            // bottom: "0px",
            // zIndex: "0",
            // width: "100%",
        },
       
};

class Counter extends Component {

    render() {
        let count = this.props.count;
        //console.log(this.props.users);
        return (
        <div className="container-fluid">
            <BootstrapTable data={this.props.users} striped hover>
                <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
                <TableHeaderColumn dataField='phone'>Phone</TableHeaderColumn>

            </BootstrapTable>

		 
			 <Style rules={style}/>
				Ankit
            <span id='count-value'>{count}</span>
            <span id='add-btn' onClick={() => this.props.addCount(count)}>Add</span>
            <span id='sub-btn' onClick={() => this.props.subCount(count)}>Sub</span>
        </div>
        )
    }

}

export default Radium(Counter);
