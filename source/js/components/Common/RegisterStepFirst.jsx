import React,{Component} from 'react';
import Select from 'react-select';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import validator from 'validator';
import _ from 'lodash';
import cx from 'classnames';

const validate = values => {
    const errors = {};

    
    if (!values.images) {
        errors.images = 'Required';
    }

    if (!values.industryName) {
        // console.log('industryName==>',values.industryName.value);    
        errors.industryName = 'Required';
    }else if(validator.isEmpty(values.industryName.value)){
        errors.industryName = 'Required';        
    }

    if (!values.description) {
        errors.description = 'Required';
    }    

    // if(validator.isEmpty(values.firstName)){
    //     errors.firstName = 'Required';
    // }

    // if (!values.lastName) {
    //     errors.lastName = 'Required';
    // }
    // if (!values.email) {
    //     errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }
    // if (!values.sex) {
    //     errors.sex = 'Required';
    // }
    // if (!values.favoriteColor) {
    //     errors.favoriteColor = 'Required';
    // }
    return errors;
};

const FileField_Dropzone = (props) => {
    
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

const SelectField_ReactSelect = (props) => {
    const { label, input, meta, wrapperClass, className, labelClass, placeholder, errorClass, initialValue, options } = props;
    let val = '';
    if (input.value && Object.keys(input.value).length > 0) {
        val = input.value;
    } else if (initialValue) {
        val = initialValue;
    }
    return (
        <div className={wrapperClass}>
            
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

const renderField = ({
    input,
    type,
    placeholder,
    meta: { touched, error, warning }
}) => (
   

    <div  className={cx('industry-description',{'custom-error':(touched && error ) ? true:false })}>
        <label>Description</label>
        <textarea {...input}></textarea>
        {(touched && error ) ? error:''}
    </div>
)

class RegisterStepFirst extends Component{
    
    constructor(props){
        super(props);
        this.state = {  
            selectedOption: '',
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });        
    }

    render(){
        const { handleSubmit } = this.props;
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        
        return(
            <section className="content">
                <div className="container">
                    <div className="content-box industry-category">
                        <div className="category-step d-flex">
                            <a href="" className="active"></a>
                            <a href="" className=""></a>
                        </div>
                        <h2>Industry Category</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex">
                                <div className="industry-l">
                                    <div className="profile-logo">
                                        <label>Profile Logo</label>
                                        <div className="industry-l-box">
                                            <Field
                                                name="images"
                                                label="Images"
                                                labelClass="control-label"
                                                wrapperClass="form-group"
                                                placeholder="Images"
                                                component={FileField_Dropzone}
                                                multiple={false}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="industry-r">
                                    <div className="category-select">
                                        <label>Industry Category</label>
                                        <Field
                                            name="industryName"
                                            label="Main Muscle Group"
                                            labelClass="control-label"                                            
                                            placeholder="Main Muscle Group"
                                            component={SelectField_ReactSelect}
                                            options={[
                                                { value: '', label: 'Select Industry' },
                                                { value: 'one', label: 'One' },
                                                { value: 'two', label: 'Two' },
                                            ]}                                            
                                        />

                                    </div>
                                    <Field
                                        name="description"                                        
                                        component={renderField}
                                        placeholder="Please Add ...."
                                    />
                                </div>
                            </div>

                            <div className="industry-btn d-flex">
                                {/* <button type="submit">Previews</button> */}
                                <button type="submit">Next</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}


// export default RegisterStepFirst;

export default reduxForm({
    form: 'wizard', //                 <------ same form name
    multipartForm: true,
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount    
    validate
})(RegisterStepFirst);
