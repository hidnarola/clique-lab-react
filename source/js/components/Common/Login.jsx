import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import { withRouter } from 'react-router'
import LogoImg from 'img/common/logo.png';
import ContactForm  from '../Forms/Front/ContactForm';

import {reactLocalStorage} from 'reactjs-localstorage';
// reactLocalStorage.set('var', true); // reactLocalStorage.get('var', true);
// reactLocalStorage.setObject('var', {'test': 'test'}); // reactLocalStorage.getObject('var');
import CryptoJS from 'crypto-js';
import {SECRET_KEY} from '../../constants/usefulvar';

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

    submitForm = values => {
        // print the form values to the console

        console.log(values)
        // reactLocalStorage.set('users', true);
        this.setState({ redirectToReferrer: true });        
    }

    render(){
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to="people" />;
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
                        <ContactForm onSubmit={this.submitForm} />
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

export default withRouter(Login);