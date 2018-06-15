export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR';

export const CHANGE_PASS_REQUEST = 'CHANGE_PASS_REQUEST';
export const CHANGE_PASS_SUCCESS = 'CHANGE_PASS_SUCCESS';
export const CHANGE_PASS_ERROR = 'CHANGE_PASS_ERROR';

export const GET_JOINED_REF_REQUEST = 'GET_JOINED_REF_REQUEST';
export const GET_JOINED_REF_SUCCESS = 'GET_JOINED_REF_SUCCESS';
export const GET_JOINED_REF_ERROR = 'GET_JOINED_REF_ERROR';

export const GET_REVENUE_REF_REQUEST = 'GET_REVENUE_REF_REQUEST';
export const GET_REVENUE_REF_SUCCESS = 'GET_REVENUE_REF_SUCCESS';
export const GET_REVENUE_REF_ERROR = 'GET_REVENUE_REF_ERROR';

export const ADD_BANK_REQUEST = 'ADD_BANK_REQUEST';
export const ADD_BANK_SUCCESS = 'ADD_BANK_SUCCESS';
export const ADD_BANK_ERROR = 'ADD_BANK_ERROR';

export const DELETE_BANK_REQUEST = 'DELETE_BANK_REQUEST';
export const DELETE_BANK_SUCCESS = 'DELETE_BANK_SUCCESS';
export const DELETE_BANK_ERROR = 'DELETE_BANK_ERROR';

export const GET_BANK_LIST_REQUEST = 'GET_BANK_LIST_REQUEST';
export const GET_BANK_LIST_SUCCESS = 'GET_BANK_LIST_SUCCESS';
export const GET_BANK_LIST_ERROR = 'GET_BANK_LIST_ERROR';

export const RESET_VALUES = 'RESET_VALUES';
export const RESET_ALERT_MSG = 'RESET_ALERT_MSG';

export function editProfile(data) { return { type: EDIT_PROFILE_REQUEST, data } }
export function editProfileSuccess(data) { return { type: EDIT_PROFILE_SUCCESS, data } }
export function editProfileError(error) { return { type: EDIT_PROFILE_ERROR, error } }

export function changePass(data) { return { type: CHANGE_PASS_REQUEST, data } }
export function changePassSuccess(data) { return { type: CHANGE_PASS_SUCCESS, data } }
export function changePassError(error) { return { type: CHANGE_PASS_ERROR, error } }

export function getJoinedRef(data) { return { type: GET_JOINED_REF_REQUEST, data } }
export function getJoinedRefSuccess(data) { return { type: GET_JOINED_REF_SUCCESS, data } }
export function getJoinedRefError(error) { return { type: GET_JOINED_REF_ERROR, error } }

export function getRevenueRef(data) { return { type: GET_REVENUE_REF_REQUEST, data } }
export function getRevenueRefSuccess(data) { return { type: GET_REVENUE_REF_SUCCESS, data } }
export function getRevenueRefError(error) { return { type: GET_REVENUE_REF_ERROR, error } }

export function addBank(data) { return { type: ADD_BANK_REQUEST, data } }
export function addBankSuccess(data) { return { type: ADD_BANK_SUCCESS, data } }
export function addBankError(error) { return { type: ADD_BANK_ERROR, error } }

export function deleteBank(data) { return { type: DELETE_BANK_REQUEST, data } }
export function deleteBankSuccess(data) { return { type: DELETE_BANK_SUCCESS, data } }
export function deleteBankError(error) { return { type: DELETE_BANK_ERROR, error } }

export function getBankList() { return { type: GET_BANK_LIST_REQUEST } }
export function getBankListSuccess(data) { return { type: GET_BANK_LIST_SUCCESS, data } }
export function getBankListError(error) { return { type: GET_BANK_LIST_ERROR, error } }

export function resetValMyProfile(data) { return { type: RESET_VALUES, data:data } }
export function resetAlertMsg() { return { type: RESET_ALERT_MSG } }