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
                    <ul>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to={routeCodes.DASHBOARD }>
                                <i className="dashboard-icon"></i>Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to='/create'>
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
                            <NavLink activeClassName='active' className='Menu-link' to={ routeCodes.CAMPAIGN } >
                                <i className="campaigns-icon"></i>Campaigns
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to='/calendar'>
                                <i className="calendar-icon"></i>Calendar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to='/analytics'>
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