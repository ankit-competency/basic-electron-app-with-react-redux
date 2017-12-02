import merge from 'lodash.merge';
import {
    ENTITY_SUCCESS,
    SUFFIX_USERS,
} from '../action';
import {PREVIOUS_METRICS} from '../middleware/api';
export const STATE_KEY = 'entities';
export const STATE = {};

export default function entities(state = STATE, action) {
    if (action.response && action.response.entities) {
        switch (action.type) {
            case `${ENTITY_SUCCESS}${SUFFIX_USERS}`:
                return Object.assign({}, state, action.response.entities);
            default:
                return merge({}, state, action.response.entities);
        }
    }

    switch (action.type) {
        default:
            return merge({}, state);
    }
}


export const getEntities = (state) => {
    if (state.hasOwnProperty(STATE_KEY)) {
        return state[STATE_KEY];
    }
    return null;
};

/**
 * Get all entities by key.
 * @param state
 * @param key
 * @returns {null}
 */
export const getEntity = (state, key) => {
    const entities = getEntities(state);
    if (entities && entities.hasOwnProperty(key)) {
        return entities[key];
    }
    return null;
};

/**
 *
 * @param state
 * @param key
 * @param id
 * @returns {*}
 */
export const getEntityById = (state, key, id) => {
    const entities = getEntity(state, key);
    if (entities && entities.hasOwnProperty(id)) {
        return entities[id];
    }
    return null;
};

/**
 *
 * @param state
 * @param key - They entity key in the store.
 * @param ids - an array of ids.
 * @returns {*}
 */
export const getEntitiesByIds = (state, key, ids) => {
    if (!Array.isArray(ids)) {
        throw new Error("To get entities from ids, the ids parameter has to be an array.");
    }
    return ids.map((id) => {
        return getEntityById(state, key, id);
    }).filter((item) => {
        return item !== null;
    });
};

