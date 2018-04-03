import { fetchResource,postFormData } from "./index";

function userRegister(data) {
    return postFormData('promoter_signup', data);
}
 

export default {
    userRegister
}