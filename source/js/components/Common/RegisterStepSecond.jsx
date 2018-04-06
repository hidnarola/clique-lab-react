import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import Iframe from 'react-iframe'

const RegisterSecondStep = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props
    return(
        <section className="content">
            <div className="container">
                <div className="content-box industry-category video-frame-page">
                    <div className="category-step complete d-flex">
                        <a className="active"></a>
                        <a className="active"></a>
                    </div>
                    <h2>Watch a tutorial video</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="video-frame">
                        <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                            width="450px"
                            height="450px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                            allowFullScreen
                        />
                        </div>
                        <div className="industry-btn d-flex">
                            {/* <button type="submit">Previous</button> */}
                            <button type="button" className="back-btn" onClick={previousPage}>
                                Previous
                            </button>
                            <button type="submit" disabled={pristine || submitting}>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
    
}

// export default RegisterStepFirst;

export default reduxForm({
    form: 'wizard', //                 <------ same form name
    multipartForm: true,
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount    
})(RegisterSecondStep);