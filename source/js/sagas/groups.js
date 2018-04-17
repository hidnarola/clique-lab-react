import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_GROUP_REQUEST, GET_GROUP_SUCCESS, GET_GROUP_ERROR, ADD_GROUP_REQUEST, ADD_GROUP_SUCCESS, ADD_GROUP_ERROR, GROUP_MEMBERS_REQUEST, GROUP_MEMBERS_SUCCESS, GROUP_MEMBERS_ERROR } from "../actions/groups";
import api from '../api/groups';

// This function is used to get all groups
function getGroups() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getGroups(dataNN));
            const action = { type: GET_GROUP_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_GROUP_ERROR, error };
            yield put(action);
        }
    };
}

// This function is used to add groups or create groups
function addGroups() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.addGroups(dataNN));
            const action = { type: ADD_GROUP_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: ADD_GROUP_ERROR, error };
            yield put(action);
        }
    };
}

// This function is used to get all groups
function getGroupMembers() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getGroupMembers(dataNN.grpId,dataNN));
            const action = { type: GROUP_MEMBERS_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GROUP_MEMBERS_ERROR, error };
            yield put(action);
        }
    };
}

export const getGroupsconst = getGroups();
export const addGroupsconst = addGroups();
export const getGroupMembersconst = getGroupMembers();

export function* getGroupsWatcher() { yield takeLatest(GET_GROUP_REQUEST, getGroupsconst); }
export function* addGroupsWatcher() { yield takeLatest(ADD_GROUP_REQUEST, addGroupsconst); }
export function* getGroupMembersWatcher() { yield takeLatest(GROUP_MEMBERS_REQUEST, getGroupMembersconst); }

export default [
    getGroupsWatcher(),
    addGroupsWatcher(),
    getGroupMembersWatcher(),
];
