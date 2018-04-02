import React from 'react';
import { Route,Redirect } from 'react-router-dom';

import Header from '../global/Header';
import LeftMenu from '../global/LeftMenu';
// Common Template
export const DefaultLayout = ({component: Component, ...rest}) => {
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

export const PrivateRoute = ({ component: Component,showHeader, ...rest }) => {        
        return(<Route
                    {...rest}
                    render={props =>
                        localStorage.getItem('token') ? (
                            <div className="full-width d-flex">
                                <LeftMenu/>
                                <div className="right-panel">
                                    {(showHeader) ? <Header/>:''}
                                    <Component {...props} />
                                </div>
                            </div>
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        )
                    }
        />);
};

export const LoginPrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
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