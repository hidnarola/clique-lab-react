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
import { industryFetch } from '../actions/afterRegister';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import closeImg2 from 'img/site/close-2.png';

const BtnAddNewPermission = () => {
	return (
		<div className="new-permission"><a href="" data-toggle="modal" data-target="#permission-popup">Addd New Permission</a></div>
	);
}

class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editProfileSubmit: false,

			messagePopup: false,
			messagePopupSuccessMsg: null,
			messagePopupErrorMsg: null,
		}
	}

	messagePopupToggle = () => { this.setState({ messagePopup: !this.state.messagePopup }); }
	componentWillMount = () => {
		const { dispatch } = this.props;
		dispatch(industryFetch());
	}


	profileSubmitForm = (values) => {
		const { dispatch } = this.props;
		const { editProfileSubmit } = this.state;
		const formData = new FormData();
		let ind_cat_value = '';
		if(values.industry_category.value===undefined){
			ind_cat_value = values.industry_category;
		}else{
			ind_cat_value = values.industry_category.value;
		}

		if(values.avatar!==undefined){
			formData.append("avatar", values.avatar[0]);
		}
		
		formData.append("name", values.name);
		// formData.append("username", values.username);
		// formData.append("email", values.email);
		formData.append("company", values.company);
		formData.append("industry_category", ind_cat_value);
		formData.append("industry_description", values.description);
		
		dispatch(editProfile(formData));
		if (editProfileSubmit === false) {
			this.setState({ editProfileSubmit: true })
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { editProfileSubmit } = this.state;
		const { edit_profile } = this.props;
		if (editProfileSubmit && edit_profile.status == 1) {
			let userSession = JSON.parse(localStorage.getItem('user'));
			userSession.full_name = edit_profile.data.full_name;
			userSession.company = edit_profile.data.company;
			userSession.industry_category = edit_profile.data.industry_category;
			userSession.industry_description = edit_profile.data.industry_description;
			userSession.avatar = edit_profile.data.avatar;
			localStorage.setItem('user',JSON.stringify(userSession));
			setTimeout(() => {
				this.setState({
					messagePopupSuccessMsg: edit_profile.message,
					messagePopupErrorMsg: null
				});
				this.messagePopupToggle();
			}, 1000)
			this.setState({ editProfileSubmit: false })
		}
	}


	render() {
		let curt_page = this.props.history.location.pathname;
		return (
			<div>
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

				<Modal isOpen={this.state.messagePopup} toggle={this.messagePopupToggle} className={this.props.className} id="congratulations" style={{ width: "550px" }}>
					<div className="custom_modal_btn_close" style={{ padding: "15px 20px" }}>
						<img className="cursor_pointer" src={closeImg2} onClick={() => this.messagePopupToggle()} />
					</div>
					<ModalBody>
						{
							(this.state.messagePopupSuccessMsg) ?
								<div className="terms-conditions">
									<h2>Operation successfully completed...! </h2>
									<p>{this.state.messagePopupSuccessMsg}</p>
									<a href="javascript:void(0)" className="round-btn" onClick={() => this.messagePopupToggle()}>Ok</a>
								</div>
								:
								<div className="terms-conditions">
									<h2 style={{ color: "red" }}>Opps something went wrong...! </h2>
									<p>{this.state.messagePopupErrorMsg}</p>
									<a href="javascript:void(0)" className="round-btn" onClick={() => this.messagePopupToggle()}>Ok</a>
								</div>
						}

					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { afterRegister, myProfile } = state;
	return {
		loading: myProfile.get('loading'),
		error: myProfile.get('error'),
		edit_profile: myProfile.get('edit_profile'),
		industryList: afterRegister.get('after_register_data').industryList,
	}
}
export default connect(mapStateToProps)(MyProfile)
