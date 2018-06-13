import { takeLatest, call, put } from 'redux-saga/effects';
import {
    EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR, editProfileSuccess, editProfileError,
    CHANGE_PASS_REQUEST, CHANGE_PASS_SUCCESS, CHANGE_PASS_ERROR, changePassSuccess, changePassError,
} from '../actions/myProfile';
import api from '../api/myProfile';

function editProfile() {
    return function* (action) {
        try {
            const data = yield call(() => api.editProfile(action.data));
            yield put(editProfileSuccess(data));
        } catch (error) {
            yield put(editProfileError(error));
        }
    };
}

function changePass() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log(action.data);
        // console.log('======================================');
        // return;
        // let dataNN = action.data;
        try {
            const data = yield call(() => api.changePass(action.data));
            yield put(changePassSuccess(data));
        } catch (error) {
            yield put(changePassError(error));
        }
    };
}

export const editProfileConst = editProfile();
export const changePassConst = changePass();
export function* editProfileWatcher() { yield takeLatest(EDIT_PROFILE_REQUEST, editProfileConst); }
export function* changePassWatcher() { yield takeLatest(CHANGE_PASS_REQUEST, changePassConst); }

export default [
    editProfileWatcher(),
    changePassWatcher()
];
