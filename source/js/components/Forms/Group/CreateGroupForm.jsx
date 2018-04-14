import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
// import uploadImg from 'img/site/upload-img.jpg';
import filrUp from 'img/site/filrUp.jpg';

const validate = values => {
    
    const errors = {};

    if (!values.images) {
        errors.images = 'This Field is Required'
    }
    if (!values.group_name) {
        errors.group_name = 'This Field is Required'
    }

    return errors
}

const textField = (
    {input,type,label,placeholder,meta: { touched, error}}
) => (
		<div className={cx('input-wrap',{'custom-error':(touched && error ) ? true:false })}>
			<label>{label}</label>
			<input {...input} placeholder={placeholder} type={type} />    
			{touched && ((error && <span>{error}</span>))}    
		</div>
	)

let CreateGroupForm = props => {
    const { handleSubmit,error,message } = props
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
                <button type="submit" className="round-btn">Authorise</button>
            </div>
        </form>        
    )
}

const FileField_Dropzone = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, errorClass, accept, multiple } = props;
    let filesArr = _.values(input.value);
    let images = [];
    let extensions = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    let error_msg = '';

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
            <label htmlFor={input.name} className={labelClass}>{label}</label>
            <Dropzone
                {...input}
                accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
                multiple={multiple ? multiple : false}
                className={ `${className}` }
            >
                <div className="dropzone-image-preview-wrapper">
                    {input.value && images}
                    {/* {!input.value && <img src={uploadImg} />} */}
                </div>
            </Dropzone>
            {meta.touched &&
                ((meta.error && <span className={errorClass}>{meta.error}</span>) || (meta.warning && <span className={warningClass}>{meta.warning}</span>))
            }
        </div>
    );
}

CreateGroupForm = reduxForm({
    form: 'createGroup',
    validate,
})(CreateGroupForm)

export default CreateGroupForm