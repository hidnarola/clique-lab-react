export const CAMPAIGN_REQUEST = 'CAMPAIGN_REQUEST';
export const CAMPAIGN_SUCCESS = 'CAMPAIGN_SUCCESS';
export const CAMPAIGN_ERROR = 'CAMPAIGN_ERROR';

export const GET_ACTIVE_CAMPAIGN_REQUEST = 'GET_ACTIVE_CAMPAIGN_REQUEST';
export const GET_ACTIVE_CAMPAIGN_SUCCESS = 'GET_ACTIVE_CAMPAIGN_SUCCESS';
export const GET_ACTIVE_CAMPAIGN_ERROR = 'GET_ACTIVE_CAMPAIGN_ERROR';

export const GET_FUTURE_CAMPAIGN_REQUEST = 'GET_FUTURE_CAMPAIGN_REQUEST';
export const GET_FUTURE_CAMPAIGN_SUCCESS = 'GET_FUTURE_CAMPAIGN_SUCCESS';
export const GET_FUTURE_CAMPAIGN_ERROR = 'GET_FUTURE_CAMPAIGN_ERROR';

export const GET_PAST_CAMPAIGN_REQUEST = 'GET_PAST_CAMPAIGN_REQUEST';
export const GET_PAST_CAMPAIGN_SUCCESS = 'GET_PAST_CAMPAIGN_SUCCESS';
export const GET_PAST_CAMPAIGN_ERROR = 'GET_PAST_CAMPAIGN_ERROR';

export const STOP_CAMPAIGN_REQUEST = 'STOP_CAMPAIGN_REQUEST';
export const STOP_CAMPAIGN_SUCCESS = 'STOP_CAMPAIGN_SUCCESS';
export const STOP_CAMPAIGN_ERROR = 'STOP_CAMPAIGN_ERROR';

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

export function getFutureCampaign(data) {
    return { type: GET_FUTURE_CAMPAIGN_REQUEST, data }
}

export function getFutureCampaignSuccess(data) {
    return { type: GET_FUTURE_CAMPAIGN_SUCCESS, data }
}

export function getFutureCampaignError(error) {
    return { type: GET_FUTURE_CAMPAIGN_ERROR, error }
}

export function getPastCampaign(data) {
    return { type: GET_PAST_CAMPAIGN_REQUEST, data }
}

export function getPastCampaignSuccess(data) {
    return { type: GET_PAST_CAMPAIGN_SUCCESS, data }
}

export function getPastCampaignError(error) {
    return { type: GET_PAST_CAMPAIGN_ERROR, error }
}

export function stopCampaign(data) {
    return { type: STOP_CAMPAIGN_REQUEST, data }
}

export function stopCampaignSuccess(data) {
    return { type: STOP_CAMPAIGN_SUCCESS, data }
}

export function stopCampaignError(error) {
    return { type: STOP_CAMPAIGN_ERROR, error }
}