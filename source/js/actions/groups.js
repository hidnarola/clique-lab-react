export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
export const GET_GROUP_ERROR = 'GET_GROUP_ERROR';

export const ADD_GROUP_REQUEST = 'ADD_GROUP_REQUEST';
export const ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS';
export const ADD_GROUP_ERROR = 'ADD_GROUP_ERROR';

export function getGroups(data) {
    return { type: GET_GROUP_REQUEST, data }
}

export function getGroupsSuccess(data) {
    return { type: GET_GROUP_SUCCESS, data }
}

export function getGroupsError(error) {
    return { type: GET_GROUP_ERROR, error }
}

export function addGroups(data) {
    return { type: ADD_GROUP_REQUEST, data }
}

export function addGroupsSuccess(data) {
    return { type: ADD_GROUP_SUCCESS, data }
}

export function addGroupsError(error) {
    return { type: ADD_GROUP_ERROR, error }
}