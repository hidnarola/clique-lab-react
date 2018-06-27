import { takeLatest, call, put } from 'redux-saga/effects';
import {
    EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR, editProfileSuccess, editProfileError,
    CHANGE_PASS_REQUEST, CHANGE_PASS_SUCCESS, CHANGE_PASS_ERROR, changePassSuccess, changePassError,
    GET_JOINED_REF_REQUEST, GET_JOINED_REF_SUCCESS, GET_JOINED_REF_ERROR, getJoinedRefSuccess, getJoinedRefError,
    GET_REVENUE_REF_REQUEST, GET_REVENUE_REF_SUCCESS, GET_REVENUE_REF_ERROR, getRevenueRefSuccess, getRevenueRefError,
    ADD_BANK_REQUEST, ADD_BANK_SUCCESS, ADD_BANK_ERROR, addBankSuccess, addBankError,
    DELETE_BANK_REQUEST, DELETE_BANK_SUCCESS, DELETE_BANK_ERROR, deleteBankSuccess, deleteBankError,
    GET_BANK_LIST_REQUEST, GET_BANK_LIST_SUCCESS, GET_BANK_LIST_ERROR, getBankListSuccess, getBankListError,
    GET_WALLET_BAL_REQUEST, GET_WALLET_BAL_SUCCESS, GET_WALLET_BAL_ERROR, getWalletBalSuccess, getWalletBalError,
} from '../actions/myProfile';
import api from '../api/myProfile';

function editProfile() {
    return function* (action) {
        try {
            const data = yield call(() => api.editProfile(action.data));
            yield put(editProfileSuccess(data));
        } catch (error) {
            yield put(editProfileError(error));
        }
    };
}
function changePass() {
    return function* (action) {
        try {
            const data = yield call(() => api.changePass(action.data));
            yield put(changePassSuccess(data));
        } catch (error) {
            yield put(changePassError(error));
        }
    };
}
function getJoinedRef() {
    return function* (action) {
        try {
            const data = yield call(() => api.getJoinedRef(action.data));
            yield put(changePassSuccess(data));
        } catch (error) {
            yield put(changePassError(error));
        }
    };
}
function getRevenueRef() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        try {
            const data = yield call(() => api.getRevenueRef(action.data));
            yield put(getRevenueRefSuccess(data));
        } catch (error) {
            yield put(getRevenueRefError(error));
        }
    };
}

function addBankFunc() {
    return function* (action) {
        try {
            let data = yield call(() => api.addBank(action.data));
            yield put(addBankSuccess(data));
        } catch (error) {
            yield put(addBankError(error));
        }
    }
}
function deleteBankFunc() {
    return function* (action) {
        try {
            let data = yield call(() => api.deleteBank(action.data));
            yield put(deleteBankSuccess(data));
        } catch (error) {
            yield put(deleteBankError(error));
        }
    }
}
function getBankListFunc() {
    return function* (action) {
        try {
            let data = yield call(() => api.getBankList());
            yield put(getBankListSuccess(data));
        } catch (error) {
            yield put(getBankListError(error));
        }
    }
}
function getWalletBalFunc() {
    return function* (action) {
        try {
            let data = yield call(() => api.getWalletBal());
            yield put(getWalletBalSuccess(data));
        } catch (error) {
            yield put(getWalletBalError(error));
        }
    }
}

export const editProfileConst = editProfile();
export const changePassConst = changePass();
export const getJoinedRefConst = getJoinedRef();
export const getRevenueRefConst = getRevenueRef();
export const addBankConst = addBankFunc();
export const deleteBankConst = deleteBankFunc();
export const getBankListConst = getBankListFunc();
export const getWalletBalConst = getWalletBalFunc();

export function* editProfileWatcher() { yield takeLatest(EDIT_PROFILE_REQUEST, editProfileConst); }
export function* changePassWatcher() { yield takeLatest(CHANGE_PASS_REQUEST, changePassConst); }
export function* getJoinedRefWatcher() { yield takeLatest(GET_JOINED_REF_REQUEST, getJoinedRefConst); }
export function* getRevenueRefWatcher() { yield takeLatest(GET_REVENUE_REF_REQUEST, getRevenueRefConst); }
export function* addBankWatcher() { yield takeLatest(ADD_BANK_REQUEST, addBankConst); }
export function* deleteBankWatcher() { yield takeLatest(DELETE_BANK_REQUEST, deleteBankConst); }
export function* getBankListWatcher() { yield takeLatest(GET_BANK_LIST_REQUEST, getBankListConst); }
export function* getWalletBalWatcher() { yield takeLatest(GET_WALLET_BAL_REQUEST, getWalletBalConst); }

export default [
    editProfileWatcher(),
    changePassWatcher(),
    getJoinedRefWatcher(),
    getRevenueRefWatcher(),
    addBankWatcher(),
    deleteBankWatcher(),
    getBankListWatcher(),
    getWalletBalWatcher()
];
