import { takeLatest, put, call } from 'redux-saga/effects';
import { 
        EVERY_DAY_REQUEST,EVERY_DAY_SUCCESS,EVERY_DAY_ERROR,everyDaySuccess,everyDayError,
        MORE_FILTER_REQUEST, MORE_FILTER_SUCCESS, MORE_FILTER_ERROR,moreFilterReq,moreFilterSuccess,moreFilterError
       } from "../actions/everyDay";
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

function fetchMoreFilterData(){
    return function* (action){
        try{            
            let data = yield call(() => api.fetchMoreFilterData());
            yield put(moreFilterSuccess(data));
        } catch(error){            
            yield put(moreFilterError(error));
        }
    }
}

export function* watchEveryDay() {
    yield takeLatest(EVERY_DAY_REQUEST, fetchEveryDayData());
}

export function* watchMoreFilterData() {
    yield takeLatest(MORE_FILTER_REQUEST, fetchMoreFilterData());
}

export default [
    watchEveryDay(),
    watchMoreFilterData()
]