import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import LogoImg from 'img/common/logo.png';

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
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to="dashboard"
                            >
                                <i className="dashboard-icon"></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to="campaign"
                            >
                                <i className="create-icon"></i>
                                <span>Create</span>
                            </NavLink>

                        </li>
                        <li>
                            <NavLink
                                activeClassName='active'
                                className='Menu-link'
                                to="every-day-people"
                            >
                                <i className="people-icon"></i>
                                <span>Everyday People</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='active' className='Menu-link' to="groups">
                                <i className="group-icon"></i>Groups
                            </NavLink>
                        </li>
                        <li>
                            <a>
                                <i className="campaigns-icon"></i>
                                <span>Campaigns</span>
                            </a>                            
                        </li>
                        <li>
                            <a >
                                <i className="calendar-icon"></i>
                                Calendar
                            </a>
                        </li>
                        <li>
                            <a >
                                <i className="analytics-icon"></i>
                                Analytics
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default LeftMenu;