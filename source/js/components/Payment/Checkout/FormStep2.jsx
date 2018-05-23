import React,{Component} from 'react';
import OrderDetails from './OrderDetails';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import cx from 'classnames';
import {SelectField_ReactSelect} from '../../Forms/RenderFormComponent/EveryComponent';

const validate = values => {
    
    const errors = {};

    if (!values.address1) {
        errors.address1 = 'This Field is Required';
    }
    // if (!values.address2) {
    //     errors.address2 = 'This Field is Required';
    // }
    if (!values.city) {
        errors.city = 'This Field is Required';
    }
    if (!values.state) {
        errors.state = 'This Field is Required';
    }
    if (!values.post_code) {
        errors.post_code = 'This Field is Required';
    }
    
    return errors;
};

const textField = (
    { input, type, label, placeholder, meta: { touched, error } }
) => (
        <div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
            <label>{label}</label>
            <input {...input} placeholder={placeholder} type={type} className={touched && ((error && `txt_error_div`))}/>
            {touched && ((error && <span className="error-div">{error}</span>))}
        </div>
    )

class FormStep2 extends Component{
    render(){
        const { handleSubmit,previousPage } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <div className="step-process d-flex">
                            <div className="process-point active completed"><a href=""></a><strong></strong></div>
                            <div className="process-point active"><a href=""></a><strong></strong></div>
                            <div className="process-point"><a href=""></a></div>
                        </div>
                        <div className="step-content d-flex">
                            <h2>Step 2</h2>

                            <Field
                                name="address1"
                                type="text"
                                label="Address line 1"
                                component={textField}
                                placeholder="Address Line 1"
                            />
                             <Field
                                name="address2"
                                type="text"
                                label="Address line 2"
                                component={textField}
                                placeholder="Address Line 2"
                            />
                             <Field
                                name="city"
                                type="text"
                                label="City"
                                component={textField}
                                placeholder="City"
                            />
                            
                            <Field 
                                className="campaign_form_step2_dropdown "
                                wrapperClass="select-wrap"
                                name="state"       
                                label="State"                             
                                labelClassName="control-label"
                                placeholder="State"
                                component={SelectField_ReactSelect}
                                options={[                                    
                                    { value: '' , label :"Select State"},
                                    { value: 'gujarat' , label :"gujarat"},
                                    { value: 'janero' , label :"janero"},
                                    { value: 'washington' , label :"washington"},
                                    { value: 'rukisako' , label :"rukisako"},
                                ]}
                            />

                             <Field
                                name="post_code"
                                type="text"
                                label="Post Code"
                                component={textField}
                                placeholder="Post Code"
                            />
                            
                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage} 
                                        className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn">Next</button>
                            </div>
                        </div>
                    </div>

                    {/* <OrderDetails/> */}
                </div>
            </form>
        );
    }
}

// export default FormStep1;
export default reduxForm({
    form: 'wizardCheckout', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(FormStep2);
