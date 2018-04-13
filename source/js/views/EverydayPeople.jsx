import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { sendReq } from '../actions/everyDay';
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

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

const Example = ({ type, color,displayProp }) => (
    <ReactLoading type={type} color={color} height='667' width='375' style={{display:displayProp}}  />
);

const DropDownSocial =  () => {
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

class AgeDropDown extends Component {
    
    constructor(props) {
        super(props);        
    };

    setAgeValue = (value) => {        
        this.props.parentMethod(value);
    }

    render() {    
        return (<UncontrolledDropdown>
            <DropdownToggle caret >                
                Age {" "} {this.props.currentVal.min}-{this.props.currentVal.max}
            </DropdownToggle>
            <DropdownMenu>
                <InputRange
                    maxValue={65}
                    minValue={15}
                    value={this.props.currentVal}
                    onChange={value => this.setAgeValue(value)} 
                />
                <div className="ftr-btn">
                    <button className="bdr-btn" onClick={() => this.props.setAgeFilter()} >Apply</button>
                </div>
            </DropdownMenu>
        </UncontrolledDropdown>);
    }
}

class EverydayPeople extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            activePage: 1,            
            loaderShow:false,
            selectedOption: '',
            
            ageRange: { min: 15, max: 65 },
            
            allDropDown:[                
                { 'dropdown': 'genderDrop',  'value': false },
                { 'dropdown': 'sortDrop',  'value': false },                
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
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        const { dispatch } = this.props;
        dispatch(sendReq({"page_size":9,"page_no":pageNumber}))
    }

    handleChange = (selectedOption,secondParam) => {
        
        
        const { dispatch } = this.props;
        this.setState({ selectedOption });        
        
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
    }

    setAgeValue(value) {        
        this.setState({ageRange:{min:value.min,max:value.max}});
    }
    
    setAgeFilter = () =>{
        this.setState({isAgeFilterSelected:true});
    }

    componentDidUpdate(prevProps, prevState, snapshot){        
        // console.log(prevProps);
        // console.log('===> '+ JSON.stringify(snapshot));
    }

    render() {
        let {users} = this.props;
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;        
        
        const {allDropDown} = this.state;
        
        let genderDropVal = _.find(allDropDown, function(o) { return o.dropdown = 'genderDrop'; });
        
        console.log('********************');
            console.log(genderDropVal);            
        console.log('********************');
        
        let sortDropVal = _.find(allDropDown, function(o) { return o.dropdown = 'genderDrop'; });

        console.log('********************');            
            console.log(sortDropVal);
        console.log('********************');
        return (
            <div className="every-people">

                <Example displayProp="none"  />

                {/* <img src={fbImg} /> */}
                <div className="everypeole-head d-flex">
                    <div className="everypeole-head-l">
                        <ul>
                            <li className="dropdown age-dropdown active">
                                <AgeDropDown 
                                        parentMethod={(value) => this.setAgeValue(value,"str")}                                         
                                        currentVal={this.state.ageRange}
                                        setAgeFilter={() => this.setAgeFilter()}
                                />                                
                            </li>
                            <li>
                                <a >Gender</a>
                                <ReactSelect
                                    name="genderDrop"
                                    value={genderDropVal.value}
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
                                <a >More filter</a>
                            </li>
                            <li>
                                <a >Sort
                                    <i className="dropdown-arrow"></i>
                                </a>
                                <ReactSelect
                                    name="form-field-name"
                                    value={sortDropVal.value}
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
        users: everyDay.get('users')
    }
}

export default connect(mapStateToProps)(EverydayPeople)