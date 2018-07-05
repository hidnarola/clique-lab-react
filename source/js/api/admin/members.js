import { postFormData, getFormData } from "./../index";

function getMembers(data) {
  let headers = { 'x-access-token': localStorage.getItem('token') }
  return postFormData('admin/users', data, headers);
}

function removeMembers(data) {
  let headers = { 'x-access-token': localStorage.getItem('token') }
  return getFormData('admin/'+data.memberData.type+'/remove/'+data.memberData._id, '', headers);
}

function suspendMembers(data) {
  let headers = { 'x-access-token': localStorage.getItem('token') }
  return getFormData('admin/'+data.memberData.type+'/suspend/'+data.memberData._id, '', headers);
}

export default {
  getMembers,
  removeMembers,
  suspendMembers
}