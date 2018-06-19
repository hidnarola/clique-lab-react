import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { routeCodes } from 'constants/routes';
import { cartPaymentReq, getCheckoutList } from '../actions/Checkout';
import { country } from '../actions/register';

import FormStep1 from '../components/Payment/Checkout/FormStep1';
import FormStep2 from '../components/Payment/Checkout/FormStep2';
import FormStep3 from '../components/Payment/Checkout/FormStep3';

import { reset, stopAsyncValidation } from 'redux-form';

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            modal: false,
            isRender: 0
        }
        this.toggle = this.toggle.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.submitForm = this.submitForm.bind(this);

    }

    toggle() {
        const { match } = this.props;
        this.setState({ modal: !this.state.modal });
        this.props.history.push(`${routeCodes.CAMPAIGN_PURCHASED_POSTS}`);
    }

    submitForm(values) {
        const { dispatch } = this.props;
        let data = {
            "name": values.fullname,
            "email": values.email,
            "company": values.companyname,
            "abn": values.abn,
            "country": values.country.value,
            "address_line_1": values.address1,
            "address_line_2": values.address2,
            "city": values.city,
            "state": values.state.value,
            "post_code": values.post_code,
            "credit_card": values.txt_card_id,
        }
        dispatch(cartPaymentReq(data));
    }

    nextPage() { this.setState({ page: this.state.page + 1 }); }
    previousPage() { this.setState({ page: this.state.page - 1 }); }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getCheckoutList());
        dispatch(country());
        this.setState({
            isRender: 1
        })
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(initialize('wizardCheckout', {}))
    }
    componentDidUpdate() {
        const { payment, carts } = this.props;
        const { modal, isRender } = this.state;
        if (isRender == 1) {
            if (payment.status === 1 && modal === false) {
                this.setState({
                    modal: true,
                    isRender: 0
                });
            }
            if (carts.data === null) {
                console.log(carts);
                //this.props.history.push(routeCodes.MY_CART);
                this.setState({
                    isRender: 0
                });
            }
        }

    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(reset('wizardCheckout'));
        //dispatch(stopAsyncValidation(wizardCheckout, { clear: true }));
    }

    render() {
        const { page } = this.state;
        const { carts } = this.props;
        return (
            <div>
                <div>
                    {page === 1 && <FormStep1 onSubmit={this.nextPage} countryList={this.props.country} />}
                    {page === 2 && <FormStep2 onSubmit={this.nextPage} previousPage={this.previousPage} />}
                    {page === 3 && <FormStep3 onSubmit={this.submitForm} previousPage={this.previousPage} />}

                    {/* <FormStep3 onSubmit={this.submitForm} previousPage={this.previousPage} /> */}
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Payment Done</ModalHeader>
                            <ModalBody>Thank you for your payment! Your order has been successfully placed.</ModalBody>
                            <ModalFooter>
                                <div className="submit-btn d-flex">
                                    <Link to={routeCodes.CAMPAIGN_PURCHASED_POSTS}>
                                        <button type="button" className="round-btn next-btn">Purchased Posts</button>
                                    </Link>
                                </div>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { register, checkout } = state;
    return {
        loading: checkout.get('loading'),
        error: checkout.get('error'),
        carts: checkout.get('carts'),
        payment: checkout.get('payment'),
        country: register.get('country'),
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));