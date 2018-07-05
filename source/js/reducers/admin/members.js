import { Map } from "immutable";
import {
    GET_MEMBERS_REQUEST, GET_MEMBERS_SUCCESS, GET_MEMBERS_ERROR,
    RESET_MEMBERS_VALUES
} from "../../actions/admin/members";

const initialState = Map({
    getMembers: {
        loading: false,
        error: null,
        status: 0,
        message: null,
        data: null,
        total: 0
    }
});

const actionMap = {
    [GET_MEMBERS_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            getMembers: {
                loading: true,
                error: null,
                status: 0,
                message: null,
                data: null,
                total: 0
            }
        }));
    },
    [GET_MEMBERS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            getMembers: {
                loading: false,
                status: action.data.data.status,
                message: action.data.data.message,
                data: action.data.data.results.users,
                total: action.data.data.results.total,
                error: null,
            }
        }));
    },
    [GET_MEMBERS_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            ...initialState,
            getMembers: {
                loading: false,
                error: error,
                status: 0,
                message: null,
                data: null,
                total: 0
            }
        }));
    },

    [RESET_MEMBERS_VALUES]: (state, action) => {
        let resetObj = {};
        if(action['data']){
            (action['data']['getMembers'] === false) ? resetObj['getMembers'] = { loading: false, error: null, status: 0, message: null, data: null, total: 0} : '';
        }
        return state.merge(Map(resetObj));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}