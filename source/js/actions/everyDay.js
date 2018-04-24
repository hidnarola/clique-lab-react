export const EVERY_DAY_REQUEST = 'EVERY_DAY_REQUEST';
export const EVERY_DAY_SUCCESS = 'EVERY_DAY_SUCCESS';
export const EVERY_DAY_ERROR = 'EVERY_DAY_ERROR';

export const MORE_FILTER_REQUEST = 'MORE_FILTER_REQUEST';
export const MORE_FILTER_SUCCESS = 'MORE_FILTER_SUCCESS';
export const MORE_FILTER_ERROR = 'MORE_FILTER_ERROR';

export const FETCH_DROPDOWN_REQUEST = 'FETCH_DROPDOWN_REQUEST';
export const FETCH_DROPDOWN_SUCCESS = 'FETCH_DROPDOWN_SUCCESS';
export const FETCH_DROPDOWN_ERROR = 'FETCH_DROPDOWN_ERROR';

export const RESET_VALUES = 'RESET_VALUES';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';

export const BULK_USER_REQUEST = 'BULK_USER_REQUEST';
export const BULK_USER_SUCCESS = 'BULK_USER_SUCCESS';
export const BULK_USER_ERROR = 'BULK_USER_ERROR';

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

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
    export function fetchDropDownReq(data) {
        return { type: FETCH_DROPDOWN_REQUEST,data:data}
    }

    export function fetchDropDownSuccess(data) {
        return { type: FETCH_DROPDOWN_SUCCESS, data:data }
    }

    export function fetchDropDownError(error) {
        return { type: FETCH_DROPDOWN_ERROR, error:error }
    }
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
    export function addUserReq(data) {
        return { type: ADD_USER_REQUEST,data:data}
    }

    export function addUserSuccess(data) {
        return { type: ADD_USER_SUCCESS, data:data }
    }

    export function addUserError(error) {
        return { type: ADD_USER_ERROR, error:error }
    }
// ----------------------------------------------------------------------
    
// ----------------------------------------------------------------------
    export function resetVal(data) {
        return { type: RESET_VALUES, data:data }
    }
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
    export function bulkUserReq(data) {
        return { type: BULK_USER_REQUEST,data:data}
    }

    export function bulkUserSuccess(data) {
        return { type: BULK_USER_SUCCESS, data:data }
    }

    export function bulkUserError(error) {
        return { type: BULK_USER_ERROR, error:error }
    }
// ----------------------------------------------------------------------