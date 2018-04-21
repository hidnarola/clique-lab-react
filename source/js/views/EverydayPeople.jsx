import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { sendReq,moreFilterReq,fetchDropDownReq,resetVal,addUserReq } from '../actions/everyDay';
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

import { 
        Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, 
        DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown 
       } from 'reactstrap';

const Example = ({ type, color,displayProp }) => (
    <ReactLoading type={type} color={color} height='667' width='375' style={{display:displayProp}}  />
);

class AddToModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedOption: '',
            saveFor:'',
            userId:''
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        this.props.onRef(this);
    }

    componentWillMount(){        
        this.props.onRef(undefined);
    }

    setDefaultVal = () => {
        this.setState({selectedOption:''});
    }
    
    setSaveFor = (val,userId) => {
        this.setState({saveFor:val,userId:userId});
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });        
    }
    
    saveResult = () => {        
        let {selectedOption,saveFor,userId} = this.state;
        if(selectedOption === ''){
            alert('Select the option');
        }else{
            this.props.saveResult(saveFor,selectedOption,userId);
        }
    }
    
    render() {
        let dropArr = [];     
        const { selectedOption } = this.state;

        if(this.props.dropdownList !== null){
            let resultStatus = this.props.dropdownList.status;
            if(resultStatus === 1){
                this.props.dropdownList.results.map((obj) => {
                    dropArr.push({ value: obj._id, label: obj.name });
                });
            }
        }

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} 
                       onClosed={this.props.resetDropVal}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <ReactSelect
                            className='dropdown-inr'
                            name="form-field-name"
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={dropArr}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.saveResult}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
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
                <DropdownItem onClick={() => { props.addGroup(); }}>
                    Add to Group
                </DropdownItem>
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

            <div className="morefilter-div">
                <label htmlFor="">
                    Facebook Friends
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

    return (<UncontrolledDropdown className="MoreFilterLi">
        <DropdownToggle caret >
            More Filter {" "}
        </DropdownToggle>
        <DropdownMenu>
            <div className="d-flex">
                <div className="col-md-4">
                    <div className="morefilter-div">
                        <label htmlFor="">
                            Facebook Friends
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['facebook']['value']}
                                onChange={value => props.parentSliderMethod(value,"facebook")} 
                            />
                            <div className="range-div">{props.allSliderArr['facebook']['value']['min']}-{props.allSliderArr['facebook']['value']['max']}</div>
                        </div>
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Instagram Friends
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['instagram']['value']}
                                onChange={value => props.parentSliderMethod(value,"instagram")} 
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
                            Twitter Friends
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['twitter']['value']}
                                onChange={value => props.parentSliderMethod(value,"twitter")} 
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
                            Pinterest Friends
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['pinterest']['value']}
                                onChange={value => props.parentSliderMethod(value,"pinterest")} 
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
                            Linkedin Friends
                        </label>
                        <div className="range-wrapper">
                            <InputRange
                                maxValue={2500}
                                minValue={0}
                                value={props.allSliderArr['linkedin']['value']}
                                onChange={value => props.parentSliderMethod(value,"linkedin")} 
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
                            onChange={(value) => props.parentMethod(value,"jobIndustryDrop")}
                            searchable={false} clearable={false} autosize={false}
                            options={jobIndustryArr}
                            placeholder="Select Job Industry"
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
                            onChange={(value) => props.parentMethod(value,"jobTitleDrop")}
                            searchable={false} clearable={false} autosize={false}
                            options={jobTitleArr}
                            placeholder="Select Job Title"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Year In Industry
                        </label>            
                        <ReactSelect
                            className='dropdown-inr'
                            name="yearInIndustryArr" 
                            value={props.allDropArr['yearInIndustry']['value']}
                            onChange={(value) => props.parentMethod(value,"yearInIndustry")}
                            searchable={false} clearable={false} autosize={false}
                            options={yearInIndustryArr}
                            placeholder="Select Year in Industry"
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
                            onChange={(value) => props.parentMethod(value,"education")}
                            searchable={false} clearable={false} autosize={false}
                            options={educationArr}
                            placeholder="Select Education"
                        />     
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Language Spoken
                        </label>            
                        <ReactSelect
                            className='dropdown-inr'
                            name="language" 
                            value={props.allDropArr['language']['value']}
                            onChange={(value) => props.parentMethod(value,"language")}
                            searchable={false} clearable={false} autosize={false}
                            options={languageArr}
                            placeholder="Select Language"
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
                            onChange={(value) => props.parentMethod(value,"ethnicity")}
                            searchable={false} clearable={false} autosize={false}
                            options={ethnicityArr}
                            placeholder="Select Ethnicity"
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
                            onChange={(value) => props.parentMethod(value,"sexualOrientation")}
                            searchable={false} clearable={false} autosize={false}
                            options={[
                                {'value':'male',label:"Male"},
                                {'value':'female',label:"Female"},
                                {'value':'both',label:"Both"}
                            ]}
                            placeholder="Select Sexual Orientation"
                        />
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Relationship Status
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
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
                    </div>

                    <div className="morefilter-div">
                        <label htmlFor="">
                            Music Taste
                        </label>
                        <ReactSelect
                            className='dropdown-inr'
                            name="musicTaste" 
                            value={props.allDropArr['musicTaste']['value']}
                            onChange={(value) => props.parentMethod(value,"musicTaste")}
                            searchable={false} clearable={false} autosize={false}
                            options={musicTasteArr}
                            placeholder="Select Music Taste"
                        />
                    </div>
                </div>
            </div>
            <div className="ftr-btn">
                <button className="bdr-btn" onClick={() => props.applyMoreFilter()} >Apply</button>
            </div>
        </DropdownMenu>
    </UncontrolledDropdown>);
    
}

