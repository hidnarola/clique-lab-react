import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import validator from 'validator';
import cx from 'classnames';
import { SubmissionError } from 'redux-form';  // ES6
import Select from 'react-select';

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
    } else if (validator.isEmail(values.email) === false) {
        errors.email = 'Enter valid email address'
    }

    if (!values.company) {
        errors.company = 'Required'
    }
    if (!values.country) {
        errors.country = 'Required'
    }

    if (!values.repeatPassword) {
        errors.repeatPassword = 'Required'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 5) {
        errors.password = 'Must be more than 5 or more characters.'
    } else if (values.password !== values.repeatPassword) {
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
        <div className={cx('input-div', { 'custom-error': (touched && error) ? true : false })}>
            <input {...input} placeholder={placeholder} type={type} />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    )

const renderFieldCheckbox = ({
    input,
    type,
    placeholder,
    meta: { touched, error, warning }
}) => (
        <span>
            <input {...input} placeholder={placeholder} type={type} />
            {/* {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))} */}
        </span>
    )


const country_Select = (props) => {
    const { label, input, meta, className, placeholder, errorClass, initialValue, options } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div className={className}>
            {/* <label htmlFor={input.name} className={labelClass}>{label}</label> */}
            <Select
                {...input}
                value={val}
                options={options}
                className={`${className}${meta.touched && ((meta.error && ' txt_error_div') || (meta.warning && ' txt_error_div'))}`}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur({ ...input.value })}
                multi={false}
                clearable={false}
            />
            {meta.touched &&
                ((meta.error && <span className={`error-div`}>{meta.error}</span>) || (meta.warning && <span className={`error-div`}>{meta.warning}</span>))
            }
        </div>
    );
}


let RegisterForm = props => {
    const { handleSubmit, error } = props
    
    //console.log('>>Dipesh',props.countryList);

    let countryArr = [];
    if(props.countryList !== null){

        props.countryList.map((obj)=>{
            countryArr.push({'value':obj._id,label:obj.name});
        });
    }   


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
                className="select-wrap"
                name="country"
                component={country_Select}
                options={countryArr}
                placeholder="Select Country"
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

            {error}

            <div className="accept-condition checkbox">


                <Field name="check1" id="check1" component={renderFieldCheckbox} type="checkbox" value="check1" />

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