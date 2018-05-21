import React,{Component} from 'react';
import FormCampaignRight from './FormCampaignRight';
import {CommonCompo} from './CommonCompo';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import validator from 'validator';
import moment from 'moment';
import {renderFieldCampaign,renderFieldDatePicker,SelectField_ReactSelect,SelectField_ReactSelectMulti} 
        from '../../components/Forms/RenderFormComponent/EveryComponent';

const validate = values => {
    
    const errors = {};
    console.log(values);
    if (!values.call_to_action  || (values.call_to_action!==undefined && values.call_to_action.trim()=="")) {
        errors.call_to_action = 'This field is required';
    }

    if (!values.discount_code  || (values.discount_code!==undefined && values.discount_code.trim()=="")) {
        errors.discount_code = 'This field is required';
    }

    if (!values.industryName || values.industryName.value==="") {
        errors.industryName = 'This field is required';
    }    

    if (!values.short_desc  || (values.short_desc!==undefined && values.short_desc.trim()=="")) {
        errors.short_desc = 'This field is required';
    }
    
    if(!values.tagHash){
        errors.tagHash = 'This field is required';
    }

    if(!values.tagAt){
        errors.tagAt = 'This field is required';
    }

    return errors;
  
};


class FormStep2 extends Component{
    
    constructor(props){
        super(props);
    }

    render(){
        const { handleSubmit,previousPage } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <CommonCompo currentPage="2" changePage={(i) => this.props.changePage(i)}/>
                        <div className="step-content d-flex">
                            <h2>Step 2</h2>

                            <Field
                                name="call_to_action"
                                type="text"
                                label="Call to action"
                                component={renderFieldCampaign}
                                placeholder="Call to action"
                                isRequired="true"
                            />

                            <Field
                                name="discount_code"
                                type="text"
                                label="Discount Code"
                                component={renderFieldCampaign}
                                placeholder="Discount Code"
                                isRequired="true"
                            />

                            <Field
                                name="short_desc"
                                type="text"
                                label="Short Description"
                                component={renderFieldCampaign}
                                placeholder="Short Description"
                                isRequired="true"
                            />
                            
                            <Field
                                className="campaign_form_step2_dropdown "
                                wrapperClass="select-wrap"
                                name="industryName"       
                                label="Social media platforms"                             
                                labelClass="control-label"
                                placeholder="Main Muscle Group"
                                component={SelectField_ReactSelect}
                                options={[                                    
                                    { value: '' , label :"Select Social Media"},
                                    { value: 'facebook' , label :"Facebook"},
                                    { value: 'instagram' , label :"Instagram"},
                                    { value: 'twitter' , label :"Twitter"},
                                    { value: 'pinterest' , label :"Pinterest"},
                                    { value: 'linkedin' , label :"Linkedin"},
                                ]}
                                isRequired="true"
                            />

                            <Field
                                name="tagHash"
                                label="# tags"
                                labelClass="control-label"
                                wrapperClass="select-wrap"
                                placeholder="# tags"
                                component={SelectField_ReactSelectMulti} 
                                className="campaign_form_step2_dropdown txt_tag"
                                isRequired="true"                               
                            />

                            <Field
                                name="tagAt"
                                label="@ tags"
                                labelClass="control-label"
                                wrapperClass="select-wrap"
                                placeholder="@ tags"
                                component={SelectField_ReactSelectMulti}  
                                className="campaign_form_step2_dropdown txt_tag" 
                                isRequired="true"                             
                            />

                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage} 
                                        className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn">Next</button>
                            </div>
                        </div>
                    </div>

                    <FormCampaignRight/>
                </div>
            </form>
        );
    }
}

// export default FormStep1;
export default reduxForm({
    form: 'wizardCampaign', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(FormStep2);
