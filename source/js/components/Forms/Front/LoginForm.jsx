import React, { Component } from 'react';
import { Field, reduxForm,formValueSelector  } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Alert } from 'reactstrap';
import {reset} from 'redux-form';

const validate = values => {
    const errors = {}

    if (!values.username) { errors.username = 'This field is Required' }
    if (!values.password) { errors.password = 'This field is Required' }
    else if (values.password.length < 5) { errors.password = 'Must be more than 5 or more characters.' }

    return errors
}

const renderField = ({ input, type, placeholder, displayError,meta: { touched, error, warning } }) => (
    <div className={cx('input-div', { 'custom-error': (touched && error && displayError ) ? true : false })}>
        <input {...input} placeholder={placeholder} type={type} />
        {touched && displayError &&  ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: true };
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() { this.setState({ 'visible': false }); }

    componentWillReceiveProps(nextProps) { 
        if(this.state.visible === false && nextProps.newError === null){
            this.setState({ 'visible': true });
        }
        if(nextProps.newError !== null){
            this.setState({'showError':false});
        }
        if((nextProps.username) === undefined || (nextProps.password) === undefined){
            this.setState({'showError':true});
        }
    }

    render() {
        const {showError} = this.state;
        const { handleSubmit, error, newError, username, password} = this.props;
        return (
            <div>
                <div style={{ "margin": "0 32%" }}>
                    {
                        // (error && showError) ?
                        // <Alert color="danger " isOpen={this.state.visible} toggle={this.onDismiss}>{error}</Alert>
                        // :
                        (newError) ? <Alert color="danger " isOpen={this.state.visible} toggle={this.onDismiss}>{newError}</Alert> : ''
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <h3>Log In</h3>
                    <Field name="username" type="text" component={renderField} placeholder="Username" displayError={showError}/>
                    <Field name="password" type="password" component={renderField} placeholder="Password" displayError={showError}/>
                    <div className="submit-div">
                        <button type="submit" className="round-btn">Login</button>
                    </div>
                    <p>Forgot Password? <Link className="cursor_pointer" to="/forgot_password">Reset</Link></p>
                </form>
            </div>
        )
    }
}

LoginForm = reduxForm({
    form: 'contact',
    validate,
})(LoginForm)


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

export default LoginForm