import { Map } from "immutable";
import {  
    GET_CHECKOUT_LIST_REQUEST, GET_CHECKOUT_LIST_SUCCESS, GET_CHECKOUT_LIST_ERROR,
    CART_PAYMENT_REQUEST, CART_PAYMENT_SUCCESS, CART_PAYMENT_ERROR,
} from "../actions/Checkout";

const initialState = Map({
    loading: false,
    error: null,
    carts: {
        data: null,
        subtotal: 0,
        gst: 0,
        total: 0,
        status: 0,
        message: null,
    },
    payment:{
        status: 0,
        message: null
    }
});

const actionMap = {
    [GET_CHECKOUT_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null            
        }));
    },
    [GET_CHECKOUT_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: false,
            carts: {
                data: action.data.data.results.cart_items,
                subtotal: action.data.data.results.sub_total,
                gst: action.data.data.results.gst,
                total: action.data.data.results.total,
                status: action.data.data.status,
                message: action.data.data.message,
            }
        }));
    },
    [GET_CHECKOUT_LIST_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: null,
        }));
    },

    [CART_PAYMENT_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null            
        }));
    },
    [CART_PAYMENT_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            payment: {
                status: action.data.data.status,
                message: action.data.data.message,
            }
        }));
    },
    [CART_PAYMENT_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: null,
        }));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}
