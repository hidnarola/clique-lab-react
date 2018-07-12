import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import resetSvg from 'img/site/svg/loading.svg';

const validate = values => {
    const errors = {}
    if (!values.email) { errors.email = 'This field is required'; }
    else if (validator.isEmail(values.email) === false) { errors.email = 'Enter valid email address'; }
    return errors;
}

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error) ? true : false })}>
        <input {...input} placeholder={placeholder} type="text" />
        {touched && ((error && <span>{error}</span>))}
    </div>
)

class ForgotPassForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'visible': true,
            showError: false,
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() { this.setState({ 'visible': false }); }

    render() {
        const { handleSubmit, error, newError, mybtn } = this.props
        return (
            <div>
                <div style={{ "margin": "0 32%" }}>
                    {
                        (error) ?
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
                    <Field name="email" type="email" component={renderField} placeholder="Email" />
                    <div className="submit-div">
                        {
                            (mybtn === 'reset') ?
                                <button type="submit" className="round-btn">Reset</button> :
                                <button className="round-btn" style={{ "width": "125px", "background": "#6772e5", "cursor": "no-drop" }} disabled="disabled"><img src={resetSvg} style={{ "width": "65%" }} /></button>
                        }
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