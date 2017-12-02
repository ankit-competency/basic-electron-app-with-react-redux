import * as ApiMiddleware from '../middleware/api';
import {CALL_API, Endpoints, generateUrl, Schemas} from '../middleware/api';
import * as Api from '../reducer/api';




export const ENTITY_REQUEST = 'ENTITY_REQUEST';
export const ENTITY_SUCCESS = 'ENTITY_SUCCESS';
export const ENTITY_FAILURE = 'ENTITY_FAILURE';
export const defaultEntityTypes = [ENTITY_REQUEST, ENTITY_SUCCESS, ENTITY_FAILURE];

export const SUFFIX_USERS = '_USERS';





export function fetchPosts() {
    return {
        [CALL_API]: {
            types: defaultEntityTypes.map((type) => `${type}${SUFFIX_USERS}`),
            schema: Schemas.USERS_ARRAY,
            endpoint: () => {
                return `${Endpoints.USERS}`;
            }
        }
    };
}

