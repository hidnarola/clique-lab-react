export const AFTER_REGISTER_REQUEST = 'AFTER_REGISTER_REQUEST';
export const AFTER_REGISTER_SUCCESS = 'AFTER_REGISTER_SUCCESS';
export const AFTER_REGISTER_ERROR = 'AFTER_REGISTER_ERROR';

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