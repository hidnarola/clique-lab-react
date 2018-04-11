import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import {FileField_Dropzone,SelectField_ReactSelect} from '../../Forms/RenderFormComponent/EveryComponent';

const validate = values => {
    const errors = {}

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

CreateGroupForm = reduxForm({
    form: 'createGroup',
    validate,
})(CreateGroupForm)

export default CreateGroupForm