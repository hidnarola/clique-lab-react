import React,{Component} from 'react';
//import FormCampaignRight from './FormCampaignRight';
import OrderDetails from './OrderDetails';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import cx from 'classnames';
import {SelectField_ReactSelect} from '../../Forms/RenderFormComponent/EveryComponent';

const validate = values => {
    
    const errors = {};

    if (!values.fullname || !validator.matches(values.fullname, /^[A-Za-z_]/i)) {
        errors.fullname = 'This field is required';
    }
    if (!values.email) {
        errors.email = 'This field is required'
    }else  if(validator.isEmail(values.email) === false){
        errors.email = 'Enter valid email address'
    }
    if (!values.companyname || !validator.matches(values.companyname, /^[A-Za-z_]/i)) {
        errors.companyname = 'This field is required';
    }
    if (!values.abn || !validator.matches(values.abn, /^[A-Za-z0-9_]/i)) {
        errors.abn = 'This field is required';
    }
    if (!values.country) {
        errors.country = 'This field is required';
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

class FormStep1 extends Component{

    constructor(props){
        super(props);
    }    
    
    
    render(){
        const { handleSubmit } = this.props;
        let countryArr = [];
        if(this.props.countryList !== null){
            this.props.countryList.map((obj)=>{
                countryArr.push({'value':obj._id,label:obj.name});
            });
        }
        return(
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex checkout">                
                    <div className="create-campaign-l d-flex">
                        <div className="step-process d-flex">
                            <div className="process-point active"><a href=""></a><strong></strong></div>
                            <div className="process-point"><a href=""></a><strong></strong></div>
                            <div className="process-point"><a href=""></a></div>
                        </div>
                        <div className="step-content d-flex">
                            <h2>Step 1</h2>                            
                            <Field
                                name="fullname"
                                type="text"
                                label="Full Name"
                                component={textField}
                                placeholder="Full Name"
                            />
                            <Field
                                name="email"
                                type="text"
                                label="Email"
                                component={textField}
                                placeholder="Email"
                            />
                            <Field
                                name="companyname"
                                type="text"
                                label="Company Name"
                                component={textField}
                                placeholder="Company Name"
                            />
                            <Field
                                name="abn"
                                type="text"
                                label="ABN"
                                component={textField}
                                placeholder="ABN"
                            />
                            <Field 
                                className="campaign_form_step2_dropdown "
                                wrapperClass="select-wrap"
                                name="country"       
                                label="Country"                             
                                labelClassName="control-label"
                                placeholder="Country"
                                component={SelectField_ReactSelect}
                                options={countryArr}
                            />
                        
                            <div className="submit-btn d-flex">
                                {/* <button type="submit" className="round-btn prev-btn">Previews</button> */}
                                <button type="submit" className="round-btn next-btn">Next</button>
                            </div>
                        </div>
                    </div>                
                    {/* <OrderDetails Right-side/> */}
                    <OrderDetails/>
                </div>
            </form>
        );
    }
}

// export default FormStep1;
export default reduxForm({
    form: 'wizardCheckout', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(FormStep1);
