import React,{Component} from 'react'
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

const validate = values => {
    const errors = {}
    return errors
}

const textField = (
	{input,type,label,placeholder,meta: { touched, error}}
) => (
		<div className={cx('input-wrap',{'custom-error':(touched && error ) ? true:false })}>
			<label>{label}</label>
			<input {...input} placeholder={placeholder} type={type} />    
			{touched && ((error && <span>{error}</span>))}    
		</div>
	)

const textareaField = (
	{input,label,placeholder,meta: { touched, error}}
) => (
		<div className={cx('input-wrap textarea-wrap',{'custom-error':(touched && error ) ? true:false })}>
			<label>{label}</label>
			<textarea {...input} placeholder={placeholder}></textarea>    
			{touched && ((error && <span>{error}</span>))}    
		</div>
	)

let Profile = props => {
	return(
		<div className="profile-body content-box">
			<form className="d-flex">
				<div className="myprofile-l">
					<Field
						name="name"
						type="text"
						label="Name"
						component={textField}
						placeholder="Enter your name"
					/>
					<Field
						name="username"
						type="text"
						label="Username"
						component={textField}
						placeholder="Enter your username"
					/>
					<Field
						name="email"
						type="email"
						label="Email"
						component={textField}
						placeholder="Enter your email"
					/>
					<Field
						name="company"
						type="text"
						label="Company"
						component={textField}
						placeholder="Enter your company"
					/>
					<Field
						name="description"
						label="Description"
						component={textareaField}
						placeholder="Enter description"
					/>
				</div>
				<div className="myprofile-r">
					<div className="drag-drop">
						<label>Profile Logo</label>
						<img src="/assets/img/site/upload-img.jpg" alt="" />
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