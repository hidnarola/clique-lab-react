export const GET_MEMBERS_REQUEST = 'GET_MEMBERS_REQUEST';
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_ERROR = 'GET_MEMBERS_ERROR';

export function getMembers(data) {
    return { type: GET_MEMBERS_REQUEST, data }
}

export function getMembersSuccess(data) {
    return { type: GET_MEMBERS_SUCCESS, data }
}

export function getMembersError(error) {
    return { type: GET_MEMBERS_ERROR, error }
}

// *************************************************************************************

export const RESET_MEMBERS_VALUES = 'RESET_MEMBERS_VALUES';

export function resetMembersVal(data) {
    return { type: RESET_MEMBERS_VALUES, data:data }
}

// *************************************************************************************
