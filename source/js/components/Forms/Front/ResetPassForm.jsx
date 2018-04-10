import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';

const validate = values => {
    const errors = {}

    if (!values.password) {
        errors.password = 'This Field is Required'
    } else if (values.password.length < 5) {
        errors.password = 'Must be more than 5 or more characters.'
    }else if(values.password !== values.repeatPassword){
        errors.password = 'Password should be match.'
    }
    return errors
}

const renderField = ({
    input,
    type,
    placeholder,
    meta: { touched, error}
}) => (
    <div className={cx('input-div',{'custom-error':(touched && error ) ? true:false })}>
        <input {...input} placeholder={placeholder} type={type} /> 
        {touched && ((error && <span>{error}</span>))}       
    </div>
)

let ResetPassForm = props => {
    const { handleSubmit,error,newError } = props
    return (
        <form onSubmit={handleSubmit}>
            <h3>Reset Password</h3>
            <Field
                name="password"
                type="password"
                component={renderField}
                placeholder="Enter New Password"
            />
            <Field
                name="repeatPassword"
                type="password"
                component={renderField}
                placeholder="Re-Enter New Password"
            />
            {error && <strong>{error}</strong>}            
            {newError && <Alert color="danger ">{newError}</Alert>}
            <div className="submit-div">
                <button type="submit" className="round-btn">Submit</button>
            </div>
        </form>        
    )
}

ResetPassForm = reduxForm({
    form: 'resetPass',
    validate,
})(ResetPassForm)

export default ResetPassForm