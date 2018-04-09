import React from 'react';
import cx from "classnames";
import Select from 'react-select';
import Dropzone from 'react-dropzone';
import validator from 'validator';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

export const renderFieldCampaign = ({
        input,
        type,
        placeholder,
        label,
        meta: { touched, error, warning }
    }) => (
        <div className={cx('input-wrap',{'custom-error':(touched && error ) ? true:false })} >
            <label>{label}</label>
            <input {...input} placeholder={placeholder} type={type} />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
)
 
export const renderFieldDatePicker = ({
    input, type, placeholder, defaultValue, label,
    minDateVal,maxDateVal,
    meta: { touched, error, warning }
    }) => {
        return(<div className={cx('input-wrap',{'custom-error':(touched && error ) ? true:false })}>
            <label>{label}</label>
            <div className="input-wrap-2">
                <DatePicker
                    {...input}                
                    selected={input.value ? moment(input.value) : moment()}
                    minDate={minDateVal}
                    dateFormat="YYYY-MM-DD"
                    placeholderText={placeholder}
                />
                {/* <i className="">
                    <img src="images/calendar-icon.jpg" alt="" />
                </i> */}
            </div>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>)
}

export const FileField_Dropzone = (props) => {
    
    const { label, input, meta, wrapperClass, className, labelClass, errorClass, accept, multiple } = props;
    let filesArr = _.values(input.value);
    let images = [];

    _.forEach(filesArr, (file, key) => {
        images.push(
            <div className="images-preview-wrapper" key={key}>
                <div className="image-preview">
                    <img src={file.preview} width={'250px'} height={'250px'} />
                </div>
            </div>
        )
    })

    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <Dropzone
                {...input}
                accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
                multiple={multiple ? multiple : false}
                className={className}
            >
                <div className="dropzone-image-preview-wrapper">
                    {input.value && images}
                </div>
            </Dropzone>
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const SelectField_ReactSelect = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <Select
                {...input}
                value={val}
                options={options}
                className={className}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur({ ...input.value })}
                multi={false}
                clearable={false}
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

export const SelectField_ReactSelectMulti = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, 
            initialValue, options } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <Select.Creatable
                {...input}                
                value={val}                
                className={className}
                placeholder={placeholder}
                onChange={(value) => input.onChange(value)}
                onBlur={() => input.onBlur([...input.value])}
                multi={true}                
            />
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}