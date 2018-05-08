import { takeLatest, call, put } from 'redux-saga/effects';

import {
    GET_CAMPAIGN_ERROR,
    GET_CAMPAIGN_REQUEST,
    GET_CAMPAIGN_SUCCESS,
} from '../actions/calendar';
import api from '../api/calendar';

function getCampaign() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.getCampaign(dataNN));
            const action = { type: GET_CAMPAIGN_SUCCESS, data };
            yield put(action);
        } catch (error) {
            const action = { type: GET_CAMPAIGN_ERROR, error };
            yield put(action);
        }
    };
}

export const getCampaignConst = getCampaign();
export function* getCampaignWatcher() { yield takeLatest(GET_CAMPAIGN_REQUEST, getCampaignConst); }

export default [
    getCampaignWatcher(),
];
