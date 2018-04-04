import React,{Component} from 'react';
import FormCampaignRight from './FormCampaignRight';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class FormStep1 extends Component{

    constructor(props){
        super(props);
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
    }
    

    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">                
                    <div className="create-campaign-l d-flex">
                        <div className="step-process d-flex">
                            <div className="process-point active ">
                                <a className="cursor_pointer"></a>
                                <strong></strong>
                            </div>
                            <div className="process-point">
                                <a className="cursor_pointer"></a>
                                <strong></strong>
                            </div>
                            <div className="process-point">
                                <a className="cursor_pointer"></a>
                                <strong></strong>
                            </div>
                            <div className="process-point">
                                <a className="cursor_pointer"></a>
                                <strong></strong>
                            </div>
                            <div className="process-point">
                                <a className="cursor_pointer"></a>
                            </div>
                        </div>
                        <div className="step-content d-flex">
                            <h2>Step 1</h2>
                            <div className="input-wrap">
                                <label>Campaign Name</label>
                                <input type="text" name="" placeholder="Campaign Name" />
                            </div>
                            <div className="input-wrap">
                                <label>Date of Campaign Start</label>
                                <div className="input-wrap-2">
                                    <input type="text" name="" placeholder="Campaign Name" />
                                    <i className="">
                                        <img src="images/calendar-icon.jpg" alt="" />
                                    </i>
                                </div>
                            </div>
                            <div className="input-wrap">
                                <label>Date of Campaign End</label>
                                <div className="input-wrap-2">
                                    {/* <input type="text" name="" placeholder="Select Date" /> */}
                                    
                                    <DatePicker
                                        placeholderText="Select Date"
                                        withPortal
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                    />

                                    <i className="">
                                        <img src="images/calendar-icon.jpg" alt="" />
                                    </i>
                                </div>
                            </div>
                            <div className="submit-btn">
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
})(FormStep1);
