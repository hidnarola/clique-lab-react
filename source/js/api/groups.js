import { postFormData } from "./index";

function addGroups(data){
  let headers = {
    'x-access-token' : localStorage.getItem('token')
  }
  return postFormData('promoter/group', data, headers);
}

function getGroups(data) {
    let headers = {
      'x-access-token' : localStorage.getItem('token')
    }
    return postFormData('promoter/group/filter', data, headers);
}

function getGroupMembers(groupId,data) {
  let headers = {
    'x-access-token' : localStorage.getItem('token')
  }
  return postFormData(`promoter/group/${groupId}/members`,data,headers);
}

export default {
    addGroups,
    getGroups,
    getGroupMembers,
}