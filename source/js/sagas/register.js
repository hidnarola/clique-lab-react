import { takeLatest, call, put } from 'redux-saga/effects';

import {
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from '../actions/register';
import api from '../api/register';

// -------- Get register

function registerUser() {
    return function* (action) { // eslint-disable-line consistent-return
        
        // console.log('======================================');
        // console.log(action.userData);
        // console.log('======================================');
        let dataNN = action.userData;
        try {
            const data = yield call(() => api.userRegister(dataNN));
            const action = { type: REGISTER_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: REGISTER_ERROR, error };
            yield put(action);
        }
    };
}

export const registerUserConst = registerUser();


export function* getRegisterWatcher() {
    yield takeLatest(REGISTER_REQUEST, registerUserConst);
}

export default [
    getRegisterWatcher(),
];
