import { takeLatest, call, put } from 'redux-saga/effects';

import {
    FORGOT_ERROR,
    FORGOT_REQUEST,
    FORGOT_SUCCESS,
    RESET_ERROR,
    RESET_REQUEST,
    RESET_SUCCESS
} from '../actions/forgotPass';
import api from '../api/forgotPass';

function forgotPass() {
    return function* (action) { // eslint-disable-line consistent-return
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.forgotData;
        try {
            const data = yield call(() => api.forgotPass(dataNN));
            const action = { type: FORGOT_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: FORGOT_ERROR, error };
            yield put(action);
        }
    };
}

function resetPass() {
    return function* (action) { // eslint-disable-line consistent-return
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.resetData;
        try {
            const data = yield call(() => api.resetPass(dataNN));
            const action = { type: RESET_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: RESET_ERROR, error };
            yield put(action);
        }
    };
}

export const forgotPassConst = forgotPass();
export const resetPassConst = resetPass();

export function* getForgotWatcher() { yield takeLatest(FORGOT_REQUEST, forgotPassConst); }
export function* getResetWatcher() { yield takeLatest(RESET_REQUEST, resetPassConst); }

export default [
    getForgotWatcher(),
    getResetWatcher(),
];
