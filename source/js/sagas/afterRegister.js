import { takeLatest, call, put } from 'redux-saga/effects';

import {
    AFTER_REGISTER_REQUEST, AFTER_REGISTER_SUCCESS, AFTER_REGISTER_ERROR,
    AFTER_FETCH_DATA,AFTER_FETCH_DATA_SUCCESS, AFTER_FETCH_DATA_ERROR
} from '../actions/afterRegister';

import api from '../api/register';

// -------- Get register

function afterRegisterFormFunc() {
    return function* (action) { // eslint-disable-line consistent-return
        
        let dataAfter = action.data;

        try {
            const data = yield call(() => api.afterRegisterUpdate(dataAfter));
            const action = { type: AFTER_REGISTER_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: AFTER_REGISTER_ERROR, error };
            yield put(action);
        }
    };
}

export const afterRegisterForm = afterRegisterFormFunc();

export function* getRegisterWatcher() {
    yield takeLatest(AFTER_REGISTER_REQUEST, afterRegisterForm);
}

//------------------------------------------------------------------------------------

function afterRegFetDataFunc(){
    return function* (action) {
        try {
            
            const industryData = yield call(() => api.fetchIndustry());            
            const setting = yield call(() => api.fetchSetting());
            
            console.log('**************************');
            console.log(setting);
            console.log('**************************');
            const action = { type: AFTER_FETCH_DATA_SUCCESS, industryData,setting };
            yield put(action);
        } catch (error) {
            const action = { type: AFTER_FETCH_DATA_ERROR, error };
            yield put(action);
        }
    };
}

export const afterRegFetData = afterRegFetDataFunc();

export function* getafterfetchdata(){
    yield takeLatest(AFTER_FETCH_DATA, afterRegFetData);
}

export default [
    getRegisterWatcher(),
    getafterfetchdata()
];
