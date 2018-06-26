import { takeLatest, call, put } from 'redux-saga/effects';

import {
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    FETCH_REGISTER_COUNTRY_REQUEST,
    FETCH_REGISTER_COUNTRY_SUCCESS,
    FETCH_REGISTER_COUNTRY_ERROR,
    RE_SEND_EMAIL_REQUEST, 
    RE_SEND_EMAIL_SUCCESS,
    RE_SEND_EMAIL_ERROR,
} from '../actions/register';
import api from '../api/register';

function registerUser() {
    return function* (action) {
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

/** ----- re-send email to promoter--- */
function reSendEmail() {
    return function* (action) {
        let dataNN = action.data;
        try {
            const data = yield call(() => api.emailReSend(dataNN));
            const action = { type: RE_SEND_EMAIL_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: RE_SEND_EMAIL_ERROR, error };
            yield put(action);
        }
    };
}

// get country
function countries() {
    return function* (action) {
        try {
            const data = yield call(() => api.getCountry());
            const action = { type: FETCH_REGISTER_COUNTRY_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: FETCH_REGISTER_COUNTRY_ERROR, error };
            yield put(action);
        }
    };
}


export const registerUserConst = registerUser();
export const countryConst = countries();

export const reSendEmailConst = reSendEmail();


export function* getRegisterWatcher() {
    yield takeLatest(REGISTER_REQUEST, registerUserConst);
}

export function* countryWatcher() {
    yield takeLatest(FETCH_REGISTER_COUNTRY_REQUEST, countryConst);
}

export function* reSendEmailWatcher() {
    yield takeLatest(RE_SEND_EMAIL_REQUEST, reSendEmailConst);
}

export default [
    getRegisterWatcher(),
    countryWatcher(),
    reSendEmailWatcher(),
];
