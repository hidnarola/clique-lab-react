export const EVERY_DAY_REQUEST = 'EVERY_DAY_REQUEST';
export const EVERY_DAY_SUCCESS = 'EVERY_DAY_SUCCESS';
export const EVERY_DAY_ERROR = 'EVERY_DAY_ERROR';

export const MORE_FILTER_REQUEST = 'MORE_FILTER_REQUEST';
export const MORE_FILTER_SUCCESS = 'MORE_FILTER_SUCCESS';
export const MORE_FILTER_ERROR = 'MORE_FILTER_ERROR';

// ----------------------------------------------------------------------

export function sendReq(data) {
    return { type: EVERY_DAY_REQUEST, data:data }
}

export function everyDaySuccess(data) {
    return { type: EVERY_DAY_SUCCESS, data:data }
}

export function everyDayError(error) {
    return { type: EVERY_DAY_ERROR, error:error }
}

// ----------------------------------------------------------------------

export function moreFilterReq() {
    return { type: MORE_FILTER_REQUEST}
}

export function moreFilterSuccess(data) {
    return { type: MORE_FILTER_SUCCESS, data:data }
}

export function moreFilterError(error) {
    return { type: MORE_FILTER_ERROR, error:error }
}