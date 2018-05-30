import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import Dropzone from 'react-dropzone';
import { SubmissionError } from 'redux-form'
import _ from 'lodash';
// import dropImg from '../../../../assets/img/site/canvas.png';

const validate = values => {

    const errors = {};

    if (!values.images || values.images.length === 0) {
        errors.images = 'This field is required';
    } else {
        if ((values.images).length > 0) {
            console.log('file',values.images);
            let file_type = values.images[0].type;
            let extensions = ["image/jpeg", "image/png", "image/jpg"];
            if (extensions.indexOf(file_type) < 0) {
                errors.images = 'File type not supported';
            }
        }
    }
    if (!values.group_name || !validator.matches(values.group_name, /^[A-Za-z_]/i)) {
        errors.group_name = 'This field is required'
    }

    return errors
}

const textField = (
    { input, type, label, placeholder, meta: { touched, error } }
) => (
        <div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
            <label>{label}</label>
            <input {...input} placeholder={placeholder} type={type} className={cx({ 'txt_error_div': (touched && error) })} />
            {touched && ((error && <span className="error-div">{error}</span>))}
        </div>
    )

let CreateGroupForm = props => {
    const { handleSubmit, error, message, submitDisabled } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="images"
                labelClass="control-label"
                wrapperClass="form-group"
                placeholder="Images"
                component={FileField_Dropzone}
                multiple={false}
            />
            <Field
                name="group_name"
                type="text"
                label="Group Name"
                component={textField}
                placeholder="Type group name here"
            />
            <div className="submit-btn">
                {/* <button type="submit" className="round-btn" disabled={submitDisabled}>Authorise</button> */}
                <button type="submit" className="round-btn">Authorise</button>
            </div>
        </form>
    )
}

const FileField_Dropzone = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, errorClass, accept, multiple, isRequired } = props;
    let filesArr = _.values(input.value);
    let images = [];
    let isFileDropped = false;
    
    _.forEach(filesArr, (file, key) => {
        images.push(
            <div className="images-preview-wrapper" key={key}>
                <div className="image-preview">
                    <img src={file.preview} width={'560px'} height={'280px'} />
                </div>
            </div>
        )
    })

    return (
        <div className={wrapperClass}>
            <label htmlFor={input.name} className={labelClass}>
                {label} {meta.pristine && isRequired === "true" && <span className="error-div">*</span>}
            </label>
            
            <Dropzone
                {...input}
                accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                onDrop={(filesToUpload, e) => {
                    console.log('drop before => ', isFileDropped);
                    isFileDropped = true;
                    console.log('drop after => ', isFileDropped);
                    input.onChange(filesToUpload)
                }}
                multiple={multiple ? multiple : false}
                className={`${className}`}
                onFileDialogCancel={() => {
                    console.log('cancel => ', isFileDropped);
                    (!isFileDropped) ? input.onChange('') : console.log('dropped')
                }}
            >
                <div className="dropzone-image-preview-wrapper">
                    {(input.value && meta.error === undefined) && images}
                    {((!input.value || meta.error || images.length === 0)) && <div className={`custom_dropzone_div ${(meta.touched && meta.error) && 'drop_error_div'}`} style={{ 'width': '100% !important' }}>
                        {/* <img src={dropImg} /><br /><br /> */}
                        <p>Select or Drag Your image here</p>
                        <span className={`btn btn_drop_browse`}>Or Browse</span>
                    </div>
                    }
                </div>
            </Dropzone>
            {((!meta.valid || meta.visited) && meta.error && meta.submitFailed ) && <span className="error-div">{meta.error}</span>}
            {/* {((meta.touched && meta.error)) && <span className="error-div">{meta.error}</span>} */}
        </div>
    );
}


CreateGroupForm = reduxForm({
    form: 'createGroup',
    validate,
})(CreateGroupForm)

export default CreateGroupForm