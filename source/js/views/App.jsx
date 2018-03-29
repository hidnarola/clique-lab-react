import React, { Component } from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Menu from 'components/global/Menu';
import Home from 'views/Home';
import People from 'views/People';
import NotFound from 'views/NotFound';
import Login from 'components/Common/Login';
import ForgotPassword from 'components/Common/ForgotPassword';
import Register from 'components/Common/Register';

import createHistory from "history/createBrowserHistory"

const history = createHistory()

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
};

// Common Template
const DefaultLayout = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
                <div className="DefaultLayout">
                    <div className="Header">Header</div>
                    <Component {...matchProps} />
                    <div className="Footer">Footer</div>
                </div>
            )} />
    )
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
);

const LoginPrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
            <Redirect
                to={{
                    pathname: "/people",
                    state: { from: props.location }
                }}
            />
        ) : (
            <Component {...props} />          
        )
      }
    />
);

class App extends Component {
    render() {
        return (
            <div className='App'>
                {/* <Menu /> */}
                

                <div className='Page'>
                    <Switch>
                        <Route exact path={ routeCodes.HOME } component={ Login } />
                        <LoginPrivateRoute path={ routeCodes.LOGIN } component={Login} />
                        <Route path={ routeCodes.FORGOT } component={ForgotPassword} />
                        <Route path={ routeCodes.REGISTER } component={Register} />
                        <PrivateRoute path={ routeCodes.PEOPLE } component={ People } />
                        <Route path='*' component={ NotFound } />
                        {/* <DefaultLayout path="/" component={SomeComponent} /> */}
                    </Switch>
                </div>

            </div>
        );
    }
}

export default hot(module)(App);
