import { takeLatest, put, call } from 'redux-saga/effects';
import { 
    GET_CHECKOUT_LIST_REQUEST, GET_CHECKOUT_LIST_SUCCESS, GET_CHECKOUT_LIST_ERROR, getCheckoutList, getCheckoutListSuccess, getCheckoutListError,
    CART_PAYMENT_REQUEST, CART_PAYMENT_SUCCESS, CART_PAYMENT_ERROR, cartPaymentReq, cartPaymentSuccess, cartPaymentError,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_ERROR, removeCartItems, removeCartItemsSuccess, removeCartItemsError,
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

export function* watchGetCamapaignList() { yield takeLatest(GET_CHECKOUT_LIST_REQUEST, getCheckoutListFunc()); }
export function* watchCartPayment() { yield takeLatest(CART_PAYMENT_REQUEST, cartPaymentFunc()); }
export function* watchRemoveCartItems() { yield takeLatest(REMOVE_CART_ITEM_REQUEST, removeCartItemsFunc()); }

export default [
    watchGetCamapaignList(),
    watchCartPayment(),
    watchRemoveCartItems(),
]