export const GET_ANALYTICS_REQUEST = 'GET_ANALYTICS_REQUEST';
export const GET_ANALYTICS_SUCCESS = 'GET_ANALYTICS_SUCCESS';
export const GET_ANALYTICS_ERROR = 'GET_ANALYTICS_ERROR';

export function getAnalytics(data) {
    return {
        type: GET_ANALYTICS_REQUEST,
        data
    }
}

export function getAnalyticsSuccess(data) {
    return {
        type: GET_ANALYTICS_SUCCESS,
        data
    }
}

export function getAnalyticsError(error) {
    return {
        type: GET_ANALYTICS_ERROR,
        error
    }
}