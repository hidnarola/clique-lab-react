import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { SubmissionError } from 'redux-form';
import { reactLocalStorage } from 'reactjs-localstorage';
import CryptoJS from 'crypto-js';
import LogoImg from 'img/common/logo.png';
import LoginForm from '../Forms/Front/LoginForm';
import { login } from '../../actions/login';
import { resetForgotVal } from '../../actions/forgotPass';
//import { resetLoginVal } from '../../actions/login'; // dm
import { resetRegisterVal } from '../../actions/register'; // dm

import { routeCodes } from '../../constants/routes';
import { SECRET_KEY } from '../../constants/usefulvar';
import { Alert } from 'reactstrap';

import { ToastContainer, toast, Slide } from 'react-toastify';

import { reSendEmail } from '../../actions/register';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const CustomToastMsg = (props) => {
    return (
        <div>
            Just one more step!<br /><br />
            We have sent you an email that will allow you to login to Clique. If you didn't receive it, <a href="javascript:void(0)" style={{ "color": "#ffc800", "textDecoration": "underline", "fontWeight": "500", "fontStyle": "italic" }} onClick={props.rsend}>click HERE</a> and we will resend the email link. We cannot wait to have you onboard
        </div>
    )
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            submitAction: false,
            errorMsg: '',
            registerToast: 1,
            loginToast: 2,
        };
        this.saveEmail = this.saveEmail.bind(this);
    }

    saveEmail() {
        const { dispatch, emailId } = this.props;
        let re_email = {
            "email": emailId
        }
        dispatch(reSendEmail(re_email));

        setTimeout(() => {
            const { message, error, errorResendEmail } = this.props;
            if (errorResendEmail !== null) {
                toast.success(errorResendEmail, {
                    className: 'success-custom-tostify',
                });
            }
            else if (message) {
                toast.success('Email is send to your email id', {
                    className: 'success-custom-tostify',
                });
            }

        }, 3000)
    }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let loginData = {
            login_id: values.username,
            password: values.password,
        }
        this.setState({ submitAction: true })
        dispatch(login(loginData));
    }

    // before
    // componentWillMount(){
    //     let { error,user,message,dispatch } = this.props;
    //     let { errorMsg } = this.state;
    //     if (message!==null){
    //         this.setState({errorMsg: message},() => {
    //             // setTimeout(()=>{
    //             //     this.setState({errorMsg: ''})
    //             //     dispatch(resetForgotVal());
    //             //     dispatch(resetRegisterVal());
    //             // },3000);
    //         })
    //     }
    // }



    // after
    componentWillMount() {
        let { error, user, message, dispatch } = this.props;
        let { errorMsg } = this.state;
        if (message !== null) {
            if (message === 'Promoter registered successfully') {
                this.toastId = toast.success(<CustomToastMsg rsend={this.saveEmail} />,
                // this.state.registerToast = toast.success(<CustomToastMsg rsend={this.saveEmail} />,
                    {
                        className: 'success-custom-tostify',
                        autoClose: false,
                        closeOnClick: false,
                    });
            } else if (message) {
                toast.success(message, {
                    className: 'success-custom-tostify',
                });

                dispatch(resetForgotVal());
                dispatch(resetRegisterVal());
            }

            // this.setState({errorMsg: message},() => {
            //     setTimeout(()=>{
            //         this.setState({errorMsg: ''})
            //         dispatch(resetForgotVal());
            //         dispatch(resetRegisterVal());
            //     },3000);
            // })
            // dispatch(resetForgotVal());
            // dispatch(resetRegisterVal());
        }
    }


    componentDidUpdate() {
        let { message, loading, error, dispatch } = this.props;
        let { submitAction, load, isenter } = this.state;

        if (submitAction && !loading) {
            this.setState({ submitAction: false })

            if (error !== null) {
                // if (!toast.isActive(this.toastId)) { // remove bcz resend link show all ready so invailid email not show
                    this.toastId = toast.success(error, {
                        className: 'success-custom-tostify',
                    });
                // }
                // if (!toast.isActive(this.state.loginToast)) {
                //     this.state.loginToast = toast.success(error, {
                //         className: 'success-custom-tostify',
                //     });
                // }
                dispatch(resetForgotVal());
                // this.setState({errorMsg: error},() => {
                //     setTimeout(()=>{
                //         this.setState({errorMsg: ''})
                //     },3000);
                // })
            }
            // else if (message !== null ) {
            else if (message) {
                toast.success(message, {
                    className: 'success-custom-tostify',
                });
                dispatch(resetForgotVal());
                // this.setState({errorMsg: message},() => {
                //     setTimeout(()=>{
                //         this.setState({errorMsg: ''})
                //     },3000);
                // })
            }
        }
    }

    componentWillUnmount() {
        // toast.dismiss(this.toastId);
        toast.dismiss();
    }

    render() {

        let { error, user, message } = this.props;
        let { errorMsg, load } = this.state;
        let token = localStorage.getItem('token');
        let usrObj = reactLocalStorage.getObject('user');
        if (Object.keys(usrObj).length > 0) {
            // console.log(usrObj.first_login);
            if (usrObj.first_login === true) {
                // console.log('Redirect', '1');
                this.props.history.push(routeCodes.AFTERREGISTER);
                //return <Redirect to={routeCodes.AFTERREGISTER} />;
            } else if (usrObj.first_login === false) {
                // console.log('Redirect', '2');
                this.props.history.push(routeCodes.DASHBOARD);
                //return <Redirect to={routeCodes.DASHBOARD} />;
            } else {
                // console.log('Redirect', '3');
                // console.log('121');
                this.props.history.push(routeCodes.AFTERREGISTER);
                //return <Redirect to={routeCodes.AFTERREGISTER} />;
            }
        }

        return (
            <div className="login-register-bg">
                <div className="login-register-box login_page">
                    <div className="form-logo d-flex">
                        <a>
                            <img src={LogoImg} alt="" onClick={() => (this.props.history.push("/"))} className="cursor_pointer" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        <LoginForm onSubmit={this.submitForm} newError={errorMsg} />
                    </div>
                    <div className="form-ftr">
                        <p>
                            Don't have an account? {' '}
                            <a className="cursor_pointer" onClick={() => (this.props.history.push("/register"))} style={{ "color": "#6772e5" }}>
                                Register Today
                            </a>
                            {/* <a><Link className="cursor_pointer" to="/register">Register Today</Link></a> */}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { login, forgotPass, register } = state;
    let msg = '';
    if (forgotPass.get('message')) {
        msg = forgotPass.get('message');
    }
    if (register.get('message')) {
        msg = register.get('message');
    }
    return {
        loading: login.get('loading'),
        error: login.get('error'),
        user: login.get('user'),
        token: login.get('token'),
        refreshToken: login.get('refreshToken'),
        message: msg,
        emailId: register.get('email_id'),////
        errorResendEmail: register.get('error')//// 23-07-2018
    }
}


export default connect(mapStateToProps)(withRouter(Login));