export const EVERY_DAY_REQUEST = 'EVERY_DAY_REQUEST';
export const EVERY_DAY_SUCCESS = 'EVERY_DAY_SUCCESS';
export const EVERY_DAY_ERROR = 'EVERY_DAY_ERROR';

export function sendReq(data) {
    return {
        type: EVERY_DAY_REQUEST,
        data
    }
}

export function everyDaySuccess(data) {
    return {
        type: EVERY_DAY_SUCCESS,
        data
    }
}

export function everyDayError(error) {
    return {
        type: EVERY_DAY_ERROR,
        error
    }
}