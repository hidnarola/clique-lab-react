import { takeLatest, put, call } from 'redux-saga/effects';
import { 
    GET_CHECKOUT_LIST_REQUEST, GET_CHECKOUT_LIST_SUCCESS, GET_CHECKOUT_LIST_ERROR, getCheckoutList, getCheckoutListSuccess, getCheckoutListError,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_ERROR, removeCartItems, removeCartItemsSuccess, removeCartItemsError,
    ADD_CARD_REQUEST, ADD_CARD_SUCCESS, ADD_CARD_ERROR, addCard, addCardSuccess, addCardError,
    EDIT_CARD_REQUEST, EDIT_CARD_SUCCESS, EDIT_CARD_ERROR, editCard, editCardSuccess, editCardError,
    DELETE_CARD_REQUEST, DELETE_CARD_SUCCESS, DELETE_CARD_ERROR, deleteCard, deleteCardSuccess, deleteCardError,
    GET_CARD_LIST_REQUEST, GET_CARD_LIST_SUCCESS, GET_CARD_LIST_ERROR, getCardList, getCardListSuccess, getCardListError,
    CART_PAYMENT_REQUEST, CART_PAYMENT_SUCCESS, CART_PAYMENT_ERROR, cartPaymentReq, cartPaymentSuccess, cartPaymentError,
} from "../actions/Checkout";
import api from '../api/checkout';


function getCheckoutListFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.getCheckoutList());
            yield put(getCheckoutListSuccess(data));
        } catch(error){
            yield put(getCheckoutListError(error));
        }
    }
}

function removeCartItemsFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.removeCartItems(action.data));
            yield put(removeCartItemsSuccess(data));
        } catch(error){
            yield put(removeCartItemsError(error));
        }
    }
}

function addCardFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.addCard(action.data));
            yield put(addCardSuccess(data));
        } catch(error){
            yield put(addCardError(error));
        }
    }
}

function editCardFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.editCard(action.data));
            yield put(editCardSuccess(data));
        } catch(error){
            yield put(editCardError(error));
        }
    }
}

function deleteCardFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.deleteCard(action.data));
            yield put(deleteCardSuccess(data));
        } catch(error){
            yield put(deleteCardError(error));
        }
    }
}


function getCardListFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.getCardList());
            yield put(getCardListSuccess(data));
        } catch(error){
            yield put(getCardListError(error));
        }
    }
}

function cartPaymentFunc(){
    return function* (action){
        try{
            let data = yield call(() => api.cartPayment(action.data));
            yield put(cartPaymentSuccess(data));
        } catch(error){
            yield put(cartPaymentError(error));
        }
    }
}

export function* watchGetCamapaignList() { yield takeLatest(GET_CHECKOUT_LIST_REQUEST, getCheckoutListFunc()); }
export function* watchRemoveCartItems() { yield takeLatest(REMOVE_CART_ITEM_REQUEST, removeCartItemsFunc()); }
export function* watchAddCard() { yield takeLatest(ADD_CARD_REQUEST, addCardFunc()); }
export function* watchEditCard() { yield takeLatest(EDIT_CARD_REQUEST, editCardFunc()); }
export function* watchDeleteCard() { yield takeLatest(DELETE_CARD_REQUEST, deleteCardFunc()); }
export function* watchGetCardList() { yield takeLatest(GET_CARD_LIST_REQUEST, getCardListFunc()); }
export function* watchCartPayment() { yield takeLatest(CART_PAYMENT_REQUEST, cartPaymentFunc()); }

export default [
    watchGetCamapaignList(),
    watchRemoveCartItems(),
    watchAddCard(),
    watchEditCard(),
    watchDeleteCard(),
    watchGetCardList(),
    watchCartPayment(),
]