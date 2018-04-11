import { takeLatest, call, put } from 'redux-saga/effects';

import {
    GET_GROUP_ERROR,
    GET_GROUP_REQUEST,
    GET_GROUP_SUCCESS,
} from '../actions/groups';
import api from '../api/groups';

function getGroups() {
    return function* (action) { // eslint-disable-line consistent-return
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action;
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

export const getGroupsconst = getGroups();

export function* getGroupsWatcher() { yield takeLatest(GET_GROUP_REQUEST, getGroupsconst); }

export default [
    getGroupsWatcher(),
];
