import React,{Component} from 'react';

import LogoImg from 'img/common/logo.png';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { forgotPass } from '../../actions/forgotPass';
import ForgotPassForm from '../Forms/Front/ForgotPassForm';
import PropTypes from 'prop-types';


class ForgotPassword extends Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        loading: PropTypes.text,
        error: PropTypes.text,
        status: PropTypes.text,
        dispatch: PropTypes.func,
    }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let forgotData = {
            email: values.email,
        }
        dispatch(forgotPass(forgotData));        
    }

    render(){
        if(this.props.match.params.forgot_token!==undefined){
            if(this.props.match.params.forgot_token!==''){
                return <Redirect to={ `/reset_password/${this.props.match.params.forgot_token}`} />
            }
        }
        let { error, status } = this.props;
        if(status===1){
            return <Redirect to="/login" />
        }
        
        return(
            <div className="login-register-bg">
                <div className="login-register-box">
                    <div className="form-logo d-flex">
                        <a onClick={() => (this.props.history.push("/"))} className="cursor_pointer">
                            <img src={LogoImg} alt="" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        <ForgotPassForm onSubmit={this.submitForm} newError={error} />
                        {/* <form>
                            <h3>Reset Password</h3>
                            <div className="input-div">
                                <input type="text" name="" placeholder="Email" />
                            </div>	
                            <div className="submit-div">
                                <button type="submit" className="round-btn">Reset</button>
                            </div>	
                        </form> */}
                    </div>
                    <div className="form-ftr">
                        <p>Already have an account?<Link className="cursor_pointer" to="/login"> Login Here</Link></p>
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