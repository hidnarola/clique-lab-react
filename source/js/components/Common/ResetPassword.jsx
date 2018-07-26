import React,{Component} from 'react';

// import LogoImg from 'img/common/logo.png';
import LogoImg from 'img/site/svg/logo.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { resetPass } from '../../actions/forgotPass';
import ResetPassForm from '../Forms/Front/ResetPassForm';
import PropTypes from 'prop-types';


class ResetPassword extends Component{
    constructor(props){
        super(props);
    }

    // static propTypes = {
    //     loading: PropTypes.text,
    //     error: PropTypes.text,
    //     status: PropTypes.text,
    //     dispatch: PropTypes.func,
    // }

    submitForm = (values) => {
        const { dispatch } = this.props;
        let resetData = {
            token: this.props.match.params.forgot_token,
            password: values.password,
        }
        dispatch(resetPass(resetData));        
    }

    render(){
        let { error, status } = this.props;
        if(status===1){
            return <Redirect to="/login" />
        }
        return(
            <div className="login-register-bg">
                <div className="login-register-box">
                    <div className="form-logo d-flex">
                        <a>
                            <img src={LogoImg} alt="" onClick={() => (this.props.history.push("/"))} className="cursor_pointer" />
                        </a>
                    </div>
                    <div className="form-content d-flex">
                        <ResetPassForm onSubmit={this.submitForm} newError={error}/>
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
    }
}

export default connect(mapStateToProps)(withRouter(ResetPassword));