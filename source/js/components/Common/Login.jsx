import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import LogoImg from 'img/common/logo.png';
import LoginForm  from '../Forms/Front/LoginForm';
import { SubmissionError } from 'redux-form'
import { login } from '../../actions/login';
import { routeCodes } from '../../constants/routes';
import {reactLocalStorage} from 'reactjs-localstorage';
// reactLocalStorage.set('var', true); // reactLocalStorage.get('var', true);
// reactLocalStorage.setObject('var', {'test': 'test'}); // reactLocalStorage.getObject('var');
import CryptoJS from 'crypto-js';
import {SECRET_KEY} from '../../constants/usefulvar';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Login extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false
        };        
        
        
        // Encrypt 
        // var ciphertext = CryptoJS.AES.encrypt('my message', SECRET_KEY);        
        // Decrypt 
        // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), SECRET_KEY);
        // var plaintext = bytes.toString(CryptoJS.enc.Utf8);        
        // console.log(plaintext);        

    }

    submitForm = (values) => {
        // print the form values to the console

        const { dispatch } = this.props;

        let loginData = {
            login_id: values.username,
            password: values.password,
        }

        dispatch(login(loginData));        
    }     
    
    render(){
        let { error } = this.props;
        var token = localStorage.getItem('token');        
        if (token) {
            return <Redirect to={routeCodes.DASHBOARD} />;
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
                        <LoginForm onSubmit={this.submitForm} newError={error}/>
                    </div>
                    <div className="form-ftr">
                        <p>
                            Don't have an account? {' '}
                            <a className="cursor_pointer" onClick={() => (this.props.history.push("/register"))}>
                                Register Today
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { login } = state;
    return {
        loading: login.get('loading'),
        error: login.get('error'),
        user: login.get('user'),
        token: login.get('token'),
        refreshToken: login.get('refreshToken'),
    }
}


export default connect(mapStateToProps)(withRouter(Login));