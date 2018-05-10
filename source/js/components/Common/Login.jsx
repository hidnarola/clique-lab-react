import React,{Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { SubmissionError } from 'redux-form';
import { reactLocalStorage } from 'reactjs-localstorage';
import CryptoJS from 'crypto-js';
import LogoImg from 'img/common/logo.png';
import LoginForm  from '../Forms/Front/LoginForm';
import { login } from '../../actions/login';
import { routeCodes } from '../../constants/routes';
import {SECRET_KEY} from '../../constants/usefulvar';
import { Alert } from 'reactstrap';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class Login extends Component{    
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,
            submitAction: false,
            errorMsg: '',
        };
    }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let loginData = {
            login_id: values.username,
            password: values.password,
        }
        this.setState({submitAction: true})
        dispatch(login(loginData));        
    }

    componentWillMount(){
        let { error,user,message } = this.props;
        let { errorMsg } = this.state;
        if (message!==null){
            this.setState({errorMsg: message},() => {
                setTimeout(()=>{
                    this.setState({errorMsg: ''})
                },3000);
            })
        }
    }
    componentDidUpdate(){
       // console.log('orporprorpo>>>',this.porps);
        let { message, loading, error } = this.props;
        let { submitAction,load} = this.state;
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
    
    render(){
      
        let { error,user,message} = this.props;
        let { errorMsg,load } = this.state;
        let token = localStorage.getItem('token');
        let usrObj = reactLocalStorage.getObject('user');
        
        if (Object.keys(usrObj).length>0){
            if(usrObj['first_login']){
                return <Redirect to={routeCodes.AFTERREGISTER} />;
            }else{
                return <Redirect to={routeCodes.DASHBOARD} />;
            }
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
                        <LoginForm onSubmit={this.submitForm} newError={errorMsg} />
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
    const { forgotPass } = state;
    return {
        loading: login.get('loading'),
        error: login.get('error'),
        user: login.get('user'),
        token: login.get('token'),
        refreshToken: login.get('refreshToken'),
        message:forgotPass.get('message'),
    }
}


export default connect(mapStateToProps)(withRouter(Login));