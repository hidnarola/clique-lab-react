import { takeLatest, call, put } from 'redux-saga/effects';

import {
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    FETCH_REGISTER_COUNTRY_REQUEST,
    FETCH_REGISTER_COUNTRY_SUCCESS,
    FETCH_REGISTER_COUNTRY_ERROR
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


export function* getRegisterWatcher() {
    yield takeLatest(REGISTER_REQUEST, registerUserConst);
}

export function* countryWatcher() {
    yield takeLatest(FETCH_REGISTER_COUNTRY_REQUEST, countryConst);
}

export default [
    getRegisterWatcher(),
    countryWatcher(),
];
