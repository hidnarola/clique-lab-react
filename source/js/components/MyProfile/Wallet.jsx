import jQuery from 'jquery';
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SubmissionError } from 'redux-form'
import { routeCodes } from '../../constants/routes';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../../constants/usefulvar';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addCard, editCard, deleteCard, getCardList, resetVal } from '../../actions/Checkout';
import { addBank, deleteBank, getBankList, resetValMyProfile } from '../../actions/myProfile';
import { Facebook, List, Code } from 'react-content-loader';
import SweetAlert from "react-bootstrap-sweetalert";
import MonthPickerInput from 'react-month-picker-input';
import editImg from 'img/site/edit-icon.png';
import deleteImg from 'img/site/delete-icon.png';
import mastercardImg from 'img/site/credit_card/mastercard.png';
import visaImg from 'img/site/credit_card/visa.png';
import plusImg from 'img/site/plus-01.png';
import closeImg2 from 'img/site/close-2.png';

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCreditCardModalShow: false,
            txtCHN: '',
            txtCN: '',
            txtCD: '',
            txtCVV: '',
            creditCardFormSubmit: false,
            selectedCard: '',

            editCreditCardModalShow: false,
            editCardId: '',
            txtCHNedit: '',
            txtCNedit: '',
            txtCDedit: '',
            txtCVVedit: '',

            delete_alert: false,
            delete_selected_id: null,
            delete_bank_selected_id: null,

            addBankModalShow: false,
            txtBN: '',
            txtAHN: '',
            txtAN: '',
            txtBSB: '',
            BankFormSubmit: false,

            editBankModalShow: false,
            editBankId: '',
            txtBNedit: '',
            txtAHNedit: '',
            txtANedit: '',
            txtBSBedit: '',

            isRender: 0,
        }
        this.addCreditCardModal = this.addCreditCardModalOpen.bind(this);
        this.addBankModal = this.addBankModalOpen.bind(this);
    }

    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch(getCardList());
        dispatch(getBankList());
    }
    componentDidUpdate = () => {
        const { handleSubmit, previousPage, cards, addCards, editCards, deleteCards, dispatch, addBank, deleteBank, bank } = this.props;
        const { txtCHN, txtCN, txtCD, txtCVV, txtCHNedit, txtCNedit, txtCDedit, txtCVVedit, isRender } = this.state;
        if (isRender == 1) {
            if (addCards.status === 0 && addCards.error != null) {
                let error_msg = '';
                error_msg = '<ul><li>' + addCards.error + '</li></ul>';
                jQuery('.error_div').html(error_msg);
                jQuery('.error_div').css({ display: "block" });
            } else if (addCards.status === 1) {
                this.addCreditCardModaltoggle();
                dispatch(getCardList());
                this.setState({ isRender: 0 });
            }

            if (deleteCards.status === 1) {
                dispatch(resetVal({ addCard: false, deleteCard: false, editCard: false }));
                dispatch(getCardList());
                this.setState({ isRender: 0 });
            }

            if (editCards.status === 0 && editCards.error != null) {
                let error_msg = '';
                error_msg = '<ul><li>' + editCards.error + '</li></ul>';
                jQuery('.error_div').html(error_msg);
                jQuery('.error_div').css({ display: "block" });
            } else if (editCards.status === 1) {
                this.editCreditCardModaltoggle();
                dispatch(getCardList());
                this.setState({ isRender: 0 });
            }

            if (addBank.status === 0 && addBank.error != null) {
                let error_msg = '';
                error_msg = '<ul><li>' + addBank.error + '</li></ul>';
                jQuery('.error_div').html(error_msg);
                jQuery('.error_div').css({ display: "block" });
            } else if (addBank.status === 1) {
                this.addBankModaltoggle();
                dispatch(getBankList());
                this.setState({ isRender: 0 });
            }

            if (deleteBank.status === 1) {
                dispatch(resetValMyProfile({ addBank: false, deleteBank: false }));
                dispatch(getBankList());
                this.setState({ isRender: 0 });
            }
        }
    }

    // Add Credit Card
    addCreditCardModalOpen() {
        this.setState({ addCreditCardModalShow: !this.state.addCreditCardModalShow });
    }
    addCreditCardModaltoggle() {
        const { dispatch } = this.props;
        this.setState({ addCreditCardModalShow: !this.state.addCreditCardModalShow });
        this.setState({
            txtCHN: '',
            txtCN: '',
            txtCD: '',
            txtCVV: '',
        })
        dispatch(resetVal({ addCard: false, deleteCard: false }));
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

        if (isError === 0) {
            let data = {
                'card_holder_name': txtCHN,
                'card_number': txtCN,
                'expiry_month': txtCD.split('/')[1],
                'expiry_year': (txtCD.split('/')[0]).toString().slice(2),
                'cvv': txtCVV
            }
            dispatch(addCard(data));
            this.setState({ isRender: 1 });
        }
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
    }

    // Edit Credit Card
    editCreditCardModalOpen(cardDetails) {
        this.setState({
            editCreditCardModalShow: !this.state.editCreditCardModalShow,
            editCardId: cardDetails.id,
            txtCHNedit: cardDetails.name,
            txtCNedit: '**** **** **** ' + cardDetails.last4,
            txtCDedit: cardDetails.exp_month + '/' + cardDetails.exp_year,
            txtCVVedit: '***'
        });

    }
    editCreditCardModaltoggle() {
        const { dispatch } = this.props;
        this.setState({
            editCreditCardModalShow: !this.state.editCreditCardModalShow,
            editCardId: '',
            txtCHNedit: '',
            txtCNedit: '',
            txtCDedit: '',
            txtCVVedit: '',
        });
        dispatch(resetVal({ addCard: false, deleteCard: false, editCard: false }));
    }
    onChangeEdit = (element, value) => {
        let { txtCHNedit, txtCNedit, txtCDedit, txtCVVedit } = this.state;
        if (element == 'txt_card_holder_name_edit') { this.setState({ txtCHNedit: value }) }
        if (element == 'txt_card_date_edit') { this.setState({ txtCDedit: value }) }
        if (value === '') {
            jQuery('#' + element).css("cssText", "border: 2px solid red !important");
            jQuery('.' + element + '_errorMsg').html('This field is required');
        } else {
            jQuery('#' + element).css("cssText", "border: 2px solid rgba(82, 95, 127, .2) !important");
            jQuery('.' + element + '_errorMsg').html('');
        }
    }
    submitEditCreditCard = () => {
        const { dispatch } = this.props;
        const { editCardId, txtCHNedit, txtCNedit, txtCDedit, txtCVVedit } = this.state;
        let isError = 0;
        if (txtCHNedit === '') {
            jQuery('#txt_card_holder_name_edit').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_card_holder_name_errorMsg').html('This field is required');
            isError = 1;
        }
        if (txtCDedit === '') {
            jQuery('#txt_card_date_edit').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_card_date_edit_errorMsg').html('This field is required');
            isError = 1;
        }
        if (isError === 0) {
            let data = {
                'card_id': editCardId,
                'card_holder_name': txtCHNedit,
                'expiry_month': txtCDedit.split('/')[0],
                'expiry_year': txtCDedit.split('/')[1],
            }
            dispatch(editCard(data));
            this.setState({ isRender: 1 });
        }
    }

    // Delete Credit Card
    deleteCard = (cardId) => {
        this.setState({
            delete_alert: true,
            delete_selected_id: cardId
        });
    }
    deleteCardFunc = () => {
        let { delete_selected_id, delete_alert } = this.state;
        if (delete_selected_id !== null && delete_alert) {
            const { dispatch } = this.props;
            dispatch(deleteCard({ "cardId": delete_selected_id }))
            dispatch(resetVal({ addCard: false, deleteCard: false }));
        }
        this.setState({
            delete_alert: false,
            delete_selected_id: null,
            isRender: 1,
        })
    }
    hideDeleteAlert = () => {
        this.setState({
            delete_alert: false,
            delete_selected_id: null
        })
    }

    // Credit Card Lisitng
    cardListDiv = (obj) => {
        let cardType = {
            'MasterCard': mastercardImg,
            'Visa': visaImg
        };
        return (
            <div className="card-box" key={Math.random()} onClick={() => this.selecteCreditCard(obj.id)} id={'card_box_' + obj.id}>
                <div className="card-box-head d-flex">
                    <i className="light-bg"></i>
                    <div className="card-box-head-r">
                        <a href="javascript:void(0)" onClick={() => this.editCreditCardModalOpen(obj)}><img src={editImg} alt="Edit" /></a>
                        <a href="javascript:void(0)" onClick={() => this.deleteCard(obj.id)}><img src={deleteImg} alt="Delete" /></a>
                    </div>
                </div>
                <div className="card-box-body">
                    <h4>{obj.name}</h4>
                    <p>****  ****  ****  {obj.last4}</p>
                </div>
                <div className="card-box-ftr d-flex">
                    <p>Valid<br />Thru</p>
                    <h6>{('0' + obj.exp_month).slice(-2)} / {obj.exp_year}</h6>
                    <div className="card-box-ftr-r"><img src={cardType[obj.brand]} alt={obj.brand} style={{"marginTop":"-5px","width":"90%"}}/></div>
                </div>
            </div>
        )
    }


    // Add Bank
    addBankModalOpen() { this.setState({ addBankModalShow: !this.state.addBankModalShow }); }
    addBankModaltoggle() {
        const { dispatch } = this.props;
        this.setState({ addBankModalShow: !this.state.addBankModalShow });
        this.setState({
            txtBN: '',
            txtAHN: '',
            txtAN: '',
            txtBSB: '',
        })
        dispatch(resetValMyProfile({ addBank: false, deleteBank: false }));
    }
    submitBank = () => {
        const { dispatch } = this.props;
        const { txtBN, txtAHN, txtAN, txtBSB } = this.state;
        let isError = 0;
        if (txtBN === '') {
            jQuery('#txt_bank_name').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_bank_name_errorMsg').html('This field is required');
            isError = 1;
        }
        if (txtAHN === '') {
            jQuery('#txt_acc_holder_name').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_acc_holder_name_errorMsg').html('This field is required');
            isError = 1;
        }
        if (txtAN === '') {
            jQuery('#txt_acc_number').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_acc_number_errorMsg').html('This field is required');
            isError = 1;
        }
        if (txtBSB === '') {
            jQuery('#txt_bsb').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_bsb_errorMsg').html('This field is required');
            isError = 1;
        }

        if (isError === 0) {
            let data = {
                "bank_name": txtBN,
                "account_name": txtAHN,
                "account_number": txtAN,
                "bsb": txtBSB,
            }
            dispatch(addBank(data));
            this.setState({ isRender: 1 });
        }
    }
    onChangeBank = (element, value) => {
        let { txtBN, txtAHN, txtAN, txtBSB, BankFormSubmit } = this.state;
        if (element == 'txt_bank_name') { this.setState({ txtBN: value }) }
        if (element == 'txt_acc_holder_name') { this.setState({ txtAHN: value }) }
        if (element == 'txt_acc_number') { this.setState({ txtAN: value }) }
        if (element == 'txt_bsb') { this.setState({ txtBSB: value }) }
        if (value === '') {
            jQuery('#' + element).css("cssText", "border: 2px solid red !important");
            jQuery('.' + element + '_errorMsg').html('This field is required');
        } else {
            jQuery('#' + element).css("cssText", "border: 2px solid rgba(82, 95, 127, .2) !important");
            jQuery('.' + element + '_errorMsg').html('');
        }
    }

    // Delete Bank
    deleteBank = (bankId) => {
        this.setState({
            delete_alert: true,
            delete_bank_selected_id: bankId
        });
    }
    deleteBankFunc = () => {
        let { delete_bank_selected_id, delete_alert } = this.state;
        if (delete_bank_selected_id !== null && delete_alert) {
            const { dispatch } = this.props;
            dispatch(deleteBank({ "bankId": delete_bank_selected_id }))
            dispatch(resetValMyProfile({ addBank: false, deleteBank: false }));
        }
        this.setState({
            delete_alert: false,
            delete_bank_selected_id: null,
            isRender: 1,
        })
    }
    hideDeleteAlert = () => {
        this.setState({
            delete_alert: false,
            delete_bank_selected_id: null
        })
    }


    //Bank Lisitng
    bankListDiv = (obj) => {
        return (
            <div className="card-box wallet-account-box" key={Math.random()}>
                <div className="card-box-head d-flex">
                    <i className="light-bg"></i>
                    <div className="card-box-head-r">
                        <a href="javascript:void(0)" onClick={() => this.deleteBank(obj.id)}><img src={deleteImg} alt="Delete" /></a>
                    </div>
                </div>
                <h4>{obj.bank_name}</h4>
                <h4><small>BSB</small> <strong>{obj.bsb}</strong></h4>
                <h5><small>Account Name </small> <strong>{obj.account_holder_name}</strong></h5>
                <h5><small>Account Number</small> <strong>{`********${obj.bank_Account_last4}`}</strong></h5>
            </div>
        )
    }

    render() {

        const { handleSubmit, previousPage, cards, addCards, editCards, deleteCards, dispatch, bank } = this.props;
        const {
            txtCHN, txtCN, txtCD, txtCVV, txtCHNedit, txtCNedit, txtCDedit, txtCVVedit,
            txtBN, txtAHN, txtAN, txtBSB, txtBNedit, txtAHNedit, txtANedit, txtBSBedit,
        } = this.state;
        return (
            <div>
                <div className="profile-body content-box wallet-page">
                    <div className="wallet-balance">
                        <h3>Balance</h3>
                        <div className="wallet-balance-box">
                            <h4>
                                <strong>$4300</strong>
                                <small>Current Balance</small>
                            </h4>
                            <button type="submit" className="round-btn">Withdrawal</button>
                        </div>
                    </div>
                    <div className="wallet-card">
                        <h3>Credit Card</h3>
                        {
                            (cards.loading === true) ?
                                <div className="card-box">
                                    <Facebook />
                                    {/* <Code /><Code /> */}
                                </div>
                                :
                                (cards.status == 1 && cards.data != null) &&
                                cards.data.map((obj, index) => (this.cardListDiv(obj)))
                        }
                        <div className="card-box add-card-box">
                            <a href="javascript:void(0)" onClick={this.addCreditCardModal}>
                                <img src={plusImg} alt="" />
                                <strong>Add Credit Card </strong>
                            </a>
                        </div>
                    </div>
                    <div className="wallet-account">
                        <h3>Bank Account</h3>
                        {
                            (bank.loading === true) ?
                                <div className="card-box wallet-account-box">
                                    < Facebook/>
                                    {/* <Code /><Code /> */}
                                </div>
                                :
                                (bank.status == 1 && bank.data != null) &&
                                bank.data.map((obj, index) => (this.bankListDiv(obj)))
                        }
                        {/* <div className="card-box wallet-account-box">
                            <div className="card-box-head d-flex">
                                <i className="light-bg"></i>
                                <div className="card-box-head-r">
                                    <a href=""><img src={editImg} alt="" /></a>
                                    <a href=""><img src={deleteImg} alt="" /></a>
                                </div>
                            </div>
                            <h4>Bank Australia</h4>
                            <h4><small>BSB</small> <strong>564623</strong></h4>
                            <h5><small>Account Name </small> <strong>John Doe</strong></h5>
                            <h5><small>Account Number</small> <strong>*********65</strong></h5>
                        </div>
                        <div className="card-box wallet-account-box">
                            <div className="card-box-head d-flex">
                                <i></i>
                                <div className="card-box-head-r">
                                    <a href=""><img src={editImg} alt="" /></a>
                                    <a href=""><img src={deleteImg} alt="" /></a>
                                </div>
                            </div>
                            <h4>Bank Australia</h4>
                            <h4><small>BSB</small> <strong>564623</strong></h4>
                            <h5><small>Account Name </small> <strong>John Doe</strong></h5>
                            <h5><small>Account Number</small> <strong>*********65</strong></h5>
                        </div> */}
                        <div className="card-box add-card-box">
                            <a href="javascript:void(0)" onClick={this.addBankModal}>
                                <img src={plusImg} alt="" />
                                <strong>Add Bank Account</strong>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="transactions-history">
                    <div className="d-flex">
                        <h2>Transactions History</h2>
                        <form>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button type="submit"></button>
                        </form>
                    </div>
                    <div className="content-box transactions-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Campaign name</th>
                                    <th>Brand</th>
                                    <th>Submitted Image</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>I love the way this Jacket Looks @Streetwear #Gorgeous #Spon</td>
                                    <td>Adidas</td>
                                    <td><img src="images/img-11.png" alt="" /></td>
                                    <td>$3420</td>
                                </tr>
                                <tr>
                                    <td>Lit lyfe with my Friends @Streetwear #Yes #Spon</td>
                                    <td>Reebok</td>
                                    <td><img src="images/img-12.png" alt="" /></td>
                                    <td>$5000</td>
                                </tr>
                                <tr>
                                    <td>I love the way this Jacket Looks @Streetwear #Gorgeous #Spon</td>
                                    <td>Adidas</td>
                                    <td><img src="images/img-11.png" alt="" /></td>
                                    <td>$3420</td>
                                </tr>
                                <tr>
                                    <td>Lit lyfe with my Friends @Streetwear #Yes #Spon</td>
                                    <td>Reebok</td>
                                    <td><img src="images/img-12.png" alt="" /></td>
                                    <td>$5000</td>
                                </tr>
                                <tr className="loadmore-btn">
                                    <td colSpan="4"><a href="" className="round-btn">Load more</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Add Credit Card Modal */}
                <Modal isOpen={this.state.addCreditCardModalShow} toggle={this.addCreditCardModaltoggle} className={this.props.className} id="congratulations" className="add_credit_card_popup" style={{ "width": "600px" }}>
                    <div className="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.addCreditCardModaltoggle()} />
                    </div>
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2>Add Credit Card</h2>
                            <form id="add_credit_card_form" className="popup_modal_form">
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
                                                    this.onChange('txt_card_date', selectedMonth + '/' + selectedYear)
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
                                <div className="error_div"></div>
                                <div className="submit-btn">
                                    <button type="button" className="round-btn" onClick={() => this.submitCreditCard()}>Authorise</button>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>

                {/* Edit Credit Card Modal */}
                <Modal isOpen={this.state.editCreditCardModalShow} toggle={this.editCreditCardModaltoggle} className={this.props.className} id="congratulations" className="edit_credit_card_popup" style={{ "width": "600px" }}>
                    <div className="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.editCreditCardModaltoggle()} />
                    </div>
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2>Edit Credit Card</h2>
                            <form id="add_credit_card_form" className="popup_modal_form">
                                <div className="input-wrap">
                                    <label>Card Holder Name <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_card_holder_name_edit" id="txt_card_holder_name_edit" placeholder="Name" value={txtCHNedit} onChange={(input) => this.onChangeEdit(input.target.name, input.target.value)} />
                                    <span className="txt_card_holder_name_edit_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap">
                                    <label>Card Number <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_card_number_edit" id="txt_card_number_edit" placeholder="Card Number" value={txtCNedit} readOnly="readonly" />
                                </div>
                                <div className="expiry-date d-flex">
                                    <div className="input-wrap select-wrap">
                                        <label>Select Date <span className="error-div">&nbsp;*</span></label>
                                        <MonthPickerInput
                                            year={txtCDedit.split('/')[1] - 0}
                                            month={(txtCDedit.split('/')[0] - 1)}
                                            inputProps={{
                                                id: 'txt_card_date_edit',
                                                name: 'txt_card_date_edit',
                                            }}
                                            value={new Date()}
                                            onChange={
                                                (selectedMonth, selectedYear) =>
                                                    this.onChangeEdit('txt_card_date_edit', selectedMonth)
                                                //this.onChangeEdit('txt_card_date_edit', selectedMonth + '/' + selectedYear)
                                            }
                                            closeOnSelect={true}
                                        />
                                        <span className="txt_card_date_edit_errorMsg" style={{ "color": "red" }}></span>
                                    </div>
                                    <div className="input-wrap">
                                        <label>CVV <span className="error-div"> *</span></label>
                                        <input type="password" name="txt_card_cvv_edit" id="txt_card_cvv_edit" placeholder="***" value={txtCVVedit} readOnly="readonly" />
                                    </div>
                                </div>
                                <div className="error_div"></div>
                                <div className="submit-btn">
                                    <button type="button" className="round-btn" onClick={() => this.submitEditCreditCard()}>Authorise</button>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>

                {/* Add Bank Modal */}
                <Modal isOpen={this.state.addBankModalShow} toggle={this.addBankModaltoggle} className={this.props.className} id="congratulations" className="add_credit_card_popup" style={{ "width": "600px" }}>
                    <div className="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.addBankModaltoggle()} />
                    </div>
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2>Add Bank Account</h2>
                            <form id="add_bank_form" className="popup_modal_form">
                                <div className="input-wrap">
                                    <label>Bank Name <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_bank_name" id="txt_bank_name" placeholder="Bank Name" value={txtBN} onChange={(input) => this.onChangeBank(input.target.name, input.target.value)} />
                                    <span className="txt_bank_name_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap">
                                    <label>Account holder Name <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_acc_holder_name" id="txt_acc_holder_name" placeholder="Name" value={txtAHN} onChange={(input) => this.onChangeBank(input.target.name, input.target.value)} />
                                    <span className="txt_acc_holder_name_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap">
                                    <label>Account Number <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_acc_number" id="txt_acc_number" placeholder="Account Number" value={txtAN} onChange={(input) => this.onChangeBank(input.target.name, input.target.value)} />
                                    <span className="txt_acc_number_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap bsb-number">
                                    <label>BSB <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_bsb" id="txt_bsb" placeholder="BSB bumber" value={txtBSB} onChange={(input) => this.onChangeBank(input.target.name, input.target.value)} />
                                    <span className="txt_bsb_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="error_div"></div>
                                <div className="submit-btn">
                                    <button type="button" className="round-btn" onClick={() => this.submitBank()}>Save</button>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>

                {/* Edit Bank Modal */}
                <Modal isOpen={this.state.editBankModalShow} toggle={this.editBankModaltoggle} className={this.props.className} id="congratulations" className="edit_credit_card_popup" style={{ "width": "600px" }}>
                    <div className="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.editBankModaltoggle()} />
                    </div>
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2>Edit Bank Account</h2>
                            <form id="add_bank_form" className="popup_modal_form">
                                <div className="input-wrap">
                                    <label>Bank Name <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_bank_name" id="txt_bank_name" placeholder="Bank Name" value={txtBNedit} onChange={(input) => this.onChangeBank(input.target.name, input.target.value)} />
                                    <span className="txt_bank_name_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap">
                                    <label>Account holder Name <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_acc_holder_name" id="txt_acc_holder_name" placeholder="Name" value={txtAHNedit} onChange={(input) => this.onChangeBank(input.target.name, input.target.value)} />
                                    <span className="txt_acc_holder_no_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap">
                                    <label>Account Number <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_acc_number" id="txt_acc_number" placeholder="Account Number" value={txtANedit} onChange={(input) => this.onChangeBank(input.target.name, input.target.value)} />
                                    <span className="txt_acc_holder_no_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div class="input-wrap bsb-number">
                                    <label>BSB</label>
                                    <input type="text" name="txt_bsb" id="txt_bsb" placeholder="BSB bumber" value={txtBSBedit} onChange={(input) => this.onChangeBank(input.target.name, input.target.value)} />
                                    <span className="txt_bsb_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="error_div"></div>
                                <div className="submit-btn">
                                    <button type="button" className="round-btn" onClick={() => this.submitBank()}>Save</button>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>


                {
                    this.state.delete_alert &&
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, stop it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="Are you sure?"
                        onConfirm={this.state.delete_selected_id ? this.deleteCardFunc : this.deleteBankFunc}
                        onCancel={this.hideDeleteAlert}
                    >
                        You will not be able to recover this data !
                    </SweetAlert>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { register, checkout, myProfile } = state;
    return {
        loading: checkout.get('loading'),
        error: checkout.get('error'),
        cards: checkout.get('cards'),
        addCards: checkout.get('addCards'),
        deleteCards: checkout.get('deleteCards'),
        editCards: checkout.get('editCards'),
        bank: myProfile.get('bank'),
        addBank: myProfile.get('addBank'),
        deleteBank: myProfile.get('deleteBank'),
    }
}

export default connect(mapStateToProps)(Wallet)