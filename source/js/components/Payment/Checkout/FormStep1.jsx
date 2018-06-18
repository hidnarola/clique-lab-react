import React,{Component} from 'react';
//import FormCampaignRight from './FormCampaignRight';
import OrderDetails from './OrderDetails';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import cx from 'classnames';
import {SelectField_ReactSelect} from '../../Forms/RenderFormComponent/EveryComponent';

const validate = values => {
    
    const errors = {};

    if (!values.fullname || values.fullname.trim() === '') {
        errors.fullname = 'This field is required';
    }
    if (!values.email) {
        errors.email = 'This field is required'
    }else  if(validator.isEmail(values.email) === false){
        errors.email = 'Enter valid email address'
    }
    if (!values.companyname || values.companyname.trim() === '') {
        errors.companyname = 'This field is required';
    }
    if (!values.abn || values.abn.trim() === '') {
        errors.abn = 'This field is required';
    }
    else if (!validator.isNumeric(values.abn)) {
        errors.abn = 'Must be a whole positive value';
    }
    else if (values.abn.length !== 11) {
        errors.abn = 'Required exact 11 digit';
    }
    if (!values.country) {
        errors.country = 'This field is required';
    }
    
    return errors;
};
 
const textField = (
    { input, type, label, placeholder,isRequired, meta: { touched, error,pristine } }
) => (
        <div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
            {/* <label>{label}</label> */}
            <label>{label} {pristine && isRequired === "true" && <span className="error-div">*</span>}</label>
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
                            <div className="process-point active"><a href="javascript:void(0)"></a><strong></strong></div>
                            <div className="process-point"><a href="javascript:void(0)"></a><strong></strong></div>
                            <div className="process-point"><a href="javascript:void(0)"></a></div>
                        </div>
                        <div className="step-content d-flex">
                            <h2>Step 1</h2>                            
                            <Field
                                name="fullname"
                                type="text"
                                label="Full Name"
                                component={textField}
                                placeholder="Full Name"
                                isRequired="true"
                            />
                            <Field
                                name="email"
                                type="text"
                                label="Email"
                                component={textField}
                                placeholder="Email"
                                isRequired="true"
                            />
                            <Field
                                name="companyname"
                                type="text"
                                label="Company Name"
                                component={textField}
                                placeholder="Company Name"
                                isRequired="true"
                            />
                            <Field
                                name="abn"
                                type="text"
                                label="ABN"
                                component={textField}
                                placeholder="ABN"
                                isRequired="true"
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
                                isRequired="true"
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
