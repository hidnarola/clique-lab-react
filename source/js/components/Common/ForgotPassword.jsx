import React, { Component } from 'react';

// import LogoImg from 'img/common/logo.png';
import LogoImg from 'img/site/svg/logo.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { forgotPass, resetForgotVal } from '../../actions/forgotPass';
import ForgotPassForm from '../Forms/Front/ForgotPassForm';
import PropTypes from 'prop-types';
// import { ToastContainer, toast, Slide } from 'react-toastify';
import { toast } from 'react-toastify';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passReset: true,
            errorMsg: '',
            mybtn: 'reset',
            sendData: false,
        }
    }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let forgotData = {
            email: values.email,
        }
        dispatch(forgotPass(forgotData));
        this.setState({ sendData: true });
    }

    componentDidUpdate() {
        let { error, status, history, loading } = this.props;
        let { passReset, mybtn, sendData } = this.state;

        if (sendData && loading) {
            this.setState({
                mybtn: 'wait',
                sendData: false,
            })
        }

        if (status === 1 && passReset) {
            this.setState({ passReset: false });
            history.push('/login');
            //return <Redirect to="/login" />
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.error) {
            this.setState({
                mybtn: 'reset',
            })
        }

        if (nextProps.error !== null) {
            if (!toast.isActive(this.toastId)) {
                this.toastId = toast.success(nextProps.error, {
                    className: 'success-custom-tostify',
                });
            }
        }

        // this.setState({errorMsg:nextProps.error},()=>{
        //     setTimeout(()=>{
        //         this.setState({errorMsg:''});
        //     },3000)
        // });
    }

    render() {
        if (this.props.match.params.forgot_token !== undefined) {
            if (this.props.match.params.forgot_token !== '') {
                return <Redirect to={`/reset_password/${this.props.match.params.forgot_token}`} />
            }
        }
        let { error } = this.props;
        let { errorMsg } = this.state;

        return (
            <div className="login-register-bg">
                <div className="login-register-box forgot_pass_page">
                    <div className="form-logo d-flex">
                        <a>
                            <img src={LogoImg} alt="" onClick={() => (this.props.history.push("/"))} className="cursor_pointer" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        {/* <ForgotPassForm onSubmit={this.submitForm} newError={error} /> */}
                        <ForgotPassForm onSubmit={this.submitForm} newError={errorMsg} mybtn={this.state.mybtn} />
                    </div>
                    <div className="form-ftr">
                        <p>Already have an account?<Link className="cursor_pointer" to="/login" style={{ "textDecoration": "none" }}> Login here.</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { forgotPass } = state;
    return {
        loading: forgotPass.get('loading'),
        error: forgotPass.get('error'),
        status: forgotPass.get('status'),
        message: forgotPass.get('message'),
    }
}

export default connect(mapStateToProps)(withRouter(ForgotPassword));