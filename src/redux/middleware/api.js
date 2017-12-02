import {Schema, arrayOf, normalize} from "normalizr";
import "isomorphic-fetch";



export const USERS = 'users';
const UsersSchema = new Schema(USERS , {idAttribute: 'id'});


export const Schemas = {
    USERS: UsersSchema,
    USERS_ARRAY: arrayOf(UsersSchema)
};

const API_ROOT = `https://jsonplaceholder.typicode.com`;



export const Endpoints = {
    USERS: '/users'
};







function callApi(endpoint, schema, method = 'GET', data = null) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    const init = Object.assign({}, {method, credentials: 'same-origin'});
    if (data) {
        init['body'] = JSON.stringify(data);
    }
    return fetch(fullUrl, init)
        .then(response => {
                // Valid or form submit failed.
                if (response.ok || response.status == 400) {
                    return response.json().then(json => ({json, response}));
                } else {
                    return {json: null, response};
                }
            }
        ).then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject({json, message: response.statusText, status: response.status});
            }
            return Object.assign({},
                normalize(json, schema), {lastUpdated: new Date()}
            );
        });

}

export function generateUrl(route, parameters) {
    if (route.indexOf("?") == -1) {
        route = `${route}?`;
    } else {
        route = `${route}&`;
    }
    return `${route}${ $.param(parameters) }`;
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

export default store => next => action => {
    const ARGUMENT_REGEX = /\{(.+)}/g;
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let {endpoint, method, parameters} = callAPI;
    const {schema, types, data} = callAPI;
    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error("Specify a string endpoint URL.");
    }

    if (parameters) {
        // Does the endpoint contain parameters
        let result = ARGUMENT_REGEX.exec(endpoint);
        // If there are matches we try and replace them
        if (result) {
            for (let i = 1; i < result.length; ++i) {
                let parameter = result[i];
                if (parameters.hasOwnProperty(parameter)) {
                    endpoint = endpoint.replace(`{${parameter}}`, parameters[parameter]);
                    delete parameters[parameter];
                } else {
                    throw new Error(`The end point is missing the parameter ${parameter}.`);
                }
            }
        }
        if (Object.keys(parameters).length > 0) {
            endpoint = generateUrl(endpoint, parameters);
        }

    }

    if (typeof method === 'function') {
        method = method();
    }
    if (typeof method === 'undefined') {
        method = 'GET';
    }
    if (typeof method !== 'string') {
        throw new Error("Specify a string method.");
    }
    if (!schema) {
        throw new Error("Specify one of the exported Schemas");
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    function actionWith(data) {
        let schemaName = null;
        if (typeof schema.getItemSchema !== 'undefined') {
            schemaName = schema.getItemSchema().getKey();
        } else if (typeof schema.getKey !== 'undefined') {
            schemaName = schema.getKey();
        }
        const finalAction = Object.assign({}, action, data, {schema: schemaName});
        delete finalAction[CALL_API];
        return finalAction;
    }

    const [ requestType, successType, failureType ] = types;
    next(actionWith({type: requestType, data}));

    return callApi(endpoint, schema, method, data).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened',
            status: error.status || 'Unknown',
            body: error.json || null,
            data
        }))
    );
};

