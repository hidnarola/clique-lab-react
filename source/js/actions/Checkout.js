export const GET_CHECKOUT_LIST_REQUEST = 'GET_CHECKOUT_LIST_REQUEST';
export const GET_CHECKOUT_LIST_SUCCESS = 'GET_CHECKOUT_LIST_SUCCESS';
export const GET_CHECKOUT_LIST_ERROR = 'GET_CHECKOUT_LIST_ERROR';

export function getCheckoutList() { return { type: GET_CHECKOUT_LIST_REQUEST } }
export function getCheckoutListSuccess(data) { return { type: GET_CHECKOUT_LIST_SUCCESS, data } }
export function getCheckoutListError(error) { return { type: GET_CHECKOUT_LIST_ERROR, error } }