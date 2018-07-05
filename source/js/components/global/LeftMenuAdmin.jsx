import React, { Component } from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { routeCodes } from 'constants/routes';
import LogoImg from 'img/common/logo.png';
import jQuery from 'jquery';

class LeftMenuAdmin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="left-panel">
                <div className="big-logo">
                    <NavLink to={routeCodes.DASHBOARD} style={{ "display": "contents" }}>
                        <img src={LogoImg} alt="" />
                    </NavLink>
                </div>
                <div className="navigation-div">
                    <div className="mobile-nav" id="nav-icon1" >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul>
                        <li> <NavLink activeClassName='active' className='Menu-link' to={routeCodes.ADMIN_DASHBOARD}> <i className="dashboard-icon"></i>Dashboard </NavLink> </li>
                        <li> <NavLink activeClassName='active' className='Menu-link' to={routeCodes.ADMIN_MEMBERS}> <i className="people-icon"></i>Members </NavLink> </li>
                        <li> <NavLink activeClassName='active' className='Menu-link' to={routeCodes.ADMIN_TRANSACTIONS}> <i className="list-icon"></i>Transactions </NavLink> </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(connect()(LeftMenuAdmin));
