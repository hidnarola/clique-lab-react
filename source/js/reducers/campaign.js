import { Map } from "immutable";
import { 
        CAMPAIGN_REQUEST,CAMPAIGN_SUCCESS,CAMPAIGN_ERROR 
        } from "../actions/campaign";

const initialState = Map({
    loading: false,
    error: null,
    campaign:null
});

const actionMap = {
    [CAMPAIGN_REQUEST]: (state, action) => {
        return state.merge(Map({
            loading: true                        
        }));
    },
    [CAMPAIGN_SUCCESS]: (state, action) => {
        return state.merge(Map({
            loading: false,     
            error:null,       
            campaign:action.data.data
        }));
    },
    [CAMPAIGN_ERROR]: (state, action) => {
        let error = 'Server Error';
        if (action.error && action.error.response) {
            error = action.error.response.message;
        }
        return state.merge(Map({
            loading: false,
            error: error            
        }));
    },    
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionMap[action.type];
    return fn ? fn(state, action) : state;
}