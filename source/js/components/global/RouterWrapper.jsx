import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import cx from 'classnames';
import Header from '../global/Header';
import Header2 from '../global/Header2';
import LeftMenu from '../global/LeftMenu';


export const PrivateRoute = ({ component: Component,showHeader, ...rest }) => {        
        return(<Route
                    {...rest}
                    render={props =>
                        localStorage.getItem('token') ? (
                            <div className={cx({'full-width d-flex':(showHeader) ? true:false})} >

                                {(showHeader) ? <LeftMenu/>:''}
                                <div className={cx({'right-panel':(showHeader) ? true:false})}>
                                    {(showHeader) ? <Header/>:<Header2/>}
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
                    pathname: "/dashboard",
                    state: { from: props.location }
                }}
            />
        ) : (
            <Component {...props} />          
        )
      }
    />
);