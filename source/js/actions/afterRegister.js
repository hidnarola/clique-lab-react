export const AFTER_REGISTER_REQUEST = 'AFTER_REGISTER_REQUEST';
export const AFTER_REGISTER_SUCCESS = 'AFTER_REGISTER_SUCCESS';
export const AFTER_REGISTER_ERROR = 'AFTER_REGISTER_ERROR';

export const AFTER_FETCH_DATA = 'AFTER_FETCH_DATA';
export const AFTER_FETCH_DATA_SUCCESS = 'AFTER_FETCH_DATA_SUCCESS';
export const AFTER_FETCH_DATA_ERROR = 'AFTER_FETCH_DATA_ERROR';


export function afterRegisterSend(data) {
    return {
        type: AFTER_REGISTER_REQUEST,
        data
    }
}

export function afterRegisterSuccess(data) {
    return {
        type: AFTER_REGISTER_SUCCESS,
        data
    }
}

export function afterRegisterError(error) {
    return {
        type: AFTER_REGISTER_ERROR,
        error
    }
}

//---------------------------------------------------------------------------------------------

export function industryFetch() {
    return {
        type: AFTER_FETCH_DATA        
    }
}

export function industryFetchSuccess(data) {
    return {
        type: AFTER_FETCH_DATA_SUCCESS,
        data
    }
}

export function industryFetchError(error) {
    return {
        type: AFTER_FETCH_DATA_ERROR,
        error
    }
}
