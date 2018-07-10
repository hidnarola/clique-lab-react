import { Map } from "immutable";
import { 
    EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR,
    CHANGE_PASS_REQUEST, CHANGE_PASS_SUCCESS, CHANGE_PASS_ERROR,
    GET_JOINED_REF_REQUEST, GET_JOINED_REF_SUCCESS, GET_JOINED_REF_ERROR,
    GET_REVENUE_REF_REQUEST, GET_REVENUE_REF_SUCCESS, GET_REVENUE_REF_ERROR,
    ADD_BANK_REQUEST, ADD_BANK_SUCCESS, ADD_BANK_ERROR,
    DELETE_BANK_REQUEST, DELETE_BANK_SUCCESS, DELETE_BANK_ERROR,
    GET_BANK_LIST_REQUEST, GET_BANK_LIST_SUCCESS, GET_BANK_LIST_ERROR,
    GET_WALLET_BAL_REQUEST, GET_WALLET_BAL_SUCCESS, GET_WALLET_BAL_ERROR,
    WALLET_WITHDRAW_REQUEST, WALLET_WITHDRAW_SUCCESS, WALLET_WITHDRAW_ERROR,
    GET_TRANSACTION_HISTORY_REQUEST, GET_TRANSACTION_HISTORY_SUCCESS, GET_TRANSACTION_HISTORY_ERROR,

    RESET_VALUES
} from "../actions/myProfile";

const initialState = Map({
    loading: false,
    error: null,
    edit_profile: {
        status: 0,
        message: null,
        data: null,
    },
    change_pass: {
        status: 0,
        message: null,
        error: null,
    },
    joined_ref:{
        status: 0,
        message: null,
        data: null,
        error: null,
    },
    revenue_ref:{
        status: 0,
        message: null,
        data: null,
        error: null,
    },
    addBank: {
        status: 0,
        message: null,
        data: null,
        error: null, 
    },
    deleteBank:{
        status: 0,
        message: null,
        data: null,
        error: null, 
    },
    bank: {
        loading: false,
        status: 0,
        message: null,
        data: null,
        error: null,
    },
    wallet_balance: {
        loading: false,
        status: 0,
        message: null,
        data: null,
        error: null,
    },
    wallet_withdraw: {
        loading: false,
        status: 0,
        message: null,
        data: null,
        error: null,
    },
    transaction_history: {
        loading: false,
        status: 0,
        message: null,
        total: 0,
        data: null,
        error: null,
    }
});

const actionMap = {
    [EDIT_PROFILE_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            edit_profile: {
                status: 0,
                message: null,
                data: null,
            },
        }));
    },
    [EDIT_PROFILE_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            edit_profile: {
                status: action.data.data.status,
                message: action.data.data.message,
                data: action.data.data.promoter,
            },
        }));
    },
    [EDIT_PROFILE_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error,
            edit_profile: {
                status: 0,
                message: null,
                data: null,
            },
        }));
    },

    [CHANGE_PASS_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            change_pass: {
                status: 0,
                message: null,
                error: null,
            },
        }));
    },
    [CHANGE_PASS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            change_pass: {
                status: action.data.data.status,
                message: action.data.data.message,
                error: null,
            },
        }));
    },
    [CHANGE_PASS_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            loading: false,
            change_pass: {
                status: 0,
                message: null,
                error: error,
            },
        }));
    },

    [GET_JOINED_REF_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            joined_ref: {
                status: 0,
                message: null,
                error: null,
            },
        }));
    },
    [GET_JOINED_REF_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            joined_ref: {
                status: action.data.data.status,
                message: action.data.data.message,
                error: null,
            },
        }));
    },
    [GET_JOINED_REF_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            loading: false,
            joined_ref: {
                status: 0,
                message: null,
                error: error,
            },
        }));
    },

    [GET_REVENUE_REF_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true,
            error: null,
            revenue_ref: {
                status: 0,
                message: null,
                error: null,
            },
        }));
    },
    [GET_REVENUE_REF_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,
            revenue_ref: {
                status: action.data.data.status,
                message: action.data.data.message,
                error: null,
            },
        }));
    },
    [GET_REVENUE_REF_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            loading: false,
            revenue_ref: {
                status: 0,
                message: null,
                error: error,
            },
        }));
    },

    [ADD_BANK_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null
        }));
    },
    [ADD_BANK_SUCCESS]: (state, action) => {
        // console.log('Action>>>>>>>>',action);
        // return;
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: false,
            addBank: {
                // data: action.data.data.cards,
                status: action.data.data.status,
                message: action.data.data.message,
            }
        }));
    },
    [ADD_BANK_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            addBank:{
                status: 0,
                message: null,
                data: null,
                error: error,
            }
        }));
    },

    [DELETE_BANK_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            error: null
        }));
    },
    [DELETE_BANK_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: false,
            deleteBank: {
                status: action.data.data.status,
                message: action.data.data.message,
            }
        }));
    },
    [DELETE_BANK_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            deleteBank:{
                status: 0,
                message: null,
                data: null,
                error: error,
            }
        }));
    },

    [GET_BANK_LIST_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            bank: {
                loading: true,
                error: null,
            }
        }));
    },
    [GET_BANK_LIST_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            bank: {
                data: action.data.data.bank_account,
                status: action.data.data.status,
                message: action.data.data.message,
                loading: false,
                error: false,
            }
        }));
    },
    [GET_BANK_LIST_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            bank: {
                loading: false,
                error: null,
            }
        }));
    },

    [GET_WALLET_BAL_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            wallet_balance: {
                loading: true,
                error: null,
            }
        }));
    },
    [GET_WALLET_BAL_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            wallet_balance: {
                data: action.data.data.balance,
                status: action.data.data.status,
                message: action.data.data.message,
                loading: false,
                error: false,
            }
        }));
    },
    [GET_WALLET_BAL_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            wallet_balance: {
                loading: false,
                error: null,
            }
        }));
    },

    [WALLET_WITHDRAW_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            wallet_withdraw: {
                loading: true,
                error: null,
            }
        }));
    },
    [WALLET_WITHDRAW_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            wallet_withdraw: {
                data: action.data.data.balance,
                status: action.data.data.status,
                message: action.data.data.message,
                loading: false,
                error: false,
            }
        }));
    },
    [WALLET_WITHDRAW_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            wallet_withdraw: {
                loading: false,
                error: null,
            }
        }));
    },

    [GET_TRANSACTION_HISTORY_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            transaction_history: {
                loading: true,
                error: null,
            }
        }));
    },
    [GET_TRANSACTION_HISTORY_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            transaction_history: {
                data: action.data.data.results.transaction,
                status: action.data.data.status,
                message: action.data.data.message,
                total: action.data.data.results.total,
                loading: false,
                error: false,
            }
        }));
    },
    [GET_TRANSACTION_HISTORY_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            transaction_history: {
                loading: false,
                error: null,
            }
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
        if(action['data']){
            (action['data']['changePass'] === false) ? resetObj['change_pass'] = {status: 0, message: null, error: null} : '';
            (action['data']['addBank'] === false) ? resetObj['addBank'] = resetDataVal : '';
            (action['data']['deleteBank'] === false) ? resetObj['deleteBank'] = resetDataVal : '';
            (action['data']['wallet_withdraw'] === false) ? resetObj['wallet_withdraw'] = resetDataVal : '';
        }
        return state.merge(Map(resetObj));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}