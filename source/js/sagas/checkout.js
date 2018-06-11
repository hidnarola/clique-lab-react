import { takeLatest, put, call } from 'redux-saga/effects';
import { 
    GET_CHECKOUT_LIST_REQUEST, GET_CHECKOUT_LIST_SUCCESS, GET_CHECKOUT_LIST_ERROR, getCheckoutList, getCheckoutListSuccess, getCheckoutListError,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_ERROR, removeCartItems, removeCartItemsSuccess, removeCartItemsError,
    ADD_CARD_REQUEST, ADD_CARD_SUCCESS, ADD_CARD_ERROR, addCard, addCardSuccess, addCardError,
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
export function* watchGetCardList() { yield takeLatest(GET_CARD_LIST_REQUEST, getCardListFunc()); }
export function* watchCartPayment() { yield takeLatest(CART_PAYMENT_REQUEST, cartPaymentFunc()); }

export default [
    watchGetCamapaignList(),
    watchRemoveCartItems(),
    watchAddCard(),
    watchGetCardList(),
    watchCartPayment(),
]