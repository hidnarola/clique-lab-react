import { takeLatest, put, call } from 'redux-saga/effects';
import {
        EVERY_DAY_REQUEST,EVERY_DAY_SUCCESS,EVERY_DAY_ERROR,everyDaySuccess,everyDayError,
        MORE_FILTER_REQUEST, MORE_FILTER_SUCCESS, MORE_FILTER_ERROR,moreFilterReq,moreFilterSuccess,moreFilterError,
        FETCH_DROPDOWN_REQUEST,FETCH_DROPDOWN_SUCCESS,FETCH_DROPDOWN_ERROR,fetchDropDownReq,fetchDropDownSuccess,fetchDropDownError,
        ADD_USER_REQUEST,addUserSuccess,addUserError,
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

function fetchDropdownData(){
    return function* (action){

        try{
            let data = yield call(() => api.fetchDropDownData(action.data));
            yield put(fetchDropDownSuccess(data.data));
        } catch(error){
            yield put(fetchDropDownError(error));
        }
    }
}

function addUserData(){
    return function* (action){
        try{
            let data = yield call(() => api.addUserData(action.data));
            yield put(addUserSuccess(data.data));
        } catch(error){
            yield put(addUserError(error));
        }
    }
}

 

export function* watchEveryDay() {
    yield takeLatest(EVERY_DAY_REQUEST, fetchEveryDayData());
}

export function* watchMoreFilterData() {
    yield takeLatest(MORE_FILTER_REQUEST, fetchMoreFilterData());
}

export function* watchFetchDropDownData() {
    yield takeLatest(FETCH_DROPDOWN_REQUEST, fetchDropdownData());
}

export function* watchAddUserData() {
    yield takeLatest(ADD_USER_REQUEST, addUserData());
}

export default [
    watchEveryDay(),
    watchMoreFilterData(),
    watchFetchDropDownData(),
    watchAddUserData(),    
]