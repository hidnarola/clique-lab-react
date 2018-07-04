import { Map } from "immutable";
import {
    GET_TRANSACTION_REQUEST, GET_TRANSACTION_SUCCESS, GET_TRANSACTION_ERROR,
    RESET_TRANSACTION_VALUES
} from "../../actions/admin/transaction";

const initialState = Map({
    getTransaction: {
        loading: false,
        error: null,
        status: 0,
        message: null,
        data: null,
        total: 0
    }
});

const actionMap = {
    [GET_TRANSACTION_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            getTransaction: {
                loading: true,
                error: null,
                status: 0,
                message: null,
                data: null,
                total: 0
            }
        }));
    },
    [GET_TRANSACTION_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            getTransaction: {
                loading: false,
                status: action.data.data.status,
                message: action.data.data.message,
                data: action.data.data.results.transaction,
                total: action.data.data.results.total,
                error: null,
            }
        }));
    },
    [GET_TRANSACTION_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            getTransaction: {
                loading: false,
                error: error,
                status: 0,
                message: null,
                data: null,
                total: 0
            }
        }));
    },

    [RESET_TRANSACTION_VALUES]: (state, action) => {
        let resetObj = {};
        if(action['data']){
            (action['data']['getTransaction'] === false) ? resetObj['getTransaction'] = { loading: false, error: null, status: 0, message: null, data: null, total: 0} : '';
        }
        return state.merge(Map(resetObj));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}