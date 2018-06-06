export const LOCALSTORAGE_USER_ITEM_KEY = 'user';
export const LOCALSTORAGE_TOKEN_ITEM_KEY = 'token';
export const LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY = 'refreshToken';
export const LOCALSTORAGE_ROLE_KEY = 'role';

export const USER_ROLE = 'fitassist-user';
export const ADMIN_ROLE = 'firassist-admin';

let base_url = 'https://dev.cliquelabs.com/api/';
if(window.location.hostname=='dev.cliquelabs.com' || window.location.hostname=='localhost'){
    base_url = 'https://dev.cliquelabs.com/api/';
}else if(window.location.hostname=='app.cliquelabs.com'){
    base_url = 'https://api.cliquelabs.com/';
}

export const SERVER_BASE_URL = base_url;