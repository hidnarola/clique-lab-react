export const CAMPAIGN_REQUEST = 'CAMPAIGN_REQUEST';
export const CAMPAIGN_SUCCESS = 'CAMPAIGN_SUCCESS';
export const CAMPAIGN_ERROR = 'CAMPAIGN_ERROR';

export function createCampaign(data) {
    return {
        type: CAMPAIGN_REQUEST,
        data
    }
}

export function campaignSuccess(data) {
    return {
        type: CAMPAIGN_SUCCESS,
        data
    }
}

export function campaignError(error) {
    return {
        type: CAMPAIGN_ERROR,
        error
    }
}