import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import validator from 'validator';
import cx from 'classnames';
import { SubmissionError } from 'redux-form';  // ES6
import Select from 'react-select';
import { Alert } from 'reactstrap';
//import { SelectField_ReactSelect } from '../RenderFormComponent/EveryComponent';

const validate = values => {
    const errors = {}
    
    if (!values.username || (values.username!==undefined && values.username.trim()=="")) {
        errors.username = 'This field is Required'
    }

    if (!values.fullname || (values.fullname!==undefined && values.fullname.trim()=="")) {
        errors.fullname = 'This field is Required'
    }

    if (!values.email || (values.email!==undefined && values.email.trim()=="")) {
        errors.email = 'This field is Required'
    } else if (validator.isEmail(values.email) === false) {
        errors.email = 'Enter valid email address'
    }

    if (!values.company || (values.company!==undefined)) {
        errors.company = 'This field is Required'
    }
    if (!values.country) {
        errors.country = 'This field is Required'
    }

    if (!values.password || (values.password!==undefined && values.password.trim()=="")) {
        errors.password = 'This field is Required'
    } else if (values.password.length < 5) {
        errors.password = 'Must be more than 5 or more characters.'
    } 

    if (!values.repeatPassword || (values.repeatPassword!==undefined && values.repeatPassword.trim()=="")) {
        errors.repeatPassword = 'This field is Required'
    } else if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'Please enter password same as above.'
    }

    if(!values.check1 || values.check1===''){
        errors.check1 = 'Please accept the terms & condition.'
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

const renderField = ({ input, type, placeholder, meta: { touched, error, warning } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error) ? true : false })}>
        <input {...input} placeholder={placeholder} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

const renderFieldCheckbox = ({ input, type, name,className,term_privacy,placeholder, newProp, meta: { touched, error, warning } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error) ? true : false })}>
        <input {...input} placeholder={placeholder} type={type} className={className} id={newProp} />
        <label htmlFor="check1">
            I accept the
            <a href="javascript:void(0)" onClick={() => term_privacy(this, 'TERMS')}> Terms & Conditions </a> and the
            <a href="javascript:void(0)" onClick={() => term_privacy(this, 'PRIVACY')}> Privacy Policy </a>
        </label>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
    
    
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


class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: true
        };
      
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

      
    render(){
        const { handleSubmit, error, newError } = this.props;
        let countryArr = [];
        if(this.props.countryList !== null){
            this.props.countryList.map((obj)=>{
                countryArr.push({'value':obj._id,label:obj.name});
            });
        }

        if(newError!=='' || newError!==null){
            setTimeout(() => { this.setState({visible: false}) }, 3000);
        }
        return (
            <div>
                <div style={{"margin":"0 32%"}}>
                    {error && <strong>{error}</strong>}
                    {newError && <Alert color="danger " isOpen={this.state.visible} toggle={this.onDismiss}>{newError}</Alert>}
                </div>
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
                    
                    <div className="accept-condition checkbox">
                        <Field 
                            name="check1"
                            component={renderFieldCheckbox} 
                            type="checkbox" 
                            value="check1"
                            className="check1"
                            newProp="check1"
                            term_privacy={this.props.func}
                        />
                    </div>
                    <div className="submit-div">
                        <button className="round-btn" type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

RegisterForm = reduxForm({
    form: 'registerForm',
    validate,
})(RegisterForm)

export default RegisterForm