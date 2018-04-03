import React,{Component} from 'react';
import { Field, reduxForm } from 'redux-form';

const RegisterSecondStep = (props) => {
    const { handleSubmit,previousPage } = props;
    return(
        <section className="content">
            <div className="container">
                <div className="content-box industry-category video-frame-page">
                    <div className="category-step complete d-flex">
                        <a className="active"></a>
                        <a className="active"></a>
                    </div>
                    <h2>Watch a tutorial video</h2>
                    <form>
                        <div className="video-frame">
                            <img src="images/video-img.png" alt="" />
                        </div>
                        <div className="industry-btn d-flex">
                            {/* <button type="submit">Previous</button> */}
                            <button type="button" className="back-btn" onClick={previousPage}>
                                Previous
                            </button>
                            <button type="submit">Next</button>
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
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount    
})(RegisterSecondStep);