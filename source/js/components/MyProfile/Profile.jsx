import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SubmissionError } from 'redux-form'
import { routeCodes } from '../../constants/routes';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../../constants/usefulvar';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import dropImg from 'img/site/canvas.png';
import Dropzone from 'react-dropzone';

const validate = values => {
	const errors = {}

	if (!values.name) {
		errors.name = 'This Field is Required';
	}

	if (!values.username) {
		errors.username = 'This Field is Required';
	}

	if (!values.email) {
		errors.email = 'This Field is Required';
	}

	if (!values.company) {
		errors.company = 'This Field is Required';
	}

	if (!values.description) {
		errors.description = 'This Field is Required';
	}

	if (!values.images) {
		errors.images = 'This Field is Required'
	} else {
		let file_type = values.images[0].type;
		let extensions = ["image/jpeg", "image/png", "image/jpg"];
		if (extensions.indexOf(file_type) < 0) {
			errors.images = 'File type not supported'
		}
	}
	return errors
}

const textField = ({ input, type, label, placeholder, meta: { touched, error } }) => (
	<div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
		<label>{label}</label>
		<input {...input} placeholder={placeholder} type={type} className={(touched && error) && `txt_error_div`} autoComplete="off"/>
		{touched && ((error && <span className="error-div">{error}</span>))}
	</div>
)

const textareaField = ({ input, label, placeholder, meta: { touched, error } }) => (
	<div className={cx('input-wrap textarea-wrap', { 'custom-error': (touched && error) ? true : false })}>
		<label>{label}</label>
		<textarea {...input} placeholder={placeholder} className={(touched && error) && `txt_error_div`}></textarea>
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
				{label} {meta.pristine && isRequired === "true" && <span className="error-div">*</span>}
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


let Profile = props => {
	const { handleSubmit, error, message, submitDisabled } = props
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
					/>
					<Field
						name="username"
						type="text"
						label="Username"
						component={textField}
						placeholder="Username"
					/>
					<Field
						name="email"
						type="email"
						label="Email"
						component={textField}
						placeholder="Email ID"
					/>
					<Field
						name="company"
						type="text"
						label="Company"
						component={textField}
						placeholder="Company"
					/>
					<Field
						name="description"
						label="Description"
						component={textareaField}
						placeholder="Description"
					/>
					<div class="change-password">
						<a href="javascript:void(0)" style={{ "fontWeight": "600" }}>Change Password</a>
					</div>
				</div>
				<div className="myprofile-r">
					<div className="drag-drop">
						<Field
							name="images"
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
		</div>
	);
}

let ProfileForm = reduxForm({
	form: 'profileForm',
	validate,
})(Profile)

export default connect(state => ({

}))(ProfileForm)