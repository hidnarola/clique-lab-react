import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset, Field, reduxForm, formValueSelector } from 'redux-form';
import { Alert } from 'reactstrap';
import { adminLogin } from '../../../actions/login';
import { resetForgotVal } from '../../../actions/admin/password';
import { routeCodes } from '../../../constants/routes';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { reactLocalStorage } from 'reactjs-localstorage';
// import LogoImg from 'img/common/logo.png';
import LogoImg from 'img/site/svg/logo.svg';
import cx from 'classnames';
import validator from 'validator';

const validate = values => {
    const errors = {}
    if (!values.username) { errors.username = 'This field is required' }
    if (!values.password) { errors.password = 'This field is required' }
    else if (values.password.length < 5) { errors.password = 'Must be more than 5 characters' }
    return errors
}

const renderField = ({ input, type, placeholder, displayError, meta: { touched, error, warning } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error) ? true : false })}>
        <input {...input} placeholder={placeholder} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAction: false,
        }
    }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let adminLoginData = {
            login_id: values.username,
            password: values.password,
        }
        this.setState({ submitAction: true })
        dispatch(adminLogin(adminLoginData));
    }

    componentDidUpdate() {
        let { message, loading, error, dispatch, forgotPassRes } = this.props;
        let { submitAction, load } = this.state;
        if (submitAction && !loading) {
            this.setState({ submitAction: false })
            if (error !== null) {
                if (!toast.isActive(this.toastId)) {
                    this.toastId = toast.success(error, {
                        className: 'success-custom-tostify',
                    });
                }
            } else if (message) {
                toast.success(message, {
                    className: 'success-custom-tostify',
                });
            }
        }
    }

    componentWillMount(){
        let { message, loading, error, dispatch, forgotPassRes, resetPassRes } = this.props;
        if(forgotPassRes.message || resetPassRes.message){
            let toastMessage = '';
            if(forgotPassRes.message){ toastMessage = forgotPassRes.message }
            else if(resetPassRes.message){ toastMessage = resetPassRes.message }
            toast.success(toastMessage, {
                className: 'success-custom-tostify',
            });
            dispatch(resetForgotVal());
        }
    }

    render() {
        let { error, user, message } = this.props;
        let { errorMsg, load } = this.state;
        let token = localStorage.getItem('token');
        let adminObj = reactLocalStorage.getObject('admin');
        if (Object.keys(adminObj).length > 0) {
            this.props.history.push(routeCodes.ADMIN_DASHBOARD);
        }
        return (
            <div className="login-register-bg">
                <div className="login-register-box login_page">
                    <div className="form-logo d-flex">
                        <a>
                            <img src={LogoImg} alt="" onClick={() => (this.props.history.push("/admin"))} className="cursor_pointer" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        <AdminLoginForm onSubmit={this.submitForm} />
                    </div>
                    <div class="form-ftr">
                        <p>&copy; 2018 Clique Labs</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { login, adminPassword } = state;
    
    return {
        loading: login.get('loading'),
        error: login.get('error'),
        admin: login.get('admin'),
        token: login.get('token'),
        refreshToken: login.get('refreshToken'),
        forgotPassRes: adminPassword.get('forgotPassword'),
        resetPassRes: adminPassword.get('resetPassword'),
    }
}
export default connect(mapStateToProps)(withRouter(Login));

class AdminLoginForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <Field name="username" type="text" component={renderField} placeholder="Email / Username" />
                <Field name="password" type="password" component={renderField} placeholder="Password" />
                <div className="submit-div">
                    <button type="submit" className="round-btn">Login</button>
                </div>
                <p>Forgot Password? <Link className="cursor_pointer" to="/admin/forgot_password" style={{ "textDecoration": "none" }}>Reset</Link></p>
            </form>
        )
    }
}

AdminLoginForm = reduxForm({
    form: 'adminLoginForm',
    validate
})(AdminLoginForm);