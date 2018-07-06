export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const RESET_VALUES_FORGOT = 'RESET_VALUES_FORGOT';

export function forgotPassword(data) { return { type: FORGOT_PASSWORD_REQUEST, data } } 
export function forgotPasswordSuccess(data) { return { type: FORGOT_PASSWORD_SUCCESS, data } } 
export function forgotPasswordError(error) { return { type: FORGOT_PASSWORD_ERROR, error } }

export function resetPassword(resetData) { return { type: RESET_PASSWORD_REQUEST, resetData } }
export function resetPasswordSuccess(data) { return { type: RESET_PASSWORD_SUCCESS, data } }
export function resetPasswordError(error) { return { type: RESET_PASSWORD_ERROR, error } }

export function resetForgotVal(data) { return { type: RESET_VALUES_FORGOT, data:data } }