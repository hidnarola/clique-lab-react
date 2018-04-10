import { postFormData } from "./index";

function forgotPass(data) {
    return postFormData('promoter_forgot_password', data);
}

function resetPass(data) {
    return postFormData('promoter_reset_password', data);
}

export default {
    forgotPass,
    resetPass,
}