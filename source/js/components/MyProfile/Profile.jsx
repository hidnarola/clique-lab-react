import jQuery from 'jquery';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
import cx from 'classnames';
import { Field, reduxForm, SubmissionError, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { routeCodes } from '../../constants/routes';
// import { SelectField_ReactSelect } from '../../components/Forms/RenderFormComponent/EveryComponent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import { changePass, resetValMyProfile } from '../../actions/myProfile';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { imgRoutes } from 'constants/img_path';
import '../../../css/campaign/ReactToastify.css';
import Dropzone from 'react-dropzone';
import dropImg from 'img/site/canvas.png';
import closeImg2 from 'img/site/close-2.png';
import Select from 'react-select';

const validate = values => {
	const errors = {}
	if (!values.name || values.name.trim() === '') {
		errors.name = 'This field is required';
	}

	// if (!values.username) {
	// 	errors.username = 'This Field is Required';
	// }

	// if (!values.email) {
	// 	errors.email = 'This Field is Required';
	// }

	if (!values.company || values.company.trim() === '') {
		errors.company = 'This field is required';
	}

	if (!values.description || values.description.trim() === '') {
		errors.description = 'This field is required';
	}

	// if (!values.industry_category || (values.industry_category !== undefined && values.industry_category.value == "") || Object.keys(values.industry_category).length === 0) {
	// if (!values.industry_category || values.industry_category.value === undefined) {

	if (!values.industry_category) {
		errors.industry_category = 'This field is required';
	}

	// let industry_category_key_lenght = values.industry_category && Object.keys(values.industry_category).length;

	// if(industry_category_key_lenght > 2)
	// {
	// 	errors.industry_category = 'This field is required';
	// }
	// else
	// {
	// 	errors.industry_category = '';
	// }

	//before
	// if (values.avatar) {
	// 	let file_type = values.avatar[0].type;
	// 	let extensions = ["image/jpeg", "image/png", "image/jpg"];
	// 	if (extensions.indexOf(file_type) < 0) {
	// 		errors.avatar = 'File type not supported'
	// 	}
	// }

	if (values.avatar) {
		if ((values.avatar).length > 0 || (values.avatar).length === 0) {
			if (values.avatar.length > 0) {
				let file_type = values.avatar[0].type;
				let extensions = ["image/jpeg", "image/png", "image/jpg"];
				if (extensions.indexOf(file_type) < 0) {
					errors.avatar = 'File type not supported';
				}
			}
			else {
				errors.avatar = 'File type not supported';
			}
		}
	}

	return errors
}

const textField = ({ input, type, label, placeholder, isReadOnly, isRequired, existValue, meta: { touched, error } }) => (
	<div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
		<label>{label}</label>
		{/* <input {...input} placeholder={placeholder} type={type} className={cx({ 'txt_error_div': (touched && error) ? true : false })} autoComplete="off" value={existValue} readOnly={isReadOnly} /> */}
		<input {...input} placeholder={placeholder} type={type} className={cx({ 'txt_error_div': (touched && error) ? true : false })} autoComplete="off" readOnly={isReadOnly} />
		{touched && ((error && <span className="error-div">{error}</span>))}
	</div>
)

const textareaField = ({ input, label, placeholder, isRequired, existValue, meta: { touched, error } }) => (
	<div className={cx('input-wrap textarea-wrap', { 'custom-error': (touched && error) ? true : false })}>
		<label>{label}</label>
		{/* <textarea {...input} placeholder={placeholder} className={cx({ 'txt_error_div': (touched && error) ? true : false })} value={existValue}></textarea> */}
		<textarea {...input} placeholder={placeholder} className={cx({ 'txt_error_div': (touched && error) ? true : false })} ></textarea>
		{touched && ((error && <span className="error-div">{error}</span>))}
	</div>
)

const FileField_Dropzone = (props) => {
	const { label, input, meta, wrapperClass, className, labelClass, errorClass, accept, multiple, existImage } = props;
	let filesArr = _.values(input.value);
	let images = [];
	let isFileDropped = false;

	_.forEach(filesArr, (file, key) => {
		images.push(
			<div className="images-preview-wrapper" key={key}>
				<div className="image-preview">
					<img src={file.preview} width={'auto'} height={'200px'} />
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
				// {...input}
				{...input.value}
				accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
				onDrop={(filesToUpload, e) => {
					isFileDropped = true;
					input.onChange(filesToUpload)
				}}
				multiple={multiple ? multiple : false}
				className={`${className}`}
				onFileDialogCancel={() => {
					(!isFileDropped) ? input.onChange('') : console.log('dropped')
				}}
			>
				<div className="dropzone-image-preview-wrapper">
					{
						(input.value && meta.error === undefined) ?
							images
							:
							existImage && <img src={existImage} style={{ "width": "auto", "height": "200px" }} />
					}
					{((!input.value || meta.error || images.length === 0)) && existImage === '' && <div className={`custom_dropzone_div ${(meta.touched && meta.error) && 'drop_error_div'}`} style={{ 'width': '100% !important' }}>
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


const SelectField_ReactSelect = (props) => {
	const { label, input, meta, selectedValue, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options, isRequired } = props;
	let val = '';
	if (input.value && Object.keys(input.value).length > 0) {
		val = input.value;
	} else if (initialValue) {
		val =  initialValue
		// { value: initialValue, label: 'est' }
		// val = val;
	}
	console.log('My Val :', val);
	// console.log('My Val2 :',val);
	return (
		<div className={wrapperClass}>
			<label htmlFor={input.name} className={labelClass}>
				{label}
			</label>
			<Select
				{...input}
				value={val}
				options={options}
				className={`${className}${meta.touched && ((meta.error && ' txt_error_div') || (meta.warning && ' txt_error_div'))}`}
				placeholder={placeholder}
				onChange={(value) => input.onChange(value)}
				onBlur={() => input.onBlur({ ...input.value })}
				// onBlur={(value) => ({ ...input.value }) ? input.onBlur({ ...input.value }) : input.onBlur(value)}
				multi={false}
				clearable={false}
			/>
			{meta.touched && ((meta.error && <span className={`error-div`}>{meta.error}</span>) || (meta.warning && <span className={`error-div`}>{meta.warning}</span>))}
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
			disabled: ''
		}
	}

	componentWillMount = () => {
		const { dispatch } = this.props;

	let industryData = [		
					{_id: "5ac1ce1b4238b40285cca994", label: "Business Services"},
					{_id: "5ac1ce324238b40285cca995", label: "Information Technology"},
					{_id: "5ac1cfa14238b40285cca996", label: "Manufacturing"},
					{_id: "5ac1cfb54238b40285cca997", label: "Health Care"},
					{_id: "5ac1d0fe4238b40285cca998", label: "Finance"},
					{_id: "5ac1d1264238b40285cca999", label: "Retail"},
					{_id: "5ac1d13b4238b40285cca99a", label: "Accounting and Legal"},
					{_id: "5ac1d5dc4238b40285cca99b", label: "Construction, Repair and Maintenance"},
					{_id: "5ac1d61f4238b40285cca99d", label: "Media"},
					{_id: "5ac1d6304238b40285cca99e", label: "Restaurants, Bars and Food Services"},
					]

	let defaultIndustry = JSON.parse(localStorage.getItem('user')).industry_category;
	
	let findIndustry = _.find(industryData, function (o) { return o._id == defaultIndustry });

	let setIndustry = {value:findIndustry._id,label:findIndustry.label}

	

		const existValue = {
			name: JSON.parse(localStorage.getItem('user')).full_name,
			username: JSON.parse(localStorage.getItem('user')).username,
			email: JSON.parse(localStorage.getItem('user')).email,
			company: JSON.parse(localStorage.getItem('user')).company,
			// industry_category: JSON.parse(localStorage.getItem('user')).industry_category,
			 industry_category: setIndustry,
			// industry_category: { value: JSON.parse(localStorage.getItem('user')).industry_category, label: 'test1' },
			description: JSON.parse(localStorage.getItem('user')).industry_description,
			//avatar: imgRoutes.ORG_PROMOTER_IMG_PATH + JSON.parse(localStorage.getItem('user')).avatar,
		}
		dispatch(initialize('profileForm', existValue));
	}
	componentDidUpdate = () => {
		const { isRender } = this.state;
		const { changePass_response } = this.props;
		if (isRender == 1) {
			if (changePass_response.status == 1) {
				toast.success(changePass_response.message, {
					className: 'success-custom-tostify'
				});
				this.changePasswordModaltoggle();
				// this.setState({ isRender: 0 });
				this.setState({ isRender: 0, disabled: '' });
			} else if (changePass_response.status == 0 && changePass_response.error != null) {
				let error_msg = '';
				error_msg = '<ul><li>' + changePass_response.error + '</li></ul>';
				jQuery('.change_password_err.error_div').html(error_msg);
				jQuery('.change_password_err.error_div').css({ display: "block" });
				// this.setState({ isRender: 0 });
				this.setState({ isRender: 0, disabled: '' });
			}
		}
	}

	// -- Change Password
	changePasswordModalOpen = () => {
		this.setState({ changePasswordModalShow: !this.state.changePasswordModalShow });
	}
	changePasswordModaltoggle = () => {
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
		} else if (txtNPASS.length < 5) {
			jQuery('#txt_new_password').css("cssText", "border: 2px solid red !important");
			jQuery('.txt_new_password_errorMsg').html('Must be more than 5 characters');
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
			// this.setState({ isRender: 1 });
			this.setState({
				disabled: 'disabled',
				isRender: 1
			});
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
						// existValue={JSON.parse(localStorage.getItem('user')).full_name}
						/>
						<Field
							name="username"
							type="text"
							label="Username"
							component={textField}
							placeholder="Username"
							isReadOnly="true"
						// existValue={JSON.parse(localStorage.getItem('user')).username}
						/>
						<Field
							name="email"
							type="email"
							label="Email"
							component={textField}
							// existValue={JSON.parse(localStorage.getItem('user')).email}
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
						// existValue={JSON.parse(localStorage.getItem('user')).company}
						/>
						<Field
							wrapperClass="select-wrap"
							name="industry_category"
							label="Industry Category"
							labelClass="control-label"
							placeholder="Select industry category"
							// component={SelectField_ReactSelect}
							component={SelectField_ReactSelect}
							options={industryArr}
							isRequired="true"
							// initialValue={JSON.parse(localStorage.getItem('user')).industry_category}
						/>
						<Field
							name="description"
							label="Description"
							component={textareaField}
							placeholder="Description"
							isRequired="true"
						// existValue={JSON.parse(localStorage.getItem('user')).industry_description}
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
								existImage={imgRoutes.ORG_PROMOTER_IMG_PATH + JSON.parse(localStorage.getItem('user')).avatar}
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
									{/* <button type="button" className="round-btn" onClick={() => this.submitChangePassword()} >Update</button> */}
									<button type="button" className="round-btn" onClick={() => this.submitChangePassword()} disabled={this.state.disabled} >Update</button>
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