import React,{Component} from 'react';
import FormCampaignRight from './FormCampaignRight';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import validator from 'validator';
import moment from 'moment';
import {renderFieldCampaign,renderFieldDatePicker,SelectField_ReactSelect,SelectField_ReactSelectMulti} 
        from '../../components/Forms/RenderFormComponent/EveryComponent';

const validate = values => {

    const errors = {};

    if (!values.public_or_private) {
        errors.public_or_private = 'Required';
    }

    if(!values.media_format){
        errors.media_format = 'Required';
    }

    if(!values.location){
        errors.location = 'Required';
    }

    if(!values.how_much){
        errors.how_much = 'Required';
    }else if(!validator.isFloat(values.how_much)){
        errors.how_much = 'Must be a number';
    }

    if(!values.currency){
        errors.currency = 'Required';
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
                        <div className="step-process d-flex">
                            <div className="process-point active completed">
                                <a href=""></a>
                                <strong></strong>
                            </div>
                            <div className="process-point active completed">
                                <a href=""></a>
                                <strong></strong>
                            </div>
                            <div className="process-point active">
                                <a href=""></a>
                                <strong></strong>
                            </div>
                            <div className="process-point">
                                <a href=""></a>
                                <strong></strong>
                            </div>
                            <div className="process-point">
                                <a href=""></a>
                            </div>
                        </div>
                        <div className="step-content d-flex">
                            <h2>Step 3</h2>

                            <Field        
                                wrapperClass="input-wrap select-wrap"
                                name="public_or_private"       
                                label="Public or Invite only"
                                labelClass="control-label"
                                placeholder="Public or Invite only"
                                component={SelectField_ReactSelect}
                                options={[
                                    { value: '', label: 'Select Industry' },
                                    { value: 'public' , label :"public"},
                                    { value: 'private' , label :"private"}                                    
                                ]}                                            
                            />

                            <Field        
                                wrapperClass="input-wrap select-wrap"
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
                            />
                            
                            <Field
                                name="location"
                                type="text"
                                label="Location"
                                component={renderFieldCampaign}
                                placeholder="Location"
                            />

                            <Field
                                name="how_much"
                                type="text"
                                label="How Much ?"
                                component={renderFieldCampaign}
                                placeholder="How Much ?"
                            />

                            <Field        
                                wrapperClass="input-wrap select-wrap"
                                name="currency"       
                                label="How much to pay ( Currency )"
                                labelClass="control-label"
                                placeholder="How much to pay ( Currency )"
                                component={SelectField_ReactSelect}
                                options={[
                                    { value: '', label: 'Select Media Format' },
                                    { value: 'dollar' , label :"Dollar"}                                                                        
                                ]}                                            
                            />

                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage} 
                                        className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn">Continue</button>
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
