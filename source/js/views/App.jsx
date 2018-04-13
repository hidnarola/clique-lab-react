import React, { Component } from 'react';
// import { Route, Switch,Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, withRouter } from "react-router-dom";

import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import {DefaultLayout,PrivateRoute,LoginPrivateRoute} from '../components/global/RouterWrapper';
import ScrollToTop from 'components/global/ScrollToTop';

import Home from 'views/Home';
import People from 'views/People';
import NotFound from 'views/NotFound';
import Login from 'components/Common/Login';
import EmailVerify from 'components/Common/EmailVerify';
import ForgotPassword from 'components/Common/ForgotPassword';
import ResetPassword from 'components/Common/ResetPassword';
import Register from 'components/Common/Register';
import AfterRegister from './AfterRegister';
import CampaignForm from './Campaign';
import Dashboard from './Dashboard';
import EverydayPeople from './EverydayPeople';

// Groups
import ListGroups from 'components/Group/GroupList';
import ListGroupMembers from 'components/Group/GroupMemberList';

import MyProfile from './MyProfile';

import createHistory from "history/createBrowserHistory"
const history = createHistory()


class App extends Component {
    render() {
        return (
            <div>     
                <Router>
                    <ScrollToTop>
                        <LoginPrivateRoute exact path={ routeCodes.HOME } component={ Login } />
                        <LoginPrivateRoute path={ routeCodes.LOGIN } component={Login} />
                        <Route path={ `${routeCodes.FORGOT}/:forgot_token?` } component={ForgotPassword} />
                        <Route path={ `${routeCodes.RESET}/:forgot_token?` } component={ResetPassword} />

                        <Route path={ routeCodes.REGISTER } component={Register} />

                        <Route path="/email_confirm/:refId" component={EmailVerify} />
                        
                        <PrivateRoute path={routeCodes.AFTERREGISTER} component={AfterRegister} showHeader={false} />
                        <PrivateRoute path={routeCodes.DASHBOARD} component={Dashboard} showHeader={true} />

                        <PrivateRoute path={routeCodes.CAMPAIGN} component={CampaignForm} showHeader={true} />
                        <PrivateRoute path={routeCodes.EVERYDAYPEOPLE} component={EverydayPeople} showHeader={true} />

                        <PrivateRoute exact path={routeCodes.LISTGROUPS} component={ListGroups} showHeader={true} />
                        <PrivateRoute path={`${routeCodes.LISTGROUPS}/:grpId/members`} component={ListGroupMembers} showHeader={true} />
                        
                        {/* Profile */}
                        <PrivateRoute path={routeCodes.MY_PROFILE} component={MyProfile} showHeader={true} />
                        <PrivateRoute path={routeCodes.PARTNERSHIP_PROGRAM} component={MyProfile} showHeader={true} />
                        <PrivateRoute path={routeCodes.WALLET} component={CampaignForm} showHeader={true} />
                        <PrivateRoute path={routeCodes.PERMISSION} component={CampaignForm} showHeader={true} />

                        
                        {/* <Route path='*' component={ NotFound } />                         */}
                    </ScrollToTop>
                </Router>
            </div>
        );
    }
}

export default hot(module)(App);