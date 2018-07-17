import { Map } from "immutable";
import { 
    GET_ANALYTICS_REQUEST, GET_ANALYTICS_SUCCESS, GET_ANALYTICS_ERROR,
    GET_SOCIAL_ANALYTICS_REQUEST, GET_SOCIAL_ANALYTICS_SUCCESS, GET_SOCIAL_ANALYTICS_ERROR,
    GET_DEMO_GRAPHICS_REQUEST, GET_DEMO_GRAPHICS_SUCCESS, GET_DEMO_GRAPHICS_ERROR,
    GET_DASHBOARD_REQUEST,GET_DASHBOARD_SUCCESS, GET_DASHBOARD_ERROR, 
    SET_DASHBOARD_CURRENT_VALUE_REQUEST,
    // ,SET_DASHBOARD_CURRENT_VALUE_SUCCESS,SET_DASHBOARD_CURRENT_VALUE_ERROR
} from "../actions/analytics";

const initialState = Map({
    loading: false,
    error: null,
    dashboardCurrentValue:'no_of_likes',
    analytics: {
        status: 0,
        message: null,
        data: null,
    },
    social_analytics: {
        status: 0,
        message: null,
        data: null,
    },
    demo_graphics: {
        loading: false,
        status: 0,
        message: null,
        data: null,
    },
    dashboard: {
        status: 0,
        message: null,
        data: null,
        dbloading:false,
        total:0,
    }

});

const actionMap = {
    [GET_ANALYTICS_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            analytics: {
                status: 0,
                message: null,
                data: null,
            }
        }));
    },
    [GET_ANALYTICS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: false,
            analytics: {
                status: action.data.data.status,
                message: action.data.data.message,
                data: action.data.data.result,
            }
        }));
    },
    [GET_ANALYTICS_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response.data.message) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error,
            status: 0,
        }));
    },

    [GET_SOCIAL_ANALYTICS_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            loading: true,
            social_analytics: {
                status: 0,
                message: null,
                data: null,
            }
        }));
    },

    [GET_SOCIAL_ANALYTICS_SUCCESS]: (state, action) => {
        // console.log('=======================================');
        // console.log('REDUCERS >>>>>> SOCIAL_ANALYTICS_SUCCESS');
        // console.log(action);
        // console.log('=======================================');
        // return false;
        return state.merge(Map({
            ...initialState,
            loading: false,
            social_analytics: {
                status: action.data.data.status,
                message: action.data.data.message,
                data: action.data.data.result,
            }
        }));
    },
    [GET_SOCIAL_ANALYTICS_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response.data.message) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error,
            status: 0,
        }));
    },

    [GET_DEMO_GRAPHICS_REQUEST]: (state, action) => {
        return state.merge(Map({
            demo_graphics: {
                loading: true,
                status: 0,
                message: null,
                data: null,
            }
        }));
    },
    [GET_DEMO_GRAPHICS_SUCCESS]: (state, action) => {
        return state.merge(Map({
            demo_graphics: {
                loading: false,
                status: action.data.data.status,
                message: action.data.data.message,
                data: action.data.data.results,
            },
        }));
    },
    [GET_DEMO_GRAPHICS_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response.data.message) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            loading: false,
            error: error,
            status: 0,
        }));
    },

    // Dashboard bottom

    [SET_DASHBOARD_CURRENT_VALUE_REQUEST]: (state, action) => {
        console.log('Reducer Call>>>',action);
        return state.merge(Map({
           dashboardCurrentValue:action.data
        }));
    },
    
    [GET_DASHBOARD_SUCCESS]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            error:null,
            // loading: false,
            dashboard: {
                dbloading: false,
                status: action.data.data.status,
                message: action.data.data.message,
                data: action.data.data.results.posts,
                total:action.data.data.results.total
            }
        }));
    },
    [GET_DASHBOARD_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response.data.message) {
            error = action.error.response.data.message;
        }
        return state.merge(Map({
            ...initialState,
            // loading: false,
            error: error,
            status: 0,
            dashboard:{
                dbloading: false,
                total:0,
            }
        }));
    },

    [GET_DASHBOARD_REQUEST]: (state, action) => {
        return state.merge(Map({
            ...initialState,
            error:null,
            // loading: true,
            dashboard: {
                dbloading: true,
                status: 0,
                message: null,
                data: null,
                total:0,
            }
        }));
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}