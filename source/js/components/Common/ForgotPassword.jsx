import React,{Component} from 'react';
import LogoImg from 'img/common/logo.png';

class ForgotPassword extends Component{
    render(){
        return(
            <div className="login-register-bg">
                <div className="login-register-box">
                    <div className="form-logo d-flex">
                        <a onClick={() => (this.props.history.push("/"))} className="cursor_pointer">
                            <img src={LogoImg} alt="" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        <form>
                            <h3>Reset Password</h3>
                            <div className="input-div">
                                <input type="text" name="" placeholder="Email" />
                            </div>	
                            <div className="submit-div">
                                <button type="submit" className="round-btn">Reset</button>
                            </div>	
                        </form>
                    </div>
                    <div className="form-ftr">
                        <p>
                            Already have an account? {' '}
                            <a className="cursor_pointer" onClick={() => (this.props.history.push("/login"))}>
                                Login here.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;