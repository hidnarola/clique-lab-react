import jQuery from 'jquery';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Pagination from "react-js-pagination";
import { withRouter } from 'react-router'
import { SubmissionError } from 'redux-form'
import { routeCodes } from '../../constants/routes';
import { imgRoutes } from '../../constants/img_path';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../../constants/usefulvar';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';
import CreateGroupForm from '../Forms/Group/CreateGroupForm';
import { sendReq, moreFilterReq, fetchDropDownReq, resetVal, addUserReq, bulkUserReq, forceRefresh } from '../../actions/everyDay';
import { getGroups, addGroups, resetGroupVal } from '../../actions/groups';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import nodataImg from 'img/site/nodata.png';
import plusImg from 'img/site/plus-sign.png';
import closeImg from 'img/site/close-2.png';


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
class AddToModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedOption: '',
            saveFor: '',
            userId: '',
            filter: '',
            isClick: true
        };
        this.toggle = this.toggle.bind(this);
        this.setSaveFor = this.setSaveFor.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillMount() {
        this.props.onRef(undefined);
    }

    setDefaultVal = () => {
        this.setState({ selectedOption: '' });
    }

    setSaveFor = (val, userId, filter = null) => {
        this.setState({ saveFor: val, userId: userId, filter: filter });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            //isClick:false
            isClick: false
        });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        if (selectedOption === null) {
            jQuery('.add_grp_popup_select .Select-control').css("cssText", "border: 2px solid red !important");
            jQuery('.add_grp_popup_select_errorMsg').html('This field is required');
        } else {
            jQuery('.add_grp_popup_select .Select-control').css("cssText", "border: 2px solid rgb(220, 223, 229) !important");
            jQuery('.add_grp_popup_select_errorMsg').html('');
        }
    }

    saveResult = () => {
        let { selectedOption, saveFor, userId, filter } = this.state;
        if (selectedOption === '' || selectedOption === null) {
            jQuery('.add_grp_popup_select .Select-control').css("cssText", "border: 2px solid red !important");
            jQuery('.add_grp_popup_select_errorMsg').html('This field is required');
        } else {
            this.props.saveResult(saveFor, selectedOption, userId, filter);
        }
    }

    render() {
        let dropArr = [];
        const { selectedOption } = this.state;

        if (this.props.dropdownList !== null) {
            let resultStatus = this.props.dropdownList.status;
            if (resultStatus === 1) {
                this.props.dropdownList.results.map((obj) => {
                    dropArr.push({ value: obj._id, label: obj.name });
                });
            }
        }

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} onClosed={this.props.resetDropVal} id="congratulations">
                    {/* <ModalHeader toggle={this.toggle}> */}
                    <div class="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg} onClick={() => this.toggle()} />
                    </div>
                    {/* </ModalHeader> */}
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2>Which Campaign/Group would you like to Offer the Selected People ? </h2>
                            <p>Please Select the Campaign/Group from the Dropdownlist,<br /> then click Accept and Continue.</p>
                            <div className="select-wrap">
                                <ReactSelect
                                    className='add_grp_popup_select campaign_form_step2_dropdown '
                                    name="form-field-name"
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={dropArr}
                                    placeholder="Please select from the dropdown"
                                />
                                <label className="add_grp_popup_select_errorMsg" style={{ "color": "red", "marginTop": "5px", "textAlign": "left" }}></label>
                            </div>
                            <a href="javascript:void(0)" className="round-btn" onClick={this.saveResult}>Accept & Continue</a>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const PlusAction = (props) => {
    return (
        <UncontrolledDropdown>
            <DropdownToggle>
                <img src={plusImg} alt="" />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => { props.addCampaign(); }}>Add to Campaign</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createGroupModalShow: false,
            messageModalPopup: false,
            dropdownOpen: false,
            activePage: 1,
            totalRecord: 1,
            loaderShow: false,
            is_inserted: 0,
            authorise_disabled: false,
            groupId: '',
            isPluseClick: false,
            sort_wise_pagination: '',
            load:false
        };

        this.createGroupModal = this.createGroupModalOpen.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this)
        this.createGroupSubmit = this.createGroupSubmit.bind(this);
    }

    componentWillMount() {
        const { dispatch,loading } = this.props;
        dispatch(getGroups({ "page_size": 12, "page_no": 1 }))
    }

    createGroupModalOpen() {
        this.setState({
            createGroupModalShow: !this.state.createGroupModalShow
        });
    }

    toggle() {
        this.setState({
            //dropdownOpen: !this.state.dropdownOpen
            createGroupModalShow: !this.state.createGroupModalShow,
        });
    }

    // createGroupSubmit = (values) => {
    createGroupSubmit(values) {
        this.setState({ authorise_disabled: true }, () => {
            const { dispatch } = this.props;
            if (values.images[0] && values.group_name) {
                const formData = new FormData();
                formData.append("name", values.group_name);
                formData.append("image", values.images[0]);
                this.setState({ is_inserted: 1 });
                dispatch(addGroups(formData));
            }
        });
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
        const { dispatch } = this.props;
        const { activePage, sort_wise_pagination } = this.state;
        // if (pageNumber !== this.state.activePage) {
        //     let newVar = {
        //         "sort": [{ "field": selectedOption.column, "value": parseInt(selectedOption.value) }],
        //         "page_size": 12,
        //         "page_no": pageNumber
        //     }
        //     dispatch(getGroups(newVar))
        // }
        if (pageNumber !== this.state.activePage) {
            if (sort_wise_pagination === '') {
                let newVar = {
                    "page_size": 12,
                    "page_no": pageNumber
                }
                dispatch(getGroups(newVar))
            }
            else {
                let newVar = {
                    "sort": [{ "field": sort_wise_pagination.column, "value": parseInt(sort_wise_pagination.value) }],
                    "page_size": 12,
                    "page_no": pageNumber
                }
                dispatch(getGroups(newVar))
            }
            // dispatch(getGroups(newVar))
        }
    }

    handleSorting = (selectedOption) => {
        const { dispatch } = this.props;
        const { activePage } = this.state;
        this.setState({ sort_wise_pagination: selectedOption });
        let newVar = {
            "sort": [{ "field": selectedOption.column, "value": parseInt(selectedOption.value) }],
            "page_size": 12,
            "page_no": 1
        }
        this.setState({ activePage: 1 });
        dispatch(getGroups(newVar));
    }

    resetDropVal = () => {
        const { dispatch } = this.props;
        this.child.setDefaultVal();
        dispatch(resetVal(null));
    }

    componentDidUpdate() {
        let { showDrop, userAdded, inserted_group, dispatch, group_status } = this.props;
        let { is_inserted, activePage } = this.state;

        if (showDrop) {
            this.child.toggle();
        }

        if (inserted_group != null && is_inserted == 1) {
            this.setState({
                is_inserted: 0,
                createGroupModalShow: false,
                activePage: 1
            });
            dispatch(getGroups({ "page_size": 12, "page_no": 1 }));
        }

        if (userAdded) {
            alert('User Has been Added');
            dispatch(resetVal({ 'userAdded': false }));
            dispatch(resetGroupVal());
        }
    }

    addCampaign = (obj) => {
        console.log('OBJ>>>',obj);
        const { dispatch,loading } = this.props;
        this.setState({
            groupId: obj._id
        });
        this.setState({ isPluseClick: true });
        
        this.setState({load:true},()=>{
            setTimeout(()=>{
                this.setState({load:false})
            },300);
        });

        this.child.setSaveFor('add_to_campaign', null);
        //dispatch(fetchDropDownReq({ "sendReqFor": "add_to_campaign" }));
        
        if(obj.total_member > 0)
        {
            dispatch(fetchDropDownReq({ "sendReqFor": "add_to_campaign" }));
        }

        setTimeout(() => {
            // if (this.props.dropdownList === null && this.props.loading === false) {
                //     alert('You don’t have a campaign yet.')
                // }
                //console.log('TOT_MEM:',obj.total_member);
                if(obj.total_member < 1 &&  this.props.dropdownList === null)
                {
                    alert('You don’t have members in group yet.')
                }
                else if(obj.total_member < 1)
                {
                    alert('You don’t have members in group yet.')
                }
                else if(this.props.dropdownList === null && this.props.loading === false) {
                    alert('You don’t have a campaign yet.')
                }
            },1500)
            

    }

    saveResult = (param1, param2, param3, param4, param5) => {
        let data = {
            param1,
            param2,
            param3,
            param4,
            param5: this.state.groupId
        }
        const { dispatch } = this.props;
        dispatch(addUserReq(data))
    }

    renderLi = (obj) => {

        return (
            <li key={Math.random()}>
                <div className="all-people-div">
                    <div className="all-people-img">
                        <div className="cursor_pointer" onClick={() => this.props.history.push(`${routeCodes.LISTGROUPS}/${obj._id}/members`)} style={{ "background": "url('" + imgRoutes.GROUP_IMG_PATH+'/'+obj.image + "') no-repeat 100%", "backgroundSize": "100%", "height": "190px" }}></div>
                        {/* <Link className="cursor_pointer" to={`${routeCodes.LISTGROUPS}/${obj._id}/members`}>
                            <img className="grp_list_img" src={`${imgRoutes.GROUP_IMG_PATH}${obj.image}`} alt="" />
                        </Link> */}

                        <div className="plus-people dropdown">
                            <PlusAction
                                addCampaign={() => { this.addCampaign(obj) }}
                            />
                        </div>
                    </div>
                    <div className="group-btm-content">
                        <h4>{obj.name}</h4>
                        <div className="group-btm-btm d-flex">
                            <div className="group-btm-l">
                                {/* <h5>Members <strong>2343</strong> </h5> */}
                                <h5>Members <strong>{obj.total_member}</strong> </h5>
                                <h5>Power <strong>{obj.social_power}</strong> </h5>
                            </div>
                            <div className="group-btm-r">
                                <h5>Activity rate <strong>75%</strong></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            // <li key={Math.random()}>
            //     <div className="all-people-div">
            //         <div className="all-people-img">
            //             <a >
            //                 <img src={sampleImg} alt="" />
            //             </a>
            //             <div className="plus-people dropdown">
            //                 <PlusAction
            //                     addCampaign={() => { this.addCampaign(obj) }}
            //                     addGroup={() => { this.addGroup(obj) }}
            //                     groupId={this.state.groupId}
            //                 />
            //             </div>
            //         </div>
            //         <div className="all-people-content d-flex">
            //             <h4>{obj.name}</h4>
            //             <DropDownSocial />
            //         </div>
            //     </div>
            // </li>
        );
    }

    render() {
        let { groups, totalGrps, loading, dropdownList } = this.props
        const { selectedOption, sort_wise_pagination } = this.state;

        const value = selectedOption && selectedOption.value;
        if (loading || this.state.load === true) {
            return (
                <div className="loader"></div>
            )
        }

        return (
            <div>
                <div className="group-head d-flex">
                    <h3>My Groups</h3>
                    <div className="group-head-r sort-date-btn">
                        <ul>
                            <li>
                                {(
                                    groups !== null &&
                                    <ReactSelect
                                        name="form-field-name"
                                        value={sort_wise_pagination.value}
                                        onChange={this.handleSorting}
                                        searchable={false}
                                        clearable={false}
                                        autosize={false}
                                        placeholder="Sort By Name"
                                        className="dropdown-inr"
                                        options={[
                                            { value: '1', label: 'Sort By Name', column: 'name' },
                                            { value: '-1', label: 'Sort By Date', column: 'created_at' },
                                        ]}
                                    />
                                )}
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
                            {(groups !== null) ? groups.map((obj, index) => (this.renderLi(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>}
                            {/* {
                                (groups !== null) ?
                                    groups.map(function (obj, i) {
                                        return (
                                            <li key={Math.random()}>
                                                <div className="all-people-div">
                                                    <div className="all-people-img">
                                                        <Link className="cursor_pointer" to={`${routeCodes.LISTGROUPS}/${obj._id}/members`}>
                                                            <img className="grp_list_img" src={`${imgRoutes.GROUP_IMG_PATH}${obj.image}`} alt="" />
                                                        </Link>
                                                        <div className="plus-people dropdown">
                                                            <PlusAction
                                                                addCampaign={() => { this.addCampaign(obj) }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="group-btm-content">
                                                        <h4>{obj.name}</h4>
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
                                        )
                                    })
                                    :
                                    <div className="no_data_found">
                                        <img src={nodataImg} />
                                    </div>
                            } */}
                        </ul>
                    </div>
                    {(
                        groups !== null && totalGrps > 6 && <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={12} // 12
                            totalItemsCount={totalGrps}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                    )}
                </div>

                <AddToModal onRef={ref => (this.child = ref)}
                    dropdownList={dropdownList}
                    resetDropVal={this.resetDropVal}
                    saveResult={this.saveResult} />

                {/* <Modal isOpen={this.state.createGroupModalShow} toggle={this.createGroupModalOpen} className={this.props.className} id="group-popup"> */}
                <Modal isOpen={this.state.createGroupModalShow} toggle={this.toggle} className={this.props.className} id="group-popup">
                    <button type="button" className="close" onClick={this.createGroupModal}>
                        {/* <img src="/assets/img/site/close-2.png" /> */}
                        <img src={closeImg} />
                    </button>
                    <h2>Create Group</h2>
                    <CreateGroupForm onSubmit={this.createGroupSubmit.bind(this)} submitDisabled={this.state.authorise_disabled} />
                </Modal>

                {/* <Modal isOpen={true} toggle={this.toggle} className={this.props.className} className="alertMessagePopup"  id="congratulations" backdrop={true}>
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2>No users available in this group!</h2>
                            <a className="round-btn cursor_pointer" href="javascript:void(0)" onClick={() => this.toggle()}>Ok</a>
                        </div>
                    </ModalBody>
                </Modal> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { everyDay, groups } = state;
    return {
        loading: groups.get('loading'),
        error: groups.get('error'),
        inserted_group: groups.get('inserted_group'),
        groups: groups.get('groups'),
        totalGrps: groups.get('totalGrps'),
        status: groups.get('status'),
        message: groups.get('message'),
        dropdownList: everyDay.get('dropdownList'),
        showDrop: everyDay.get('showDrop'),
        userAdded: everyDay.get('userAdded'),
    }
}

export default connect(mapStateToProps)(withRouter(GroupList));