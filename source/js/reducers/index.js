import { combineReducers } from 'redux';
import app from 'reducers/app';
import people from 'reducers/people';
import login from 'reducers/login';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    app,
    people,
    login,
    form: formReducer
});
