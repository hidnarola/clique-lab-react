    export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
    export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
    export const GET_GROUP_ERROR = 'GET_GROUP_ERROR';
    export function getGroups(data) {
        return { type: GET_GROUP_REQUEST, data }
    }

    export function getGroupsSuccess(data) {
        return { type: GET_GROUP_SUCCESS, data }
    }

    export function getGroupsError(error) {
        return { type: GET_GROUP_ERROR, error }
    }

// *************************************************************************************

    export const ADD_GROUP_REQUEST = 'ADD_GROUP_REQUEST';
    export const ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS';
    export const ADD_GROUP_ERROR = 'ADD_GROUP_ERROR';
    export function addGroups(data) {
        return { type: ADD_GROUP_REQUEST, data }
    }

    export function addGroupsSuccess(data) {
        return { type: ADD_GROUP_SUCCESS, data }
    }

    export function addGroupsError(error) {
        return { type: ADD_GROUP_ERROR, error }
    }

// *************************************************************************************
    export const GROUP_MEMBERS_REQUEST = 'GROUP_MEMBERS_REQUEST';
    export const GROUP_MEMBERS_SUCCESS = 'GROUP_MEMBERS_SUCCESS';
    export const GROUP_MEMBERS_ERROR = 'GROUP_MEMBERS_ERROR';
    export function getGroupMembers(data) {
        return { type: GROUP_MEMBERS_REQUEST, data }
    }

    export function getGroupMembersSuccess(data) {
        return { type: GROUP_MEMBERS_SUCCESS, data }
    }

    export function getGroupMembersError(error) {
        return { type: GROUP_MEMBERS_ERROR, error }
    }