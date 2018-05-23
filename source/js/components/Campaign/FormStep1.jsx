import React, { Component } from 'react';
import FormCampaignRight from './FormCampaignRight';
import { CommonCompo } from './CommonCompo';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import validator from 'validator';
import moment from 'moment';
import { renderFieldCampaign, renderFieldDatePicker } from '../../components/Forms/RenderFormComponent/EveryComponent';
import { reset, initialize } from 'redux-form';

const validate = values => {

    const errors = {};

    if (!values.campaignName || (values.campaignName !== undefined && values.campaignName.trim() == "")) {
        errors.campaignName = 'This field is required';
    } else if(values.campaignName.length > 25){
        errors.campaignName = 'Max. character length is 25';
    }

    if (!values.campaignStartDate) {
        errors.campaignStartDate = 'This field is required';
    }

    if (!values.campaignEndDate) {
        errors.campaignEndDate = 'This field is required';
    }

    if (values.campaignStartDate && values.campaignEndDate) {
        let a = moment(values.campaignStartDate);
        let b = moment(values.campaignEndDate);
        let diffDate = b.diff(a);
        if (diffDate < 0) {
            errors.campaignEndDate = 'End date should be after start date';
        }
    }
    return errors;
};


class FormStep1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">

                    <div className="create-campaign-l d-flex">
                        <CommonCompo currentPage="1" changePage={(i) => this.props.changePage(i)} />
                        <div className="step-content d-flex">
                            <h2>Step 1</h2>
                            <Field
                                name="campaignName"
                                type="text"
                                label="Campaign Name"
                                component={renderFieldCampaign}
                                placeholder="Campaign Name"
                                isRequired="true"
                            />
                            
                            <Field
                                name="campaignStartDate"
                                label="Date of Campaign Start"
                                component={renderFieldDatePicker}
                                className="campiagn_date"
                                defaultValue={moment()}
                                showDisabledMonthNavigation
                                minDateVal={moment()}
                                placeholder="Campaign start date"
                                isRequired="true"
                            />

                            <Field
                                name="campaignEndDate"
                                label="Date of Campaign End"
                                component={renderFieldDatePicker}
                                className="campiagn_date"
                                defaultValue={null}
                                showDisabledMonthNavigation
                                placeholder="Campaign end date"
                                isRequired="true"
                            />

                            <div className="submit-btn">
                                <button type="submit" className="round-btn next-btn">Continue</button>
                            </div>
                        </div>
                    </div>
                    <FormCampaignRight />
                </div>
            </form>
        );
    }
}

// export default FormStep1;
export default reduxForm({
    form: 'wizardCampaign', // <------ same form name
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(FormStep1);
