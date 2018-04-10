import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';

const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = 'This Field is Required'
    }else  if(validator.isEmail(values.email) === false){
        errors.email = 'Enter valid email address'
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

let ForgotPassForm = props => {
    const { handleSubmit,error,message } = props
    return (

        <form onSubmit={handleSubmit}>
            <h3>Reset Password</h3>
            <Field
                name="email"
                type="email"
                component={renderField}
                placeholder="Email-ID"
            />
            {error && <strong>{error}</strong>}            
            {message && <Alert color="danger ">{message}</Alert>}
            <div className="submit-div">
                <button type="submit" className="round-btn">Reset</button>
            </div>
        </form>        
    )
}

ForgotPassForm = reduxForm({
    form: 'forgotPass',
    validate,
})(ForgotPassForm)

export default ForgotPassForm