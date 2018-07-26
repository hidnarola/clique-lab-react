import React, { Component } from 'react';

// import LogoImg from 'img/common/logo.png';
import LogoImg from 'img/site/svg/logo.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Field, reduxForm } from 'redux-form'
import { Link, Redirect } from 'react-router-dom';
import { resetPassword } from '../../../actions/admin/password';
import PropTypes from 'prop-types';
import cx from 'classnames';

const validate = values => {
    const errors = {}

    if (!values.password) { errors.password = 'This field is required'; }
    else if (values.password.length < 5) { errors.password = 'Must be more than 5 characters'; }

    if (!values.repeatPassword) { errors.repeatPassword = 'This field is required'; }
    else if (values.password !== values.repeatPassword) { errors.repeatPassword = 'Password should be match'; }

    return errors;
}

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error) ? true : false })}>
        <input {...input} placeholder={placeholder} type={type} />
        {touched && ((error && <span>{error}</span>))}
    </div>
)

class ResetPassword extends Component {
    constructor(props) {
        super(props);
    }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let resetData = {
            token: this.props.match.params.forgot_token,
            password: values.password,
        }
        dispatch(resetPassword(resetData));
    }

    render() {
        let { resetPassRes } = this.props;
        if ( resetPassRes.status === 1) {
            return <Redirect to="/admin" />
        }
        return (
            <div className="login-register-bg">
                <div className="login-register-box reset_pass_page">
                    <div className="form-logo d-flex">
                        <a> <img src={LogoImg} alt="" onClick={() => (this.props.history.push("/admin"))} className="cursor_pointer" /> </a>
                    </div>
                    <div className="form-content d-flex">
                        <ResetPasswordForm onSubmit={this.submitForm} />
                    </div>
                    <div className="form-ftr">
                        <p>Back to <Link className="cursor_pointer" to="/admin" style={{ "textDecoration": "none" }}> Login page.</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminPassword } = state;
    return {
        resetPassRes: adminPassword.get('resetPassword')
    }
}
export default connect(mapStateToProps)(withRouter(ResetPassword));

class ResetPasswordForm extends Component {
    render() {
        const { handleSubmit, mybtn } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <h3>Reset Password</h3>
                <Field name="password" type="password" component={renderField} placeholder="Enter New Password" />
                <Field name="repeatPassword" type="password" component={renderField} placeholder="Re-Enter New Password" />
                <div className="submit-div">
                    <button type="submit" className="round-btn">Submit</button>
                </div>
            </form>
        )
    }
}

ResetPasswordForm = reduxForm({
    form: 'resetPasswordForm',
    validate
})(ResetPasswordForm);