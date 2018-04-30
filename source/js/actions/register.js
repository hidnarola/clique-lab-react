export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

// Fetch Country
export const FETCH_REGISTER_COUNTRY_REQUEST = 'FETCH_REGISTER_COUNTRY_REQUEST';
export const FETCH_REGISTER_COUNTRY_SUCCESS = 'FETCH_REGISTER_COUNTRY_SUCCESS';
export const FETCH_REGISTER_COUNTRY_ERROR = 'FETCH_REGISTER_COUNTRY_ERROR';


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