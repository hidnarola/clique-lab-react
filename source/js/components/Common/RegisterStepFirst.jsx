import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import cx from 'classnames';
import {FileField_Dropzone,SelectField_ReactSelect,FileField_Dropzone_New} from '../../components/Forms/RenderFormComponent/EveryComponent';
import { connect } from 'react-redux';

const validate = values => {
    
    const errors = {};
    if (!values.images) {
        errors.images = 'This Field is Required'
    }else {
        let file_type = values.images[0].type;
        let extensions = ["image/jpeg", "image/png", "image/jpg"];
        if (extensions.indexOf(file_type) < 0) {
            errors.images = 'File type not supported'
       }
    }

    if (!values.industryName) {
        errors.industryName = 'This field is Required';
    }

    if (!values.description) {
        errors.description = 'This field is Required';
    }

    return errors;
};

const renderField = ({ input, type, placeholder, meta: { touched, error, warning } }) => (    
    <div  className={cx('industry-description input-wrap',{'custom-error':(touched && error ) ? true:false })}>
        <label>Description</label>
        <textarea {...input} placeholder={placeholder} className={touched && ((error && `txt_error_div`))}></textarea>
        {touched && ((error && <span className="error-div">{error}</span>))}
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

        const newArr = [];        
        if(this.props.industryList){
            this.props.industryList.map((obj,index) => {
                newArr.push({value: obj._id, label: obj.name })
            })
        }
        
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
                                        <div className="industry-l-box">
                                            <div className="drag-drop">
                                                <Field
                                                    name="images"
                                                    label="Profile Logo"
                                                    labelClass="control-label"
                                                    wrapperClass="form-group"
                                                    placeholder="Images"
                                                    className="drag-drop"
                                                    component={FileField_Dropzone_New}
                                                    multiple={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="industry-r">
                                    <Field
                                        wrapperClass="category-select select-wrap"
                                        name="industryName"
                                        label="Industry Category"
                                        labelClass="control-label"                                            
                                        placeholder="Select Industry Category"
                                        component={SelectField_ReactSelect}
                                        options={newArr}                                            
                                    />
                                    <Field
                                        name="description"                                        
                                        component={renderField}
                                        placeholder="Please add description...."
                                        className="input-wrap"
                                    />
                                </div>
                            </div>

                            <div className="industry-btn d-flex">
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
const mapStateToProps = (state) => {
    const { afterRegister } = state;
    return {        
        industryList:afterRegister.get('after_register_data').industryList,        
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'wizard', //                 <------ same form name
    multipartForm: true,
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount    
    validate
})(RegisterStepFirst));
