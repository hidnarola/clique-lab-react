import React,{Component} from 'react';
import LogoImg from 'img/common/logo.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalPopUp from './ModalPopUp';
import {TERMS,PRIVACY} from '../../constants/pages';
import RegisterForm from '../../components/Forms/Front/RegisterForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { register, country, resetRegisterVal } from '../../actions/register';
import {Redirect} from 'react-router-dom';
import { routeCodes } from '../../constants/routes';
import {getFormSyncErrors} from 'redux-form';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            contentBody: null,
            submitAction: false,
        }
        this.openModal = this.openModal.bind(this);
    }
    
    submitForm = (values) => {
        const { dispatch } = this.props;   
        let userData = {
            login_id: values.username,
            password: values.password,

            "name":values.fullname,
            "username":values.username,
            "email":values.email,
            "company": values.company,
            "country": values.country.value,
            "password":values.password
        }
        this.setState({submitAction: true});
        dispatch(register(userData));    
    } 

    componentWillMount = () => {
        let { dispatch, error, user } = this.props;
        let { errorMsg } = this.state;
        if (error!==null){
            this.setState({errorMsg: error},() => {
                setTimeout(()=>{
                    this.setState({errorMsg: ''})
                    dispatch(resetRegisterVal());
                },3000);
            })
        }
        dispatch(country());
    }
    
    componentDidUpdate(){
         let { message, loading, error } = this.props;
         let { submitAction,load} = this.state;
         console.log(error);
         if(submitAction && !loading){
             this.setState({submitAction: false})
             if(error!==null){
                 this.setState({errorMsg: error},() => {
                     setTimeout(()=>{
                         this.setState({errorMsg: ''})
                     },3000);
                 })
             } 
             else if (message!==null){
                 this.setState({errorMsg: message},() => {
                     setTimeout(()=>{
                         this.setState({errorMsg: ''})
                     },3000);
                 })
             }
         }
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
        let { user,fetchedErrors, error } = this.props;
        let { errorMsg } = this.state;
        if(user){
            return <Redirect to={routeCodes.LOGIN} />;
        }
        return(
            <div className="login-register-bg">
                <div className="login-register-box">
                    <div className="form-logo d-flex">
                        <a>
                            <img onClick={() => (this.props.history.push("/"))} src={LogoImg} alt="" className="cursor_pointer" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        <RegisterForm func={this.openModal} onSubmit={this.submitForm} countryList={this.props.country} newError={errorMsg} />                         
                    </div>
                    <div className="form-ftr">
                        <p>Already have an account?{' '}
                            <a className="cursor_pointer" onClick={() => (this.props.history.push("/login"))} style={{"color":"#6772e5"}}>Login here.</a>
                        </p>
                    </div>
                </div>                
                <ModalPopUp onRef={ref => (this.child = ref)} contentBody={this.state.contentBody} closeButton="Close" />
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
        country:register.get('country'),        
        fetchedErrors: getFormSyncErrors('registerForm')(state)
    }
}


export default connect(mapStateToProps)(withRouter(Register));