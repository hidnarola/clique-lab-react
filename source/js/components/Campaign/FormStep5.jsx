import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import FormCampaignRight from './FormCampaignRight';
import {CommonCompo} from './CommonCompo';
import {FileField_Dropzone} 
        from '../../components/Forms/RenderFormComponent/EveryComponent';

class FormStep5 extends Component{

    constructor(props){
        super(props);
        
    }

    render(){
        const { handleSubmit,previousPage } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <CommonCompo currentPage="5" changePage={(i) => this.props.changePage(i)}/>
                        <div className="step-content d-flex">
                            <h2>Step 5</h2>
                            <div className="input-wrap select-wrap">
                                <label>Public or Invite only</label>
                                <Field
                                    name="imagesNew"
                                    label="Images"
                                    labelClass="control-label"
                                    wrapperClass="form-group"
                                    placeholder="Images"
                                    component={FileField_Dropzone}
                                    multiple={true}
                                />
                            </div>

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
    // validate,
})(FormStep5);
