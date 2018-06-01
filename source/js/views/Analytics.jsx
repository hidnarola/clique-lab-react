import React, { Component } from 'react';

import Stats from '../components/Analytics/Stats';
import DemoGraphics from '../components/Analytics/DemoGraphics';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Switch, Route, NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

import { getAnalytics } from '../actions/analytics';
import { moreFilterReq } from '../actions/everyDay';

import closeImg from 'img/site/close-icon.png';

import ReactSelect from 'react-select';
import InputRange from 'react-input-range';
import _ from 'lodash';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown,
    DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from 'reactstrap';

const AgeDropDown = (props) => {
    return (
        <Dropdown isOpen={props.open} toggle={props.toggle}>
            <DropdownToggle caret >
                Age
            </DropdownToggle>
            <DropdownMenu>
                <div className="morefilter-div">
                    <label htmlFor="">
                        Age Group
                    </label>
                    <div className="range-wrapper">
                        <InputRange
                            maxValue={100}
                            minValue={20}
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
        </Dropdown>
    );
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
    return (
        <Dropdown isOpen={props.open} toggle={props.toggle} className="MoreFilterLi stats_filter_li4">
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

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            analytics: null,
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
            ],
            allSliders: [
                { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                { 'slider': 'ageRange', 'value': { min: 20, max: 100 } },
            ],
            filter1: [
                {
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
                    ],
                    allSliders: [
                        { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'ageRange', 'value': { min: 20, max: 100 } },
                    ],
                }
            ],
            filter2: [
                {
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
                    ],
                    allSliders: [
                        { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'ageRange', 'value': { min: 20, max: 100 } },
                    ],
                }
            ],
            filter3: [
                {
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
                    ],
                    allSliders: [
                        { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                        { 'slider': 'ageRange', 'value': { min: 20, max: 100 } },
                    ],
                }
            ],
            appliedFilter: [
                {
                    "filter": [],
                    "filter2": [],
                    "filter3": [] // {"field":"gender","type":"exact","value":"female"}
                }
            ],

            isMoreFilterSelected: false,
            isAgeFilterSelected: false,
            isGenderFilterSelected: false,
            isSortApply: false,
            isFilterApply: false,
            
            
            isMoreFilterApply: false,
            isAgeFilterApply: false,

            totalNoCompare: 1,
            whichCompare: [],

            age_filter_open: false,
            age_filter_open2: false,
            age_filter_open3: false,

            more_filter_open: false,
            more_filter_open2: false,
            more_filter_open3: false,
        }
        this.age_filter_toggle = this.age_filter_toggle.bind(this);
        this.age_filter_toggle2 = this.age_filter_toggle2.bind(this);
        this.age_filter_toggle3 = this.age_filter_toggle3.bind(this);

        this.more_filter_toggle = this.more_filter_toggle.bind(this);
        this.more_filter_toggle2 = this.more_filter_toggle2.bind(this);
        this.more_filter_toggle3 = this.more_filter_toggle3.bind(this);
    }

    // Component will mount
    componentWillMount = () => {
        const { dispatch } = this.props;
        let arrayFilter = [
            {
                "filter": [
                    []
                ]
            }
        ];
        dispatch(getAnalytics(arrayFilter));
        dispatch(moreFilterReq());
    }

    // Component did update
    componentDidUpdate = (prevProps, prevState) => {
        const { analytics_data } = this.props;
        const { analytics } = this.state;
        if (analytics === null) {
            if (analytics_data.status === 1 && analytics_data.data !== null) {
                this.setState({ analytics: analytics_data.data })
            }
        }
    }

    handleChange = (selectedOption, secondParam, totalNoCompare) => {
        if (selectedOption === null) {
            return;
        }
        const { dispatch } = this.props;

        if(totalNoCompare==1){
            let { appliedFilter, filter1 } = this.state;
            let allDropDown = filter1[0]['allDropDown'];
            let index = _.findIndex(allDropDown, { dropdown: secondParam });
            allDropDown.splice(index, 1, { dropdown: secondParam, value: selectedOption });
            this.setState({ allDropDown: allDropDown });    
        } else if(totalNoCompare==2){
            let { appliedFilter, filter2 } = this.state;
            let allDropDown = filter2[0]['allDropDown'];
            let index = _.findIndex(allDropDown, { dropdown: secondParam });
            allDropDown.splice(index, 1, { dropdown: secondParam, value: selectedOption });
            this.setState({ allDropDown: allDropDown });    
        } else if(totalNoCompare==3){
            let { appliedFilter, filter3 } = this.state;
            let allDropDown = filter3[0]['allDropDown'];
            let index = _.findIndex(allDropDown, { dropdown: secondParam });
            allDropDown.splice(index, 1, { dropdown: secondParam, value: selectedOption });
            this.setState({ allDropDown: allDropDown });    
        }

        // let { appliedFilter, allDropDown } = this.state;
        // let index = _.findIndex(allDropDown, { dropdown: secondParam });
        // allDropDown.splice(index, 1, { dropdown: secondParam, value: selectedOption });
        // this.setState({ allDropDown: allDropDown });

        // if (secondParam == 'genderDrop') {
        //     let dropDownIndex = _.findIndex(appliedFilter[0]['filter'], function (o) { return o.field == 'gender'; });
        //     let filteredArr = appliedFilter[0]['filter'];

        //     // Check if age filter is applied or not...
        //     if (dropDownIndex === -1) {
        //         filteredArr.push({ "field": 'gender', "type": "exact", "value": selectedOption['value'] }, )
        //         this.setState({ 'appliedFilter': [{ 'filter': filteredArr }] });
        //     } else {
        //         let arrIndex = _.findIndex(filteredArr, { "field": 'gender' });
        //         filteredArr.splice(arrIndex, 1, { "field": 'gender', "type": "exact", "value": selectedOption['value'] });
        //         this.setState({ 'appliedFilter': [{ 'filter': filteredArr }] });
        //     }

        //     let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });

        //     let arrayFilter = {
        //         filter: filteredArr,
        //     }
        // }
    }

    handleSLider = (selectedOption, secondParam, totalNoCompare) => {
        if (totalNoCompare == 1) {
            let { filter1 } = this.state;
            let allSliders = filter1[0]['allSliders'];
            let index = _.findIndex(allSliders, { slider: secondParam });
            allSliders.splice(index, 1, { slider: secondParam, value: selectedOption });
            this.setState({ allSliders: allSliders });
        } else if (totalNoCompare == 2) {
            let { filter2 } = this.state;
            let allSliders = filter2[0]['allSliders'];
            let index = _.findIndex(allSliders, { slider: secondParam });
            allSliders.splice(index, 1, { slider: secondParam, value: selectedOption });
            this.setState({ allSliders: allSliders });
        } else if (totalNoCompare == 3) {
            let { filter3 } = this.state;
            let allSliders = filter3[0]['allSliders'];
            let index = _.findIndex(allSliders, { slider: secondParam });
            allSliders.splice(index, 1, { slider: secondParam, value: selectedOption });
            this.setState({ allSliders: allSliders });
        }
        // let { filter1 } = this.state;
        // let allSliders = filter1[0]['allSliders'];
        // let index = _.findIndex(allSliders, { slider: secondParam });
        // allSliders.splice(index, 1, { slider: secondParam, value: selectedOption });
        // this.setState({ allSliders: allSliders });
    }

    setAgeFilter = (totalNoCompare) => {
        const { appliedFilter, filter1, filter2, filter3 } = this.state;
        const { dispatch } = this.props;
  
        if(totalNoCompare==1){
            let allSliders = filter1[0]['allSliders'];
            let ageFilterIndex = _.findIndex(appliedFilter[0]['filter'], function (o) { return o.field == 'age'; });
            let ageVal = _.find(allSliders, function (o) { return o.slider == 'ageRange'; });
            let filteredArr = appliedFilter[0]['filter'];
            if (ageFilterIndex === -1) {
                filteredArr.push({ "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] })
                this.setState({ 
                    'appliedFilter': [{ 
                        'filter': filteredArr,
                        'filter2': this.state.appliedFilter[0]['filter2'],
                        'filter3': this.state.appliedFilter[0]['filter3'],
                    }] 
                });
            } else {
                let arrIndex = _.findIndex(filteredArr, { "field": "age" });
                filteredArr.splice(arrIndex, 1, { "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] }, );
                this.setState({ 
                    'appliedFilter': [{ 
                        'filter': filteredArr,
                        'filter2': this.state.appliedFilter[0]['filter2'],
                        'filter3': this.state.appliedFilter[0]['filter3'],
                    }]
                });
            }
            this.age_filter_toggle1;
            //let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });
        } else if(totalNoCompare==2){
            let allSliders = filter2[0]['allSliders'];
            let ageFilterIndex = _.findIndex(appliedFilter[0]['filter2'], function (o) { return o.field == 'age'; });
            let ageVal = _.find(allSliders, function (o) { return o.slider == 'ageRange'; });
            let filteredArr = appliedFilter[0]['filter2'];
            if (ageFilterIndex === -1) {
                filteredArr.push({ "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] })
                this.setState({ 
                    'appliedFilter': [{ 
                        'filter': this.state.appliedFilter[0]['filter'],
                        'filter2': filteredArr,
                        'filter3': this.state.appliedFilter[0]['filter3'],
                    }] 
                });
            } else {
                let arrIndex = _.findIndex(filteredArr, { "field": "age" });
                filteredArr.splice(arrIndex, 1, { "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] }, );
                this.setState({ 
                    'appliedFilter': [{ 
                        'filter': this.state.appliedFilter[0]['filter'],
                        'filter2': filteredArr,
                        'filter3': this.state.appliedFilter[0]['filter3'],
                    }] 
                });
            }
            this.age_filter_toggle2;
            //let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });
        } else if(totalNoCompare==3){
            let allSliders = filter3[0]['allSliders'];
            let ageFilterIndex = _.findIndex(appliedFilter[0]['filter3'], function (o) { return o.field == 'age'; });
            let ageVal = _.find(allSliders, function (o) { return o.slider == 'ageRange'; });
            let filteredArr = appliedFilter[0]['filter3'];
            if (ageFilterIndex === -1) {
                filteredArr.push({ "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] })
                this.setState({ 
                    'appliedFilter': [{ 
                        'filter': this.state.appliedFilter[0]['filter'],
                        'filter2': this.state.appliedFilter[0]['filter2'],
                        'filter3': filteredArr,
                    }] 
                });
            } else {
                let arrIndex = _.findIndex(filteredArr, { "field": "age" });
                filteredArr.splice(arrIndex, 1, { "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] }, );
                this.setState({ 
                    'appliedFilter': [{ 
                        'filter': this.state.appliedFilter[0]['filter'],
                        'filter2': this.state.appliedFilter[0]['filter2'],
                        'filter3': filteredArr,
                    }] 
                });
            }
            this.age_filter_toggle3;
            //let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });
        }
        //let ageFilterIndex = _.findIndex(appliedFilter[0]['filter'], function (o) { return o.field == 'age'; });
        //let ageVal = _.find(allSliders, function (o) { return o.slider == 'ageRange'; });

        //let filteredArr = appliedFilter[0]['filter'];

        // Check if age filter is applied or not...
        // if (ageFilterIndex === -1) {
        //     filteredArr.push({ "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] })
        //     this.setState({ 'appliedFilter': [{ 'filter': filteredArr }] });
        // } else {
        //     let arrIndex = _.findIndex(filteredArr, { "field": "age" });
        //     filteredArr.splice(arrIndex, 1, { "field": "age", "type": "between", "min_value": ageVal['value']['min'], "max_value": ageVal['value']['max'] }, );
        //     this.setState({ 'appliedFilter': [{ 'filter': filteredArr }] });
        // }

        // let sortDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'sortDrop'; });
        //console.log(this.state.appliedFilter);
        let arrayFilter = {
            "filter": [
                this.state.appliedFilter[0]['filter'],
                this.state.appliedFilter[0]['filter2'],
                this.state.appliedFilter[0]['filter3'],
            ]
        }
       
        //this.filterSendReq(arrayFilter);
        // this.setState({
        //     isAgeFilterApply:true
        // })
    }

    age_filter_toggle() {
        this.setState({ age_filter_open: !this.state.age_filter_open });
    }
    age_filter_toggle2() {
        this.setState({ age_filter_open2: !this.state.age_filter_open2 });
    }
    age_filter_toggle3() {
        this.setState({ age_filter_open3: !this.state.age_filter_open3 });
    }

    more_filter_toggle() {
        this.setState({ more_filter_open: !this.state.more_filter_open })
        if (this.state.isMoreFilterApply !== true) {
            this.setState({
                filter1: [
                    {
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
                        ],

                        allSliders: [
                            { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'ageRange', 'value': { min: 20, max: 100 } },
                        ]       
                    }
                ]
            })
        }
    }

    more_filter_toggle2() {
        this.setState({ more_filter_open2: !this.state.more_filter_open2 })
        if (this.state.isMoreFilterApply !== true) {
            this.setState({
                filter2: [
                    {
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
                        ],

                        allSliders: [
                            { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'ageRange', 'value': { min: 20, max: 100 } },
                        ]       
                    }
                ]
            })
        }
    }

    more_filter_toggle3() {
        this.setState({ more_filter_open3: !this.state.more_filter_open3 })
        if (this.state.isMoreFilterApply !== true) {
            this.setState({
                filter3: [
                    {
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
                        ],

                        allSliders: [
                            { 'slider': 'facebook', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'instagram', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'twitter', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'pinterest', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'linkedin', 'value': { min: 0, max: 2500 } },
                            { 'slider': 'ageRange', 'value': { min: 20, max: 100 } },
                        ]       
                    }
                ]
            })
        }
    }

    applyMoreFilter = (totalNoCompare) => {
        const { allDropDown, allSliders, filter1, filter2, filter3, appliedFilter } = this.state;
        const { dispatch } = this.props;

        // filterName = 'filter' + i;
        // if(filterName=='filter1'){ 
        //     stateAllSliders = filter1[0].allSliders,
        //     stateAllDropDown = filter1[0].allDropDown
        // } else if(filterName=='filter2'){ 
        //     stateAllSliders = filter2[0].allSliders,
        //     stateAllDropDown = filter2[0].allDropDown
        // } else if(filterName=='filter3'){ 
        //     stateAllSliders = filter3[0].allSliders,
        //     stateAllDropDown = filter3[0].allDropDown
        // }
        let allDropArr = _.filter(allDropDown, function (o) { return ((o.dropdown !== 'sortDrop') && (o.dropdown !== 'genderDrop') && (o.value !== false)); });
        
        let allSliderArr = _.filter(allSliders, function (o) { return (o.slider !== 'ageRange'); });
        let filterExistingArr = [];

        // let exstingFilter = Object.assign({},this.state.appliedFilter[0]['filter']);
        let exstingFilter = this.state.appliedFilter[0]['filter'];

        _.remove(exstingFilter, function (o) {
            return (
                (o.field === 'job_industry') || 
                (o.field === 'year_in_industry') || 
                (o.field === 'education') ||
                (o.field === 'language') || 
                (o.field === 'ethnicity') || 
                (o.field === 'interested_in') ||
                (o.field === 'relationship_status') || 
                (o.field === 'music_taste' || 
                    (o.field === 'fb_friends') ||
                    (o.field === 'insta_followers') ||
                    (o.field === 'twitter_followers') ||
                    (o.field === 'pinterest_followers') ||
                    (o.field === 'linkedin_connection')
                )
            );

        });

        const exstingFilterArr = Object.keys(exstingFilter).map(i => exstingFilter[i])
        console.log('====== exstingFilter ==========');
        console.log(exstingFilterArr);
        console.log('====== exstingFilter ==========');


        allSliderArr.map((obj, index) => {
            let fieldText = '';
            switch (obj['slider']) {
                case 'facebook': fieldText = 'fb_friends'; break;
                case 'instagram': fieldText = 'insta_followers'; break;
                case 'twitter': fieldText = 'twitter_followers'; break;
                case 'pinterest': fieldText = 'pinterest_followers'; break;
                case 'linkedin': fieldText = 'linkedin_connection'; break;
            }
            exstingFilterArr.push({ "field": fieldText, "type": "between", "min_value": obj['value']['min'], "max_value": obj['value']['max'] });
        });


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

    /** 
     * Name       : addCompare
     * Desription : When click on ADD COMPARE new filter will add
     * @author    : PAV
     * @param     : ---
     * @return    : ---
     * 
    */
    addCompare = () => {
        const { totalNoCompare, whichCompare } = this.state;
        this.setState({ totalNoCompare: totalNoCompare + 1 });
        if (whichCompare.length == 0) {
            this.setState({ whichCompare: [2] });
        } else {
            if (whichCompare.indexOf(2) > -1) {
                this.setState({ whichCompare: [...whichCompare, 3] });
            } else {
                this.setState({ whichCompare: [...whichCompare, 2] });
            }
        }
    }

    removeCompare = (element) => {
        const { totalNoCompare, whichCompare, appliedFilter } = this.state;
        const index = whichCompare.indexOf(element);
        whichCompare.splice(index, 1);
        this.setState({
            totalNoCompare: totalNoCompare - 1,
            whichCompare: whichCompare,
        });

        console.log(element);
        if(element==2){
            alert(element);
            this.setState({
                appliedFilter: [{ 
                    'filter': this.state.appliedFilter[0]['filter'],
                    'filter3': this.state.appliedFilter[0]['filter3'],
                }]
            })
        } else if(element==3){
            this.setState({
                appliedFilter: [{ 
                    'filter': this.state.appliedFilter[0]['filter'],
                    'filter2': this.state.appliedFilter[0]['filter2'],
                }]
            })
        }
        //console.log(whichCompare);
        console.log(appliedFilter);
    }

    render() {
        let { moreFilterData } = this.props;
        const { analytics, allSliders, allDropDown, totalNoCompare, whichCompare, filter1, filter2, filter3 } = this.state;

        let allDropArr = [{
            filter1: [],
            filter2: [],
            filter3: []
        }];
        let allSliderArr = [{
            filter1: [],
            filter2: [],
            filter3: []
        }];
        //console.log(filter1[0].allSliders);
        let filterName, stateAllSliders, stateAllDropDown = '';

        for (let i = 1; i <= 3; i++) {
            filterName = 'filter' + i;
            if(filterName=='filter1'){ 
                stateAllSliders = filter1[0].allSliders,
                stateAllDropDown = filter1[0].allDropDown
            } else if(filterName=='filter2'){ 
                stateAllSliders = filter2[0].allSliders,
                stateAllDropDown = filter2[0].allDropDown
            } else if(filterName=='filter3'){ 
                stateAllSliders = filter3[0].allSliders,
                stateAllDropDown = filter3[0].allDropDown
            }
            allSliderArr[0][filterName]['ageRange'] = _.find(stateAllSliders, function (o) { return o.slider == 'ageRange'; });
            allSliderArr[0][filterName]['facebook'] = _.find(stateAllSliders, function (o) { return o.slider == 'facebook'; });
            allSliderArr[0][filterName]['instagram'] = _.find(stateAllSliders, function (o) { return o.slider == 'instagram'; });
            allSliderArr[0][filterName]['twitter'] = _.find(stateAllSliders, function (o) { return o.slider == 'twitter'; });
            allSliderArr[0][filterName]['pinterest'] = _.find(stateAllSliders, function (o) { return o.slider == 'pinterest'; });
            allSliderArr[0][filterName]['linkedin'] = _.find(stateAllSliders, function (o) { return o.slider == 'linkedin'; });

            allDropArr[0][filterName]['jobIndustryDrop'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'jobIndustryDrop'; });
            allDropArr[0][filterName]['jobTitleDrop'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'jobTitleDrop'; });
            allDropArr[0][filterName]['yearInIndustry'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'yearInIndustry'; });
            allDropArr[0][filterName]['education'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'education'; });
            allDropArr[0][filterName]['language'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'language'; });
            allDropArr[0][filterName]['ethnicity'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'ethnicity'; });
            allDropArr[0][filterName]['sexualOrientation'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'sexualOrientation'; });
            allDropArr[0][filterName]['relationship'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'relationship'; });
            allDropArr[0][filterName]['musicTaste'] = _.find(stateAllDropDown, function (o) { return o.dropdown == 'musicTaste'; });
        }

        //allSliderArr['ageRange'] = _.find(allSliders, function (o) { return o.slider == 'ageRange'; });
        let genderDropArr = _.find(allDropDown, function (o) { return o.dropdown == 'genderDrop'; });


        let curt_page = this.props.history.location.pathname;
        if (curt_page == routeCodes.ANALYTICS) {
            this.props.history.push(routeCodes.ANALYTICS_STATS);
        }
        //console.log(totalNoCompare,(whichCompare.indexOf(2) > -1));
        return (
            <div>
                <div className="analytics-head">
                    <div className="profile-head d-flex campaigns-links">
                        <ul>
                            <li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.ANALYTICS_STATS}>Stats</NavLink></li>
                            <li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.ANALYTICS_DEMOGRAPHICS}>Demographics</NavLink></li>
                        </ul>
                    </div>
                    {
                        curt_page == routeCodes.ANALYTICS_STATS &&
                        (
                            <div>
                                <div className="everypeole-head d-flex">
                                    <div className="everypeole-head-l">
                                        <ul>
                                            <li className="age-dropdown stats_age_dropdown">
                                                <AgeDropDown
                                                    parentMethod={(value) => { (value['min'] > 14) ? this.handleSLider(value, "ageRange", 1) : ''; }}
                                                    currentVal={allSliderArr[0].filter1['ageRange']['value']}
                                                    setAgeFilter={() => { this.setAgeFilter(1) }}
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
                                                    parentMethod={(selectedOp, dropDownName) => this.handleChange(selectedOp, dropDownName, 1)}
                                                    parentSliderMethod={(selectedOp, sliderName) => { (selectedOp['min'] >= 0) ? this.handleSLider(selectedOp, sliderName, 1) : '' }}
                                                    allDropArr={allDropArr[0].filter1}
                                                    allSliderArr={allSliderArr[0].filter1}
                                                    moreFilterData={moreFilterData}
                                                    applyMoreFilter={() => { this.applyMoreFilter(1) }}
                                                    open={this.state.more_filter_open}
                                                    toggle={this.more_filter_toggle}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="everypeole-head-r">
                                        <ul>
                                            <li>
                                                {
                                                    (totalNoCompare === 3) ?
                                                        <a className="btn_add_compare btn_disable"> Add Compare <i className="fa fa-plus"></i> </a>
                                                        :
                                                        <a className="btn_add_compare cursor_pointer" onClick={() => this.addCompare()}>Add Compare <i className="fa fa-plus"></i></a>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {
                                    ((totalNoCompare == 2 || totalNoCompare == 3) && (whichCompare.indexOf(2) > -1)) ?
                                        <div className="everypeole-head d-flex" style={{ "borderBottom": "none", "padding": "0px" }}>
                                            <div className="everypeole-head-l">
                                                <ul>
                                                    <li className="age-dropdown stats_age_dropdown">
                                                        <AgeDropDown
                                                            parentMethod={(value) => { (value['min'] > 14) ? this.handleSLider(value, "ageRange", 2) : ''; }}
                                                            currentVal={allSliderArr[0].filter2['ageRange']['value']}
                                                            setAgeFilter={() => { this.setAgeFilter(2) }}
                                                            open={this.state.age_filter_open2}
                                                            toggle={this.age_filter_toggle2}
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
                                                            parentMethod={(selectedOp, dropDownName) => this.handleChange(selectedOp, dropDownName, 2)}
                                                            parentSliderMethod={(selectedOp, sliderName) => { (selectedOp['min'] >= 0) ? this.handleSLider(selectedOp, sliderName, 2) : '' }}
                                                            allDropArr={allDropArr[0].filter2}
                                                            allSliderArr={allSliderArr[0].filter2}
                                                            moreFilterData={moreFilterData}
                                                            applyMoreFilter={() => { this.applyMoreFilter(2) }}
                                                            open={this.state.more_filter_open2}
                                                            toggle={this.more_filter_toggle2}
                                                        />
                                                    </li>
                                                    <li>
                                                        <img className="cursor_pointer btn_close_compare" src={closeImg} onClick={() => this.removeCompare(2)} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        : ''
                                }
                                {
                                    (totalNoCompare == 3 || (whichCompare.indexOf(3) > -1)) ?
                                        <div className="everypeole-head d-flex" style={{ "borderBottom": "none", "padding": "0px" }}>
                                            <div className="everypeole-head-l">
                                                <ul>
                                                    <li className="age-dropdown stats_age_dropdown">
                                                        <AgeDropDown
                                                            parentMethod={(value) => { (value['min'] > 14) ? this.handleSLider(value, "ageRange", 3) : ''; }}
                                                            currentVal={allSliderArr[0].filter3['ageRange']['value']}
                                                            setAgeFilter={() => { this.setAgeFilter(3) }}
                                                            open={this.state.age_filter_open3}
                                                            toggle={this.age_filter_toggle3}
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
                                                            parentMethod={(selectedOp, dropDownName) => this.handleChange(selectedOp, dropDownName, 3)}
                                                            parentSliderMethod={(selectedOp, sliderName) => { (selectedOp['min'] >= 0) ? this.handleSLider(selectedOp, sliderName, 3) : '' }}
                                                            allDropArr={allDropArr[0].filter3}
                                                            allSliderArr={allSliderArr[0].filter3}
                                                            moreFilterData={moreFilterData}
                                                            applyMoreFilter={() => { this.applyMoreFilter(3) }}
                                                            open={this.state.more_filter_open3}
                                                            toggle={this.more_filter_toggle3}
                                                        />
                                                    </li>
                                                    <li>
                                                        <img className="cursor_pointer btn_close_compare" src={closeImg} onClick={() => this.removeCompare(3)} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
                        )
                    }
                </div>
                {curt_page == routeCodes.ANALYTICS_STATS && <Stats analyticsData={analytics} />}
                {curt_page == routeCodes.ANALYTICS_DEMOGRAPHICS && <DemoGraphics />}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { analytics, everyDay } = state;
    return {
        loading: analytics.get('loading'),
        analytics_data: analytics.get('analytics'),
        moreFilterData: everyDay.get('moreFilterData'),
    }
}
export default connect(mapStateToProps)(withRouter(Analytics));
