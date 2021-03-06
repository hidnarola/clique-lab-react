import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import Iframe from 'react-iframe'
import { connect } from 'react-redux';
import {AfterReg} from '../Campaign/CommonCompo';

class RegisterSecondStep extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { handleSubmit, pristine, previousPage, submitting,videoUrl,lastVisitedPage } = this.props
        return(
            <section className="content">
                <div className="container">
                    <div className="content-box industry-category video-frame-page">
                        {/* <div className="category-step complete d-flex">
                            <a className="active"></a>
                            <a className="active"></a>
                        </div> */}
                        <AfterReg lastVisitedPage={lastVisitedPage} currentPage="2" changePage={(i) => this.props.changePage(i)}/>
                        
                        <h2>Watch a tutorial video</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="video-frame">
                            <Iframe url={videoUrl}
                                width="100%"
                                height="500px"
                                id="myId"
                                className="myClassname"
                                display="initial"
                                position="relative"
                                allowFullScreen
                            />
                            </div>
                            <div className="industry-btn d-flex">
                                <button type="button" className="back-btn" onClick={previousPage}>Previous</button>
                                <button type="submit" disabled={pristine || submitting}>Skip</button>
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
        videoUrl:afterRegister.get('after_register_data').videoUrl,
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'wizard', //                 <------ same form name
    multipartForm: true,
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount    
})(RegisterSecondStep));