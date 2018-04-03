import React, { Component } from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import {DefaultLayout,PrivateRoute,LoginPrivateRoute} from '../components/global/RouterWrapper';

import Home from 'views/Home';
import People from 'views/People';
import NotFound from 'views/NotFound';
import Login from 'components/Common/Login';
import EmailVerify from 'components/Common/EmailVerify';
import ForgotPassword from 'components/Common/ForgotPassword';
import Register from 'components/Common/Register';
import AfterRegister from './AfterRegister';
import Dashboard from './Dashboard';

import createHistory from "history/createBrowserHistory"
const history = createHistory()

class App extends Component {
    render() {
        return (
            <div>     
                    <Switch>
                        <LoginPrivateRoute exact path={ routeCodes.HOME } component={ Login } />
                        <LoginPrivateRoute path={ routeCodes.LOGIN } component={Login} />
                        <Route path={ routeCodes.FORGOT } component={ForgotPassword} />
                        
                        <Route path={ routeCodes.REGISTER } component={Register} />

                        
                        <Route path="/email_confirm/:refId" component={EmailVerify} />

                        <PrivateRoute path={routeCodes.AFTERREGISTER} component={AfterRegister} showHeader={false} />
                        
                        <PrivateRoute path={ routeCodes.PEOPLE } component={ People } />
                        
                        <PrivateRoute path={routeCodes.DASHBOARD} component={Dashboard} showHeader={true} />

                        <Route path='*' component={ NotFound } />
                        {/* <DefaultLayout path="/" component={SomeComponent} /> */}
                    </Switch>
            </div>
        );
    }
}

export default hot(module)(App);