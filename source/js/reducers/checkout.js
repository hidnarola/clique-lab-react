import { Map } from "immutable";
import {
    GET_CHECKOUT_LIST_REQUEST, GET_CHECKOUT_LIST_SUCCESS, GET_CHECKOUT_LIST_ERROR,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_ERROR,
    ADD_CARD_REQUEST, ADD_CARD_SUCCESS, ADD_CARD_ERROR,
    EDIT_CARD_REQUEST, EDIT_CARD_SUCCESS, EDIT_CARD_ERROR,
    DELETE_CARD_REQUEST, DELETE_CARD_SUCCESS, DELETE_CARD_ERROR,
    GET_CARD_LIST_REQUEST, GET_CARD_LIST_SUCCESS, GET_CARD_LIST_ERROR,
    CART_PAYMENT_REQUEST, CART_PAYMENT_SUCCESS, CART_PAYMENT_ERROR,
    RESET_VALUES
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
    addCards: {
        status: 0,
        message: null,
        data: null,
        error: null, 
    },
    editCards: {
        status: 0,
        message: null,
        data: null,
        error: null, 
    },
    deleteCards:{
        status: 0,
        message: null,
        data: null,
        error: null, 
    },
    cards: {
        loading: false,
        status: 0,
        message: null,
        data: null,
        error: null,
    },
    payment: {
        status: 0,
        message: null
    },
    removeItems: {
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
            carts: {
                data: null,
                subtotal: 0,
                gst: 0,
                total: 0,
                status: 0,
                message: error,
            }
        }));
    },

    [REMOVE_CART_ITEM_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null
        }));
    },
    [REMOVE_CART_ITEM_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: false,
            removeItems: {
                status: action.data.data.status,
                message: action.data.data.message,
            }
        }));
    },
    [REMOVE_CART_ITEM_ERROR]: (state, action) => {
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

    [ADD_CARD_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null
        }));
    },
    [ADD_CARD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: false,
            addCards: {
                data: action.data.data.cards,
                status: action.data.data.status,
                message: action.data.data.message,
            }
        }));
    },
    [ADD_CARD_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            addCards:{
                status: 0,
                message: null,
                data: null,
                error: error,
            }
        }));
    },

    [EDIT_CARD_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null
        }));
    },
    [EDIT_CARD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: false,
            editCards: {
                data: action.data.data.cards,
                status: action.data.data.status,
                message: action.data.data.message,
            }
        }));
    },
    [EDIT_CARD_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            editCards:{
                status: 0,
                message: null,
                data: null,
                error: error,
            }
        }));
    },

    [DELETE_CARD_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null
        }));
    },
    [DELETE_CARD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: false,
            deleteCards: {
                status: action.data.data.status,
                message: action.data.data.message,
            }
        }));
    },
    [DELETE_CARD_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            deleteCards:{
                status: 0,
                message: null,
                data: null,
                error: error,
            }
        }));
    },

    [GET_CARD_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            cards: {
                loading: true,
                error: null,
            }
        }));
    },
    [GET_CARD_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            cards: {
                data: action.data.data.cards,
                status: action.data.data.status,
                message: action.data.data.message,
                loading: false,
                error: false,
            }
        }));
    },
    [GET_CARD_LIST_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            cards: {
                loading: false,
                error: null,
            }
        }));
    },

    [CART_PAYMENT_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null,
            payment: { 
                status: 0,
                message: null,
            } //by dm
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

    [RESET_VALUES]:(state,action) => {
        let resetObj = {};
        let resetDataVal = {
            status: 0,
            message: null,
            data: null,
            error: null, 
        }
        //console.log(action);
        if(action['data']){
            (action['data']['addCard'] === false) ? resetObj['addCards'] = resetDataVal : '';
            (action['data']['deleteCard'] === false) ? resetObj['deleteCards'] = resetDataVal : '';
            (action['data']['editCard'] === false) ? resetObj['editCards'] = resetDataVal : '';
            (action['data']['addBank'] === false) ? resetObj['addBank'] = resetDataVal : '';
            (action['data']['deleteBank'] === false) ? resetObj['deleteBank'] = resetDataVal : '';
            (action['data']['removeCart'] === false) ? resetObj['removeItems'] = {status: 0, message: null} : '';
            
        }
        return state.merge(Map(resetObj));
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}
