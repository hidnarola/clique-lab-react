export const GET_ANALYTICS_REQUEST = 'GET_ANALYTICS_REQUEST';
export const GET_ANALYTICS_SUCCESS = 'GET_ANALYTICS_SUCCESS';
export const GET_ANALYTICS_ERROR = 'GET_ANALYTICS_ERROR';

export const GET_SOCIAL_ANALYTICS_REQUEST = 'GET_SOCIAL_ANALYTICS_REQUEST';
export const GET_SOCIAL_ANALYTICS_SUCCESS = 'GET_SOCIAL_ANALYTICS_SUCCESS';
export const GET_SOCIAL_ANALYTICS_ERROR = 'GET_SOCIAL_ANALYTICS_ERROR';

export function getAnalytics(data) { return { type: GET_ANALYTICS_REQUEST, data } }
export function getAnalyticsSuccess(data) { return { type: GET_ANALYTICS_SUCCESS, data } }
export function getAnalyticsError(error) { return { type: GET_ANALYTICS_ERROR, error } }

export function getSocialAnalytics(data) { return { type: GET_SOCIAL_ANALYTICS_REQUEST, data } }
export function getSocialAnalyticsSuccess(data) { return { type: GET_SOCIAL_ANALYTICS_SUCCESS, data } }
export function getSocialAnalyticsError(error) { return { type: GET_SOCIAL_ANALYTICS_ERROR, error } }