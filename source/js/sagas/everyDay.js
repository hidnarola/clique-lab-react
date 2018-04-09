import { takeLatest, put, call } from 'redux-saga/effects';
import { EVERY_DAY_REQUEST,EVERY_DAY_SUCCESS,EVERY_DAY_ERROR,everyDaySuccess,everyDayError } from "../actions/everyDay";
import api from '../api/login';
import { SubmissionError } from 'redux-form'; 

function fetchEveryDayData(){

    return function* (action){
        try{            
            data = yield call(() => api.userLogin(action.data));
            yield put(everyDaySuccess(data));
        } catch(error){            
            yield put(everyDayError(error));
        }
    }
}

export function* watchEveryDay() {
    yield takeLatest(LOGIN_REQUEST, fetchEveryDayData());
}

export default [
    watchEveryDay()    
]