import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { sendReq,moreFilterReq } from '../actions/everyDay';
import ReactLoading from 'react-loading';
import sampleImg from 'img/site/400x218.png';
import closeImg from 'img/site/close.png';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';
import instaImg from 'img/site/instagram.png';
import imgPlus from 'img/site/plus-01.png';

import ReactSelect from 'react-select';
import InputRange from 'react-input-range';
import _ from 'lodash';
import moment from 'moment';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

const Example = ({ type, color,displayProp }) => (
    <ReactLoading type={type} color={color} height='667' width='375' style={{display:displayProp}}  />
);

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

const PlusAction = () => {
    return (
        <UncontrolledDropdown>
            <DropdownToggle caret>
                <img src={imgPlus} alt="" />
            </DropdownToggle>
            <DropdownMenu>                
                <DropdownItem>Add to Campaign</DropdownItem>                
                <DropdownItem>Add to Group</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

const AgeDropDown = (props) => {    
    return (<UncontrolledDropdown>
        <DropdownToggle caret >                
            Age {" "} {props.currentVal.min}-{props.currentVal.max}
        </DropdownToggle>
        <DropdownMenu>
            <InputRange
                maxValue={65}
                minValue={15}
                value={props.currentVal}
                onChange={value => props.parentMethod(value)} 
            />
            <div className="ftr-btn">
                <button className="bdr-btn" onClick={() => props.setAgeFilter()} >Apply</button>
            </div>
        </DropdownMenu>
    </UncontrolledDropdown>);    
}

const MoreFilterDropDown = (props) => {
    
    
    let jobIndustryArr = []; let jobTitleArr = [];
    let yearInIndustryArr = []; let educationArr = [];
    let languageArr = []; let ethnicityArr = [];
    let musicTasteArr = [];

    if(props.moreFilterData !== null){
        
        props.moreFilterData.job_industry.map((obj)=>{
            jobIndustryArr.push({'value':obj._id,label:obj.name});
        });

        props.moreFilterData.job_title.map((obj)=>{
            jobTitleArr.push({'value':obj._id,label:obj.job_title});
        });

        for(let i=1;i<=20;i++){
            yearInIndustryArr.push({'value':i,label:i})
        }

        props.moreFilterData.education.map((obj)=>{
            educationArr.push({'value':obj._id,label:obj.name});
        });

        props.moreFilterData.language.map((obj)=>{
            languageArr.push({'value':obj._id,label:obj.name});
        });

        props.moreFilterData.ethnicity.map((obj)=>{
            ethnicityArr.push({'value':obj._id,label:obj.ethnicity});
        });        

        props.moreFilterData.music_taste.map((obj)=>{
            musicTasteArr.push({'value':obj._id,label:obj.name});
        });

    }
    

    return (<UncontrolledDropdown>
        <DropdownToggle caret >
            More Filter {" "}
        </DropdownToggle>
        <DropdownMenu>

            <ReactSelect
                name="jobIndustryDrop" 
                value={props.allDropArr['jobIndustryDrop']['value']}
                onChange={(value) => props.parentMethod(value,"jobIndustryDrop")}
                searchable={false} clearable={false} autosize={false}
                options={jobIndustryArr}
                placeholder="Select Job Industry"
            />

            <ReactSelect
                name="jobTitleDrop" 
                value={props.allDropArr['jobTitleDrop']['value']}
                onChange={(value) => props.parentMethod(value,"jobTitleDrop")}
                searchable={false} clearable={false} autosize={false}
                options={jobTitleArr}
                placeholder="Select Job Title"
            />

            <ReactSelect
                name="yearInIndustryArr" 
                value={props.allDropArr['yearInIndustry']['value']}
                onChange={(value) => props.parentMethod(value,"yearInIndustry")}
                searchable={false} clearable={false} autosize={false}
                options={yearInIndustryArr}
                placeholder="Select Year in Industry"
            />

            <ReactSelect
                name="education" 
                value={props.allDropArr['education']['value']}
                onChange={(value) => props.parentMethod(value,"education")}
                searchable={false} clearable={false} autosize={false}
                options={educationArr}
                placeholder="Select Education"
            />

            <ReactSelect
                name="language" 
                value={props.allDropArr['language']['value']}
                onChange={(value) => props.parentMethod(value,"language")}
                searchable={false} clearable={false} autosize={false}
                options={languageArr}
                placeholder="Select Language"
            />

            <ReactSelect
                name="ethnicity" 
                value={props.allDropArr['ethnicity']['value']}
                onChange={(value) => props.parentMethod(value,"ethnicity")}
                searchable={false} clearable={false} autosize={false}
                options={ethnicityArr}
                placeholder="Select Ethnicity"
            />
            
            <ReactSelect
                name="sexualOrientation" 
                value={props.allDropArr['sexualOrientation']['value']}
                onChange={(value) => props.parentMethod(value,"sexualOrientation")}
                searchable={false} clearable={false} autosize={false}
                options={[
                    {'value':'male',label:"Male"},
                    {'value':'female',label:"Female"},
                    {'value':'both',label:"Both"}
                ]}
                placeholder="Select Sexual Orientation"
            />

            <ReactSelect
                name="relationship" 
                value={props.allDropArr['relationship']['value']}
                onChange={(value) => props.parentMethod(value,"relationship")}
                searchable={false} clearable={false} autosize={false}
                options={[
                    {'value':'Married',label:"Married"},
                    {'value':'Unmarried',label:"Unmarried"},
                    {'value':'Single',label:"Single"}
                ]}                

                placeholder="Select Relationship"
            />

            <ReactSelect
                name="musicTaste" 
                value={props.allDropArr['musicTaste']['value']}
                onChange={(value) => props.parentMethod(value,"musicTaste")}
                searchable={false} clearable={false} autosize={false}
                options={musicTasteArr}
                placeholder="Select Music Taste"
            />

            <InputRange
                maxValue={2500}
                minValue={0}
                value={props.allSliderArr['facebook']['value']}
                onChange={value => props.parentSliderMethod(value,"facebook")} 
            />

            <div className="ftr-btn">
                <button className="bdr-btn" onClick={() => props.setAgeFilter()} >Apply</button>
            </div>
        </DropdownMenu>
    </UncontrolledDropdown>);
    
}

class EverydayPeople extends Component {

    constructor(props){
        super(props);

        this.state = {
            activePage: 1,            
            loaderShow:false,

            allDropDown:[
                { 'dropdown': 'jobIndustryDrop',   'value': false },
                { 'dropdown': 'jobTitleDrop',      'value': false },
                { 'dropdown': 'yearInIndustry',    'value': false },
                { 'dropdown': 'education',         'value': false },
                { 'dropdown': 'language',          'value': false },
                { 'dropdown': 'ethnicity',         'value': false },
                { 'dropdown': 'sexualOrientation', 'value': false },
                { 'dropdown': 'relationship',      'value': false },
                { 'dropdown': 'musicTaste',        'value': false },

                { 'dropdown': 'genderDrop',         'value': false },
                { 'dropdown': 'sortDrop',           'value': false },                
            ],
            
            allSliders:[
                { 'slider': 'facebook','value':{ min: 0, max: 2500 } },
                { 'slider': 'ageRange','value':{ min: 15, max: 65 } },
            ],

            isMoreFilterSelected:false,
            isAgeFilterSelected:false,
            isGenderFilterSelected:false,
            isSortApply:false,
        };

        this.handlePageChange = this.handlePageChange.bind(this)
        this.renderLi = this.renderLi.bind(this);        
    }    

    handlePageChange(pageNumber) {        
        this.setState({activePage: pageNumber});
        const { dispatch } = this.props;
        dispatch(sendReq({"page_size":9,"page_no":pageNumber}))
    }

    handleChange = (selectedOption,secondParam) => {

        const { dispatch } = this.props;        
        
        let allDropDown = this.state.allDropDown;                
        let index = _.findIndex(allDropDown, {dropdown: secondParam});
        allDropDown.splice(index, 1, {dropdown: secondParam,value: selectedOption});
                        
        this.setState({allDropDown:allDropDown});

        // let newVar = {
        //     "sort":[{ "field": "name", "value":parseInt(selectedOption.value)}],
        //     "page_size":9,
        //     "page_no":1
        // }
        // dispatch(sendReq(newVar));
    }

    handleSLider = (selectedOption,secondParam) => {

        console.log(selectedOption['min']);
        console.log(secondParam);

        let {allSliders} = this.state;                
        let index = _.findIndex(allSliders, {slider: secondParam});
        allSliders.splice(index, 1, {slider: secondParam,value: selectedOption});
        this.setState({allSliders:allSliders});
    }

    renderLi(obj){
        return(
            <li key={Math.random()}>
                <div className="all-people-div">
                    <div className="all-people-img">
                        <a >
                            <img src={sampleImg} alt="" />
                        </a>
                        <div className="plus-people dropdown">
                            <PlusAction/>
                        </div>
                    </div>
                    <div className="all-people-content d-flex">
                        <h4>{obj.name}</h4>                        
                        <DropDownSocial/>                        
                    </div>
                </div>
            </li>
        );
    }
    
    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(sendReq({"page_size":9,"page_no":1}))
        dispatch(moreFilterReq());
    }

    setAgeValue(value) {        
        this.setState({ageRange:{min:value.min,max:value.max}});
    }
    
    setAgeFilter = () =>{
        this.setState({isAgeFilterSelected:true});
    }

    componentDidUpdate(prevProps, prevState, snapshot){        

    }

    render() {
        let {users,moreFilterData} = this.props;
        const {allDropDown,allSliders} = this.state;

        let allDropArr = [];
        let allSliderArr = [];

        let genderDropArr = _.find(allDropDown, function(o) { return o.dropdown == 'genderDrop'; });
        let sortDropArr = _.find(allDropDown, function(o) { return o.dropdown == 'sortDrop'; });
        
        allDropArr['jobIndustryDrop'] = _.find(allDropDown, function(o) { return o.dropdown == 'jobIndustryDrop'; });
        allDropArr['jobTitleDrop'] = _.find(allDropDown, function(o) { return o.dropdown == 'jobTitleDrop'; });
        allDropArr['yearInIndustry'] = _.find(allDropDown, function(o) { return o.dropdown == 'yearInIndustry'; });
        allDropArr['education'] = _.find(allDropDown, function(o) { return o.dropdown == 'education'; });
        allDropArr['language'] = _.find(allDropDown, function(o) { return o.dropdown == 'language'; });
        allDropArr['ethnicity'] = _.find(allDropDown, function(o) { return o.dropdown == 'ethnicity'; });
        allDropArr['sexualOrientation'] = _.find(allDropDown, function(o) { return o.dropdown == 'sexualOrientation'; });

        allDropArr['relationship'] = _.find(allDropDown, function(o) { return o.dropdown == 'relationship'; });
        allDropArr['musicTaste'] = _.find(allDropDown, function(o) { return o.dropdown == 'musicTaste'; });

        
        
        allSliderArr['facebook'] = _.find(allSliders, function(o) { return o.slider == 'facebook'; });
        allSliderArr['ageRange'] = _.find(allSliders, function(o) { return o.slider == 'ageRange'; });

        return (
            <div className="every-people">

                <Example displayProp="none"  />

                {/* <img src={fbImg} /> */}
                <div className="everypeole-head d-flex">
                    <div className="everypeole-head-l">
                        <ul>
                            <li className="dropdown age-dropdown active">
                                <AgeDropDown                                        
                                        parentMethod={(value) => { (value['min']>14) ? this.handleSLider(value,"ageRange"):''; }}
                                        currentVal={allSliderArr['ageRange']['value']}                                        
                                />
                            </li>
                            <li>
                                <a >Gender</a>
                                <ReactSelect
                                    name="genderDrop"
                                    value={genderDropArr.value}
                                    onChange={(value) => this.handleChange(value,"genderDrop")}
                                    searchable={false}
                                    clearable={false}
                                    autosize={false}
                                    options={[
                                        { value: 'male', label: 'Male' },
                                        { value: 'female', label: 'Female' },
                                    ]}
                                />
                            </li>
                            <li>
                                <a >Location</a>
                            </li>
                            <li>
                                <MoreFilterDropDown
                                    // parentMethod={(value) => this.setAgeValue(value,"str")}                                         
                                    parentMethod={(selectedOp,dropDownName) => this.handleChange(selectedOp,dropDownName)}
                                    parentSliderMethod={(selectedOp,sliderName) => {(selectedOp['min']>=0) ? this.handleSLider(selectedOp,sliderName):''}}
                                    allDropArr={allDropArr}
                                    allSliderArr={allSliderArr}
                                    moreFilterData={moreFilterData}
                                />
                            </li>
                            <li>
                                <a >Sort
                                    <i className="dropdown-arrow"></i>
                                </a>
                                <ReactSelect
                                    name="form-field-name"
                                    value={sortDropArr.value}
                                    onChange={(value) => this.handleChange(value,"sortDrop")}
                                    searchable={false}
                                    clearable={false}
                                    autosize={false}
                                    options={[
                                        { value: '1', label: 'A Name ASC' },
                                        { value: '-1', label: 'B Name DESC' },
                                    ]}
                                />

                            </li>
                            <li className="dropdown ">
                                <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Add All Results
                                    <i className="dropdown-arrow"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" href="#">Add to Campaign</a>
                                    <a className="dropdown-item" href="#">Add to Group</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="all-people">
                    <div className="all-people-head d-flex">
                        <h3>Filtered List ({" "+users.total+" "} Results)</h3>
                        <a >
                            <i className="fa fa-plus"></i> Save the results as a Group</a>
                    </div>
                    <ul className="all-people-ul d-flex">
                        {
                            (users.status === 1) ? users.data.map((obj,index) => (this.renderLi(obj))) :''
                        }                        
                    </ul>

                    <Pagination 
                        activePage={this.state.activePage}
                        totalItemsCount={users.total} 
                        pageRangeDisplayed={5} 
                        onChange={this.handlePageChange}
                    />
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { everyDay } = state;
    return {
        loading: everyDay.get('loading'),
        error: everyDay.get('error'),
        users: everyDay.get('users'),
        moreFilterData: everyDay.get('moreFilterData')
    }
}

export default connect(mapStateToProps)(EverydayPeople)