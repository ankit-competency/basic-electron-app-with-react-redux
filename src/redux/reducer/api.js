import * as ActionTypes from '../action';
import merge from 'lodash.merge';
export const STATE_KEY = 'api';
export const STATE = {isFetching: false, ids: [], lastUpdated: null};

function updateSchema(state = STATE, action) {
    let type = action.type;
    if (typeof type == 'string') {
        type = type.substring(0, 14);
    }
    switch (type) {
        case ActionTypes.ENTITY_REQUEST:
            return merge({}, state, {
                isFetching: true,
                error: undefined,
                success: undefined
            });
        case ActionTypes.ENTITY_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                ids: action.response.result,
                lastUpdated: action.response.lastUpdated,
                success: true
            },{ //Error will reset with undefined if Api response is successful
                error: undefined,
                status: undefined,
                body: undefined
            });
        case ActionTypes.ENTITY_FAILURE:
            return merge({}, state, {
                isFetching: false,
                success: false
            },{
                error: action.error,
                status: action.status,
                body: action.body
            });
        default:
            return state;
    }
}

export default function updateApi(state = {}, action) {
    if (action && action.hasOwnProperty('schema')) {
        const {type} = action;
        let {schema:index} = action;
        if (
            (
                type.startsWith(ActionTypes.ENTITY_FAILURE) ||
                type.startsWith(ActionTypes.ENTITY_REQUEST) ||
                type.startsWith(ActionTypes.ENTITY_SUCCESS)
            ) && type.length > 14) {
            index = type.substring(14);
        }
        return Object.assign({}, state, {[index]: updateSchema(state[index], action)});
    }
    return state;
};

/**
 *
 *
 * @param state - the current store state
 * @param schemaName - The schema is typically the key used for the entity as defined by the middleware api.
 *
 * @returns {boolean}
 */
export const getIsFetching = (state, schemaName) => {
    const api = getName(state, schemaName);
    if (api && api.hasOwnProperty('isFetching')) {
        return api.isFetching;
    }
    return false;
};

export const getName = (state, schemaName) => {
    const keyState = getApi(state);
    if (keyState && keyState.hasOwnProperty(schemaName)) {
        return keyState[schemaName];
    }
    return null;
};

export const getApi = (state) => {

    if (state.hasOwnProperty(STATE_KEY)) {
        return state[STATE_KEY];
    }
    return null;
};

export const hasError = (state, schemaName) => {
    const api = getName(state, schemaName);
    return api && api.hasOwnProperty('error') && api['error'];
};

export const getError = (state, schemaName) => {
    if (hasError(state, schemaName)) {
        const api = getName(state, schemaName);
        return api['error'];
    }
    return null;
};

export const hasBody = (state, schemaName) => {
    const api = getName(state, schemaName);
    return api && api.hasOwnProperty('body') && api['body'];
};

export const getBody = (state, schemaName) => {
    if (hasBody(state, schemaName)) {
        return getName(state, schemaName)['body'];
    }
    return null;
};

export const isSuccessful = (state, schemaName) => {
    const api = getName(state, schemaName);
    return !!(api && api.hasOwnProperty('success') && api['success']);

};

export const hasStatusCode = (state, schemaName) => {
    const api = getName(state, schemaName);
    return !!(api && api.hasOwnProperty('status') && api['status']);

};

export const getStatusCode = (state, schemaName) => {
    if (hasStatusCode(state, schemaName)) {
        const api = getName(state, schemaName);
        return api['status'];
    }
    return null;
};

/**
 *
 * @param state - the current store state
 * @param type - the page you want to fetch api information about.
 * @returns {Array}
 */
export const getIds = (state, type) => {
    const api = getName(state, type);
    if (api && api.hasOwnProperty('ids')) {
        return api.ids;
    }
    return [];
};

/**
 *
 * @param state - the current store state
 * @param type - the page you want to fetch api information about.
 * @returns {*}
 */
export const getLastUpdated = (state, type) => {
    const api = getName(state, type);
    if (api && api.hasOwnProperty('lastUpdated')) {
        return api.lastUpdated;
    }
    return null;
};

