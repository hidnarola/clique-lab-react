import React, { Component } from 'react';

import Profile from '../components/MyProfile/Profile';
import PartnershipProg from '../components/MyProfile/PartnershipProg';
import Wallet from '../components/MyProfile/Wallet';
import Permission from '../components/MyProfile/Permission';

import ModalPopUp from '../components/Common/ModalPopUp';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Switch, Route, NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import { editProfile } from '../actions/myProfile';

const BtnAddNewPermission = () => {
	return (
		<div className="new-permission"><a href="" data-toggle="modal" data-target="#permission-popup">Addd New Permission</a></div>
	);
}
class MyProfile extends Component {
	constructor(props) {
		super(props);
	}

	profileSubmitForm = (values) => {
		const { dispatch } = this.props;
		const formData = new FormData();
		formData.append("name", values.name);
		// formData.append("username", values.username);
		// formData.append("email", values.email);
		formData.append("company", values.company);
		formData.append("industry_category","5ac1ce324238b40285cca995");
		formData.append("industry_description", values.description);
		formData.append("avatar", values.avatar[0]);
		dispatch(editProfile(formData));
	}

	render() {
		let curt_page = this.props.history.location.pathname;
		return (
			<div className="profile-page">
				<div className="profile-head d-flex">
					<ul>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.MY_PROFILE}>My Profile</NavLink></li>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.PARTNERSHIP_PROGRAM}>Partnership Program</NavLink></li>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.WALLET}>Wallet</NavLink></li>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.PERMISSION}>Permission</NavLink></li>
					</ul>
					{curt_page == routeCodes.PERMISSION && <BtnAddNewPermission />}
				</div>
				{curt_page == routeCodes.MY_PROFILE && <Profile onSubmit={this.profileSubmitForm} />}
				{curt_page == routeCodes.PARTNERSHIP_PROGRAM && <PartnershipProg />}
				{curt_page == routeCodes.WALLET && <Wallet />}
				{curt_page == routeCodes.PERMISSION && <Permission />}
			</div>
		);
	}
}

export default connect(state => ({

}))(MyProfile)
