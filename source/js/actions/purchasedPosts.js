export const PURCHASED_POSTS_REQUEST = 'PURCHASED_POSTS_REQUEST';
export const PURCHASED_POSTS_SUCCESS = 'PURCHASED_POSTS_SUCCESS';
export const PURCHASED_POSTS_ERROR = 'PURCHASED_POSTS_ERROR';

export function puchasedPostSend(data) {
    return {
        type: PURCHASED_POSTS_REQUEST,
        data
    }
}

export function puchasedPostSuccess(data) {
    return {
        type: PURCHASED_POSTS_SUCCESS,
        data
    }
}

export function puchasedPostError(error) {
    return {
        type: PURCHASED_POSTS_ERROR,
        error
    }
}