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

    if (!values.public_or_private || values.public_or_private.value==="") {
        errors.public_or_private = 'This Field is Required';
    }

    if(!values.media_format || values.media_format.value===""){
        errors.media_format = 'This Field is Required';
    }

    if(!values.location || (values.location!==undefined && values.location.trim()=="")){
        errors.location = 'This Field is Required';
    }

    if(!values.how_much || (values.how_much!==undefined && values.how_much.trim()=="")){
        errors.how_much = 'This Field is Required';
    }else if(!validator.isFloat(values.how_much)){
        errors.how_much = 'Must be a number';
    }

    if(!values.currency || values.currency.value===""){
        errors.currency = 'This Field is Required';
    }

    return errors;
};

class FormStep3 extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { handleSubmit,previousPage } = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <CommonCompo currentPage="3" changePage={(i) => this.props.changePage(i)} />
                        <div className="step-content d-flex">
                            <h2>Step 3</h2>
                            <Field        
                                wrapperClass="select-wrap"
                                name="public_or_private"       
                                label="Public or Invite only"
                                labelClass="control-label"
                                placeholder="Public or Invite only"
                                component={SelectField_ReactSelect}
                                options={[
                                    { value: '', label: 'Select Industry' },
                                    { value: 'public' , label :"public"},
                                    { value: 'invite' , label :"private"}                                    
                                ]}
                                isRequired="true"                                             
                            />

                            <Field        
                                wrapperClass="select-wrap"
                                name="media_format"       
                                label="Media Format"
                                labelClass="control-label"
                                placeholder="Media Format"
                                component={SelectField_ReactSelect}
                                options={[
                                    { value: '', label: 'Select Media Format' },
                                    { value: 'photograph' , label :"photograph"},
                                    { value: 'video' , label :"video"}                                    
                                ]} 
                                isRequired="true"                                            
                            />
                            
                            <Field
                                name="location"
                                type="text"
                                label="Location"
                                component={renderFieldCampaign}
                                placeholder="Location"
                                isRequired="true"
                            />

                            <Field
                                name="how_much"
                                type="text"
                                label="How Much ?"
                                component={renderFieldCampaign}
                                placeholder="How Much ?"
                                isRequired="true"
                            />

                            <Field        
                                wrapperClass="select-wrap"
                                name="currency"       
                                label="How much to pay ( Currency )"
                                labelClass="control-label"
                                placeholder="How much to pay ( Currency )"
                                component={SelectField_ReactSelect}
                                options={[
                                    { value: '', label: 'Select Media Format' },
                                    { value: 'dollar' , label :"Dollar"}                                                                        
                                ]}
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
})(FormStep3);
