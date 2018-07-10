import { takeLatest, call, put } from 'redux-saga/effects';
import {
    GET_ANALYTICS_REQUEST, GET_ANALYTICS_SUCCESS, GET_ANALYTICS_ERROR,
    GET_SOCIAL_ANALYTICS_REQUEST, GET_SOCIAL_ANALYTICS_SUCCESS, GET_SOCIAL_ANALYTICS_ERROR,
    GET_DEMO_GRAPHICS_REQUEST, GET_DEMO_GRAPHICS_SUCCESS, GET_DEMO_GRAPHICS_ERROR,
    GET_DASHBOARD_REQUEST,GET_DASHBOARD_SUCCESS, GET_DASHBOARD_ERROR
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

// Dashboard Bottom
function getDashboard() {
    return function* (action) {
        let dataNN = action.data[0];
        try {
            const data = yield call(() => api.getDashboardData(dataNN));
            const action = { type: GET_DASHBOARD_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_DASHBOARD_ERROR, error };
            yield put(action);
        }
    };
}


function getDemoGraphics() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        try {
            const data = yield call(() => api.getDemoGraphics());
            const action = { type: GET_DEMO_GRAPHICS_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_DEMO_GRAPHICS_ERROR, error };
            yield put(action);
        }
    };
}

export const getAnalyticsConst = getAnalytics();
export const getSocialAnalyticsConst = getSocialAnalytics();
export const getDemoGraphicsConst = getDemoGraphics();
export const getDashboardConst = getDashboard();

export function* getAnalyticsWatcher() { yield takeLatest(GET_ANALYTICS_REQUEST, getAnalyticsConst); }
export function* getSocialAnalyticsWatcher() { yield takeLatest(GET_SOCIAL_ANALYTICS_REQUEST, getSocialAnalyticsConst); }
export function* getDemoGraphicsWatcher() { yield takeLatest(GET_DEMO_GRAPHICS_REQUEST, getDemoGraphicsConst); }
export function* getDashboardWatcher() { yield takeLatest(GET_DASHBOARD_REQUEST, getDashboardConst); }

export default [
    getAnalyticsWatcher(),
    getSocialAnalyticsWatcher(),
    getDemoGraphicsWatcher(),
    getDashboardWatcher()
];
