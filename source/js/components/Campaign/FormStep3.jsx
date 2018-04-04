import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import FormCampaignRight from './FormCampaignRight';

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
                            <div className="input-wrap select-wrap">
                                <label>Public or Invite only</label>
                                <select>
                                    <option>Public</option>
                                    <option>Private </option>
                                </select>
                            </div>
                            <div className="input-wrap select-wrap">
                                <label>Media Format</label>
                                <select>
                                    <option>Select media format</option>
                                    <option>Select media format 01</option>
                                    <option>Select media format 02</option>
                                </select>
                            </div>
                            <div className="input-wrap">
                                <label>Location</label>
                                <input type="text" name="" placeholder="Write Location" />
                            </div>
                            <div className="input-wrap">
                                <label>How much to pay ( Currency )</label>
                                <div className="input-2 d-flex select-wrap">
                                    <input type="text" name="" placeholder="e.g 20" />
                                    <select>
                                        <option>Select currency</option>
                                        <option>Select currency 01</option>
                                        <option>Select currency 02</option>
                                    </select>
                                </div>
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
})(FormStep3);
