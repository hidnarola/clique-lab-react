export const GET_MEMBERS_REQUEST = 'GET_MEMBERS_REQUEST';
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_ERROR = 'GET_MEMBERS_ERROR';

export const REMOVE_MEMBERS_REQUEST = 'REMOVE_MEMBERS_REQUEST';
export const REMOVE_MEMBERS_SUCCESS = 'REMOVE_MEMBERS_SUCCESS';
export const REMOVE_MEMBERS_ERROR = 'REMOVE_MEMBERS_ERROR';

export const SUSPEND_MEMBERS_REQUEST = 'SUSPEND_MEMBERS_REQUEST';
export const SUSPEND_MEMBERS_SUCCESS = 'SUSPEND_MEMBERS_SUCCESS';
export const SUSPEND_MEMBERS_ERROR = 'SUSPEND_MEMBERS_ERROR';

export const RESET_MEMBERS_VALUES = 'RESET_MEMBERS_VALUES';

export function getMembers(data) { return { type: GET_MEMBERS_REQUEST, data } }
export function getMembersSuccess(data) { return { type: GET_MEMBERS_SUCCESS, data } }
export function getMembersError(error) { return { type: GET_MEMBERS_ERROR, error } }

export function removeMembers(data) { return { type: REMOVE_MEMBERS_REQUEST, data } }
export function removeMembersSuccess(data) { return { type: REMOVE_MEMBERS_SUCCESS, data } }
export function removeMembersError(error) { return { type: REMOVE_MEMBERS_ERROR, error } }

export function suspendMembers(data) { return { type: SUSPEND_MEMBERS_REQUEST, data } }
export function suspendMembersSuccess(data) { return { type: SUSPEND_MEMBERS_SUCCESS, data } }
export function suspendMembersError(error) { return { type: SUSPEND_MEMBERS_ERROR, error } }

export function resetMembersVal(data) { return { type: RESET_MEMBERS_VALUES, data:data } }
