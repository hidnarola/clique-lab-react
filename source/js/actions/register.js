export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

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