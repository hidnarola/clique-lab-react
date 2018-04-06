import { combineReducers } from 'redux';
import login from 'reducers/login';
import register from 'reducers/register';
import afterRegister from 'reducers/afterRegister';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({    
    login,
    register,
    afterRegister,
    form: formReducer
});
