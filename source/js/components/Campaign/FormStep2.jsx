import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import FormCampaignRight from './FormCampaignRight';

class FormStep2 extends Component{
    render(){
        const { handleSubmit,previousPage } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <div className="step-process d-flex">
                            <div className="process-point active completed ">
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
                                <strong></strong>
                            </div>
                            <div className="process-point">
                                <a href=""></a>
                            </div>
                        </div>
                        <div className="step-content d-flex">
                            <h2>Step 2</h2>
                            <div className="input-wrap">
                                <label>Campaign Name</label>
                                <input type="text" name="" placeholder="Campaign Name" />
                            </div>
                            <div className="input-wrap">
                                <label>Discount code</label>
                                <input type="text" name="" placeholder="Discount code" />
                            </div>
                            <div className="input-wrap">
                                <label>Short Description</label>
                                <input type="text" name="" placeholder="Description" />
                            </div>
                            <div className="input-wrap select-wrap">
                                <label>Social media platforms</label>
                                <select>
                                    <option>Select Social Media </option>
                                    <option>Select Social Media 01</option>
                                    <option>Select Social Media 02</option>
                                    <option>Select Social Media 03</option>
                                </select>
                            </div>
                            <div className="input-wrap">
                                <label># tags and @ Tags </label>
                                <input type="text" name="" placeholder="Tag" />
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
})(FormStep2);
