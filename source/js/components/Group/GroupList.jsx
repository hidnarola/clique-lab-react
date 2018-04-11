import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SubmissionError } from 'redux-form'
import { routeCodes } from '../../constants/routes';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../../constants/usefulvar';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import CreateGroupForm from '../Forms/Group/CreateGroupForm';

const validate = values => {
    const errors = {}
    return errors
}

const textField = (
    { input, type, label, placeholder, meta: { touched, error } }
) => (
        <div className={cx('input-wrap', { 'custom-error': (touched && error) ? true : false })}>
            <label>{label}</label>
            <input {...input} placeholder={placeholder} type={type} />
            {touched && ((error && <span>{error}</span>))}
        </div>
    )

const textareaField = (
    { input, label, placeholder, meta: { touched, error } }
) => (
        <div className={cx('input-wrap textarea-wrap', { 'custom-error': (touched && error) ? true : false })}>
            <label>{label}</label>
            <textarea {...input} placeholder={placeholder}></textarea>
            {touched && ((error && <span>{error}</span>))}
        </div>
    )

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createGroupModalShow: false,
            dropdownOpen: false
        };
        this.createGroupModal = this.createGroupModalOpen.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    createGroupModalOpen() {
        this.setState({
            createGroupModalShow: !this.state.createGroupModalShow
        });
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    render() {
        return (
            <div>
                <div className="group-head d-flex">
                    <h3>My Groups</h3>
                    <div className="group-head-r">
                        <ul>
                            <li className="dropdown sort-by">
                                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort<strong>by Power</strong> <i className="dropdown-arrow"></i></a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#">Add to Campaign</a>
                                </div>
                            </li>
                            <li className="create-group">
                                <a className="cursor_pointer" onClick={this.createGroupModal}>Create Group</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="every-people">
                    <div className="all-people">
                        <ul className="all-people-ul d-flex">
                            <li>
                                <div className="all-people-div">
                                    <div className="all-people-img">
                                        <a href=""><img src="/assets/img/site/people-01.jpg" alt="" /></a>
                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="plus-people dropdown">
                                            <DropdownToggle>
                                                <a className="cursor_pointer"><img src="/assets/img/site/plus-sign.png" alt="" /></a>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="#">Add to Campaign</a>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
                                    <div className="group-btm-content">
                                        <h4>Top influencers for skincare range</h4>
                                        <div className="group-btm-btm d-flex">
                                            <div className="group-btm-l">
                                                <h5>Members <strong>2343</strong> </h5>
                                                <h5>Power <strong>34.3k</strong> </h5>
                                            </div>
                                            <div className="group-btm-r">
                                                <h5>Activity rate <strong>75%</strong></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="all-people-div">
                                    <div className="all-people-img">
                                        <a href=""><img src="/assets/img/site/people-02.jpg" alt="" /></a>
                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="plus-people dropdown">
                                            <DropdownToggle>
                                                <a className="cursor_pointer"><img src="/assets/img/site/plus-sign.png" alt="" /></a>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="#">Add to Campaign</a>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
                                    <div className="group-btm-content">
                                        <h4>Top influencers for skincare range</h4>
                                        <div className="group-btm-btm d-flex">
                                            <div className="group-btm-l">
                                                <h5>Members <strong>2343</strong> </h5>
                                                <h5>Power <strong>34.3k</strong> </h5>
                                            </div>
                                            <div className="group-btm-r">
                                                <h5>Activity rate <strong>75%</strong></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <Modal isOpen={this.state.createGroupModalShow} toggle={this.createGroupModalOpen} className={this.props.className} id="group-popup">
                    <button type="button" class="close" onClick={this.createGroupModal}>
                        <img src="/assets/img/site/close-2.png" />
                    </button>
                    <h2>Create Group</h2>
                    <CreateGroupForm />
                </Modal>
            </div>
        );
    }
}

export default connect(state => ({

}))(GroupList)