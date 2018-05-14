import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import FormCampaignRight from './FormCampaignRight';
import {CommonCompo} from './CommonCompo';
import {FileField_Dropzone} from '../../components/Forms/RenderFormComponent/EveryComponent';

const validate = values => {
    const errors = {};
    if (!values.imagesNew || values.imagesNew.length===0) {
        errors.imagesNew = 'This Field is Required';
    }else {
        if((values.imagesNew).length > 0){
            _.map(values.imagesNew), function(file){
                let file_type = file.type;
                let extensions = ["image/jpeg", "image/png", "image/jpg"];
                if (extensions.indexOf(file_type) < 0) {
                    errors.imagesNew = 'File type not supported';
                }
            }
            
        }
    }
    return errors;
};

class FormStep5 extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { handleSubmit,previousPage,submitDisabled } = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <CommonCompo currentPage="5" changePage={(i) => this.props.changePage(i)}/>
                        <div className="step-content d-flex">
                            <h2>Step 5</h2>
                            <div className="input-wrap select-wrap">
                                <Field
                                    name="imagesNew"
                                    label="Upload the mood board image"
                                    labelClass="control-label"
                                    wrapperClass="form-group"
                                    placeholder="Images"
                                    component={FileField_Dropzone}
                                    multiple={true}
                                />
                            </div>

                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage} className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn" disabled={submitDisabled}>Done</button>
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
})(FormStep5);
