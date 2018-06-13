export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR';

export const CHANGE_PASS_REQUEST = 'CHANGE_PASS_REQUEST';
export const CHANGE_PASS_SUCCESS = 'CHANGE_PASS_SUCCESS';
export const CHANGE_PASS_ERROR = 'CHANGE_PASS_ERROR';

export const RESET_VALUES = 'RESET_VALUES';
export const RESET_ALERT_MSG = 'RESET_ALERT_MSG';


export function editProfile(data) { return { type: EDIT_PROFILE_REQUEST, data } }
export function editProfileSuccess(data) { return { type: EDIT_PROFILE_SUCCESS, data } }
export function editProfileError(error) { return { type: EDIT_PROFILE_ERROR, error } }

export function changePass(data) { return { type: CHANGE_PASS_REQUEST, data } }
export function changePassSuccess(data) { return { type: CHANGE_PASS_SUCCESS, data } }
export function changePassError(error) { return { type: CHANGE_PASS_ERROR, error } }

export function resetVal(data) { return { type: RESET_VALUES, data:data } }
export function resetAlertMsg() { return { type: RESET_ALERT_MSG } }