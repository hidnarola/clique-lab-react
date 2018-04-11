export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
export const GET_GROUP_ERROR = 'GET_GROUP_ERROR';

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