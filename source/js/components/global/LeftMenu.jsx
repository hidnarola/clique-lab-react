import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import LogoImg from 'img/common/logo.png';
import { routeCodes } from 'constants/routes';

class LeftMenu extends Component {
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="left-panel">
                <div className="big-logo">
                    <a href="#">
                        <img src={LogoImg} alt="" />
                    </a>
                </div>
                <div className="navigation-div">
                    <div className="mobile-nav" id="nav-icon1" >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={routeCodes.DASHBOARD }>
                                <i className="dashboard-icon"></i>Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName='active' className='Menu-link' to={ routeCodes.CAMPAIGN }>
                                <i className="create-icon"></i>Create
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={routeCodes.EVERYDAYPEOPLE }>
                                <i className="people-icon"></i>Everyday People
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={ routeCodes.LISTGROUPS }>
                                <i className="group-icon"></i>Groups
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={ routeCodes.CAMPAIGNS }>
                                <i className="campaigns-icon"></i>Campaigns
                            </NavLink>
                            <ul>
                                <li>
                                    <NavLink activeClassName='active' className='Menu-link first_level' to={ routeCodes.CAMPAIGN_ACTIVE }>
                                        Campaigns
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName='active' className='Menu-link first_level' to={ routeCodes.CAMPAIGN_INSPIRED_SUB }>
                                        Inspired submissions
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName='active' className='Menu-link first_level' to={ routeCodes.CAMPAIGN_PURCHASED_POSTS }>
                                        Purchased Posts
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to='/calendar'>
                                <i className="calendar-icon"></i>Calendar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={ routeCodes.ANALYTICS }>
                                <i className="analytics-icon"></i>Analytics
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default LeftMenu;
