export const GET_TRANSACTION_REQUEST = 'GET_TRANSACTION_REQUEST';
export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS';
export const GET_TRANSACTION_ERROR = 'GET_TRANSACTION_ERROR';

export function getTransaction(data) {
    return { type: GET_TRANSACTION_REQUEST, data }
}

export function getTransactionSuccess(data) {
    return { type: GET_TRANSACTION_SUCCESS, data }
}

export function getTransactionError(error) {
    return { type: GET_TRANSACTION_ERROR, error }
}

// *************************************************************************************

export const RESET_TRANSACTION_VALUES = 'RESET_TRANSACTION_VALUES';

export function resetTransactionVal(data) {
    return { type: RESET_TRANSACTION_VALUES, data:data }
}

// *************************************************************************************
