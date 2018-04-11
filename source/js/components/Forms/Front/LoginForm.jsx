import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom';
import cx from 'classnames';
import { Alert } from 'reactstrap';

const validate = values => {
    const errors = {}
    
    if (!values.username) {
        errors.username = 'Required'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 5) {
        errors.password = 'Must be more than 5 or more characters.'
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
    <div className={cx('input-div',{'custom-error':(touched && error ) ? true:false })}>
        <input {...input} placeholder={placeholder} type={type} />        
        {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
    </div>
)

let LoginForm = props => {
    const { handleSubmit,error,newError } = props
    return (

        <form onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <Field
                name="username"
                type="text"
                component={renderField}
                placeholder="Username"
            />

            <Field
                name="password"
                type="password"
                component={renderField}
                placeholder="Password"
            />
            
            {error && <strong>{error}</strong>}            
            {newError && <Alert color="danger ">{newError}</Alert>}            
            
            <div className="submit-div">
                <button type="submit" className="round-btn">Login</button>
            </div>
            	
            <p>
                Forgot Password?                
                <Link className="cursor_pointer" to="/forgot_password">Reset</Link>
            </p>
        </form>        
    )
}

LoginForm = reduxForm({
    // a unique name for the form
    form: 'contact',
    validate, // <--- validation function given to redux-form    
})(LoginForm)

export default LoginForm