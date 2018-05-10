export const FORGOT_REQUEST = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_ERROR = 'FORGOT_ERROR';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_ERROR = 'RESET_ERROR';

export const RESET_VALUES_FORGOT = 'RESET_VALUES_FORGOT';

export function forgotPass(forgotData) {
    return {
        type: FORGOT_REQUEST,
        forgotData
    }
}

export function forgotPassSuccess(data) {
    return {
        type: FORGOT_SUCCESS,
        data
    }
}

export function forgotPassError(error) {
    return {
        type: FORGOT_ERROR,
        error
    }
}

export function resetPass(resetData) {
    return {
        type: RESET_REQUEST,
        resetData
    }
}

export function resetPassSuccess(data) {
    return {
        type: RESET_SUCCESS,
        data
    }
}

export function resetPassError(error) {
    return {
        type: RESET_ERROR,
        error
    }
}

export function resetForgotVal(data) {
    return { type: RESET_VALUES_FORGOT, data:data }
}