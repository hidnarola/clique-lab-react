import jQuery from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { sendReq, moreFilterReq, fetchDropDownReq, resetVal, addUserReq, bulkUserReq, forceRefresh } from '../actions/everyDay';
import { purchaseAll } from '../actions/campaign';
import { getGroups, addGroups, resetGroupVal } from '../actions/groups';
import sampleImg from 'img/site/400x218.png';
import closeImg from 'img/site/close.png';
import closeImg2 from 'img/site/close-2.png';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';
import instaImg from 'img/site/instagram.png';
import nodataImg from 'img/site/nodata.png';
import { Redirect, withRouter } from 'react-router';

import imgPlus from 'img/site/plus-01.png';
import CreateGroupForm from '../components/Forms/Group/CreateGroupForm';
import ReactSelect from 'react-select';
import InputRange from 'react-input-range';
import _ from 'lodash';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom';
import { routeCodes } from '../constants/routes';
import img1 from 'img/site/big-img011.jpg';
import { imgRoutes } from '../constants/img_path';
import { isImageExists } from '../constants/helper';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from 'reactstrap';
import { select } from 'redux-saga/effects';

class AddToModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedOption: '',
            saveFor: '',
            userId: '',
            filter: ''
        };
        this.toggle = this.toggle.bind(this);
        this.setSaveFor = this.setSaveFor.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillMount() {
        //this.props.onRef(undefined);
    }

    setDefaultVal = () => {
        this.setState({ selectedOption: '' });
    }

    setSaveFor = (val, userId, filter = null) => {
        this.setState({ saveFor: val, userId: userId, filter: filter });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
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
                {/* {(this.props.test === false) ? */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} onClosed={this.props.resetDropVal} id="congratulations">
                    <div class="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.toggle()} />
                    </div>
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
                                <label className="add_grp_popup_select_errorMsg" style={{ "color": "red", "margin-top": "5px", "text-align": "left" }}></label>
                            </div>
                            <a href="javascript:void(0)" className="round-btn" onClick={this.saveResult}>Accept & Continue</a>
                        </div>

                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

const DropDownSocial = () => {
    return (
        <UncontrolledDropdown direction="up">
            <DropdownToggle caret>
                1036 Follower
                <i className="dropdown-arrow"></i>
            </DropdownToggle>
            <DropdownMenu>
                <ul>
                    <li>
                        <a >
                            <i>
                                <img src={fbImg} alt="" />
                            </i>
                            <span>823</span>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i>
                                <img src={linkedImg} alt="" />
                            </i>
                            <span>1.1k</span>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i>
                                <img src={pinImg} alt="" />
                            </i>
                            <span>432</span>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i>
                                <img src={twitterImg} alt="" />
                            </i>
                            <span>240</span>
                        </a>
                    </li>
                    <li>
                        <a >
                            <i>
                                <img src={instaImg} alt="" />
                            </i>
                            <span>240</span>
                        </a>
                    </li>
                </ul>
                <div className="close-div">
                    <DropdownItem>
                        <img src={closeImg} alt="" />
                    </DropdownItem>
                </div>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

const PlusAction = (props) => {
    return (
        <UncontrolledDropdown>
            <DropdownToggle>
                <img src={imgPlus} alt="" />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => { props.addCampaign(); }}>
                    Add to Campaign
                </DropdownItem>
                {
                    (props.groupId) ?
                        '' : <DropdownItem onClick={() => { props.addGroup(); }}>
                            Add to Group
                            </DropdownItem>
                }
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

const PlusAction2 = (props) => {
    return (
        <UncontrolledDropdown className="festival-ftr-r dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src={imgPlus} alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item cursor_pointer" onClick={() => { props.addToCart(); }}>Add to Cart</a>
                <a className="dropdown-item cursor_pointer" onClick={() => { props.addGroup(); }}>Add user to Group</a>
                <a className="dropdown-item cursor_pointer" onClick={() => { props.modifyStatusPurchase(); }}>Modify status and purchase</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

const AgeDropDown = (props) => {
    // <UncontrolledDropdown>
    return (
        <Dropdown isOpen={props.open} toggle={props.toggle}>
            <DropdownToggle caret >
                Age{/* Age {" "} {props.currentVal.min}-{props.currentVal.max} */}
            </DropdownToggle>
            <DropdownMenu>

                <div className="morefilter-div">
                    <label htmlFor="">
                        Age Group
                    </label>
                    <div className="range-wrapper">
                        <InputRange
                            maxValue={65}
                            minValue={15}
                            value={props.currentVal}
                            onChange={value => props.parentMethod(value)}
                        />
                        <div className="range-div">{props.currentVal.min}-{props.currentVal.max}</div>
                    </div>
                </div>

                <div className="ftr-btn">
                    <button className="bdr-btn" onClick={() => props.setAgeFilter()} >Apply</button>
                </div>
            </DropdownMenu>
        </Dropdown>);
}

const MoreFilterDropDown = (props) => {

    let jobIndustryArr = []; let jobTitleArr = [];
    let yearInIndustryArr = []; let educationArr = [];
    let languageArr = []; let ethnicityArr = [];
    let musicTasteArr = [];

    if (props.moreFilterData !== null) {

        props.moreFilterData.job_industry.map((obj) => {
            jobIndustryArr.push({ 'value': obj._id, label: obj.name });
        });

        props.moreFilterData.job_title.map((obj) => {
            jobTitleArr.push({ 'value': obj._id, label: obj.job_title });
        });

        for (let i = 1; i <= 20; i++) {
            yearInIndustryArr.push({ 'value': i, label: i })
        }

        props.moreFilterData.education.map((obj) => {
            educationArr.push({ 'value': obj._id, label: obj.name });
        });

        props.moreFilterData.language.map((obj) => {
            languageArr.push({ 'value': obj._id, label: obj.name });
        });

        props.moreFilterData.ethnicity.map((obj) => {
            ethnicityArr.push({ 'value': obj._id, label: obj.ethnicity });
        });

        props.moreFilterData.music_taste.map((obj) => {
            musicTasteArr.push({ 'value': obj._id, label: obj.name });
        });

    }
    // <UncontrolledDropdown className="MoreFilterLi">
    return (<Dropdown isOpen={props.open} toggle={props.toggle} className="MoreFilterLi stats_filter_li4">
        <DropdownToggle caret >
            More Filter {" "}
        </DropdownToggle>
        <DropdownMenu flip>
            <div className="d-flex">
                <div className="col-md-4">
                    <div className="morefilter-div">
                        <label htmlFor="">
                            Facebook friends
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['facebook']['value']}
                                onChange={value => props.parentSliderMethod(value, "facebook")}
                            />
                            <div className="range-div">{props.allSliderArr['facebook']['value']['min']}-{props.allSliderArr['facebook']['value']['max']}</div>
                        </div>
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Instagram Followers
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['instagram']['value']}
                                onChange={value => props.parentSliderMethod(value, "instagram")}
                            />
                            <div className="range-div">
                                {props.allSliderArr['instagram']['value']['min']}
                                -
                                {props.allSliderArr['instagram']['value']['max']}
                            </div>
                        </div>
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Twitter Followers
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['twitter']['value']}
                                onChange={value => props.parentSliderMethod(value, "twitter")}
                            />
                            <div className="range-div">
                                {props.allSliderArr['twitter']['value']['min']}
                                -
                                {props.allSliderArr['twitter']['value']['max']}
                            </div>
                        </div>
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Pinterest Followers
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['pinterest']['value']}
                                onChange={value => props.parentSliderMethod(value, "pinterest")}
                            />
                            <div className="range-div">
                                {props.allSliderArr['pinterest']['value']['min']}
                                -
                                {props.allSliderArr['pinterest']['value']['max']}
                            </div>
                        </div>
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Linkedin Connections
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['linkedin']['value']}
                                onChange={value => props.parentSliderMethod(value, "linkedin")}
                            />
                            <div className="range-div">
                                {props.allSliderArr['linkedin']['value']['min']}
                                -
                                {props.allSliderArr['linkedin']['value']['max']}
                            </div>
                        </div>
                    </div>


                </div>

                <div className="col-md-4">
                    <div className="morefilter-div">
                        <label htmlFor="">
                            Job Industry
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="jobIndustryDrop"
                            value={props.allDropArr['jobIndustryDrop']['value']}
                            onChange={(value) => props.parentMethod(value, "jobIndustryDrop")}
                            searchable={false} clearable={false} autosize={false}
                            options={jobIndustryArr}
                            placeholder="Select from Dropdown"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Job Title
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="jobTitleDrop"
                            value={props.allDropArr['jobTitleDrop']['value']}
                            onChange={(value) => props.parentMethod(value, "jobTitleDrop")}
                            searchable={false} clearable={false} autosize={false}
                            options={jobTitleArr}
                            placeholder="Type from Dropdown"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Year in the industry
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="yearInIndustryArr"
                            value={props.allDropArr['yearInIndustry']['value']}
                            onChange={(value) => props.parentMethod(value, "yearInIndustry")}
                            searchable={false} clearable={false} autosize={false}
                            options={yearInIndustryArr}
                            placeholder="Select from Dropdown"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Education Level
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="education"
                            value={props.allDropArr['education']['value']}
                            onChange={(value) => props.parentMethod(value, "education")}
                            searchable={false} clearable={false} autosize={false}
                            options={educationArr}
                            placeholder="Select from Dropdown"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Language spoken
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="language"
                            value={props.allDropArr['language']['value']}
                            onChange={(value) => props.parentMethod(value, "language")}
                            searchable={false} clearable={false} autosize={false}
                            options={languageArr}
                            placeholder="Select from Dropdown"
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="morefilter-div">
                        <label htmlFor="">
                            Ethnicity
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="ethnicity"
                            value={props.allDropArr['ethnicity']['value']}
                            onChange={(value) => props.parentMethod(value, "ethnicity")}
                            searchable={false} clearable={false} autosize={false}
                            options={ethnicityArr}
                            placeholder="Select from Dropdown"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Sexual orientation
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="sexualOrientation"
                            value={props.allDropArr['sexualOrientation']['value']}
                            onChange={(value) => props.parentMethod(value, "sexualOrientation")}
                            searchable={false} clearable={false} autosize={false}
                            options={[
                                { 'value': 'male', label: "Male" },
                                { 'value': 'female', label: "Female" },
                                { 'value': 'both', label: "Both" }
                            ]}
                            placeholder="Select from Dropdown"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Relationship status
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="relationship"
                            value={props.allDropArr['relationship']['value']}
                            onChange={(value) => props.parentMethod(value, "relationship")}
                            searchable={false} clearable={false} autosize={false}
                            options={[
                                { 'value': 'Married', label: "Married" },
                                { 'value': 'Unmarried', label: "Unmarried" },
                                { 'value': 'Single', label: "Single" }
                            ]}

                            placeholder="Select from Dropdown"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Music tastes
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="musicTaste"
                            value={props.allDropArr['musicTaste']['value']}
                            onChange={(value) => props.parentMethod(value, "musicTaste")}
                            searchable={false} clearable={false} autosize={false}
                            options={musicTasteArr}
                            placeholder="Select from Dropdown"
                        />
                    </div>
                </div>
            </div>
            <div className="ftr-btn">
                <button className="more-cancel-btn" onClick={() => props.toggle()} >Cancel</button>
                <button className="bdr-btn" onClick={() => props.applyMoreFilter()} >Apply</button>
            </div>
        </DropdownMenu>
    </Dropdown>

    )
}
{/* </UncontrolledDropdown>); */ }

class EverydayPeople extends Component {

    static displayName = 'SRK';

    constructor(props) {
        super(props);
        this.state = {
            perPageItem: 12,
            modal: false,
            activePage: 1,
            loaderShow: false,
            is_inserted: 0,
            groupId: '',
            authorise_disabled: false,
            forceRefreshed: false,
            groupForceRefreshed: false,
            modifyStatusPurchase: false,
            allDropDown: [
                { 'dropdown': 'jobIndustryDrop', 'value': false },
                { 'dropdown': 'jobTitleDrop', 'value': false },
                { 'dropdown': 'yearInIndustry', 'value': false },
                { 'dropdown': 'education', 'value': false },
                { 'dropdown': 'language', 'value': false },
                { 'dropdown': 'ethnicity', 'value': false },
                { 'dropdown': 'sexualOrientation', 'value': false },
                { 'dropdown': 'relationship', 'value': false },
                { 'dropdown': 'musicTaste', 'value': false },

                { 'dropdown': 'genderDrop', 'value': false },
                { 'dropdown': 'sortDrop', 'value': { value: 1, label: "Name ASC" } },
            ],

            allSliders: [
                { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                { 'slider': 'ageRange', 'value': { min: 15, max: 65 } },
            ],

            appliedFilter: [
                {
                    "filter": [] // {"field":"gender","type":"exact","value":"female"}
                }
            ],

            isMoreFilterSelected: false,
            isAgeFilterSelected: false,
            isGenderFilterSelected: false,
            isSortApply: false,
            isFilterApply: false,
            more_filter_open: false,
            age_filter_open: false,
            isMoreFilterApply: false,
            isAgeFilterApply: false,
            showCamp: false
        };
        // this.toggle = this.toggle.bind(this);  
        this.more_filter_toggle = this.more_filter_toggle.bind(this);
        this.age_filter_toggle = this.age_filter_toggle.bind(this);
    }

    more_filter_toggle() {
        this.setState({
            more_filter_open: !this.state.more_filter_open,
        })

        if (this.state.isMoreFilterApply !== true) {
            this.setState({
                allDropDown: [
                    { 'dropdown': 'jobIndustryDrop', 'value': false },
                    { 'dropdown': 'jobTitleDrop', 'value': false },
                    { 'dropdown': 'yearInIndustry', 'value': false },
                    { 'dropdown': 'education', 'value': false },
                    { 'dropdown': 'language', 'value': false },
                    { 'dropdown': 'ethnicity', 'value': false },
                    { 'dropdown': 'sexualOrientation', 'value': false },
                    { 'dropdown': 'relationship', 'value': false },
                    { 'dropdown': 'musicTaste', 'value': false },

                    { 'dropdown': 'genderDrop', 'value': false },
                    { 'dropdown': 'sortDrop', 'value': { value: 1, label: "Name ASC" } },
                ],

                allSliders: [
                    { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                    { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                    { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                    { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                    { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                    { 'slider': 'ageRange', 'value': { min: 15, max: 65 } },
                ]
            })
        }
    }

    age_filter_toggle() {
        this.setState({
            age_filter_open: !this.state.age_filter_open
        });
    }

    filterSendReq = (data) => {
        const { dispatch, match } = this.props;
        data['groupId'] = match.params.grpId;
        data['campaignId'] = match.params.campaignId;
        data['inspired'] = (match.path == routeCodes.CAMPAIGN_INSPIRED_SUB) ? true : false;
        dispatch(sendReq(data));
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        const { dispatch } = this.props;

        let sortDropArr = _.find(this.state.allDropDown, function (o) { return o.dropdown == 'sortDrop'; });

        let arrayFilter = {
            filter: this.state.appliedFilter[0]['filter'],
            "sort": [{ "field": "name", "value": parseInt(sortDropArr['value']['value']) }],
            "page_size": this.state.perPageItem,
            "page_no": pageNumber
        }
        if (pageNumber !== this.state.activePage) {
            this.filterSendReq(arrayFilter);
        }
    }

    handleChange = (selectedOption, secondParam) => {

        console.log('>>', selectedOption);
        if (selectedOption === null) {
            return;
        }
        const { dispatch } = this.props;
        let { appliedFilter } = this.state;

        let allDropDown = this.state.allDropDown;
        let index = _.findIndex(allDropDown, { dropdown: secondParam });
        allDropDown.splice(index, 1, { dropdown: secondParam, value: selectedOption });
        this.setState({ allDropDown: allDropDown });

        if (secondParam == 'genderDrop') {

            let dropDownIndex = _.findIndex(appliedFilter[0]['filter'], function (o) { return o.field == 'gender'; });
            let filteredArr = appliedFilter[0]['filter'];

            // Check if age filter is applied or not...
            if (dropDownIndex === -1) {
                filteredArr.push({ "field": 'gender', "type": "exact", "value": selectedOption['value'] }, )
                this.setState({ 'appliedFilter': [{ 'filter': filteredArr }] });
            } else {
                let arrIndex = _.findIndex(filteredArr, { "field": 'gender' });
                filteredArr.splice(arrIndex, 1, { "field": 'gender', "type": "exact", "value": selectedOption['value'] });
                this.setState({ 'appliedFilter': [{ 'filter': filteredArr }] });
            }

            let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });

            let arrayFilter = {
                filter: filteredArr,
                "sort": [{ "field": "name", "value": parseInt(sortDropArr['value']['value']) }],
                "page_size": this.state.perPageItem,
                "page_no": 1
            }
            this.setState({ "activePage": 1 });
            this.filterSendReq(arrayFilter);
        }

        if (secondParam == 'sortDrop') {

            let arrayFilter = {
                filter: this.state.appliedFilter[0]['filter'],
                "sort": [{ "field": "name", "value": parseInt(selectedOption['value']) }],
                "page_size": this.state.perPageItem,
                "page_no": 1
            }
            this.setState({ "activePage": 1 });
            this.filterSendReq(arrayFilter);
        }
    }

    handleSLider = (selectedOption, secondParam) => {
        let { allSliders } = this.state;
        let index = _.findIndex(allSliders, { slider: secondParam });
        allSliders.splice(index, 1, { slider: secondParam, value: selectedOption });
        this.setState({ allSliders: allSliders });
    }

    addCampaign = (obj) => {
        const { dispatch, dropdownList } = this.props;
        this.child.setSaveFor('campaign', obj._id);
        dispatch(fetchDropDownReq({ "sendReqFor": "campaign", "uId": obj._id }));

        setTimeout(()=>{
            if (this.props.dropdownList === null && this.props.loading === false) {
            alert('There is no campaigns to add people.')
        }
        },2000)
    }

    addGroup = (obj) => {
        const { dispatch } = this.props;
        this.child.setSaveFor('group', obj._id);
        dispatch(fetchDropDownReq({ "sendReqFor": "group", "uId": obj._id }));

        setTimeout(()=>{
            if (this.props.dropdownList === null && this.props.loading === false) {
                alert('There is no groups to add people.')
            }
        },2000)
        
    }

    addToCart = (camp_id, user_id) => {
        const { dispatch, match } = this.props;
        let data = {
            'param1': 'cart',
            'param2': {
                'value': camp_id
            },
            'param3': user_id
        }
        dispatch(addUserReq(data));
    }

    modifyStatusPurchase = (camp_id, user_id) => {
        const { dispatch, match } = this.props;
        let data = {
            'param1': 'cart',
            'param2': {
                'value': camp_id
            },
            'param3': user_id
        }
        this.setState({ modifyStatusPurchase: true });
        dispatch(addUserReq(data));
    }

    purchaseResult = () => {
        const { dispatch, match } = this.props;
        let { appliedFilter } = this.state;
        let arrayFilter = {
            'filter': appliedFilter[0]['filter'],
            'campaignId': match.params.campaignId
        };
        dispatch(purchaseAll(arrayFilter));
        // this.setState({"activePage":1});
        // this.filterSendReq(arrayFilter);
    }

    renderLi = (obj) => {
        let img = '';
        if (obj.is_image == 0) {
            img = obj.image;
        } else {
            img = imgRoutes.USER_IMG_PATH + obj.image;
        }
        return (
            <li key={Math.random()}>
                <div className="all-people-div">
                    <div className="all-people-img" style={{ "background": "url('" + img + "') no-repeat 100%", "backgroundSize": "100%", "height": "190px" }}>
                        {/* <a>
                            {
                                (obj.is_image == 0) ?
                                    <img src={obj.image} style={{ "height": "190px" }} />
                                    :
                                    <img src={imgRoutes.USER_IMG_PATH + obj.image} style={{ "height": "190px" }} />
                            }
                        </a> */}
                        <div className="plus-people dropdown">
                            <PlusAction
                                addCampaign={() => { this.addCampaign(obj) }}
                                addGroup={() => { this.addGroup(obj) }}
                                groupId={this.state.groupId}
                            />
                        </div>
                    </div>
                    <div className="all-people-content d-flex">
                        <h4>{obj.name}</h4>
                        <DropDownSocial />
                    </div>
                </div>
            </li>
        );
    }

    renderLi2 = (obj) => {
        let mediaImg = {
            'facebook': fbImg,
            'linkedin': linkedImg,
            'instagram': instaImg,
            'pinterest': pinImg,
            'twitter': twitterImg,
        };
        //image_1527067777875.jpg
        return (
            <li key={Math.random()}>
                <div className="fan-festival-box">
                    <div className="festival-head d-flex">
                        <div className="festival-head-l">
                            <span>
                                <img src={imgRoutes.USER_IMG_PATH+obj.user_avatar}/>
                            </span>
                            <h3>
                                <big>{obj.user_name}</big>
                                {/* <small>{obj.country !== undefined && obj.suburb + ', ' + obj.country.name}</small> */}
                                <small>{ obj.location!==undefined && obj.location }</small>
                            </h3>
                        </div>
                        <div className="festival-head-r"><h3>$ {(obj.price).toFixed(2)}</h3></div>
                    </div>
                    <div className="festival-img">
                        {/* <img src="http://placehold.it/450x215" alt="" /> */}
                        <img src={ imgRoutes.CAMPAIGN_POST_IMG_PATH+obj.applied_post_image } />
                    </div>
                    <div className="festival-body">
                        <h2>
                            { obj.applied_post_description} &nbsp;
                            {/* { (obj.at_tag) && (obj.at_tag).map(function(e){ return <a href='javascript:void(0)' >{'@'+e+' '}</a>; }) }
                            { (obj.hash_tag) && (obj.hash_tag).map(function(e){ return <a href='javascript:void(0)' >{'#'+e+' '}</a>; }) } */}
                        </h2>
                    </div>
                    <div className="festival-ftr d-flex">
                        <div className="festival-ftr-l">
                            <a href="javascript:void(0)"><i><img src={mediaImg[obj.social_media_platform]} alt="" /></i><strong>0</strong></a>
                        </div>
                        <div className="festival-ftr-r dropdown">
                            <PlusAction2
                                // addToCart={() => { this.addToCart(obj.campaign_id, obj.user_id) }}
                                addToCart={() => { this.addToCart(obj.campaign_id, obj.applied_post_id) }}
                                addGroup={() => { this.addGroup(obj) }}
                                modifyStatusPurchase={() => { this.modifyStatusPurchase(obj.campaign_id, obj.user_id) }}
                            />
                        </div>
                    </div>
                </div>
            </li>
        );
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderLi3 = (obj) => {
        let img = imgRoutes.CAMPAIGN_IMG_PATH + obj.image;
        if (!isImageExists(img)) {
            img = 'http://placehold.it/465x300/ececec/525f7f?text=No Image Found';
        }
        return (
            <li key={Math.random()}>
                <div className="fan-festival-box d-flex">
                    <div className="festival-img"><img src={img} alt="" /></div>
                    <div className="fan-festival-r">
                        <div className="festival-head d-flex">
                            <div className="festival-head-l">
                                <span></span>
                                <h3>
                                    <big>{obj.users.name}</big>
                                    <small>{obj.users.email}</small>
                                    {/* <small>Bondi Beach, Sydney, Australia</small> */}
                                </h3>
                            </div>
                            <div className="festival-head-r"><h3>${(obj.price).toFixed(2)}</h3></div>
                        </div>
                        <div className="festival-body">
                            <h2>Make up by morning. boyfriends happy, what a life I lead! <a href="">@thegrocer #morning #earlyriser #excited #sponsored</a></h2>
                        </div>
                        <div className="festival-ftr d-flex">
                            <div className="festival-ftr-l"><a href=""><i><img src={fbImg} alt="" /></i><strong>823M</strong></a></div>
                            <div className="festival-ftr-r dropdown">
                                <PlusAction2
                                    addToCart={() => { this.addToCart(obj._id, obj.users._id) }}
                                    addGroup={() => { this.addGroup(obj) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

    componentWillUpdate = (nextProps, nextState) => {

        const { dispatch, match } = nextProps;
        const { forceRefreshed, groupForceRefreshed } = this.state;

        //  if(forceRefreshed && !match.params.campaignId) {
        //     this.setState({ groupId: '' });
        //     if (match.params.grpId) {
        //         this.setState({ groupId: match.params.grpId});
        //     }

        //     if (match.params.campaignId ) {
        //         this.setState({ forceRefreshed: true });
        //     }

        //     let arrayFilter = {
        //         "page_size": this.state.perPageItem,
        //         "page_no": 1,
        //         groupId: match.params.grpId
        //     }
        //     this.filterSendReq(arrayFilter);
        //     dispatch(moreFilterReq());
        //     this.setState({ forceRefreshed: false });
        // }


        if ((forceRefreshed && !match.params.campaignId) || (groupForceRefreshed && !match.params.grpId)) {
            this.setState({ groupId: '' });
            if (match.params.grpId) {
                this.setState({ groupId: match.params.grpId, groupForceRefreshed: true });
            }

            if (match.params.campaignId) {
                this.setState({ forceRefreshed: true });
            }

            let arrayFilter = {
                "page_size": this.state.perPageItem,
                "page_no": 1,
                groupId: match.params.grpId
            }
            this.filterSendReq(arrayFilter);
            dispatch(moreFilterReq());
            this.setState({ forceRefreshed: false, groupForceRefreshed: false });
        }

    }

    test() {
        const { dispatch, match } = this.props;
        this.setState({ groupId: '' });
        if (match.params.grpId) {
            this.setState({ groupId: match.params.grpId, groupForceRefreshed: true });
        }
        if (match.params.campaignId) {
            this.setState({ forceRefreshed: true });
        }

        let arrayFilter = {
            "page_size": this.state.perPageItem,
            "page_no": 1,
            groupId: match.params.grpId
        }
        this.setState({ forceRefreshed: true });
        this.filterSendReq(arrayFilter);
        dispatch(moreFilterReq());
    }

    componentWillMount() {

        const { dispatch, match } = this.props;
        this.setState({ groupId: '' });
        if (match.params.grpId) {
            this.setState({ groupId: match.params.grpId, groupForceRefreshed: true });
        }
        if (match.params.campaignId) {
            this.setState({ forceRefreshed: true });
        }

        let arrayFilter = {
            "page_size": this.state.perPageItem,
            "page_no": 1,
            groupId: match.params.grpId
        }
        this.setState({ forceRefreshed: true });
        this.filterSendReq(arrayFilter);
        dispatch(moreFilterReq());
    }

    componentDidUpdate() {
        let { showDrop, userAdded, dispatch, inserted_group, group_status } = this.props;
        let { is_inserted, modifyStatusPurchase } = this.state

        if (showDrop) {
            this.child.toggle();
        }

        if (inserted_group != null && is_inserted == 1) {
            this.setState({ is_inserted: 0 });
            this.setState({ modal: false });

            let param1 = 'add_to_group';
            let param2 = { value: inserted_group._id, label: inserted_group.name };
            let param3 = null;
            let param4 = this.state.appliedFilter[0];
            let param5 = this.state.groupId;
            console.log('=================================');
            console.log(inserted_group);
            console.log(group_status);
            console.log('=================================');
            this.saveResult(param1, param2, param3, param4, param5);
        }

        if (modifyStatusPurchase) {
            this.setState({ modifyStatusPurchase: false });
            this.props.history.push(routeCodes.MY_CART);
        }

        if (userAdded) {
            alert('User has been added');
            dispatch(resetVal({ 'userAdded': false }));
            dispatch(resetGroupVal());
        }

    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(resetVal({ 'userListing': false }));
    }

    setAgeValue(value) {
        this.setState({ ageRange: { min: value.min, max: value.max } });
    }

    setAgeFilter = () => {

        const { allSliders, appliedFilter, allDropDown } = this.state;
        const { dispatch } = this.props;

        let ageFilterIndex = _.findIndex(appliedFilter[0]['filter'], function (o) { return o.field == 'age'; });
        let ageVal = _.find(allSliders, function (o) { return o.slider == 'ageRange'; });

        let filteredArr = appliedFilter[0]['filter'];

        // Check if age filter is applied or not...
        if (ageFilterIndex === -1) {
            filteredArr.push({ "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] })
            this.setState({ 'appliedFilter': [{ 'filter': filteredArr }] });
        } else {
            let arrIndex = _.findIndex(filteredArr, { "field": "age" });
            filteredArr.splice(arrIndex, 1, { "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] }, );
            this.setState({ 'appliedFilter': [{ 'filter': filteredArr }] });
        }

        let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });

        let arrayFilter = {
            "filter": this.state.appliedFilter[0]['filter'],
            "sort": [{ "field": "name", "value": parseInt(sortDropArr['value']['value']) }],
            "page_size": this.state.perPageItem,
            "page_no": 1
        }
        this.setState({ "activePage": 1 });
        this.filterSendReq(arrayFilter);

        this.age_filter_toggle();
        // this.setState({isAgeFilterSelected:true});
        this.setState({
            isAgeFilterApply: true
        })
    }

    applyMoreFilter = () => {

        const { allDropDown, allSliders, appliedFilter } = this.state;
        const { dispatch } = this.props;

        let allDropArr = _.filter(allDropDown, function (o) { return ((o.dropdown !== 'sortDrop') && (o.dropdown !== 'genderDrop') && (o.value !== false)); });
        let allSliderArr = _.filter(allSliders, function (o) { return (o.slider !== 'ageRange'); });

        let filterExistingArr = [];

        // let exstingFilter = Object.assign({},this.state.appliedFilter[0]['filter']);
        let exstingFilter = this.state.appliedFilter[0]['filter'];

        _.remove(exstingFilter, function (o) {
            return (
                (o.field === 'job_industry') || (o.field === 'year_in_industry') || (o.field === 'education') ||
                (o.field === 'language') || (o.field === 'ethnicity') || (o.field === 'interested_in') ||
                (o.field === 'relationship_status') || (o.field === 'music_taste'
                    // || (o.field === 'fb_friends') || 
                    // (o.field === 'insta_followers') || 
                    // (o.field === 'twitter_followers') || 
                    // (o.field === 'pinterest_followers')|| 
                    // (o.field === 'linkedin_connection')
                )
            );

        });

        const exstingFilterArr = Object.keys(exstingFilter).map(i => exstingFilter[i])

        console.log('====== exstingFilter ==========');
        console.log(exstingFilterArr);
        console.log('====== exstingFilter ==========');


        // allSliderArr.map((obj,index) => {
        //     let fieldText = '';
        //     switch (obj['slider']) {
        //         case 'facebook': fieldText = 'fb_friends'; break;
        //         case 'instagram': fieldText = 'insta_followers'; break;
        //         case 'twitter': fieldText = 'twitter_followers'; break;
        //         case 'pinterest': fieldText = 'pinterest_followers'; break;
        //         case 'linkedin': fieldText = 'linkedin_connection'; break;
        //     }
        //     exstingFilterArr.push({"field":fieldText, "type":"between", "min_value":obj['value']['min'],"max_value":obj['value']['max']});
        // });


        allDropArr.map((obj) => {
            let fieldText = '';
            let fieldType = '';

            switch (obj['dropdown']) {
                case 'jobIndustryDrop': fieldText = 'job_industry'; fieldType = 'id'; break;
                case 'yearInIndustry': fieldText = 'year_in_industry'; fieldType = 'exact'; break;
                case 'education': fieldText = 'education'; fieldType = 'exact'; break;

                case 'jobTitleDrop': fieldText = 'job_title'; fieldType = 'id'; break;
                case 'language': fieldText = 'language'; fieldType = 'exact'; break;
                case 'ethnicity': fieldText = 'ethnicity'; fieldType = 'exact'; break;
                case 'sexualOrientation': fieldText = 'interested_in'; fieldType = 'exact'; break;
                case 'relationship': fieldText = 'relationship_status'; fieldType = 'exact'; break;
                case 'musicTaste': fieldText = 'music_taste'; fieldType = 'id'; break;
            }

            exstingFilterArr.push({ "field": fieldText, "type": fieldType, "value": obj['value']['value'] }, );
        });

        //----------------------------------------------------------------------------------------------------------------

        console.log('====== last ==========');
        console.log(exstingFilterArr);
        console.log('====== last ==========');


        this.setState({ 'appliedFilter': [{ 'filter': exstingFilterArr }] });

        let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });
        let arrayFilter = {
            "filter": exstingFilterArr,
            "sort": [{ "field": "name", "value": parseInt(sortDropArr['value']['value']) }],
            "page_size": this.state.perPageItem,
            "page_no": 1
        }
        this.setState({
            "activePage": 1,
            isMoreFilterApply: true,
            more_filter_open: false
        });
        this.filterSendReq(arrayFilter);
    }

    resetDropVal = () => {
        const { dispatch } = this.props;
        this.child.setDefaultVal();
        dispatch(resetVal(null));
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
        dispatch(addUserReq(data));
    }

    saveBulkResult = (value) => {
        const { dispatch } = this.props;
        this.child.setSaveFor(value['value'], null, this.state.appliedFilter[0]);
        dispatch(fetchDropDownReq({ "sendReqFor": value['value'] }));
        // /promoter/group/:new_group_id/:old_group_id/add_filter_result_to_group
    }

    createGroupSubmit = (values) => {
        this.setState({ authorise_disabled: true }, () => {
            const { dispatch } = this.props;
            const formData = new FormData();
            formData.append("name", values.group_name);
            formData.append("image", values.images[0]);
            this.setState({ is_inserted: 1 });
            dispatch(addGroups(formData));
        });
    }


    render() {
        let { users, inspiredPosts, moreFilterData, dropdownList, loading, match } = this.props;
        const { allDropDown, allSliders } = this.state;

        let myObj = this.state.appliedFilter[0].filter;
        let filter_size = Object.keys(myObj).length;

        let allDropArr = [];
        let allSliderArr = [];

        let genderDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'genderDrop'; });
        let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });

        allDropArr['jobIndustryDrop'] = _.find(allDropDown, function (o) { return o.dropdown == 'jobIndustryDrop'; });
        allDropArr['jobTitleDrop'] = _.find(allDropDown, function (o) { return o.dropdown == 'jobTitleDrop'; });
        allDropArr['yearInIndustry'] = _.find(allDropDown, function (o) { return o.dropdown == 'yearInIndustry'; });
        allDropArr['education'] = _.find(allDropDown, function (o) { return o.dropdown == 'education'; });
        allDropArr['language'] = _.find(allDropDown, function (o) { return o.dropdown == 'language'; });
        allDropArr['ethnicity'] = _.find(allDropDown, function (o) { return o.dropdown == 'ethnicity'; });
        allDropArr['sexualOrientation'] = _.find(allDropDown, function (o) { return o.dropdown == 'sexualOrientation'; });

        allDropArr['relationship'] = _.find(allDropDown, function (o) { return o.dropdown == 'relationship'; });
        allDropArr['musicTaste'] = _.find(allDropDown, function (o) { return o.dropdown == 'musicTaste'; });

        allSliderArr['facebook'] = _.find(allSliders, function (o) { return o.slider == 'facebook'; });
        allSliderArr['instagram'] = _.find(allSliders, function (o) { return o.slider == 'instagram'; });
        allSliderArr['twitter'] = _.find(allSliders, function (o) { return o.slider == 'twitter'; });
        allSliderArr['pinterest'] = _.find(allSliders, function (o) { return o.slider == 'pinterest'; });
        allSliderArr['linkedin'] = _.find(allSliders, function (o) { return o.slider == 'linkedin'; });

        allSliderArr['ageRange'] = _.find(allSliders, function (o) { return o.slider == 'ageRange'; });

        // if (loading) { return (<div className="loader"></div>) }
        return (
            <div className="every-people">
                {(loading) ? <div className="loader" style={{ "zIndex": "999999999" }}></div> : ''}
                <div className="everypeole-head d-flex">
                    <div className="everypeole-head-l">
                        <ul>
                            <li className="dropdown age-dropdown stats_age_dropdown active">
                                <AgeDropDown
                                    parentMethod={(value) => { (value['min'] > 14) ? this.handleSLider(value, "ageRange") : ''; }}
                                    currentVal={allSliderArr['ageRange']['value']}
                                    setAgeFilter={() => { this.setAgeFilter() }}
                                    open={this.state.age_filter_open}
                                    toggle={this.age_filter_toggle}
                                />
                            </li>
                            <li className="stats_filter_li2">
                                <ReactSelect
                                    name="genderDrop"
                                    value={genderDropArr.value}
                                    onChange={(value) => this.handleChange(value, "genderDrop")}
                                    searchable={false}
                                    clearable={false}
                                    autosize={false}
                                    placeholder="Gender"
                                    className='dropdown-inr stats_gender_dropdown'
                                    options={[
                                        { value: 'male', label: 'Male' },
                                        { value: 'female', label: 'Female' },
                                    ]}
                                />
                            </li>
                            <li className="stats_filter_li3"><a href="javascript:void(0)">Location</a></li>
                            <li>
                                <MoreFilterDropDown
                                    // parentMethod={(value) => this.setAgeValue(value,"str")}
                                    parentMethod={(selectedOp, dropDownName) => this.handleChange(selectedOp, dropDownName)}
                                    parentSliderMethod={(selectedOp, sliderName) => { (selectedOp['min'] >= 0) ? this.handleSLider(selectedOp, sliderName) : '' }}
                                    allDropArr={allDropArr}
                                    allSliderArr={allSliderArr}
                                    moreFilterData={moreFilterData}
                                    applyMoreFilter={() => { this.applyMoreFilter() }}
                                    open={this.state.more_filter_open}
                                    toggle={this.more_filter_toggle}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="everypeole-head-r">
                        {
                            (match.params.campaignId !== null && match.params.campaignId !== undefined) ?
                                (users.status == 1) ?
                                    <div className="new-permission">
                                        <a className="cursor_pointer" href="javascript:void(0)" onClick={this.purchaseResult}>Purchase all result</a>
                                    </div>
                                    : ''
                                :
                                <ul>
                                    <li>
                                        <ReactSelect
                                            name="form-field-name"
                                            className='dropdown-inr'
                                            value={sortDropArr.value}
                                            onChange={(value) => this.handleChange(value, "sortDrop")}
                                            searchable={false}
                                            clearable={false}
                                            autosize={false}
                                            placeholder="Select"
                                            options={[
                                                { value: '1', label: 'Name ASC' },
                                                { value: '-1', label: 'Name DESC' },
                                            ]}
                                        />
                                    </li>
                                    {(
                                        match.path == routeCodes.CAMPAIGN_INSPIRED_SUB ? ''
                                            :
                                            <li>

                                                <ReactSelect
                                                    name="addAllResults"
                                                    // value={genderDropArr.value}
                                                    onChange={(value) => this.saveBulkResult(value)}
                                                    searchable={false}
                                                    clearable={false}
                                                    autosize={false}
                                                    placeholder="Add All Results"
                                                    className='dropdown-inr btn_add_all_results'
                                                    options={[
                                                        { value: 'add_to_campaign', label: 'Add to Campaign' },
                                                        { value: 'add_to_group', label: 'Add to Group' },
                                                    ]}
                                                />
                                            </li>
                                    )}
                                </ul>
                        }
                    </div>
                </div>

                <div className="all-people">
                    <div className="all-people-head d-flex">
                        <h3>

                            {
                                (match.path !== routeCodes.CAMPAIGN_INSPIRED_SUB) ?

                                    ((users.total !== undefined && filter_size === 0)) ?
                                        `All ( ${users.total} Results )`
                                        : [
                                            (users.total !== undefined && filter_size > 0) ?
                                                `Filtered List ( ${users.total} Results )`
                                                : ''
                                        ]
                                    :
                                    null

                            }
                            {/* {
                                (users.total !== undefined) ?
                                    `Filtered List ( ${users.total} Results )`
                                    :
                                    `Filtered List ( ${inspiredPosts.total} Results )`
                            } */}

                        </h3>
                        {((this.state.isAgeFilterApply === true || this.state.isMoreFilterApply === true)) ?
                            ((match.params.campaignId === null || match.params.campaignId === undefined) && match.path !== routeCodes.CAMPAIGN_INSPIRED_SUB) &&
                            <a className="cursor_pointer" onClick={this.toggle}>
                                <i className="fa fa-plus"></i>
                                Save the results as a Group
                            </a>
                            : null
                        }
                    </div>
                    {
                        (match.params.campaignId !== null && match.params.campaignId !== undefined) ?
                            <ul className="fan-festival d-flex">
                                {(users.status === 1) ? users.data.map((obj, index) => (this.renderLi2(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>}
                            </ul>
                            :
                            (
                                match.path == routeCodes.CAMPAIGN_INSPIRED_SUB ?
                                    <ul className="fan-festival d-flex h-view">
                                        {(inspiredPosts.status === 1 && inspiredPosts.data === '') ? inspiredPosts.data.map((obj, index) => (this.renderLi3(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>}
                                    </ul>

                                    :

                                    <ul className="all-people-ul d-flex">
                                        {(users.status === 1) ? users.data.map((obj, index) => (this.renderLi(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>}
                                    </ul>
                            )
                    }

                    {(users.total > 12 && match.path !== routeCodes.CAMPAIGN_INSPIRED_SUB) ?
                        <Pagination
                            activePage={this.state.activePage}
                            totalItemsCount={users.total}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemsCountPerPage={this.state.perPageItem}
                        /> : ''}


                </div>

                <AddToModal onRef={ref => (this.child = ref)}
                    dropdownList={dropdownList}
                    resetDropVal={this.resetDropVal}
                    saveResult={this.saveResult}
                />

                <Modal isOpen={this.state.modal} toggle={this.toggle} id="group-popup" >
                    <button type="button" className="close" onClick={this.toggle}>
                        {/* <img src="/assets/img/site/close-2.png" /> */}
                        <img src={closeImg2} />
                    </button>
                    <h2>Authorise Group</h2>
                    <CreateGroupForm onSubmit={this.createGroupSubmit} submitDisabled={this.state.authorise_disabled} />
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { everyDay, groups } = state;
    return {
        group_status: groups.get('status'),
        inserted_group: groups.get('inserted_group'),
        loading: everyDay.get('loading'),
        error: everyDay.get('error'),
        users: everyDay.get('users'),
        inspiredPosts: everyDay.get('inspiredPosts'),
        moreFilterData: everyDay.get('moreFilterData'),
        dropdownList: everyDay.get('dropdownList'),
        showDrop: everyDay.get('showDrop'),
        userAdded: everyDay.get('userAdded'),
        forceRefresh: everyDay.get('forceRefresh')
    }
}

export default withRouter(connect(mapStateToProps)(EverydayPeople))