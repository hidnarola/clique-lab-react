import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import cx from 'classnames';
import {FileField_Dropzone,SelectField_ReactSelect,FileField_Dropzone_New} from '../../components/Forms/RenderFormComponent/EveryComponent';
import { connect } from 'react-redux';
import {AfterReg} from '../Campaign/CommonCompo';

const validate = values => {
    
    const errors = {};
    console.log(values.images);
    if (!values.images || values.images.length===0) {
        errors.images = 'This field is required'
    }else {
        if((values.images).length > 0){
            let file_type = values.images[0].type;
            let extensions = ["image/jpeg", "image/png", "image/jpg"];
            if (extensions.indexOf(file_type) < 0) {
                errors.images = 'File type not supported';
            }
        }
    }

    if (!values.industryName) {
        errors.industryName = 'This field is required';
    }

    if (!values.description) {
        errors.description = 'This field is required';
    }

    return errors;
};

const renderField = ({ input, type, placeholder, meta: { touched, error, warning } }) => (    
    <div  className={cx('industry-description input-wrap',{'custom-error':(touched && error ) ? true:false })}>
        <label>Description</label>
        <textarea {...input} placeholder={placeholder}></textarea>
        {touched && ((error && <span className="error-div">{error}</span>))}
    </div>
)

class RegisterStepFirst extends Component{
    
    constructor(props){
        super(props);
        this.state = {  
            selectedOption: '',
            page:1
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });        
    }

    changePage = (pageNo) => {
        this.setState({page:pageNo});
    }

    render(){
        const { handleSubmit } = this.props;
        const { selectedOption,page } = this.state;
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
                        {/* <div className="category-step d-flex">
                            <a href="#" className="active"></a>
                            <a href="#" className=""></a>
                        </div> */}

                        
                        <AfterReg currentPage="1" changePage={(i) => this.changePage(i)}/>
                       
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
                                                    component={FileField_Dropzone}
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
                                        placeholder="Select industry category"
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
