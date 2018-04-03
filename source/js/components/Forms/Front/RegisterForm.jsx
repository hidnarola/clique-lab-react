import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom';
import validator from 'validator';

const validate = values => {
    const errors = {}
    
    if (!values.username) {
        errors.username = 'Required'
    }

    if (!values.fullname) {
        errors.fullname = 'Required'
    }

    if (!values.email) {
        errors.email = 'Required'
    }else  if(validator.isEmail(values.email) === false){
        errors.email = 'Enter valid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 5) {
        errors.password = 'Must be more than 5 or more characters.'
    }else if(values.password !== values.repeatPassword){
        errors.password = 'Password should be match.'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({
    input,
    type,
    placeholder,
    meta: { touched, error, warning }
}) => (
    <div className="input-div">        
        <input {...input} placeholder={placeholder} type={type} />
        {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
    </div>
)

let RegisterForm = props => {
    const { handleSubmit,error } = props
    return (

        <form onSubmit={handleSubmit}>
            <h3>Register</h3>
            <Field
                name="fullname"
                type="text"
                component={renderField}
                placeholder="Full Name"
            />

            <Field
                name="username"
                type="text"
                component={renderField}
                placeholder="Username"
            />

            <Field
                name="email"
                type="text"
                component={renderField}
                placeholder="Email Id"
            />

            <Field
                name="company"
                type="text"
                component={renderField}
                placeholder="Company"
            />

            <Field
                name="password"
                type="password"
                component={renderField}
                placeholder="Password"
            />

            <Field
                name="repeatPassword"
                type="password"
                component={renderField}
                placeholder="Repeat Password"
            />
            
            {error && <strong>{error}</strong>}
            
            <div className="accept-condition checkbox">
                <input id="check1" type="checkbox" name="check" value="check1"/>
                <label htmlFor="check1">
                    I accept the
                    <a onClick={() => props.func(this, 'TERMS')}>
                        Terms & Conditions
                    </a> 
                    
                    and the 
                    <a onClick={() => props.func(this, 'PRIVACY')}>
                        Privacy Policy
                    </a>
                </label>
            </div>
            <div className="submit-div">	
                <button className="round-btn" type="submit">Register</button>
            </div>
        </form>        
    )
}

RegisterForm = reduxForm({
    // a unique name for the form
    form: 'registerForm',
    validate, // <--- validation function given to redux-form    
})(RegisterForm)

export default RegisterForm