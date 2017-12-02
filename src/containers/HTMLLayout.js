import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addCount, subCount} from "../redux/action/counter.action";
import {fetchPosts, SUFFIX_USERS} from "../redux/action";
import {USERS} from "../redux/middleware/api";
import * as Api from "../redux/reducer/api";
import * as Entities from "../redux/reducer/entities";
import MainContainer from "./MainContainer";

export class HTMLLayout extends Component {

    componentWillMount() {
        console.log(this.props);
        const {dispatch} = this.props;
        dispatch(fetchPosts());
    }
    render() {
        return (
            <MainContainer {...this.props}/>
        )
    }

}

const mapStateToProps = (state) => {


    let users = Entities.getEntitiesByIds(
        state,
        USERS,
        Api.getIds(state, SUFFIX_USERS)
    ).map((user) => {
        return user;
    });

    let size = 3;
    users = users.slice(0, size).map(i => {
        return i;
    });
    return {
        count: state.counterReducer.count,
        users
    }
};


const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const {dispatch} = dispatchProps;
    return Object.assign({}, ownProps, stateProps, dispatchProps, {
        addCount: (value) => {
            dispatch(addCount(value));
        },
        subCount: (value) => {
            dispatch(subCount(value));
        }
    });
};

export default connect(mapStateToProps, null, mergeProps)(HTMLLayout)

