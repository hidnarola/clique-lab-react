import { Map } from "immutable";
import {  
    GET_CHECKOUT_LIST_REQUEST, GET_CHECKOUT_LIST_SUCCESS, GET_CHECKOUT_LIST_ERROR,
} from "../actions/Checkout";

const initialState = Map({
    loading: false,
    error: null,
    carts: {
        data: null,
        status: 0,
        message: null,
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
                data: action.data.data.cart_items,
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
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}