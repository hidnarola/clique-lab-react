import { postFormData } from "./../index";

function forgotPassword(data){
  let headers = { 'x-access-token' : localStorage.getItem('token') }
  return postFormData('admin_forgot_password', data, headers);
}

function resetPassword(data){
    let headers = { 'x-access-token' : localStorage.getItem('token') }
    return postFormData('admin_reset_password', data, headers);
  }

export default {
    forgotPassword,
    resetPassword,
}