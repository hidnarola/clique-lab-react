import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { CommonCompo } from './CommonCompo';
import { renderFieldCampaign } from '../../components/Forms/RenderFormComponent/EveryComponent';
import FormCampaignRight from './FormCampaignRight';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import dropImg from 'img/site/canvas.png';
import deleteImg from 'img/site/delete-icon.png';

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
        }
    }
    return errors;
};

class FileField_Dropzone extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            label, input, meta, accept, multiple, isRequired,
            wrapperClass, className, labelClass, errorClass,
            existImages, handleImagesSelection
        } = this.props;
        let images = [];
        let isFileDropped = false;
        if (existImages !== null) {
            _.forEach(existImages, (file, key) => {
                images.push(
                    <div className="images-preview-wrapper" key={key}>
                        <div className="image-preview" style={{"position": "relative"}}>
                            <img className="preview_img" src={file.preview} width={'560px'} height={'280px'} />
                            <img className="preview_img_del" src={deleteImg} onClick={() => this.props.removeImg(key)} />
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className={wrapperClass}>
                <label htmlFor={input.name} className={labelClass}>
                    {label} {isRequired === "true" && <span className="error-div">*</span>}
                </label>
                <Dropzone
                    {...input}
                    accept={accept ? accept : "image/jpeg, image/png, image/jpg, image/gif"}
                    onDrop={
                        (filesToUpload, e) => {
                            isFileDropped = true;
                            var allImages = _.concat(existImages, filesToUpload);
                            input.onChange(allImages)
                            handleImagesSelection(allImages);
                        }
                    }
                    multiple={multiple ? multiple : false}
                    className={`${className}`}
                    onFileDialogCancel={() => {
                        (!isFileDropped) ? input.onChange('') : ''
                    }}
                >
                    <div className="dropzone-image-preview-wrapper">
                        <div className={`custom_dropzone_div ${(meta.touched && meta.error) && 'drop_error_div'}`}>
                            <img src={dropImg} /><br /><br />
                            <p>Select or Drag Your image here</p>
                            <span className={`btn btn_drop_browse`}>Or Browse</span>
                        </div>
                    </div>
                </Dropzone>
                {(input.value && meta.error === undefined) &&
                    <div className="uploaded_img"> {images} </div>
                }
                {(meta.touched && meta.error) && <span className="error-div">{meta.error}</span>}
            </div>
        );
    }
}

class FormStep5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allImages: []
        }
    }

    componentWillMount(){
        const { prevImg } = this.props;
        this.setState({ allImages: prevImg });
    }

    removeImg = (key) => {
        const { allImages } = this.state;
        const { multipleImagesFun } = this.props; 
        let imgArr = allImages;
        imgArr.splice(key, 1);
        this.props.change('imagesNew',imgArr);
        this.setState({ allImages: imgArr });
        multipleImagesFun(imgArr);
    }

    handleImagesSelection = (data) => {
        const { multipleImagesFun } = this.props;
        this.setState({ allImages: data });
        multipleImagesFun(data);
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
                                    multiple={true}
                                    removeImg={(imgKey) => this.removeImg(imgKey)}
                                    existImages={this.state.allImages}
                                    handleImagesSelection={(values) => this.handleImagesSelection(values)}
                                />
                            </div>
                            <div className="submit-btn d-flex">
                                <button type="button" onClick={previousPage} className="round-btn prev-btn">Previous</button>
                                <button type="submit" className="round-btn next-btn" disabled={submitDisabled}>Done</button>
                            </div>
                        </div>
                    </div>
                    <FormCampaignRight 
                        existImages = {this.state.allImages}
                    />
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'wizardCampaign',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(FormStep5);
