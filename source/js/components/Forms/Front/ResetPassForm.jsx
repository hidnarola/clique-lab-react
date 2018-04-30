import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';

const validate = values => {
    const errors = {}

    if (!values.password) { errors.password = 'This Field is Required'; }
    else if (values.password.length < 5) { errors.password = 'Must be more than 5 or more characters'; }

    if (!values.repeatPassword) { errors.password = 'This Field is Required'; }
    else if (values.password !== values.repeatPassword) { errors.password = 'Password should be match'; }

    return errors;
}

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error) ? true : false })}>
        <input {...input} placeholder={placeholder} type={type} />
        {touched && ((error && <span>{error}</span>))}
    </div>
)


class ResetPassForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 'visible': true };
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() { this.setState({ 'visible': false }); }
    render() {
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
                    <Field name="password" type="password" component={renderField} placeholder="Enter New Password" />
                    <Field name="repeatPassword" type="password" component={renderField} placeholder="Re-Enter New Password" />
                    <div className="submit-div">
                        <button type="submit" className="round-btn">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

ResetPassForm = reduxForm({
    form: 'resetPass',
    validate,
})(ResetPassForm)

export default ResetPassForm