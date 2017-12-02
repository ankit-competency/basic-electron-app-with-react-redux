import { combineReducers } from 'redux';
import counterReducer from './counter.reducer';
import api from './api';
import entities from './entities';
const rootReducer = combineReducers({
    counterReducer,
    api,
    entities
})

export default rootReducer;
