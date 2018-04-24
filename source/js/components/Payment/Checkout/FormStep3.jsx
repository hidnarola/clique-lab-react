import React, { Component } from 'react';
import OrderDetails from './OrderDetails';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import { renderTextField, SelectField_ReactSelect } from '../../Forms/RenderFormComponent/EveryComponent';

const validate = values => {

    const errors = {};

    // if (!values.call_to_action) {
    //     errors.call_to_action = 'This Field is Required';
    // }

    // if (!values.discount_code) {
    //     errors.discount_code = 'This Field is Required';
    // }

    // if (!values.industryName) {
    //     errors.industryName = 'This Field is Required';
    // }    

    // if (!values.short_desc) {
    //     errors.short_desc = 'This Field is Required';
    // }

    // if(!values.tagHash){
    //     errors.tagHash = 'This Field is Required';
    // }

    // if(!values.tagAt){
    //     errors.tagAt = 'This Field is Required';
    // }

    return errors;
};


class FormStep3 extends Component {
    render() {
        const { handleSubmit, previousPage } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="right-box create-campaign d-flex">
                    <div className="create-campaign-l d-flex">
                        <div className="step-process d-flex">
                            <div className="process-point active completed"><a href=""></a><strong></strong></div>
                            <div className="process-point active completed"><a href=""></a><strong></strong></div>
                            <div className="process-point active"><a href=""></a></div>
                        </div>
                        <div className="step-content d-flex">
                            <h2>Step 3</h2>
                            <div className="wallet-card">
							<div className="card-box">
								<div className="card-box-head d-flex">
									<i></i>
									<div className="card-box-head-r">
										<a href=""><img src="../../assets/img/site/edit-icon.png" alt=""/></a>
										<a href=""><img src="../../assets/img/site/delete-icon.png" alt=""/></a>
									</div>	
								</div>
								<div className="card-box-body">
									<h4>John Doe</h4>
									<p>****  ****  ****  3454</p>
								</div>
								<div className="card-box-ftr d-flex">
									<p>Valid<br/>Thru</p>
									<h6>07 / 22</h6>
									<div className="card-box-ftr-r"><img src="../../assets/img/site/visa-icon.png" alt=""/></div>
								</div>
							</div>
							<div className="card-box add-card-box">
								<a href="" data-toggle="modal" data-target="#add-creditcard">
									<img src="../../assets/img/site/plus-01.png" alt=""/>
									<strong>Add Credit Card </strong>
								</a>
							</div>
						</div>
						
						<div className="submit-btn d-flex">
                        <button type="button" onClick={previousPage} className="round-btn prev-btn">Previous</button>
							<button type="submit" className="round-btn next-btn" data-toggle="modal" data-target="#payment-done">Pay</button>
						</div>
                        </div>
                    </div>
                    <OrderDetails />
                </div>
            </form>
        );
    }
}

// export default FormStep1;
export default reduxForm({
    form: 'wizardCheckout', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
})(FormStep3);
