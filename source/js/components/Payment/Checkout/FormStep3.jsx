import jQuery from 'jquery';
import React, { Component } from 'react';
import OrderDetails from './OrderDetails';
import validator from 'validator';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderTextField, SelectField_ReactSelect } from '../../Forms/RenderFormComponent/EveryComponent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addCard, editCard, deleteCard, getCardList, resetVal } from '../../../actions/Checkout';
import { Facebook, List, Code } from 'react-content-loader';
import SweetAlert from "react-bootstrap-sweetalert";
import MonthPickerInput from 'react-month-picker-input';
import editImg from 'img/site/edit-icon.png';
import deleteImg from 'img/site/delete-icon.png';
import mastercardImg from 'img/site/credit_card/mastercard.png';
import visaImg from 'img/site/credit_card/visa.png';
import plusImg from 'img/site/plus-01.png';
import closeImg2 from 'img/site/close-2.png';
import cx from 'classnames';

const validate = values => {
    const errors = {};
    if (!values.txt_card_id || !validator.matches(values.txt_card_id, /^[A-Za-z_]/i)) {
        errors.txt_card_id = 'Please select card for a payment.'
    }
    return errors;
};

const textField = ({ input, type, label, placeholder,meta: { touched, error } }) => (
    <div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
        <input {...input} placeholder={placeholder} type={type} className={cx({ 'txt_error_div': (touched && error) })} />
        {touched && ((error && <span className="error-div">{error}</span>))}
    </div>
)

class FormStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCreditCardModalShow: false,
            editCreditCardModalShow: false,
            txtCHN: '',
            txtCN: '',
            txtCD: '',
            txtCVV: '',
            creditCardFormSubmit: false,
            selectedCard: '',

            delete_alert: false,
            delete_selected_id: null,

            editCardId: '',
            txtCHNedit: '',
            txtCNedit: '',
            txtCDedit: '',
            txtCVVedit: '',

            isRender: 0,
            disabled:''
        }
        this.addCreditCardModal = this.addCreditCardModalOpen.bind(this);
    }

    componentWillMount = () => {
        const { dispatch } = this.props;
        dispatch(getCardList());
    }

    componentDidUpdate = () => {
        const { handleSubmit, previousPage, cards, addCards, editCards, deleteCards, dispatch } = this.props;
        const { txtCHN, txtCN, txtCD, txtCVV, txtCHNedit, txtCNedit, txtCDedit, txtCVVedit, isRender } = this.state;
        if(isRender==1){
            if (addCards.status === 0 && addCards.error != null) {
                let error_msg = '';
                error_msg = '<ul><li>' + addCards.error + '</li></ul>';
                jQuery('.error_div').html(error_msg);
                jQuery('.error_div').css({ display: "block" });
            } else if (addCards.status === 1) {
                this.addCreditCardModaltoggle();
                dispatch(getCardList());
                this.setState({ isRender: 0 });
                this.setState({
                    disabled:''
                })
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
        }
    }
    
    // Add Credit Card
    addCreditCardModalOpen = () => {
        this.setState({ addCreditCardModalShow: !this.state.addCreditCardModalShow });
    }
    addCreditCardModaltoggle = () => {
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
        if (txtCHN === '' || txtCHN.trim() === '') {
            jQuery('#txt_card_holder_name').css("cssText", "border: 2px solid red !important");
            jQuery('.txt_card_holder_name_errorMsg').html('This field is required');
            isError = 1;
        }
        
        if (txtCN === '' || txtCN.trim() === '') {
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
            this.setState({
                disabled:'disabled'
            })
            this.setState({ isRender:1 });           
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
            txtCNedit: '**** **** **** '+cardDetails.last4,
            txtCDedit: cardDetails.exp_month+'/'+cardDetails.exp_year,
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
            isRender:1,
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
                        <a href="javascript:void(0)" onClick={()=> this.editCreditCardModalOpen(obj)}><img src={editImg} alt="Edit" /></a>
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

    selecteCreditCard = (cardId) => {
        jQuery('.card-box i').addClass('light-bg');
        this.props.change('txt_card_id', cardId);
        jQuery('#card_box_' + cardId + ' i').removeClass('light-bg');
    }

    render() {
        const { handleSubmit, previousPage, cards, addCards, editCards, deleteCards, dispatch } = this.props;
        const { txtCHN, txtCN, txtCD, txtCVV, txtCHNedit, txtCNedit, txtCDedit, txtCVVedit } = this.state;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="right-box create-campaign d-flex">
                        <div className="create-campaign-l d-flex">
                            <div className="step-process d-flex">
                                <div className="process-point active completed"><a href="javascript:void(0)"></a><strong></strong></div>
                                <div className="process-point active completed"><a href="javascript:void(0)"></a><strong></strong></div>
                                <div className="process-point active current"><a href="javascript:void(0)"></a></div>
                            </div>
                            <div className="step-content d-flex">
                                <h2 style={{"font-weight":"600"}}>Step 3</h2>
                                <div className="wallet-card">
                                    {
                                        (cards.loading === true) ?
                                            <div className="card-box">
                                                <Facebook />
                                                <Code />
                                            </div>
                                            :
                                            (cards.status == 1 && cards.data != null) &&
                                            cards.data.map((obj, index) => (this.cardListDiv(obj)))
                                    }
                                    <div className="card-box add-card-box">
                                        <a className="cursor_pointer" onClick={this.addCreditCardModal}>
                                            <img src={plusImg} alt="Add Credit Card" />
                                            <strong>Add Credit Card</strong>
                                        </a>
                                    </div>
                                    <Field
                                        name="txt_card_id"
                                        type="hidden"
                                        label="Card Id"
                                        component={textField}
                                    />
                                </div>

                                <div className="submit-btn d-flex">
                                    <button type="button" onClick={previousPage} className="round-btn prev-btn">Previous</button>
                                    <button type="submit" className="round-btn next-btn btn_checkout_pay">Pay</button>
                                </div>
                            </div>
                        </div>
                        <OrderDetails />
                    </div>
                </form>

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
                                    <input type="text" name="txt_card_holder_name" id="txt_card_holder_name" placeholder="Name" value={txtCHN} onChange={(input) => this.onChange(input.target.name, input.target.value)}  autoFocus/>
                                    <span className="txt_card_holder_name_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap">
                                    <label>Card Number <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_card_number" id="txt_card_number" placeholder="Card Number" value={txtCN} onChange={(input) => this.onChange(input.target.name, input.target.value)} />
                                    <span className="txt_card_number_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="expiry-date d-flex">
                                    <div className="input-wrap select-wrap">
                                        <label>Expiry Date <span className="error-div">&nbsp;*</span></label>
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
                                    <button type="button" className="round-btn" onClick={() => this.submitCreditCard()} disabled={this.state.disabled}>Authorise</button>
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
                                    <input type="text" name="txt_card_holder_name_edit" id="txt_card_holder_name_edit" placeholder="Name" value={txtCHNedit} onChange={(input) => this.onChangeEdit(input.target.name, input.target.value)}/>
                                    <span className="txt_card_holder_name_edit_errorMsg" style={{ "color": "red" }}></span>
                                </div>
                                <div className="input-wrap">
                                    <label>Card Number <span className="error-div"> *</span></label>
                                    <input type="text" name="txt_card_number_edit" id="txt_card_number_edit" placeholder="Card Number" value={txtCNedit} readOnly="readonly"/>
                                </div>
                                <div className="expiry-date d-flex">
                                    <div className="input-wrap select-wrap">
                                        <label>Select Date <span className="error-div">&nbsp;*</span></label>
                                        <MonthPickerInput
                                            year={txtCDedit.split('/')[1]-0}
                                            month={(txtCDedit.split('/')[0]-1)}
                                            inputProps={{
                                                id: 'txt_card_date_edit',
                                                name: 'txt_card_date_edit',
                                            }}
                                            value={new Date()}
                                            onChange={
                                                (selectedMonth, selectedYear) =>
                                                    this.onChangeEdit('txt_card_date_edit',selectedMonth)
                                                    //this.onChangeEdit('txt_card_date_edit', selectedMonth + '/' + selectedYear)
                                            }
                                            closeOnSelect={true}
                                        />
                                        <span className="txt_card_date_edit_errorMsg" style={{ "color": "red" }}></span>
                                    </div>
                                    <div className="input-wrap">
                                        <label>CVV <span className="error-div"> *</span></label>
                                        <input type="password" name="txt_card_cvv_edit" id="txt_card_cvv_edit" placeholder="***" value={txtCVVedit} readOnly="readonly"/>
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


                {
                    this.state.delete_alert &&
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, stop it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="Are you sure?"
                        onConfirm={this.deleteCardFunc}
                        onCancel={this.hideDeleteAlert}
                    >
                        You will not be able to recover this data !
                    </SweetAlert>
                }
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
        deleteCards: checkout.get('deleteCards'),
        editCards: checkout.get('editCards'),
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'wizardCheckout',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(FormStep3));
