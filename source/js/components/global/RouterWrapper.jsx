import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import cx from 'classnames';
import Header from '../global/Header';
import Header2 from '../global/Header2';
import LeftMenu from '../global/LeftMenu';
import CryptoJS from 'crypto-js';
import {SECRET_KEY} from '../../constants/usefulvar';
import { LOCALSTORAGE_USER_ITEM_KEY, LOCALSTORAGE_TOKEN_ITEM_KEY, LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY, 
    LOCALSTORAGE_ROLE_KEY, USER_ROLE, ADMIN_ROLE } from '../../constants/consts';
    
export const PrivateRoute = ({ component: Component,showHeader, ...rest }) => {

    let roleTxt = localStorage.getItem('role');
    let plaintext = '';
    if(roleTxt){
        let bytes  = CryptoJS.AES.decrypt(localStorage.getItem('role').toString(), SECRET_KEY);
        plaintext = bytes.toString(CryptoJS.enc.Utf8);
    }
    return(<Route
                {...rest}
                render={props =>
                    (plaintext == 'promoter') ? (
                        <div className={cx({'full-width d-flex':(showHeader) ? true:false})} >

                            {(showHeader) ? <LeftMenu/>:''}
                            <div className={cx({'right-panel':(showHeader) ? true:false})}>
                                {(showHeader) ? <Header/>:<Header2/>}
                                <Component {...props} />
                            </div>
                        </div>
                    ) : (
                        localStorage.removeItem(LOCALSTORAGE_ROLE_KEY),
                        localStorage.removeItem(LOCALSTORAGE_USER_ITEM_KEY),
                        localStorage.removeItem(LOCALSTORAGE_TOKEN_ITEM_KEY),
                        localStorage.removeItem(LOCALSTORAGE_REFRESH_TOKEN_ITEM_KEY),
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