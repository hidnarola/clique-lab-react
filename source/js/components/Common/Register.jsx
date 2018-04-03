import React,{Component} from 'react';
import LogoImg from 'img/common/logo.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalPopUp from './ModalPopUp';
import {TERMS,PRIVACY} from '../../constants/pages';
import RegisterForm from '../../components/Forms/Front/RegisterForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { register } from '../../actions/register';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            contentBody:null
        }
        this.openModal = this.openModal.bind(this);
    }
    
    submitForm = (values) => {
        // print the form values to the console

        const { dispatch } = this.props;

        let userData = {
            login_id: values.username,
            password: values.password,

            "name":values.fullname,
            "username":values.username,
            "email":values.email,
            "company": values.company,
            "password":values.password
        }

        dispatch(register(userData));    

    } 

    openModal(e,param){
        if(param == 'TERMS'){
            this.setState({contentBody:TERMS});
        }else if(param == 'PRIVACY'){
            this.setState({contentBody:PRIVACY});
        }
        this.child.toggle()
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
                        <RegisterForm func={this.openModal} onSubmit={this.submitForm}/>                         
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

const mapStateToProps = (state) => {
    const { register } = state;
    return {
        loading: register.get('loading'),
        error: register.get('error'),
        user: register.get('user'),        
    }
}


export default connect(mapStateToProps)(withRouter(Register));