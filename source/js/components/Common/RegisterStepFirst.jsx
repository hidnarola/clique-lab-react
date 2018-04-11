import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import cx from 'classnames';
import {FileField_Dropzone,SelectField_ReactSelect,FileField_Dropzone_New} from '../../components/Forms/RenderFormComponent/EveryComponent';
import { connect } from 'react-redux';

const validate = values => {
    
    const errors = {};

    if (!values.images) {
        errors.images = 'Required';
    }

    if (!values.industryName) {
        // console.log('industryName==>',values.industryName.value);    
        errors.industryName = 'Required';
    }

    if (!values.description) {
        errors.description = 'Required';
    }

    return errors;
};

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
                                        <label>Profile Logo</label>
                                        <div className="industry-l-box">
                                            <Field
                                                name="images"
                                                label=""
                                                labelClass="control-label"
                                                wrapperClass="form-group"
                                                placeholder="Images"
                                                component={FileField_Dropzone_New}
                                                multiple={false}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="industry-r">
                                    <Field
                                        wrapperClass="category-select"
                                        name="industryName"
                                        label="Industry Category"
                                        labelClass="control-label"                                            
                                        placeholder="Main Muscle Group"
                                        component={SelectField_ReactSelect}
                                        options={newArr}                                            
                                    />
                                    <Field
                                        name="description"                                        
                                        component={renderField}
                                        placeholder="Please Add ...."
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
