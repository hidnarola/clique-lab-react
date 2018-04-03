import React from 'react';
import { Field, reduxForm } from 'redux-form';

const RegisterStepFirst = props => {
    const { handleSubmit } = props;
    return (
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
                                    <div className="industry-l-box"></div>
                                </div>
                            </div>
                            <div className="industry-r">
                                <div className="category-select">
                                    <label>Industry Category</label>
                                    <select>
                                        <option>Select Industry Category</option>
                                        <option>Select Industry Category 01 </option>
                                        <option>Select Industry Category 02</option>
                                    </select>
                                </div>
                                <div className="industry-description">
                                    <label>Description</label>
                                    <textarea></textarea>
                                </div>
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
    )
}

// export default RegisterStepFirst;

export default reduxForm({
    form: 'wizard', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount    
})(RegisterStepFirst);
