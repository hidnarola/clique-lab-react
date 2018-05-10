export const GET_CAMPAIGN_REQUEST = 'GET_CAMPAIGN_REQUEST';
export const GET_CAMPAIGN_SUCCESS = 'GET_CAMPAIGN_SUCCESS';
export const GET_CAMPAIGN_ERROR = 'GET_CAMPAIGN_ERROR';

export function getCampaign(data) {
    return {
        type: GET_CAMPAIGN_REQUEST,
        data
    }
}

export function getCampaignSuccess(data) {
    return {
        type: GET_CAMPAIGN_SUCCESS,
        data
    }
}

export function getCampaignError(error) {
    return {
        type: GET_CAMPAIGN_ERROR,
        error
    }
}