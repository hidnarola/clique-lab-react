import { postFormData } from "./../index";

function getTransaction(data){
  let headers = { 'x-access-token' : localStorage.getItem('token') }
  return postFormData('admin/transactions', data, headers);
}

export default {
    getTransaction,
}