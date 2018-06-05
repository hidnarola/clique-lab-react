import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormCampaignRight from './FormCampaignRight';
import { CommonCompo } from './CommonCompo';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import dropImg from 'img/site/canvas.png';

import {renderFieldCampaign} from '../../components/Forms/RenderFormComponent/EveryComponent';

const validate = values => {
    const errors = {};
    let images = [];
    if (!values.imagesNew || values.imagesNew.length === 0) {
        errors.imagesNew = 'This field is required';
    } else {
        if ((values.imagesNew).length > 0) {
            let extensions = ["image/jpeg", "image/png", "image/jpg"];
            images.push(values.imagesNew);
            _.forEach(images[0], (file, key) => {
                if (extensions.indexOf(file.type) < 0) {
                    errors.imagesNew = 'File type not supported';
                }
            });
            // _.map(values.imagesNew), function(file){
            //     let file_type = file.type;
            //     let extensions = ["image/jpeg", "image/png", "image/jpg"];
            //     if (extensions.indexOf(file_type) < 0) {
            //         errors.imagesNew = 'File type not supported';
            //     }
            // }

        }
    }
    return errors;
};

class FileField_Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageArr: []
        }
    }
    removeImg = (key) => {
        const { imageArr } = this.state;
        imageArr.splice(key,1);
    }

    render() {
        const { label, input, meta, wrapperClass, className, labelClass, errorClass, accept, multiple, isRequired, updateHiddenField } = this.props;
        const { imageArr } = this.state; 
        let filesArr = _.values(input.value);
        console.log('FileArr',filesArr);
        let images = [];
        let tempImgs = [];
        let isFileDropped = false;
        if(filesArr.length > 0){
            tempImgs.push(filesArr);
        }
        _.forEach(filesArr, (file, key) => {
            images.push(
                <div className="images-preview-wrapper" key={key}>
                    <div className="image-preview">
                        <img src={file.preview} width={'560px'} height={'280px'} onClick={() => this.removeImg(key)} />
                    </div>
                </div>
            )
        })

        if(tempImgs.length > 0 && tempImgs!==imageArr){
            document.getElementById('board_images').value = JSON.stringify(tempImgs);
            //this.props.change('board_images',JSON.stringify(tempImgs));
            console.log(JSON.stringify(tempImgs));
            updateHiddenField(JSON.stringify(tempImgs));
            let tempI = tempImgs
            tempImgs = [];
        }
        
        return (
            <div className={wrapperClass}>
                <label htmlFor={input.name} className={labelClass}>
                    {label} {isRequired === "true" && <span className="error-div">*</span>}
                </label>

                <Dropzone
                    {...input}
                    accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                    onDrop={(filesToUpload, e) => { isFileDropped = true; input.onChange(filesToUpload) }}
                    multiple={multiple ? multiple : false}
                    className={`${className}`}
                    onFileDialogCancel={() => {
                        (!isFileDropped) ? input.onChange('') : ''
                    }}
                >
                    <div className="dropzone-image-preview-wrapper">
                        <div className="custom_dropzone_div">
                            <img src={dropImg} /><br /><br />
                            <p>Select or Drag Your image here</p>
                            <span className={`btn btn_drop_browse`}>Or Browse</span>
                        </div>
                    </div>
                </Dropzone>
                <div className="uploaded_img">
                    {(input.value && meta.error === undefined) && images}
                </div>
                {(meta.touched && meta.error) && <span className="error-div">{meta.error}</span>}
            </div>
        );
    }
}

class FormStep5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finalImage : []
        }
    }

    updateHiddenField =(data) =>{
        this.props.change('board_images',data);
    }
        
    render() {
        const { handleSubmit, previousPage, submitDisabled } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <CommonCompo currentPage="5" changePage={(i) => this.props.changePage(i)} />
                        <div className="step-content d-flex">
                            <h2>Step 5</h2>
                            <div className="input-wrap select-wrap">
                                <Field
                                    name="imagesNew"
                                    label="Upload the mood board image"
                                    labelClass="control-label"
                                    wrapperClass="form-group"
                                    placeholder="Images"
                                    component={FileField_Dropzone}
                                    updateHiddenField={this.updateHiddenField}
                                    multiple={true}
                                />
                            </div>
                            <div className="input-wrap">
                                <Field
                                    name="board_images"
                                    id="board_images"
                                    type="hidden"
                                    component={renderFieldCampaign}
                                    placeholder="Campaign Name"
                                />
                            </div>

                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage} className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn" disabled={submitDisabled}>Done</button>
                            </div>
                        </div>
                    </div>
                    <FormCampaignRight />
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
})(FormStep5);
