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
	
let PartnerShipProg = props => {
	return(
        <div className="profile-body content-box">
            <div className="partner-program-top">
                <h2>What is Partnership Program</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate. <a href="" data-toggle="modal" data-target="#partner-faq">View Partnership Program FAQ.</a></p>
            </div>
            <Field
                input="invite_user"
                type="text"
                label="Invite User"
                component={textField}
                placeholder="https://www.cliquelabs.com/?referal+id=username4"
            />
            <div className="partner-state">
                <h3>State</h3>
                <div className="state-box-wrap d-flex">
                    <div className="state-box"><img src="/assets/img/site/graph-02.jpg" alt="" /></div>
                    <div className="state-box"><img src="/assets/img/site/graph-03.png" alt="" /></div>
                </div>	
            </div>
        </div>
	);
}

let PartnerShipProgForm = reduxForm({
    form: 'PartnerShipProgForm',
    validate,
})(PartnerShipProg)

export default connect(state => ({
    
}))(PartnerShipProgForm)