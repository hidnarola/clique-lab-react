import jQuery from 'jquery';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
import cx from 'classnames';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { routeCodes } from '../../constants/routes';
import { SelectField_ReactSelect } from '../../components/Forms/RenderFormComponent/EveryComponent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import { changePass, resetValMyProfile } from '../../actions/myProfile';
import { ToastContainer, toast, Slide } from 'react-toastify';
import '../../../css/campaign/ReactToastify.css';

import Dropzone from 'react-dropzone';

import dropImg from 'img/site/canvas.png';
import closeImg2 from 'img/site/close-2.png';

const validate = values => {
	const errors = {}

	if (!values.name) {
		errors.name = 'This Field is Required';
	}

	// if (!values.username) {
	// 	errors.username = 'This Field is Required';
	// }

	// if (!values.email) {
	// 	errors.email = 'This Field is Required';
	// }

	if (!values.company) {
		errors.company = 'This Field is Required';
	}

	if (!values.description) {
		errors.description = 'This Field is Required';
	}

	if (!values.industry_category || (values.industry_category !== undefined && values.industry_category.value == "") || Object.keys(values.industry_category).length === 0) {
		errors.industry_category = 'This field is required';
	}

	if (!values.avatar) {
		errors.avatar = 'This Field is Required'
	} else {
		let file_type = values.avatar[0].type;
		let extensions = ["image/jpeg", "image/png", "image/jpg"];
		if (extensions.indexOf(file_type) < 0) {
			errors.avatar = 'File type not supported'
		}
	}
	return errors
}

const textField = ({ input, type, label, placeholder, isReadOnly, isRequired, existValue, meta: { touched, error } }) => (
	<div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
		<label>{label}</label>
		<input {...input} placeholder={placeholder} type={type} className={cx({ 'txt_error_div': (touched && error) ? true : false })} autoComplete="off" value={existValue} readOnly={isReadOnly} />
		{touched && ((error && <span className="error-div">{error}</span>))}
	</div>
)

const textareaField = ({ input, label, placeholder, isRequired, existValue, meta: { touched, error } }) => (
	<div className={cx('input-wrap textarea-wrap', { 'custom-error': (touched && error) ? true : false })}>
		<label>{label}</label>
		<textarea {...input} placeholder={placeholder} className={cx({ 'txt_error_div': (touched && error) ? true : false })}>{existValue}</textarea>
		{touched && ((error && <span className="error-div">{error}</span>))}
	</div>
)

