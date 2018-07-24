import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { Link, NavLink, Redirect } from 'react-router-dom';

import { reSendEmail } from '../../../actions/register';//
import loginSvg from 'img/site/svg/loading.svg';

import cx from 'classnames';
import { Alert } from 'reactstrap';
import { reset } from 'redux-form';
import validator from 'validator';

const validate = values => {
    const errors = {}

    if (!values.username) { errors.username = 'This field is required' }
    if (!values.password) { errors.password = 'This field is required' }
    else if (values.password.length < 5) { errors.password = 'Must be more than 5 characters' }

    return errors
}

const renderField = ({ input, type, placeholder, displayError, meta: { touched, error, warning } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error && displayError) ? true : false })}>
        <input {...input} placeholder={placeholder} type={type} />
        {touched && displayError && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            isRedirect: false,
            control: false
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.saveEmail = this.saveEmail.bind(this);
    }
    onDismiss() { this.setState({ 'visible': false }); }

    saveEmail()
    {
        const { dispatch,emailId} = this.props;
        let re_email = {
            "email":emailId 
        }
        dispatch(reSendEmail(re_email));
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.visible === false && nextProps.newError === null) {
            this.setState({ 'visible': true });
        }
        if (nextProps.newError !== null) {
            this.setState({ 'showError': false });
        }
        if ((nextProps.username) === undefined || ((nextProps.password) === undefined) || (nextProps.password.length < 5)) {
            this.setState({ 'showError': true });
        }
        // this.props.dispatch(getEmail());
    }


/**  Dm now comment */
//     newError == 'Promoter registered successfully' ?
//     <div>
//         Just one more step!<br /><br />
//         We have sent you an email that will allow you to login to Clique. If you didn't receive it, <a href="javascript:void(0)" onClick={this.saveEmail}>click HERE</a> and we will resend the email link. We cannot wait to have you onboard
//     </div>
// : newError



    render() {
        const { showError } = this.state;
        const { handleSubmit, error, newError, username, password} = this.props;
        return (
            <div>
                <div style={{ "margin": "0 32%" }}>
                    {
                        (newError) ?
                            <Alert color="danger " isOpen={this.state.visible} toggle={this.onDismiss}>
                                {
                                   newError
                                }
                            </Alert>
                            : ''
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <h3>Log In</h3>
                    <Field name="username" type="text" component={renderField} placeholder="Email / Username" displayError={showError} />
                    <Field name="password" type="password" component={renderField} placeholder="Password" displayError={showError} />
                    <div className="submit-div">
                        <button type="submit" className="round-btn">Login</button>
                    </div>
                    <p>Forgot Password? <Link className="cursor_pointer" to="/forgot_password" style={{ "textDecoration": "none" }}>Reset</Link></p>
                </form>
            </div>
        )
    }
}

/** -------changes after----- */
const mapStateToProps = (state) => {
	const {register} = state;
	return {
		emailId : register.get('email_id')
	}
}

/**------------Before-------------- */
// LoginForm = reduxForm({
//     form: 'contact',
//     validate,
// })(LoginForm)


const selector = formValueSelector('contact') // <-- same as form name
LoginForm = connect(
    state => {
        const username = selector(state, 'username')
        const password = selector(state, 'password')
        return {
            username,
            password,
        }
    }
)(LoginForm)

//export default LoginForm


/** Change After */
export default connect(mapStateToProps)(reduxForm({
	form: 'contact',
	validate
})(LoginForm));

