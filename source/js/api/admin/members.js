import { postFormData } from "./../index";

function getMembers(data){
  let headers = { 'x-access-token' : localStorage.getItem('token') }
  return postFormData('admin/users', data, headers);
}

export default {
    getMembers,
}