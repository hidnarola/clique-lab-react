import { combineReducers } from 'redux';
import login from 'reducers/login';
import register from 'reducers/register';
import afterRegister from 'reducers/afterRegister';
import campaign from 'reducers/campaign';
import everyDay from 'reducers/everyDay';
import forgotPass from 'reducers/forgotPass';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({    
    login,
    register,
    afterRegister,
    campaign,
    everyDay,
    forgotPass,
    form: formReducer
});
