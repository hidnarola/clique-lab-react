import { combineReducers } from 'redux';
import login from 'reducers/login';
import register from 'reducers/register';
import forgotPass from 'reducers/forgotPass';
import afterRegister from 'reducers/afterRegister';
import campaign from 'reducers/campaign';
import everyDay from 'reducers/everyDay';
import groups from 'reducers/groups';
import checkout from 'reducers/checkout';
import purchasedPosts from 'reducers/purchasedPosts';
import calendar from 'reducers/calendar';
import analytics from 'reducers/analytics';
import myProfile from 'reducers/myProfile';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({    
    login,
    register,
    forgotPass,
    afterRegister,
    campaign,
    everyDay,
    groups,
    checkout,
    purchasedPosts,
    calendar,
    analytics,
    myProfile,
    form: formReducer
});
