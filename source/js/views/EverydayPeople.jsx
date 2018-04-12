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



class EverydayPeople extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activePage: 1,
            totalRecord:1,
            loaderShow:false,
            dropdownOpen: false,
            selectedOption: '',
            value: { min: 2, max: 10 },
        };

        this.handlePageChange = this.handlePageChange.bind(this)
        this.renderLi = this.renderLi.bind(this);
        this.toggle = this.toggle.bind(this);        
    }

    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        const { dispatch } = this.props;
        dispatch(sendReq({"page_size":9,"page_no":pageNumber}))
    }

    handleChange = (selectedOption) => {
        const { dispatch } = this.props;
        this.setState({ selectedOption });
        let newVar = {
            "sort":[{ "field": "name", "value":parseInt(selectedOption.value)}],
            "page_size":9,
            "page_no":1
        }
        dispatch(sendReq(newVar))        
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
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

    render() {
        let {users} = this.props;
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        
        return (
            <div className="every-people">
                <InputRange
                    maxValue={20}
                    minValue={0}
                    value={this.state.value}
                    onChange={value => this.setState({ value })} />

                <Example displayProp="none"  />
                {/* <img src={fbImg} /> */}
                <div className="everypeole-head d-flex">
                    <div className="everypeole-head-l">
                        <ul>
                            <li className="dropdown age-dropdown active">
                                <a href="#" className="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">21 - 25</a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <h4>Age group</h4>
                                    <div className="age-fillter">
                                        <img src="images/fillter.png" alt="" />
                                    </div>
                                    <div className="ftr-btn">
                                        <button className="bdr-btn">Apply</button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="">Gendar</a>
                            </li>
                            <li>
                                <a href="">Location</a>
                            </li>
                            <li>
                                <a href="">More filter</a>
                            </li>
                            <li>
                                <a >Sort
                                    <i className="dropdown-arrow"></i>
                                </a>


                                <ReactSelect
                                    name="form-field-name"
                                    value={value}
                                    onChange={this.handleChange}
                                    searchable={false}
                                    clearable={false}
                                    autosize={false}
                                    options={[
                                        { value: '1', label: 'Name ASC' },
                                        { value: '-1', label: 'Name DESC' },
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
                        itemsCountPerPage={10} 
                        totalItemsCount={450} 
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