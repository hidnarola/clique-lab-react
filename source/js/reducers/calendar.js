import { Map } from "immutable";
import { GET_CAMPAIGN_REQUEST, GET_CAMPAIGN_SUCCESS, GET_CAMPAIGN_ERROR } from "../actions/calendar";

const initialState = Map({
    loading: false,
    error: null,
    campaign: {
        status: 0,
        message: null,
        data: null,
    }
});

const actionMap = {
    [GET_CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            campaign: {
                status: 0,
                message: null,
                data: null,
            }
        }));
    },
    [GET_CAMPAIGN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            campaign: {
                status: action.data.data.results.status,
                message: action.data.data.message,
                data: action.data.data.results.campaign,
            }
        }));
    },
    [GET_CAMPAIGN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response.data.message) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            campaign: {
                status: 0,
                message: error,
                data: null,
            }
        }));
    }
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}