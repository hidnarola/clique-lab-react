import React, { Component } from 'react';

import Profile from '../components/MyProfile/Profile';
import PartnershipProg from '../components/MyProfile/PartnershipProg';
import Wallet from '../components/MyProfile/Wallet';
import Permission from '../components/MyProfile/Permission';

import ModalPopUp from '../components/Common/ModalPopUp';
import { connect } from 'react-redux';
import { BrowserRouter as Router,Link,Switch,Route,NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

class MyProfile extends Component {
    constructor(props){
        super(props);
    }

    render() {
		let curt_page  = this.props.history.location.pathname;
        return (
            <div className="profile-page">
				<div className="profile-head">
					<ul>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.MY_PROFILE}>My Profile</NavLink></li>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.PARTNERSHIP_PROGRAM}>Partnership Program</NavLink></li>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.WALLET}>Wallet</NavLink></li>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.PERMISSION}>Permission</NavLink></li>
					</ul>
				</div>
				{ curt_page==routeCodes.MY_PROFILE && <Profile />}
				{ curt_page==routeCodes.PARTNERSHIP_PROGRAM && <PartnershipProg />}
				{ curt_page==routeCodes.WALLET && <Wallet />}
				{ curt_page==routeCodes.PERMISSION && <Permission />}
			</div>
        );
    }
}

export default connect(state => ({
    
}))(MyProfile)
