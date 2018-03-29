import React,{Component} from 'react';
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
                            <a >
                                <i className="dashboard-icon"></i>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a >
                                <i className="create-icon"></i>
                                    Create
                                </a>
                        </li>
                        <li>
                            <a >
                                <i className="people-icon"></i>
                                Everyday People
                            </a>
                        </li>
                        <li>
                            <a >
                                <i className="group-icon"></i>
                                Groups
                            </a>
                        </li>
                        <li>
                            <a >
                                <i className="campaigns-icon"></i>
                                Campaigns
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