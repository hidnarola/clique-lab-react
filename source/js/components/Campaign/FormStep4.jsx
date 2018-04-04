import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import FormCampaignRight from './FormCampaignRight';

class FormStep4 extends Component{

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
                            </div>
                        </div>
                        <div className="step-content d-flex">
                            <h2>Step 4</h2>
                            <div className="input-wrap select-wrap">
                                <label>Public or Invite only</label>
                                <img src="images/upload-img.jpg" alt="" />
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
})(FormStep4);
