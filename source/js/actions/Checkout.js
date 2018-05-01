export const GET_CHECKOUT_LIST_REQUEST = 'GET_CHECKOUT_LIST_REQUEST';
export const GET_CHECKOUT_LIST_SUCCESS = 'GET_CHECKOUT_LIST_SUCCESS';
export const GET_CHECKOUT_LIST_ERROR = 'GET_CHECKOUT_LIST_ERROR';

export const REMOVE_CART_ITEM_REQUEST = 'REMOVE_CART_ITEM_REQUEST';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_ERROR = 'REMOVE_CART_ITEM_ERROR';

export const CART_PAYMENT_REQUEST = 'CART_PAYMENT_REQUEST';
export const CART_PAYMENT_SUCCESS = 'CART_PAYMENT_SUCCESS';
export const CART_PAYMENT_ERROR = 'CART_PAYMENT_ERROR';

export function getCheckoutList() { return { type: GET_CHECKOUT_LIST_REQUEST } }
export function getCheckoutListSuccess(data) { return { type: GET_CHECKOUT_LIST_SUCCESS, data } }
export function getCheckoutListError(error) { return { type: GET_CHECKOUT_LIST_ERROR, error } }

export function removeCartItems(data) { return { type: REMOVE_CART_ITEM_REQUEST, data } }
export function removeCartItemsSuccess(data) { return { type: REMOVE_CART_ITEM_SUCCESS, data } }
export function removeCartItemsError(error) { return { type: REMOVE_CART_ITEM_ERROR, error } }

export function cartPaymentReq(data) { return { type: CART_PAYMENT_REQUEST, data } }
export function cartPaymentSuccess(data) { return { type: CART_PAYMENT_SUCCESS, data } }
export function cartPaymentError(error) { return { type: CART_PAYMENT_ERROR, error } }