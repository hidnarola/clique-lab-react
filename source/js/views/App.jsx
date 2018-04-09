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
import Register from 'components/Common/Register';
import AfterRegister from './AfterRegister';
import CampaignForm from './Campaign';
import Dashboard from './Dashboard';
import EverydayPeople from './EverydayPeople';

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
                        <Route path={ routeCodes.FORGOT } component={ForgotPassword} />
                        
                        <Route path={ routeCodes.REGISTER } component={Register} />

                        <Route path="/email_confirm/:refId" component={EmailVerify} />
                        
                        <PrivateRoute path={routeCodes.AFTERREGISTER} component={AfterRegister} showHeader={false} />
                        <PrivateRoute path={routeCodes.DASHBOARD} component={Dashboard} showHeader={true} />

                        <PrivateRoute path={routeCodes.CAMPAIGN} component={CampaignForm} showHeader={true} />
                        <PrivateRoute path={routeCodes.EVERYDAYPEOPLE} component={EverydayPeople} showHeader={true} />
                        {/* <Route path='*' component={ NotFound } />                         */}
                    </ScrollToTop>
                </Router>
            </div>
        );
    }
}

export default hot(module)(App);