const FileField_Dropzone = (props) => {
	const { label, input, meta, wrapperClass, className, labelClass, errorClass, accept, multiple, isRequired } = props;
	let filesArr = _.values(input.value);
	let images = [];
	let isFileDropped = false;

	_.forEach(filesArr, (file, key) => {
		images.push(
			<div className="images-preview-wrapper" key={key}>
				<div className="image-preview">
					<img src={file.preview} width={'560px'} height={'280px'} />
				</div>
			</div>
		)
	})

	return (
		<div className={wrapperClass}>
			<label htmlFor={input.name} className={labelClass}>
				{label}
			</label>

			<Dropzone
				{...input}
				accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
				onDrop={(filesToUpload, e) => {
					console.log('drop before => ', isFileDropped);
					isFileDropped = true;
					console.log('drop after => ', isFileDropped);
					input.onChange(filesToUpload)
				}}
				multiple={multiple ? multiple : false}
				className={`${className}`}
				onFileDialogCancel={() => {
					console.log('cancel => ', isFileDropped);
					(!isFileDropped) ? input.onChange('') : console.log('dropped')
				}}
			>
				<div className="dropzone-image-preview-wrapper">
					{(input.value && meta.error === undefined) && images}
					{((!input.value || meta.error || images.length === 0)) && <div className={`custom_dropzone_div ${(meta.touched && meta.error) && 'drop_error_div'}`} style={{ 'width': '100% !important' }}>
						<img src={dropImg} /><br /><br />
						<p>Select or Drag Your image here</p>
						<span className={`btn btn_drop_browse`}>Or Browse</span>
					</div>
					}
				</div>
			</Dropzone>
			{((!meta.valid || meta.visited) && meta.error && meta.submitFailed) && <span className="error-div">{meta.error}</span>}
		</div>
	);
}

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRender: 0,

			industryArr: [],
			changePasswordModalShow: false,
			txtOPASS: '',
			txtNPASS: '',
			txtCPASS: '',

			changePasswordFormSubmit: false,
		}
	}

	// notify = () => {
	// 	toast("Success Notification !", { className: 'success-custom-tostify'});
	// }

	// componentWillMount = () => {
	// 	this.notify();
	// }

	componentDidUpdate = () => {
		const { isRender } = this.state;
		const { changePass_response } = this.props;
		if (isRender == 1) {
			if (changePass_response.status == 1) {
				toast.success(changePass_response.message, {
					className: 'success-custom-tostify'
				});
				this.changePasswordModaltoggle();
				this.setState({ isRender: 0 });
			} else if (changePass_response.status == 0 && changePass_response.error!=null) {
				let error_msg = '';
                error_msg = '<ul><li>' + changePass_response.error + '</li></ul>';
                jQuery('.change_password_err.error_div').html(error_msg);
				jQuery('.change_password_err.error_div').css({ display: "block" });
				this.setState({ isRender: 0 });
			}
		}
	}

	// -- Change Password
	changePasswordModalOpen() {
		this.setState({ changePasswordModalShow: !this.state.changePasswordModalShow });
	}
	changePasswordModaltoggle() {
		const { dispatch } = this.props
		this.setState({ changePasswordModalShow: !this.state.changePasswordModalShow });
		this.setState({
            txtOPASS: '',
            txtNPASS: '',
            txtCPASS: '',
        })
        dispatch(resetValMyProfile({ changePass: false }));
	}
	onChangePassword = (element, value) => {
		let { txtOPASS, txtNPASS, txtCPASS, changePasswordFormSubmit } = this.state;
		if (element == 'txt_old_password') { this.setState({ txtOPASS: value }) }
		if (element == 'txt_new_password') { this.setState({ txtNPASS: value }) }
		if (element == 'txt_confirm_password') { this.setState({ txtCPASS: value }) }
		if (value === '') {
			jQuery('#' + element).css("cssText", "border: 2px solid red !important");
			jQuery('.' + element + '_errorMsg').html('This field is required');
		} else {
			jQuery('#' + element).css("cssText", "border: 2px solid rgba(82, 95, 127, .2) !important");
			jQuery('.' + element + '_errorMsg').html('');
		}
	}
	submitChangePassword = () => {
		const { dispatch } = this.props;
		const { txtOPASS, txtNPASS, txtCPASS } = this.state;
		let isError = 0;
		if (txtOPASS === '') {
			jQuery('#txt_old_password').css("cssText", "border: 2px solid red !important");
			jQuery('.txt_old_password_errorMsg').html('This field is required');
			isError = 1;
		}
		if (txtNPASS === '') {
			jQuery('#txt_new_password').css("cssText", "border: 2px solid red !important");
			jQuery('.txt_new_password_errorMsg').html('This field is required');
			isError = 1;
		}
		if (txtCPASS === '') {
			jQuery('#txt_confirm_password').css("cssText", "border: 2px solid red !important");
			jQuery('.txt_confirm_password_errorMsg').html('This field is required');
			isError = 1;
		} else {
			if (txtNPASS != txtCPASS) {
				isError = 1;
				jQuery('#txt_confirm_password').css("cssText", "border: 2px solid red !important");
				jQuery('.txt_confirm_password_errorMsg').html('Confirm password didn\'t match with new password.');
			} else {
				jQuery('#txt_confirm_password').css("cssText", "border: 2px solid rgba(82, 95, 127, .2) !important");
				jQuery('.txt_confirm_password_errorMsg').html('');
			}
		}

		if (isError === 0) {
			let data = {
				'old_password': txtOPASS,
				'new_password': txtNPASS,
			}
			dispatch(changePass(data));
			this.setState({ isRender: 1 });
			//alert('submit');           
		}
	}

	render() {
		const { handleSubmit, error, message, submitDisabled } = this.props;
		const { txtOPASS, txtNPASS, txtCPASS, isRender } = this.state;
		const industryArr = [];
		if (this.props.industryList) {
			this.props.industryList.map((obj, index) => {
				industryArr.push({ value: obj._id, label: obj.name })
			})
		}
		return (
			<div className="profile-body content-box">
				<form className="d-flex" onSubmit={handleSubmit}>
					<div className="myprofile-l">
						<Field
							name="name"
							type="text"
							label="Name"
							component={textField}
							placeholder="Name"
							isRequired="true"
						/>
						<Field
							name="username"
							type="text"
							label="Username"
							component={textField}
							placeholder="Username"
							isReadOnly="true"
							existValue={JSON.parse(localStorage.getItem('user')).username}
						/>
						<Field
							name="email"
							type="email"
							label="Email"
							component={textField}
							existValue={JSON.parse(localStorage.getItem('user')).email}
							placeholder="Email ID"
							isReadOnly="true"
						/>
						<Field
							name="company"
							type="text"
							label="Company"
							component={textField}
							placeholder="Company"
							isRequired="true"
						/>
						<Field
							wrapperClass="select-wrap"
							name="industry_category"
							label="Industry Category"
							labelClass="control-label"
							placeholder="Select industry category"
							component={SelectField_ReactSelect}
							options={industryArr}
							isRequired="true"
						/>
						<Field
							name="description"
							label="Description"
							component={textareaField}
							placeholder="Description"
							isRequired="true"
							existValue={JSON.parse(localStorage.getItem('user')).industry_description}
						/>
						<div className="change-password">
							<a href="javascript:void(0)" onClick={() => this.changePasswordModalOpen()} style={{ "fontWeight": "600" }}>Change Password</a>
						</div>
					</div>
					<div className="myprofile-r">
						<div className="drag-drop">
							<Field
								name="avatar"
								label="Profile Logo"
								labelClass="control-label"
								wrapperClass="form-group"
								placeholder="Images"
								component={FileField_Dropzone}
								multiple={false}
							/>
						</div>
						<div className="submit-btn">
							<button type="submit" className="round-btn">Save</button>
						</div>
					</div>
				</form>

				{/* Add Credit Card Modal */}
				<Modal isOpen={this.state.changePasswordModalShow} toggle={this.changePasswordModaltoggle} className={this.props.className} id="congratulations" className="change_password_popup" style={{ "width": "600px" }}>
					<div className="custom_modal_btn_close">
						<img className="cursor_pointer" src={closeImg2} onClick={() => this.changePasswordModaltoggle()} />
					</div>
					<ModalBody>
						<div className="terms-conditions">
							<h2>Change Password</h2>
							<form id="edit_password_form" className="popup_modal_form">
								<div className="input-wrap">
									<label>Old Password</label>
									<input type="password" name="txt_old_password" id="txt_old_password" placeholder="Old Password" value={txtOPASS} onChange={(input) => this.onChangePassword(input.target.name, input.target.value)} />
									<span className="txt_old_password_errorMsg" style={{ "color": "red" }}></span>
								</div>
								<div className="input-wrap">
									<label>New Password</label>
									<input type="password" name="txt_new_password" id="txt_new_password" placeholder="New Password" value={txtNPASS} onChange={(input) => this.onChangePassword(input.target.name, input.target.value)} />
									<span className="txt_new_password_errorMsg" style={{ "color": "red" }}></span>
								</div>
								<div className="input-wrap">
									<label>Confirm Password</label>
									<input type="password" name="txt_confirm_password" id="txt_confirm_password" placeholder="Confirm Password" value={txtCPASS} onChange={(input) => this.onChangePassword(input.target.name, input.target.value)} />
									<span className="txt_confirm_password_errorMsg" style={{ "color": "red" }}></span>
								</div>
								<div className="change_password_err error_div"></div>
								<div className="submit-btn">
									<button type="button" className="round-btn" onClick={() => this.submitChangePassword()}>Update</button>
								</div>
							</form>
						</div>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { afterRegister, myProfile } = state;
	return {
		industryList: afterRegister.get('after_register_data').industryList,
		changePass_response: myProfile.get('change_pass'),
	}
}

export default connect(mapStateToProps)(reduxForm({
	form: 'profileForm',
	validate
})(Profile));