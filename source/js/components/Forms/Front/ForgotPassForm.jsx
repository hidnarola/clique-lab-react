import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';

const validate = values => {
    const errors = {}

    if (!values.email) { errors.email = 'This Field is Required'; }
    else if (validator.isEmail(values.email) === false) { errors.email = 'Enter valid email address'; }

    return errors;
}

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error) ? true : false })}>
        <input {...input} placeholder={placeholder} type="text" />
        {touched && ((error && <span>{error}</span>))}
    </div>
)

class ForgotPassForm extends Component{
    constructor(props){
        super(props);
        this.state = { 'visible': true };
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() { this.setState({ 'visible': false }); }
    render(){
        const { handleSubmit, error, newError } = this.props
        return (
            <div>
                <div style={{ "margin": "0 32%" }}>
                    {(error) ?
                        <Alert color="danger " isOpen={this.state.visible} toggle={this.onDismiss}>{error}</Alert>
                        :
                        (newError) ?
                            <Alert color="danger " isOpen={this.state.visible} toggle={this.onDismiss}>{newError}</Alert>
                            :
                            ''
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <h3>Reset Password</h3>
                    <Field name="email" type="email" component={renderField} placeholder="Email-ID" />
                    <div className="submit-div">
                        <button type="submit" className="round-btn">Reset</button>
                    </div>
                </form>
            </div>
        )
    }
}

ForgotPassForm = reduxForm({
    form: 'forgotPass',
    validate,
})(ForgotPassForm)

export default ForgotPassForm