import React, { Component } from 'react';
import OrderDetails from './OrderDetails';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import cx from 'classnames';
import { SelectField_ReactSelect } from '../../Forms/RenderFormComponent/EveryComponent';

const validate = values => {

    const errors = {};

    if (!values.address1 || values.address1.trim() === '') {
        errors.address1 = 'This field is required';
    }
    // if (!values.address2) {
    //     errors.address2 = 'This Field is Required';
    // }
    if (!values.city || values.city.trim() === '') {
        errors.city = 'This field is required';
    }
    if (!values.state || values.state.value === '' || Object.keys(values.state).length === 0) {
        errors.state = 'This field is required';
    }
    if (!values.post_code || values.post_code.trim() === '') {
        errors.post_code = 'This field is required';
    }
    else if (!validator.matches(values.post_code, /^[0-9]/)) {
        errors.post_code = 'Must be a positive value';
    }else if (values.post_code.length !== 4 ) {
        errors.post_code = 'Enter valid pin code';
    }
    return errors;
};

const textField = (
    { input, type, label, placeholder, isRequired, meta: { touched, error, pristine } }
) => (
        <div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
            <label>{label}</label>
            <input {...input} placeholder={placeholder} type={type} className={touched && ((error && `txt_error_div`))} />
            {touched && ((error && <span className="error-div">{error}</span>))}
        </div>
    )

class FormStep2 extends Component {
    render() {
        const { handleSubmit, previousPage } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex checkout">
                    <div className="create-campaign-l d-flex">
                        <div className="step-process d-flex">
                            <div className="process-point active completed"><a href="javascript:void(0)" style={{ "cursor": "auto" }}></a><strong></strong></div>
                            <div className="process-point active current"><a href="javascript:void(0)" style={{ "cursor": "auto" }} ></a><strong></strong></div>
                            <div className="process-point"><a href="javascript:void(0)" style={{ "cursor": "auto" }}></a></div>
                        </div>
                        <div className="step-content d-flex">
                            <h2 style={{ "font-weight": "600" }}>Step 2</h2>

                            <Field
                                name="address1"
                                type="text"
                                label="Address line 1"
                                component={textField}
                                placeholder="Address Line 1"
                                isRequired="true"
                            />
                            <Field
                                name="address2"
                                type="text"
                                label="Address line 2"
                                component={textField}
                                placeholder="Address Line 2"
                            />
                            <Field
                                name="city"
                                type="text"
                                label="City"
                                component={textField}
                                placeholder="City"
                                isRequired="true"
                            />

                            <Field
                                className="campaign_form_step2_dropdown "
                                wrapperClass="select-wrap"
                                name="state"
                                label="State"
                                labelClassName="control-label"
                                placeholder="State"
                                component={SelectField_ReactSelect}
                                options={[
                                    { value: '', label: "Select State" },
                                    { value: 'Australian Capital Territory', label: 'Australian Capital Territory' },
                                    { value: 'New South Wales', label: 'New South Wales' },
                                    { value: 'Northern Territory', label: 'Northern Territory' },
                                    { value: 'Queensland', label: 'Queensland' },
                                    { value: 'South Australia', label: 'South Australia' },
                                    { value: 'Tasmania', label: 'Tasmania' },
                                    { value: 'Victoria', label: 'Victoria' },
                                    { value: 'Western Australia', label: 'Western Australia' },

                                    // { value: 'gujarat' , label :"gujarat"},
                                    // { value: 'janero' , label :"janero"},
                                    // { value: 'washington' , label :"washington"},
                                    // { value: 'rukisako' , label :"rukisako"},
                                ]}
                                isRequired="true"
                            />

                            <Field
                                name="post_code"
                                type="text"
                                label="Post Code"
                                component={textField}
                                placeholder="Post Code"
                                isRequired="true"
                            />

                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage}
                                    className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn">Next</button>
                            </div>
                        </div>
                    </div>

                    <OrderDetails />
                </div>
            </form>
        );
    }
}

// export default FormStep1;
export default reduxForm({
    form: 'wizardCheckout', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    // enableReinitialize: true,
    validate,
})(FormStep2);
