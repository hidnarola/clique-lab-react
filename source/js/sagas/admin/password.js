import { takeLatest, call, put } from 'redux-saga/effects';
import { 
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR, forgotPasswordSuccess, forgotPasswordError,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, resetPasswordSuccess, resetPasswordError,
} from "../../actions/admin/password";
import api from '../../api/admin/password';

// This function is used to get all transaction
function forgotPassword() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.data;
        try {
            const data = yield call(() => api.forgotPassword(dataNN));
            yield put(forgotPasswordSuccess(data));
        } catch(error){
            yield put(forgotPasswordError(error));
        }
    };
}

function resetPassword() {
    return function* (action) {
        // console.log('======================================');
        // console.log(action);
        // console.log('======================================');
        // return;
        let dataNN = action.resetData;
        try {
            const data = yield call(() => api.resetPassword(dataNN));
            yield put(resetPasswordSuccess(data));
        } catch(error){
            yield put(resetPasswordError(error));
        }
    };
}

export const forgotPasswordconst = forgotPassword();
export const resetPasswordconst = resetPassword();
export function* forgotPasswordWatcher() { yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordconst); }
export function* resetPasswordWatcher() { yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordconst); }

export default [
    forgotPasswordWatcher(),
    resetPasswordWatcher()
];