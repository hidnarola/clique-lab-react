import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_ANALYTICS_REQUEST, GET_ANALYTICS_SUCCESS, GET_ANALYTICS_ERROR,
    GET_SOCIAL_ANALYTICS_REQUEST, GET_SOCIAL_ANALYTICS_SUCCESS, GET_SOCIAL_ANALYTICS_ERROR
} from '../actions/analytics';
import api from '../api/analytics';

function getAnalytics() {
    return function* (action) {
        let dataNN = action.data[0];
        try {
            const data = yield call(() => api.getAnalytics(dataNN));
            const action = { type: GET_ANALYTICS_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_ANALYTICS_ERROR, error };
            yield put(action);
        }
    };
}

function getSocialAnalytics() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data[0];
        try {
            const data = yield call(() => api.getSocialAnalytics(dataNN));
            const action = { type: GET_SOCIAL_ANALYTICS_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_SOCIAL_ANALYTICS_ERROR, error };
            yield put(action);
        }
    };
}

export const getAnalyticsConst = getAnalytics();
export const getSocialAnalyticsConst = getSocialAnalytics();
export function* getAnalyticsWatcher() { yield takeLatest(GET_ANALYTICS_REQUEST, getAnalyticsConst); }
export function* getSocialAnalyticsWatcher() { yield takeLatest(GET_SOCIAL_ANALYTICS_REQUEST, getSocialAnalyticsConst); }

export default [
    getAnalyticsWatcher(),
    getSocialAnalyticsWatcher()
];
