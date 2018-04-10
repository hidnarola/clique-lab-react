import { takeLatest, put, call } from 'redux-saga/effects';
import { EVERY_DAY_REQUEST,EVERY_DAY_SUCCESS,EVERY_DAY_ERROR,everyDaySuccess,everyDayError } from "../actions/everyDay";
import api from '../api/everyDay';

function fetchEveryDayData(){

    return function* (action){
        try{            
            let data = yield call(() => api.fetchUsersNew(action.data));
            yield put(everyDaySuccess(data));
        } catch(error){            
            yield put(everyDayError(error));
        }
    }
}

export function* watchEveryDay() {
    yield takeLatest(EVERY_DAY_REQUEST, fetchEveryDayData());
}

export default [
    watchEveryDay()    
]