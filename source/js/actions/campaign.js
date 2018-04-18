export const CAMPAIGN_REQUEST = 'CAMPAIGN_REQUEST';
export const CAMPAIGN_SUCCESS = 'CAMPAIGN_SUCCESS';
export const CAMPAIGN_ERROR = 'CAMPAIGN_ERROR';

export const GET_ACTIVE_CAMPAIGN_REQUEST = 'GET_ACTIVE_CAMPAIGN_REQUEST';
export const GET_ACTIVE_CAMPAIGN_SUCCESS = 'GET_ACTIVE_CAMPAIGN_SUCCESS';
export const GET_ACTIVE_CAMPAIGN_ERROR = 'GET_ACTIVE_CAMPAIGN_ERROR';

export function createCampaign(data) {
    return { type: CAMPAIGN_REQUEST, data }
}

export function campaignSuccess(data) {
    return { type: CAMPAIGN_SUCCESS, data }
}

export function campaignError(error) {
    return { type: CAMPAIGN_ERROR, error }
}

export function getActiveCampaign(data) {
    return { type: GET_ACTIVE_CAMPAIGN_REQUEST, data }
}

export function getActiveCampaignSuccess(data) {
    return { type: GET_ACTIVE_CAMPAIGN_SUCCESS, data }
}

export function getActiveCampaignError(error) {
    return { type: GET_ACTIVE_CAMPAIGN_ERROR, error }
}