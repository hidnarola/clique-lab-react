import { Map } from "immutable";
import { 
    EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR,
} from "../actions/myProfile";

const initialState = Map({
    loading: false,
    error: null,
    edit_profile: {
        status: 0,
        message: null,
        data: null,
    },
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
        // console.log('===========================================');
        // console.log('              EDIT PROFLE SUCCESS          ');
        // console.log('===========================================');
        // console.log(action);
        // return;
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
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}