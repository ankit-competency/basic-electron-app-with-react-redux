import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './containers/Root';
import createLogger from 'redux-logger';

import DevTools from './containers/DevTools';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


import {createStore, applyMiddleware, compose} from 'redux';

import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './redux/reducer';

import dashboardApi from './redux/middleware/api';

import './styles/main.css';
//import '../node_modules/font-awesome/css/font-awesome.min.css';

const logger = createLogger();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware,
            dashboardApi,
	        logger
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
	  // Required! Enable Redux DevTools with the monitors you chose
	  DevTools.instrument()
    )
);

const Routes = () => (
    <Router>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
    </Router>
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);


ReactDOM.render(
 <Root store={store} routes={Routes}/>,
 document.getElementById('root')
);

// ReactDOM.render(
//     <Provider store={store}>
//         <BasicExample/>
//     </Provider>,
//     document.getElementById('root')
// );
