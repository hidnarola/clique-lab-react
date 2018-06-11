import jQuery from 'jquery';
import React, { Component } from 'react';
import OrderDetails from './OrderDetails';
import validator from 'validator';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, SelectField_ReactSelect } from '../../Forms/RenderFormComponent/EveryComponent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MonthPickerInput from 'react-month-picker-input';
import { addCard, getCardList, resetVal } from '../../../actions/Checkout';
import editImg from 'img/site/edit-icon.png';
import deleteImg from 'img/site/delete-icon.png';
import mastercardImg from 'img/site/credit_card/mastercard.png';
import visaImg from 'img/site/credit_card/visa.png';
import plusImg from 'img/site/plus-01.png';
import closeImg2 from 'img/site/close-2.png';

const validate = values => {
    const errors = {};
    return errors;
};

class FormStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCreditCardModalShow: false,
            txtCHN: '',
            txtCN: '',
            txtCD: '',
            txtCVV: '',
            creditCardFormSubmit: false,
        }
        this.addCreditCardModal = this.addCreditCardModalOpen.bind(this);
    }

    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch(getCardList());
    }

    addCreditCardModalOpen() {
        this.setState({ addCreditCardModalShow: !this.state.addCreditCardModalShow });
    }
    addCreditCardModaltoggle() {
        const { dispatch } = this.props;
        this.setState({ addCreditCardModalShow: !this.state.addCreditCardModalShow });
        dispatch(resetVal({addCard: false}));
    }

    onChange = (element, value) => {
        let { txtCHN, txtCN, txtCD, txtCVV, creditCardFormSubmit } = this.state;
        if (element == 'txt_card_holder_name') { this.setState({ txtCHN: value }) }
        if (element == 'txt_card_number') { this.setState({ txtCN: value }) }
        if (element == 'txt_card_date') { this.setState({ txtCD: value }) }
        if (element == 'txt_card_cvv') { this.setState({ txtCVV: value }) }
        if (value === '') {
            jQuery('#' + element).css("cssText", "border: 2px solid red !important");
            jQuery('.' + element + '_errorMsg').html('This field is required');
        } else {
            jQuery('#' + element).css("cssText", "border: 2px solid rgba(82, 95, 127, .2) !important");
            jQuery('.' + element + '_errorMsg').html('');
        }

        // if (txtCN === '') {
        //     jQuery('#txt_card_number').css("cssText", "border: 2px solid red !important");
        //     jQuery('.txt_card_number_errorMsg').html('This field is required');
        // } else {
        //     jQuery('#txt_card_holder_name').css("cssText", "border: 2px solid rgba(82, 95, 127, .2) !important");
        //     jQuery('.txt_card_holder_name_errorMsg').html('');
        // }

        // if (txtCVV === '') {
        //     jQuery('#txt_card_cvv').css("cssText", "border: 2px solid red !important");
        //     jQuery('.txt_card_cvv_errorMsg').html('This field is required');
        // } else {
        //     jQuery('#txt_card_holder_name').css("cssText", "border: 2px solid rgba(82, 95, 127, .2) !important");
        //     jQuery('.txt_card_holder_name_errorMsg').html('');
        // }

    }

    submitCreditCard = () => {
        const { dispatch } = this.props;
        const { txtCHN, txtCN, txtCD, txtCVV } = this.state;
        let isError = 0;
        if (txtCHN === '') {
            jQuery('#txt_card_holder_name').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_card_holder_name_errorMsg').html('This field is required');
            isError = 1;
        }
        if (txtCN === '') {
            jQuery('#txt_card_number').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_card_number_errorMsg').html('This field is required');
            isError = 1;
        }
        if (txtCD === '') {
            jQuery('#txt_card_date').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_card_date_errorMsg').html('This field is required');
            isError = 1;
        }
        if (txtCVV === '') {
            jQuery('#txt_card_cvv').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_card_cvv_errorMsg').html('This field is required');
            isError = 1;
        }

        if(isError===0){
            let data = {
                'card_holder_name': txtCHN,
                'card_number': txtCN,
                'expiry_month': txtCD.split('/')[1],
                'expiry_year': (txtCD.split('/')[0]).toString().slice(2),
                'cvv': txtCVV
            }
            dispatch(addCard(data));
        }
        // if(jQuery('#txt_card_holder_name').val()==''){
        //     jQuery('.txt_card_holder_name').css("cssText", "border: 2px solid red !important");
        //     jQuery('.add_grp_popup_select_errorMsg').html('This field is required');
        // }
        // if(jQuery('#txt_card_holder_name').val()==''){
        //     jQuery('.txt_card_holder_name').css("cssText", "border: 2px solid red !important");
        //     jQuery('.add_grp_popup_select_errorMsg').html('This field is required');
        // }
        // let { selectedOption, saveFor, userId, filter } = this.state;
        // if (selectedOption === '' || selectedOption === null) {
        //     jQuery('.add_grp_popup_select .Select-control').css("cssText", "border: 2px solid red !important");
        //     jQuery('.add_grp_popup_select_errorMsg').html('This field is required');
        // } else {
        //     this.props.saveResult(saveFor, selectedOption, userId, filter);
        // }
    }
    cardListDiv = (obj) => {
        let cardType = {
            'MasterCard': mastercardImg,
            'Visa': visaImg
        };
        return (
            <div className="card-box" key={Math.random()}>
                <div className="card-box-head d-flex">
                    <i></i>
                    <div className="card-box-head-r">
                        <a href="javascript:void(0)"><img src={editImg} alt="Edit" /></a>
                        <a href="javascript:void(0)"><img src={deleteImg} alt="Delete" /></a>
                    </div>
                </div>
                <div className="card-box-body">
                    <h4>{obj.name}</h4>
                    <p>****  ****  ****  {obj.last4}</p>
                </div>
                <div className="card-box-ftr d-flex">
                    <p>Valid<br />Thru</p>
                    <h6>{('0' + obj.exp_month).slice(-2)} / {obj.exp_year}</h6>
                    <div className="card-box-ftr-r"><img src={cardType[obj.brand]} alt={obj.brand} /></div>
                </div>
            </div>
        )
    }

    render() {
        const { handleSubmit, previousPage, cards, addCards } = this.props;
        const { txtCHN, txtCN, txtCD, txtCVV } = this.state;
        if(addCards.status===0 && addCards.error!=null){
            let error_msg = '';
            error_msg = '<ul><li>'+addCards.error+'</li></ul>';
            jQuery('.error_div').html(error_msg);
            jQuery('.error_div').css({display:"block"});
        }
        return (
            <div>
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
                                    {
                                        (cards.status == 1 && cards.data != null) &&
                                        cards.data.map((obj, index) => (this.cardListDiv(obj)))
                                    }
                                    <div className="card-box add-card-box">
                                        <a className="cursor_pointer" onClick={this.addCreditCardModal}>
                                            <img src={plusImg} alt="Add Credit Card" />
                                            <strong>Add Credit Card</strong>
                                        </a>
                                    </div>
                                </div>

                                <div className="submit-btn d-flex">
                                    <button type="button" onClick={previousPage} className="round-btn prev-btn">Previous</button>
                                    <button type="submit" className="round-btn next-btn" data-toggle="modal" data-target="#payment-done">Pay</button>
                                </div>
                            </div>
                        </div>
                        {/* <OrderDetails /> */}
                    </div>
                </form>

                <Modal isOpen={this.state.addCreditCardModalShow} toggle={this.addCreditCardModaltoggle} className={this.props.className} id="congratulations" className="add_credit_card_popup" style={{ "width": "600px" }}>
                    <div className="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.addCreditCardModaltoggle()} />
                    </div>
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2>Add Credit Card</h2>
                            <form id="add_credit_card_form">
                                <div className="input-wrap">
                                    <label>Card Holder Name <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_card_holder_name" id="txt_card_holder_name" placeholder="Name" value={txtCHN} onChange={(input) => this.onChange(input.target.name, input.target.value)} />
                                    <span className="txt_card_holder_name_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap">
                                    <label>Card Number <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_card_number" id="txt_card_number" placeholder="Card Number" value={txtCN} onChange={(input) => this.onChange(input.target.name, input.target.value)} />
                                    <span className="txt_card_number_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="expiry-date d-flex">
                                    <div className="input-wrap select-wrap">
                                        <label>Select Date <span className="error-div">&nbsp;*</span></label>
                                        {/* <select>
                                            <option>Select Date</option>
                                            <option>Select Date 01</option>
                                            <option>Select Date 02</option>
                                            <option>Select Date 03</option>
                                        </select> */}
                                        <MonthPickerInput
                                            // year={2018}
                                            // month={1}
                                            inputProps={{
                                                id: 'txt_card_date',
                                                name: 'txt_card_date',
                                            }}
                                            value={new Date()}
                                            onChange={
                                                (selectedYear, selectedMonth) =>
                                                //console.log(selectedYear, selectedMonth);
                                                this.onChange('txt_card_date', selectedMonth+'/'+selectedYear)
                                            }
                                            closeOnSelect={true}
                                        />
                                        <span className="txt_card_date_errorMsg" style={{ "color": "red" }}></span>
                                    </div>
                                    <div className="input-wrap">
                                        <label>CVV <span className="error-div"> *</span></label>
                                        <input type="password" name="txt_card_cvv" id="txt_card_cvv" placeholder="***" value={txtCVV} onChange={(input) => this.onChange(input.target.name, input.target.value)} />
                                        <span className="txt_card_cvv_errorMsg" style={{ "color": "red" }}></span>
                                    </div>
                                </div>
                                <div className="error_div">
                                    
                                </div>
                                <div className="submit-btn">
                                    <button type="button" className="round-btn" onClick={() => this.submitCreditCard()}>Authorise</button>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { register, checkout } = state;
    return {
        loading: checkout.get('loading'),
        error: checkout.get('error'),
        cards: checkout.get('cards'),
        addCards: checkout.get('addCards'),
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'wizardCheckout',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(FormStep3));
