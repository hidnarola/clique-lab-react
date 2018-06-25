export const GET_CHECKOUT_LIST_REQUEST = 'GET_CHECKOUT_LIST_REQUEST';
export const GET_CHECKOUT_LIST_SUCCESS = 'GET_CHECKOUT_LIST_SUCCESS';
export const GET_CHECKOUT_LIST_ERROR = 'GET_CHECKOUT_LIST_ERROR';

export const REMOVE_CART_ITEM_REQUEST = 'REMOVE_CART_ITEM_REQUEST';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_ERROR = 'REMOVE_CART_ITEM_ERROR';

export const ADD_CARD_REQUEST = 'ADD_CARD_REQUEST';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_ERROR = 'ADD_CARD_ERROR';

export const EDIT_CARD_REQUEST = 'EDIT_CARD_REQUEST';
export const EDIT_CARD_SUCCESS = 'EDIT_CARD_SUCCESS';
export const EDIT_CARD_ERROR = 'EDIT_CARD_ERROR';

export const DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR';

export const GET_CARD_LIST_REQUEST = 'GET_CARD_LIST_REQUEST';
export const GET_CARD_LIST_SUCCESS = 'GET_CARD_LIST_SUCCESS';
export const GET_CARD_LIST_ERROR = 'GET_CARD_LIST_ERROR';

export const CART_PAYMENT_REQUEST = 'CART_PAYMENT_REQUEST';
export const CART_PAYMENT_SUCCESS = 'CART_PAYMENT_SUCCESS';
export const CART_PAYMENT_ERROR = 'CART_PAYMENT_ERROR';

export const RESET_VALUES = 'RESET_VALUES';


export const MODIFY_STATUS_REQUEST = 'MODIFY_STATUS_REQUEST';
export const MODIFY_STATUS_RESET = 'MODIFY_STATUS_RESET';


export function getCheckoutList() { return { type: GET_CHECKOUT_LIST_REQUEST } }
export function getCheckoutListSuccess(data) { return { type: GET_CHECKOUT_LIST_SUCCESS, data } }
export function getCheckoutListError(error) { return { type: GET_CHECKOUT_LIST_ERROR, error } }

export function removeCartItems(data) { return { type: REMOVE_CART_ITEM_REQUEST, data } }
export function removeCartItemsSuccess(data) { return { type: REMOVE_CART_ITEM_SUCCESS, data } }
export function removeCartItemsError(error) { return { type: REMOVE_CART_ITEM_ERROR, error } }

export function addCard(data) { return { type: ADD_CARD_REQUEST, data } }
export function addCardSuccess(data) { return { type: ADD_CARD_SUCCESS, data } }
export function addCardError(error) { return { type: ADD_CARD_ERROR, error } }

export function editCard(data) { return { type: EDIT_CARD_REQUEST, data } }
export function editCardSuccess(data) { return { type: EDIT_CARD_SUCCESS, data } }
export function editCardError(error) { return { type: EDIT_CARD_ERROR, error } }

export function deleteCard(data) { return { type: DELETE_CARD_REQUEST, data } }
export function deleteCardSuccess(data) { return { type: DELETE_CARD_SUCCESS, data } }
export function deleteCardError(error) { return { type: DELETE_CARD_ERROR, error } }

export function getCardList() { return { type: GET_CARD_LIST_REQUEST } }
export function getCardListSuccess(data) { return { type: GET_CARD_LIST_SUCCESS, data } }
export function getCardListError(error) { return { type: GET_CARD_LIST_ERROR, error } }

export function cartPaymentReq(data) { return { type: CART_PAYMENT_REQUEST, data } }
export function cartPaymentSuccess(data) { return { type: CART_PAYMENT_SUCCESS, data } }
export function cartPaymentError(error) { return { type: CART_PAYMENT_ERROR, error } }

export function resetVal(data) { return { type: RESET_VALUES, data:data } }


export function modifyStatusReq() { return { type: MODIFY_STATUS_REQUEST} }
export function modifyStatusReset() { return { type: MODIFY_STATUS_RESET} }

