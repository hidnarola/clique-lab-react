import React,{Component} from 'react';
import LogoImg from 'img/common/logo.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalPopUp from './ModalPopUp';
import {TERMS,PRIVACY} from '../../constants/pages';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            contentBody:null
        }
        this.openModal = this.openModal.bind(this);
    }

    openModal(){
        alert('Here');
        
    }

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
                            <h3>Register</h3>                            
                            <div className="input-div">
                                <input type="text" name="" placeholder="Full Name" />
                            </div>	
                            <div className="input-div">
                                <input type="text" name="" placeholder="UserName" />
                            </div>	
                            <div className="input-div">	
                                <input type="text" name="" placeholder="Email" />
                            </div>	
                            <div className="input-div">	
                                <input type="text" name="" placeholder="Company" />
                            </div>	
                            <div className="input-div">	
                                <input type="password" name="" placeholder="Password" />
                            </div>	
                            <div className="accept-condition checkbox">
                                <input id="check1" type="checkbox" name="check" value="check1"/>
                                <label htmlFor="check1">
                                    I accept the
                                    <a onClick={() => {this.setState({contentBody:TERMS}); this.child.toggle()}}>
                                        Terms & Conditions
                                    </a> 
                                    
                                    and the 
                                    <a onClick={() => {this.setState({contentBody:PRIVACY}); this.child.toggle()}}>
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            <div className="submit-div">	
                                <button className="round-btn" type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="form-ftr">
                        <p>
                            Already have an account?{' '}
                            <a className="cursor_pointer" onClick={() => (this.props.history.push("/login"))}>
                                Login here.
                            </a>
                        </p>
                    </div>
                </div>
                
                <ModalPopUp onRef={ref => (this.child = ref)} contentBody={this.state.contentBody} />

            </div>
        )
    }
}

export default Register;