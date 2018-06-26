export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const RESET_VALUES_REGISTER = 'RESET_VALUES_REGISTER';

export const SET_EMAIL = 'SET_EMAIL';

export const RE_SEND_EMAIL_REQUEST = 'RE_SEND_EMAIL_REQUEST';
export const RE_SEND_EMAIL_SUCCESS = 'RE_SEND_EMAIL_SUCCESS';
export const RE_SEND_EMAIL_ERROR = 'RE_SEND_EMAIL_ERROR';

// Fetch Country
export const FETCH_REGISTER_COUNTRY_REQUEST = 'FETCH_REGISTER_COUNTRY_REQUEST';
export const FETCH_REGISTER_COUNTRY_SUCCESS = 'FETCH_REGISTER_COUNTRY_SUCCESS';
export const FETCH_REGISTER_COUNTRY_ERROR = 'FETCH_REGISTER_COUNTRY_ERROR';

export const RESET_REGISTER_FULL_STATE = 'RESET_REGISTER_FULL_STATE';


export function register(userData) {
    return {
        type: REGISTER_REQUEST,
        userData
    }
}

export function registerSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        data
    }
}

export function registerError(error) {
    return {
        type: REGISTER_ERROR,
        error
    }
}

export function resetRegisterVal(data) {
    return { type: RESET_VALUES_REGISTER, data: data }
}

//get country on registration page

export function country() {
    return {
        type: FETCH_REGISTER_COUNTRY_REQUEST,
    }
}

export function countrySuccess(data) {
    return {
        type: FETCH_REGISTER_COUNTRY_SUCCESS,
        data
    }
}

export function countryError(error) {
    return {
        type: FETCH_REGISTER_COUNTRY_ERROR,
        error
    }
}

export function resetRegisterFullState() {
    return {
        type: RESET_REGISTER_FULL_STATE
    }
}



export function setEmail(data) {
    return {
        type: SET_EMAIL,
        data
    }
}

export function reSendEmail(data) {
    return {
        type: RE_SEND_EMAIL_REQUEST,
        data
    }
}



