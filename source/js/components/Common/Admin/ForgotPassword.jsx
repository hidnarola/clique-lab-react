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
import { ToastContainer, toast, Slide } from 'react-toastify';
import { forgotPassword } from '../../../actions/admin/password';

// import ForgotPassForm from '../../Forms/Front/ForgotPassForm';

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
            sendData: false,
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidUpdate() {
        let { history, forgotPassRes,loading } = this.props;
        let { passReset, mybtn, sendData } = this.state;

        console.log('caling',forgotPassRes);
        // if (sendData && forgotPassRes.loading) {
        if (sendData && loading) {
            this.setState({
                mybtn: 'wait',
                sendData: false,
            })
        }
    
        if (forgotPassRes.status === 1 && passReset) {
            this.setState({ passReset: false });
            history.push('/admin');
        }

        if (forgotPassRes.error) {
            if (!toast.isActive(this.toastId)) {
                this.toastId = toast.success(forgotPassRes.error, {
                    className: 'success-custom-tostify',
                });
            }
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            mybtn:'reset'
        })
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
                        {/* <ForgotPasswordForm onSubmit={this.submitForm} /> */}
                        <ForgotPasswordForm onSubmit={this.submitForm} mybtn={this.state.mybtn} />

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
        forgotPassRes: adminPassword.get('forgotPassword'),
        loading:adminPassword.get('forgotPassword').loading
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
                    {/* <button type="submit" className="round-btn">Reset</button> */}
                    {
                        (mybtn === 'reset') ?
                            <button type="submit" className="round-btn">Reset</button> :
                            <button className="round-btn" style={{ "width": "125px", "background": "#6772e5", "cursor": "no-drop" }} disabled="disabled"><img src={resetSvg} style={{ "width": "65%" }} /></button>
                    }
                </div>
            </form>
        )
    }
}

ForgotPasswordForm = reduxForm({
    form: 'forgotPasswordForm',
    validate
})(ForgotPasswordForm);


