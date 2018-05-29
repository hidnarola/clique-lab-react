import React, { Component } from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoImg from 'img/common/logo.png';
import { routeCodes } from 'constants/routes';
import jQuery from 'jquery';

class LeftMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campToggleVisible: false
        }
    }

    campToggleMenu(className) {
        if (className == 'campToogleMenu_UL') {
            if (jQuery('.campToogleMenu_UL').css('display') !== 'none') {
                jQuery('.campToogleMenu_UL').slideToggle();
            }
        } else {
            jQuery('.campToogleMenu_UL').slideToggle();
        }
        //this.setState({ campToggleMenu: true})
    }

    componentDidMount = () => {
        const { history } = this.props;
        jQuery('.campToogleMenu_UL').css({ display: 'none' })
        if (history.location.pathname === routeCodes.CAMPAIGN_ACTIVE) {
            jQuery('.campToogleMenu_UL').css({ display: 'block' });
        } else if (history.location.pathname === routeCodes.CAMPAIGN_FUTURE) {
            jQuery('.campToogleMenu_UL').css({ display: 'block' });
        } else if (history.location.pathname === routeCodes.CAMPAIGN_PAST) {
            jQuery('.campToogleMenu_UL').css({ display: 'block' });
        }

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
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={routeCodes.DASHBOARD} onClick={() => this.campToggleMenu('campToogleMenu_UL')}>
                                <i className="dashboard-icon"></i>Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName='active' className='Menu-link' to={routeCodes.CAMPAIGN} onClick={() => this.campToggleMenu('campToogleMenu_UL')}>
                                <i className="create-icon"></i>Create
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={routeCodes.EVERYDAYPEOPLE} onClick={() => this.campToggleMenu('campToogleMenu_UL')}>
                                <i className="people-icon"></i>Everyday People
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={routeCodes.LISTGROUPS} onClick={() => this.campToggleMenu('campToogleMenu_UL')}>
                                <i className="group-icon"></i>Groups
                            </NavLink>
                        </li>
                        <li>
                            <a href="javascript:void(0)" className='Menu-link' onClick={() => this.campToggleMenu()}>
                                <i className="campaigns-icon"></i>Campaigns
                            </a>
                            <ul className="campToogleMenu_UL">
                                <li>
                                    <NavLink activeClassName='active' className='Menu-link first_level' to={routeCodes.CAMPAIGN_ACTIVE}>
                                        Campaigns
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName='active' className='Menu-link first_level' to={routeCodes.CAMPAIGN_INSPIRED_SUB}>
                                        Inspired submissions
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName='active' className='Menu-link first_level' to={routeCodes.CAMPAIGN_PURCHASED_POSTS}>
                                        Purchased Posts
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to='/calendar' onClick={() => this.campToggleMenu('campToogleMenu_UL')}>
                                <i className="calendar-icon"></i>Calendar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={routeCodes.ANALYTICS} onClick={() => this.campToggleMenu('campToogleMenu_UL')}>
                                <i className="analytics-icon"></i>Analytics
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(connect()(LeftMenu));
