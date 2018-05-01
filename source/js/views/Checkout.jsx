import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { routeCodes } from 'constants/routes';
import { cartPaymentReq } from '../actions/Checkout';
import { country } from '../actions/register';

import FormStep1 from '../components/Payment/Checkout/FormStep1';
import FormStep2 from '../components/Payment/Checkout/FormStep2';
import FormStep3 from '../components/Payment/Checkout/FormStep3';

class Checkout extends Component {

    constructor(props){
        super(props);
        this.state = {
            page : 1,
            modal: false
        }
        this.toggle = this.toggle.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    toggle() {
        this.setState({
             modal: !this.state.modal
        });
    }

    submitForm(values){
        //console.log(values);
        //return;
        const { dispatch } = this.props;
        let data = {
            "name"          : values.fullname,
            "email"         : values.email,
            "abn"           : values.abn,
            "country"       : values.country.value,
            "address_line_1": values.address1,
            "address_line_2": values.address2,
            "city"          : values.city,
            "state"         : values.state.value,
            "post_code"     : values.post_code,
            "credit_card"   : 'card_1AmK1vFryXXeEhDyOzO0c2qc',
        }
        // const formData = new FormData();
        // formData.append("name",values.fullname);
        // formData.append("email",values.email);
        // formData.append("abn",values.abn);
        // formData.append("country",values.country.value);
        // formData.append("address_line_1",values.address1);
        // formData.append("address_line_2",values.address2);
        // formData.append("city",values.city);
        // formData.append("state",values.state.value);
        // formData.append("post_code",values.post_code);
        // formData.append("credit_card",'card_1AmK1vFryXXeEhDyOzO0c2qc');

        dispatch(cartPaymentReq(data));

        this.setState({
            modal : true
        })
    }

    nextPage(){
        this.setState({ page : this.state.page + 1 });
    }

    previousPage(){
        this.setState({ page : this.state.page - 1 });
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(country());
    }

    render() {
        const { page } = this.state;
        return (
            <div>
                {/* <FormStep1 onSubmit={this.nextPage}/> */}
                {page === 1  && <FormStep1 onSubmit={this.nextPage} countryList={this.props.country} />}
                {page === 2  && <FormStep2 onSubmit={this.nextPage} previousPage={this.previousPage} />}
                {page === 3  && <FormStep3 onSubmit={this.submitForm} previousPage={this.previousPage} />}
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Payment Done</ModalHeader>
                        <ModalBody>Thank you for your payment! Your order has been successfully placed.</ModalBody>
                        <ModalFooter>
                            <div className="submit-btn d-flex">
                                <Link to={routeCodes.CAMPAIGN_PURCHASED_POSTS}>
                                    <button type="button" className="round-btn next-btn">Purchased Post</button>
                                </Link>
                            </div>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { register } = state;
    return {
        // loading: register.get('loading'),
        // error: register.get('error'),
        country:register.get('country'),
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));