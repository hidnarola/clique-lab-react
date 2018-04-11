export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
export const GET_GROUP_ERROR = 'GET_GROUP_ERROR';

export function getGroups(data) {
    return {
        type: GET_GROUP_REQUEST,
        data
    }
}

export function getGroupsSuccess(data) {
    return {
        type: GET_GROUP_SUCCESS,
        data
    }
}

export function getGroupsError(error) {
    return {
        type: GET_GROUP_ERROR,
        error
    }
}