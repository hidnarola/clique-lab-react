import React, { Component } from 'react';
import FormCampaignRight from './FormCampaignRight';
import { CommonCompo } from './CommonCompo';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import validator from 'validator';
import moment from 'moment';
import cx from 'classnames';
import { renderFieldCampaign, renderFieldDatePicker, SelectField_ReactSelect, SelectField_ReactSelectMulti, renderPlaceAutoComplete }
    from '../../components/Forms/RenderFormComponent/EveryComponent';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const validate = values => {

    const errors = {};
    if (!values.media_format || (values.media_format!==undefined && values.media_format.value=="") || Object.keys(values.media_format).length===0) {
        errors.media_format = 'This field is required';
    }

    if (!values.location) {
        errors.location = 'This field is required';
    }

    if (!values.how_much) {
        errors.how_much = 'This field is required';
    } else if (!validator.isFloat(values.how_much)) {
        errors.how_much = 'Must be a number';
    } else if (!validator.matches(values.how_much, /^[0-9]/)) {
        errors.how_much = 'Must be a positive value';
    } else if (values.how_much.length > 7) {
        errors.how_much = 'Max. character length is 7';
    }

    if (!values.currency || (values.currency!==undefined && values.currency.value=="") || Object.keys(values.currency).length===0) {
        errors.currency = 'This field is required';
    }
    return errors;
};


let SelectField_ReactSelect5 = (props) => {
    const { label, input, meta, selectedValue, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options, isRequired } = props;
    let val = 'public';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else {
        val = val
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <Select
                {...input}
                value={val}
                options={options}
                className={`${className}${meta.touched && ((meta.error && ' txt_error_div') || (meta.warning && ' txt_error_div'))}`}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur({ ...input.value })}
                multi={false}
                clearable={false}
                selectedValue={selectedValue}
            />
            {meta.touched && ((meta.error && <span className={`error-div`}>{meta.error}</span>) || (meta.warning && <span className={`error-div`}>{meta.warning}</span>))}
        </div>
    );
}

const SelectFieldCurrencyDrop = (props) => {
    const { label, input, meta, selectedValue, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options, isRequired } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = val;
    }
    return (
        <div className="select-wrap">
            <Select
                {...input}
                value={val}
                options={options}
                className={`${className}${meta.touched && ((meta.error && ' txt_error_div') || (meta.warning && ' txt_error_div'))}`}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur({ ...input.value })}
                multi={false}
                clearable={false}
            />
            {meta.touched && ((meta.error && <div className="error-div">{meta.error}</div>) || (meta.warning && <span>{meta.warning}</span>))}
        </div>
    );
}

const renderFieldCurrency = ({ input, type, placeholder, label, isRequired, meta: { touched, error, warning, pristine } }) => (
    <div className={cx('input-wrap how-much', { 'custom-error': (touched && error) ? true : false })} >
        <label>{label}</label>
        <div class="input-2 d-flex select-wrap">
            <input {...input} placeholder={placeholder} type={type} className={`${touched && ((error && `txt_error_div`) || (warning && `txt_error_div`))}`} autocomplete="off" />
            <Field
                name="currency"
                placeholder="Select currency"
                component={SelectFieldCurrencyDrop}
                options={[
                    { value: '', label: 'Select currency' },
                    { value: 'dollar', label: "AUD" }
                ]}
                isRequired="true"
            />
        </div>
        {touched && ((error && <div className="error-div">{error}</div>) || (warning && <span>{warning}</span>))}
    </div>
)

class GoogleAC extends Component {
    render() {
        const { input, label, name, placeholder, isRequired, meta } = this.props;
        return (
            <div className="input-wrap">
                <label>{label}</label>
                <PlacesAutocomplete
                    value={input.value}
                    name={name}
                    onChange={(value) => input.onChange(value)}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                            <input {...getInputProps()} name={name} placeholder='Write location' className={cx('location-search-input ', { 'txt_error_div': (meta.touched && meta.error) ? true : false })} />
                            {meta.touched && ((meta.error && <div className="error-div">{meta.error}</div>))}
                            <div className="autocomplete-dropdown-container">
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div {...getSuggestionItemProps(suggestion, { className, style })} className="places_autocomplete_list" >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
        )
    }
}


class FormStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' }
    }

    handleChange = (address) => {
        this.setState({ address })
    }

    handleSelect = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error))
    }

    render() {
        const { handleSubmit, previousPage,prevImg } = this.props;
        let { address } = this.state;
        return (
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <CommonCompo currentPage="3" changePage={(i) => this.props.changePage(i)} />
                        <div className="step-content d-flex">
                            <h2>Step 3</h2>
                            <Field
                                wrapperClass="select-wrap"
                                name="public_or_private"
                                label="Public or Invite only"
                                labelClass="control-label"
                                placeholder="Public or Invite only"
                                component={SelectField_ReactSelect5}
                                options={[
                                    { value: 'public', label: "Public" },
                                    { value: 'invite', label: "Private" }
                                ]}
                                selectedValue={{ value: 'public', label: "Public" }}
                                isRequired="true"
                            />

                            <Field
                                wrapperClass="select-wrap"
                                name="media_format"
                                label="Media Format"
                                labelClass="control-label"
                                placeholder="Media Format"
                                component={SelectField_ReactSelect}
                                options={[
                                    { value: '', label: 'Select Media Format' },
                                    { value: 'photograph', label: "Photograph" },
                                    { value: 'video', label: "Video" }
                                ]}
                                isRequired="true"
                            />

                            <Field
                                name="location"
                                label="Location"
                                placeholder="Write location"
                                isRequired="true"
                                component={GoogleAC}
                            />

                            <Field
                                name="how_much"
                                type="text"
                                label="How Much to Pay (Currency) "
                                component={renderFieldCurrency}
                                placeholder="e.g. 20"
                                isRequired="true"
                            />

                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage} className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn">Next</button>
                            </div>
                        </div>
                    </div>
                    {/* <FormCampaignRight /> */}
                    <FormCampaignRight existImages = {prevImg} />
                    
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
