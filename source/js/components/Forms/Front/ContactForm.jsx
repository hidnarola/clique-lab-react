import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom';

let ContactForm = props => {
    const { handleSubmit } = props
    return (

        <form onSubmit={handleSubmit}>
            <h3>Log In</h3>
            <div className="input-div">
                {/* <input type="text" name="username" placeholder="Email" /> */}
                <Field name="firstName" component="input" type="text" />
            </div>
            <div className="input-div">
                {/* <input type="password" name="" placeholder="Password" /> */}
                <Field name="password" component="input" type="password" />
            </div>
            <div className="submit-div">
                <button type="submit" className="round-btn">Login</button>
            </div>	
            <p>
                Forgot Password?                
                <Link className="cursor_pointer" to="/forgot_password">Reset</Link>
            </p>
        </form>        
    )
}

ContactForm = reduxForm({
    // a unique name for the form
    form: 'contact'    
})(ContactForm)

export default ContactForm