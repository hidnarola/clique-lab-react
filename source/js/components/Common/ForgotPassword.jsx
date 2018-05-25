import React, { Component } from 'react';

import LogoImg from 'img/common/logo.png';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { forgotPass, resetForgotVal } from '../../actions/forgotPass';
import ForgotPassForm from '../Forms/Front/ForgotPassForm';
import PropTypes from 'prop-types';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passReset: true
        }
    }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let forgotData = {
            email: values.email,
        }
        dispatch(forgotPass(forgotData));
    }

    componentDidUpdate(){
        let { error, status, history } = this.props;
        let { passReset } = this.state;
        if(status===1 && passReset){
            this.setState({passReset: false});
            history.push('/login');
            //return <Redirect to="/login" />
        }
    }

    render(){
        if(this.props.match.params.forgot_token!==undefined){
            if(this.props.match.params.forgot_token!==''){
                return <Redirect to={ `/reset_password/${this.props.match.params.forgot_token}`} />
            }
        }
        let { error } = this.props;
        
        return(
            <div className="login-register-bg">
                <div className="login-register-box forgot_pass_page">
                    <div className="form-logo d-flex">
                        <a>
                            <img src={LogoImg} alt="" onClick={() => (this.props.history.push("/"))} className="cursor_pointer" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        <ForgotPassForm onSubmit={this.submitForm} newError={error} />
                    </div>
                    <div className="form-ftr">
                        <p>Already have an account?<Link className="cursor_pointer" to="/login" style={{"textDecoration":"none"}}> Login Here</Link></p>
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