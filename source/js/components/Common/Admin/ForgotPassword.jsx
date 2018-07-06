import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import LogoImg from 'img/common/logo.png';
import resetSvg from 'img/site/svg/loading.svg';
import { forgotPassword } from '../../../actions/admin/password';

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

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'visible': true,
            mybtn: 'reset',
            passReset: true,

        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidUpdate() {
        let { history, forgotPassRes } = this.props;
        let { passReset, mybtn, sendData } = this.state;

        if (sendData && forgotPassRes.loading) {
            this.setState({
                mybtn: 'wait',
                sendData: false,
            })
        }

        if (forgotPassRes.status === 1 && passReset) {
            this.setState({ passReset: false });
            history.push('/admin');
        }
    }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let forgotData = {
            email: values.email,
        }
        dispatch(forgotPassword(forgotData));
        this.setState({ sendData: true });
    }

    onDismiss() { this.setState({ 'visible': false }); }

    render() {
        if (this.props.match.params.forgot_token !== undefined) {
            if (this.props.match.params.forgot_token !== '') {
                return <Redirect to={`/admin/reset_password/${this.props.match.params.forgot_token}`} />
            }
        }
        const { handleSubmit, error, newError, mybtn } = this.props;
        return (
            <div className="login-register-bg">
                <div className="login-register-box login_page">
                    <div className="form-logo d-flex">
                        <a>
                            <img src={LogoImg} alt="" onClick={() => (this.props.history.push("/admin"))} className="cursor_pointer" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        <ForgotPasswordForm onSubmit={this.submitForm} />
                    </div>
                    <div className="form-ftr">
                        <p>Back to <Link className="cursor_pointer" to="/admin" style={{ "textDecoration": "none" }}> Login page.</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { adminPassword } = state
    return {
        forgotPassRes: adminPassword.get('forgotPassword')
    }
}
export default connect(mapStateToProps)(withRouter(ForgotPassword));

class ForgotPasswordForm extends Component {
    render() {
        const { handleSubmit, mybtn } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <h3>Reset Password</h3>
                <Field name="email" type="email" component={renderField} placeholder="Email" />
                <div className="submit-div">
                    <button type="submit" className="round-btn">Reset</button>
                </div>
            </form>
        )
    }
}

ForgotPasswordForm = reduxForm({
    form: 'forgotPasswordForm',
    validate
})(ForgotPasswordForm);