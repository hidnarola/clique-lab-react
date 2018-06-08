export const RESET_VALUES = 'RESET_VALUES';

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR';

export const  RESET_ALERT_MSG = 'RESET_ALERT_MSG';

export function resetVal(data) { return { type: RESET_VALUES, data:data } }

export function editProfile(data) { return { type: EDIT_PROFILE_REQUEST, data } }
export function editProfileSuccess(data) { return { type: EDIT_PROFILE_SUCCESS, data } }
export function editProfileError(error) { return { type: EDIT_PROFILE_ERROR, error } }

export function resetAlertMsg() { return { type: RESET_ALERT_MSG } }