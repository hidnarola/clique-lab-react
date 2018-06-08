import { takeLatest, call, put } from 'redux-saga/effects';
import {
    EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR, editProfileSuccess, editProfileError
} from '../actions/myProfile';
import api from '../api/myProfile';

function editProfile() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log(action.data);
        // console.log('======================================');
        // return;
        // let dataNN = action.data[0];
        try {
            const data = yield call(() => api.editProfile(action.data));
            yield put(editProfileSuccess(data));
        } catch (error) {
            yield put(editProfileError(error));
        }
    };
}

export const editProfileConst = editProfile();
export function* editProfileWatcher() { yield takeLatest(EDIT_PROFILE_REQUEST, editProfileConst); }

export default [
    editProfileWatcher()
];
