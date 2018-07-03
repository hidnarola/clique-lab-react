import { takeLatest, put, call } from 'redux-saga/effects';
import { 
    LOGIN_REQUEST, loginSuccess, loginError,
    ADMIN_LOGIN_REQUEST, adminLoginSuccess, adminLoginError, 
    LOGOUT_REQUEST, logoutSuccess, logoutError
} from "../actions/login";

import api from '../api/login';
import { 
    LOCALSTORAGE_USER_ITEM_KEY, LOCALSTORAGE_ADMIN_ITEM_KEY, LOCALSTORAGE_TOKEN_ITEM_KEY, LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY, 
    LOCALSTORAGE_ROLE_KEY, USER_ROLE, ADMIN_ROLE } from '../constants/consts';

import { SubmissionError } from 'redux-form'; 

import CryptoJS from 'crypto-js';
import {SECRET_KEY} from '../constants/usefulvar';


function authenticateNew(){
    return function* (action){
        try{
            let loginData = action.loginData;            
            let data = {};
            let encodedUserRole = '';
            data = yield call(() => api.userLogin(loginData));
            let ciphertext = CryptoJS.AES.encrypt('promoter', SECRET_KEY);
            localStorage.setItem(LOCALSTORAGE_ROLE_KEY, encodedUserRole);
            localStorage.setItem(LOCALSTORAGE_USER_ITEM_KEY, JSON.stringify(data.promoter));
            localStorage.setItem(LOCALSTORAGE_TOKEN_ITEM_KEY, data.token);
            localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY, data.refresh_token);
            localStorage.setItem("role", ciphertext);
            yield put(loginSuccess(data));
        } catch(error){            
            yield put(loginError(error));
        }
    }
}

function adminLogin(){
    return function* (action){
        try{
            let loginData = action.data;
            let data = {};
            let encodedUserRole = '';
            data = yield call(() => api.adminLogin(loginData));
            let ciphertext = CryptoJS.AES.encrypt('admin', SECRET_KEY);
            localStorage.setItem(LOCALSTORAGE_ROLE_KEY, encodedUserRole);
            localStorage.setItem(LOCALSTORAGE_ADMIN_ITEM_KEY, JSON.stringify(data.admin));
            localStorage.setItem(LOCALSTORAGE_TOKEN_ITEM_KEY, data.token);
            localStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY, data.refresh_token);
            localStorage.setItem("role", ciphertext);
            yield put(adminLoginSuccess(data));
        } catch(error){            
            yield put(adminLoginError(error));
        }
    }
}

function logout() {
    return function* (action) {
        try {
            localStorage.removeItem(LOCALSTORAGE_ROLE_KEY);
            localStorage.removeItem(LOCALSTORAGE_USER_ITEM_KEY);
            localStorage.removeItem(LOCALSTORAGE_ADMIN_ITEM_KEY);
            localStorage.removeItem(LOCALSTORAGE_TOKEN_ITEM_KEY);
            localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY);
            yield put(logoutSuccess());
        } catch (error) {
            yield put(logoutError());
        }
    }
}

export function* watchLogin() { yield takeLatest(LOGIN_REQUEST, authenticateNew()); }
export function* watchAdminLogin() { yield takeLatest(ADMIN_LOGIN_REQUEST, adminLogin()); }
export function* watchLogout() { yield takeLatest(LOGOUT_REQUEST, logout()); }

export default [
    watchLogin(),
    watchAdminLogin(),
    watchLogout(),
]