class EverydayPeople extends Component {

    static displayName = 'SRK';

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
                { 'dropdown': 'sortDrop',           'value': {value:1,label:"Name ASC"} },
            ],
            
            allSliders:[
                { 'slider': 'facebook',    'value':{ min: 0,  max: 2500 } },
                { 'slider': 'instagram',   'value':{ min: 0,  max: 2500 } },
                { 'slider': 'twitter',     'value':{ min: 0,  max: 2500 } },
                { 'slider': 'pinterest',   'value':{ min: 0,  max: 2500 } },
                { 'slider': 'linkedin',    'value':{ min: 0,  max: 2500 } },

                { 'slider': 'ageRange',    'value':{ min: 15, max: 65   } },
            ],

            appliedFilter:[
                {
                    "filter":[] // {"field":"gender","type":"exact","value":"female"}
                }
            ],

            isMoreFilterSelected:false,
            isAgeFilterSelected:false,
            isGenderFilterSelected:false,
            isSortApply:false,

            isFilterApply:false
        };

        this.handlePageChange = this.handlePageChange.bind(this)
        this.renderLi = this.renderLi.bind(this);        
    }    

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        const { dispatch } = this.props;

        let sortDropArr = _.find(this.state.allDropDown, function(o) { return o.dropdown == 'sortDrop'; });

        let arrayFilter = {
            filter:this.state.appliedFilter[0]['filter'],
            "sort":[{ "field": "name", "value":parseInt(sortDropArr['value']['value'])}],
            "page_size":9,
            "page_no":pageNumber
        }
        
        // dispatch(sendReq(arrayFilter));            

        dispatch(sendReq(arrayFilter))
    }

    handleChange = (selectedOption,secondParam) => {

        const { dispatch } = this.props;        
        let { appliedFilter } = this.state;
        
        let allDropDown = this.state.allDropDown;                
        let index = _.findIndex(allDropDown, {dropdown: secondParam});
        allDropDown.splice(index, 1, {dropdown: secondParam,value: selectedOption});
        this.setState({allDropDown:allDropDown});        
        
        if(secondParam == 'genderDrop'){

            let dropDownIndex = _.findIndex(appliedFilter[0]['filter'], function(o) { return o.field == 'gender'; });
            let filteredArr = appliedFilter[0]['filter'];
            
            // Check if age filter is applied or not...
            if(dropDownIndex === -1){
                filteredArr.push({"field":'gender',"type":"exact","value":selectedOption['value']},)
                this.setState({'appliedFilter':[{'filter':filteredArr}]});
            }else{
                let arrIndex = _.findIndex(filteredArr, {"field":'gender'});
                filteredArr.splice(arrIndex, 1, {"field":'gender',"type":"exact","value":selectedOption['value']},);
                this.setState({'appliedFilter':[{'filter':filteredArr}]});
            }

            let sortDropArr = _.find(allDropDown, function(o) { return o.dropdown == 'sortDrop'; });

            let arrayFilter = {
                filter:filteredArr,
                "sort":[{ "field": "name", "value":parseInt(sortDropArr['value']['value'])}],
                "page_size":9,
                "page_no":1
            }
            this.setState({"activePage":1});
            dispatch(sendReq(arrayFilter));
        }

        if(secondParam == 'sortDrop'){
            
            let arrayFilter = {
                filter:this.state.appliedFilter[0]['filter'],
                "sort":[{ "field": "name", "value":parseInt(selectedOption['value'])}],
                "page_size":9,
                "page_no":1
            }
            this.setState({"activePage":1});
            dispatch(sendReq(arrayFilter));            
        }

        // let newVar = {
        //     "sort":[{ "field": "name", "value":parseInt(selectedOption.value)}],
        //     "page_size":9,
        //     "page_no":1
        // }
        // dispatch(sendReq(newVar));
    }

    handleSLider = (selectedOption,secondParam) => {        
        let {allSliders} = this.state;                
        let index = _.findIndex(allSliders, {slider: secondParam});
        allSliders.splice(index, 1, {slider: secondParam,value: selectedOption});
        this.setState({allSliders:allSliders});
    }

    addCampaign = (obj) => {
        const {dispatch} = this.props;
        this.child.setSaveFor('campaign',obj._id);
        dispatch(fetchDropDownReq({"sendReqFor":"campaign","uId":obj._id}));
    }

    addGroup = (obj) => {
        const {dispatch} = this.props;
        this.child.setSaveFor('group',obj._id);
        dispatch(fetchDropDownReq({"sendReqFor":"group","uId":obj._id}));        
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
                            <PlusAction 
                                addCampaign={() => {this.addCampaign(obj)} } 
                                addGroup={() => {this.addGroup(obj)}} 
                            />
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

    componentDidMount(){
        // this.child.toggle();
    }

    componentDidUpdate(){
        let {showDrop,userAdded,dispatch} = this.props;
        // alert(showDrop);
        if(showDrop){
            this.child.toggle();
        }

        if(userAdded){
            alert('User Has been Added');
            dispatch(resetVal( {'userAdded':false}  ));
        }
    }

    setAgeValue(value) {        
        this.setState({ageRange:{min:value.min,max:value.max}});
    }
    
    setAgeFilter = () => {
                
        const {allSliders,appliedFilter,allDropDown} = this.state;        
        const {dispatch} = this.props;

        let ageFilterIndex = _.findIndex(appliedFilter[0]['filter'], function(o) { return o.field == 'age'; });
        let ageVal = _.find(allSliders, function(o) { return o.slider == 'ageRange'; });
        let filteredArr = appliedFilter[0]['filter'];

        // Check if age filter is applied or not...
        if(ageFilterIndex === -1){
            filteredArr.push({"field":"age", "type":"between", "min_value":ageVal['value']['min'],"max_value":ageVal['value']['max']})
            this.setState({'appliedFilter':[{'filter':filteredArr}]});
        }else{
            let arrIndex = _.findIndex(filteredArr, {"field":"age"});
            filteredArr.splice(arrIndex, 1, {"field":"age", "type":"between", "min_value":ageVal['value']['min'],"max_value":ageVal['value']['max']},);
            this.setState({'appliedFilter':[{'filter':filteredArr}]});
        }

        let sortDropArr = _.find(allDropDown, function(o) { return o.dropdown == 'sortDrop'; });        

        let filteredArrNew = {
            "filter":this.state.appliedFilter[0]['filter'],
            "sort":[{ "field": "name", "value":parseInt(sortDropArr['value']['value'])}],
            "page_size":9,
            "page_no":1
        }
        this.setState({"activePage":1});
        dispatch(sendReq(filteredArrNew));
        
        // this.setState({isAgeFilterSelected:true});
    }    

    applyMoreFilter = () => {

        const { allDropDown, allSliders,appliedFilter } = this.state;
        const { dispatch } = this.props;
                
        let allDropArr = _.filter( allDropDown, function(o) { return ((o.dropdown !== 'sortDrop') &&  (o.dropdown !== 'genderDrop') && (o.value !== false)); });
        let allSliderArr = _.filter( allSliders, function(o) { return (o.slider !== 'ageRange'); });

        let filterExistingArr = [];

        // let exstingFilter = Object.assign({},this.state.appliedFilter[0]['filter']);
        let exstingFilter = this.state.appliedFilter[0]['filter'];

        _.remove(exstingFilter, function(o) {            
            return (
                    (o.field === 'job_industry') || (o.field === 'year_in_industry') || (o.field === 'education')  ||
                    (o.field === 'language') || (o.field === 'ethnicity') || (o.field === 'interested_in') || 
                    (o.field === 'relationship_status') || (o.field === 'music_taste')
                );

        });
        
        const exstingFilterArr = Object.keys(exstingFilter).map(i => exstingFilter[i])
        
        console.log('====== exstingFilter ==========');
        console.log(exstingFilterArr);
        console.log('====== exstingFilter ==========');
                
        /*allSliderArr.map((obj,index) => {
            let fieldText = '';
            switch (obj['slider']) {
                case 'facebook': fieldText = 'fb_friends'; break;
                case 'instagram': fieldText = 'insta_followers'; break;
                case 'twitter': fieldText = 'twitter_followers'; break;
                case 'pinterest': fieldText = 'pinterest_followers'; break;
                case 'linkedin': fieldText = 'linkedin_connection'; break;
            }
            exstingFilterArr.push({"field":fieldText, "type":"between", "min_value":obj['value']['min'],"max_value":obj['value']['max']});
        });*/
        
        allDropArr.map((obj)=> {
            let fieldText = '';
            let fieldType = '';

            switch (obj['dropdown']) {
                case 'jobIndustryDrop'  : fieldText='job_industry'; fieldType='id'; break;
                case 'yearInIndustry'   : fieldText='year_in_industry'; fieldType='exact'; break;
                case 'education'        : fieldText='education'; fieldType='exact'; break;

                case 'jobTitleDrop'     : fieldText='job_title'; fieldType='id'; break;
                case 'language'         : fieldText='language'; fieldType='exact'; break;
                case 'ethnicity'        : fieldText='ethnicity'; fieldType='exact'; break;
                case 'sexualOrientation': fieldText='interested_in'; fieldType='exact'; break;
                case 'relationship'     : fieldText='relationship_status'; fieldType='exact'; break;
                case 'musicTaste'       : fieldText='music_taste'; fieldType='id'; break;                
            }

            exstingFilterArr.push({"field":fieldText, "type":fieldType, "value":obj['value']['value']},);
        });

        //----------------------------------------------------------------------------------------------------------------        

        console.log('====== last ==========');
        console.log(exstingFilterArr);
        console.log('====== last ==========');

        this.setState({'appliedFilter':[{'filter':exstingFilterArr}]});        

        let sortDropArr = _.find(allDropDown, function(o) { return o.dropdown == 'sortDrop'; });
        let filteredArrNew = {
            "filter":exstingFilterArr,
            "sort":[{ "field": "name", "value":parseInt(sortDropArr['value']['value'])}],
            "page_size":9,
            "page_no":1
        }
        this.setState({"activePage":1});
        dispatch(sendReq(filteredArrNew));
    }

    resetDropVal = () => {
        const {dispatch} = this.props;
        this.child.setDefaultVal();
        dispatch(resetVal(null));
    }

    saveResult = (param1,param2,param3) => {        
        
        let data = {
            param1,
            param2,
            param3
        }
        
        const { dispatch } = this.props;
        dispatch(addUserReq(data));
    }

    render() {
        let {users,moreFilterData,dropdownList} = this.props;
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
        allSliderArr['instagram'] = _.find(allSliders, function(o) { return o.slider == 'instagram'; });
        allSliderArr['twitter'] = _.find(allSliders, function(o) { return o.slider == 'twitter'; });
        allSliderArr['pinterest'] = _.find(allSliders, function(o) { return o.slider == 'pinterest'; });
        allSliderArr['linkedin'] = _.find(allSliders, function(o) { return o.slider == 'linkedin'; });

        allSliderArr['ageRange'] = _.find(allSliders, function(o) { return o.slider == 'ageRange'; });

        return (
            <div className="every-people">
                
                {/* <div className="loader" style={{"zIndex":"9999999999"}}></div> */}

                {/* <Example  /> */}

                {/* <img src={fbImg} /> */}
                <div className="everypeole-head d-flex">
                    <div className="everypeole-head-l">
                        <ul>
                            <li className="dropdown age-dropdown active">
                                <AgeDropDown                                        
                                        parentMethod={(value) => { (value['min']>14) ? this.handleSLider(value,"ageRange"):''; }}
                                        currentVal={allSliderArr['ageRange']['value']}
                                        setAgeFilter={() => { this.setAgeFilter()}}
                                />
                            </li>
                            <li>
                                <ReactSelect
                                    name="genderDrop"
                                    value={genderDropArr.value}
                                    onChange={(value) => this.handleChange(value,"genderDrop")}
                                    searchable={false}
                                    clearable={false}
                                    autosize={false}
                                    placeholder="Gender"
                                    className='dropdown-inr'
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
                                    applyMoreFilter={() => {this.applyMoreFilter()}}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="everypeole-head-r">
                        <ul>                        
                            <li>                                 
                                <ReactSelect
                                    name="form-field-name"
                                    className='dropdown-inr'
                                    value={sortDropArr.value}
                                    onChange={(value) => this.handleChange(value,"sortDrop")}
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
                            <li>
                                
                                <ReactSelect
                                    name="genderDrop"
                                    value={genderDropArr.value}
                                    // onChange={(value) => this.handleChange(value,"genderDrop")}
                                    searchable={false}
                                    clearable={false}
                                    autosize={false}
                                    placeholder="Add All Results"
                                    className='dropdown-inr'
                                    options={[
                                        { value: 'add_to_capaign', label: 'Add to Campaign' },
                                        { value: 'add_to_group', label: 'Add to Group' },
                                    ]}
                                />
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

                <AddToModal onRef={ref => (this.child = ref)} 
                            dropdownList={dropdownList} 
                            resetDropVal={this.resetDropVal}
                            saveResult={this.saveResult}  />

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
        moreFilterData: everyDay.get('moreFilterData'),
        dropdownList:everyDay.get('dropdownList'),
        showDrop:everyDay.get('showDrop'),
        userAdded:everyDay.get('userAdded')
    }
}

export default connect(mapStateToProps)(EverydayPeople)