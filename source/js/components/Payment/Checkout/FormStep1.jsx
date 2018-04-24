import React,{Component} from 'react';
//import FormCampaignRight from './FormCampaignRight';
import OrderDetails from './OrderDetails';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import cx from 'classnames';
import {SelectField_ReactSelect} from '../../Forms/RenderFormComponent/EveryComponent';

const validate = values => {
    
    const errors = {};

    if (!values.fullname) {
        errors.fullname = 'This Field is Required';
    }
    if (!values.email) {
        errors.email = 'This Field is Required'
    }else  if(validator.isEmail(values.email) === false){
        errors.email = 'Enter valid email address'
    }
    if (!values.companyname) {
        errors.companyname = 'This Field is Required';
    }
    if (!values.abn) {
        errors.abn = 'This Field is Required';
    }
    if (!values.country) {
        errors.country = 'This Field is Required';
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
                                className="campaign_form_step2_dropdown"
                                wrapperClassName="select-wrap"
                                name="country"       
                                label="Country"                             
                                labelClassName="control-label"
                                placeholder="Country"
                                component={SelectField_ReactSelect}
                                options={[                                    
                                    { value: '' , label :"Select Country"},
                                    { value: 'india' , label :"india"},
                                    { value: 'australia' , label :"australia"},
                                    { value: 'america' , label :"america"},
                                    { value: 'caneda' , label :"caneda"},
                                ]}
                            />
                        
                            <div className="submit-btn d-flex">
                                {/* <button type="submit" className="round-btn prev-btn">Previews</button> */}
                                <button type="submit" className="round-btn next-btn">Next</button>
                            </div>
                        </div>
                    </div>                
                    {/* <FormCampaignRight/> */}
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
