export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const ADMIN_LOGIN_REQUEST = 'ADMIN_LOGIN_REQUEST';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_ERROR = 'ADMIN_LOGIN_ERROR';
export const ADMIN_LOGOUT_REQUEST = 'ADMIN_LOGOUT_REQUEST';
export const ADMIN_LOGOUT_SUCCESS = 'ADMIN_LOGOUT_SUCCESS';
export const ADMIN_LOGOUT_ERROR = 'ADMIN_LOGOUT_ERROR';

export const RESET_VALUES_LOGIN = 'RESET_VALUES_LOGIN';

export function login(loginData) { return { type: LOGIN_REQUEST, loginData } }
export function loginSuccess(data) { return { type: LOGIN_SUCCESS, data } }
export function loginError(error) { return { type: LOGIN_ERROR, error } }
export function logout() { return { type: LOGOUT_REQUEST } }
export function logoutSuccess() { return { type: LOGOUT_SUCCESS } }
export function logoutError() { return { type: LOGOUT_ERROR } }

export function adminLogin(data) { return { type: ADMIN_LOGIN_REQUEST, data } }
export function adminLoginSuccess(data) { return { type: ADMIN_LOGIN_SUCCESS, data } }
export function adminLoginError(error) { return { type: ADMIN_LOGIN_ERROR, error } }
export function adminLogout() { return { type: ADMIN_LOGOUT_REQUEST } }
export function adminLogoutSuccess() { return { type: ADMIN_LOGOUT_SUCCESS } }
export function adminLogoutError() { return { type: ADMIN_LOGOUT_ERROR } }

// ----------------------------------------------------------------------
export function resetLoginVal(data) {
    return { type: RESET_VALUES_LOGIN, data:data }
}
// ----------------------------------------------------------------------