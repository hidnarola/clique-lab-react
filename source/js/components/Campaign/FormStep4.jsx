import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormCampaignRight from './FormCampaignRight';
import { CommonCompo } from './CommonCompo';
import { FileField_Dropzone, FileField_Dropzone_New } from '../../components/Forms/RenderFormComponent/EveryComponent';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '../../../css/campaign/react-drop-n-crop.css';

const validate = values => {
    const errors = {};
    if (!values.images || values.images.length === 0) {
        errors.images = 'This field is required';
    } else {
        if ((values.images).length > 0) {
            let file_type = values.images[0].type;
            let extensions = ["image/jpeg", "image/png", "image/jpg"];
            if (extensions.indexOf(file_type) < 0) {
                errors.images = 'File type not supported';
            }
        }
    }
    return errors;
};

class FormStep4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            filename: null,
            filetype: null,
            src: null,
            error: null,
        };
    }

    handleChange = value =>{
        this.setState(value);
    };

    render() {
        const { handleSubmit, previousPage } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <CommonCompo currentPage="4" changePage={(i) => this.props.changePage(i)} />
                        <div className="step-content d-flex">
                            <h2>Step 4</h2>
                            <div className="input-wrap select-wrap">
                                <Field
                                    name="images"
                                    label="Upload a cover image"
                                    labelClass="control-label"
                                    wrapperClass="form-group"
                                    placeholder="Images"
                                    component={FileField_Dropzone}
                                    multiple={false}
                                />
                                {/* <DropNCrop 
                                    onChange={this.handleChange} 
                                    value={this.state} 
                                /> */}
                            </div>
                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage} className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn">Next</button>
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
    form: 'wizardCampaign', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(FormStep4);
