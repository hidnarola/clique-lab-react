import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { getGroupMembers } from '../../actions/groups';
import { resetVal } from '../../actions/everyDay';

import { imgRoutes } from '../../constants/img_path';
import ReactLoading from 'react-loading';
import sampleImg from 'img/site/400x218.png';
import closeImg from 'img/site/close.png';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';
import instaImg from 'img/site/instagram.png';
import imgPlus from 'img/site/plus-01.png';
import nodataImg from 'img/site/nodata.png';

import ReactSelect from 'react-select';
import InputRange from 'react-input-range';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

const Example = ({ type, color,displayProp }) => (
    <ReactLoading type={type} color={color} height='667' width='375' style={{display:displayProp}}  />
);

const DropDownSocial =  (props) => {
    return (
        <UncontrolledDropdown direction="up" className="btn-group dropup">
            <DropdownToggle>
            {props.fbCount + props.linkedCount + props.pintCount + props.twitCount + props.instaCount} Followers
                <i className="dropdown-arrow"></i>
            </DropdownToggle>
            <DropdownMenu>
                <ul>
                    <li><a><i><img src={fbImg} alt="" /></i><span>{props.fbCount}</span></a></li>
                    <li><a><i><img src={linkedImg} alt="" /></i><span>{props.linkedCount}</span></a></li>
                    <li><a><i><img src={pinImg} alt="" /></i><span>{props.pintCount}</span></a></li>
                    <li><a><i><img src={twitterImg} alt="" /></i><span>{props.twitCount}</span></a></li>
                    <li><a><i><img src={instaImg} alt="" /></i><span>{props.instaCount}</span></a></li>
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
        <UncontrolledDropdown className="plus-people dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src="/assets/img/site/plus-sign.png" alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">Add to Campaign</a>
                <a className="dropdown-item" href="#">Add to Group</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class GroupMemberList extends Component {
    
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
        this.toggle = this.toggle.bind(this);        
    }

    handlePageChange(pageNumber) {
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
    
    componentWillMount(){
        const { dispatch, match } = this.props;
        let grpId = match.params.grpId;
        dispatch(getGroupMembers({"grpId":grpId,"page_size":9,"page_no":1}))
    }


    
    render() {
        let {members, totalMembers} = this.props;  
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        console.log('>>>',this.props);
        console.log('TM>>',totalMembers);
        
        return (
            <div className="every-people">
                <InputRange
                    maxValue={20}
                    minValue={0}
                    value={this.state.value}
                    onChange={value => this.setState({ value })} />
                <Example displayProp="none"  />
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
                        <h3>Filtered List ({" "+totalMembers+" Results "})</h3>
                        <a >
                            <i className="fa fa-plus"></i> Save the results as a Group</a>
                    </div>
                    <ul className="all-people-ul d-flex">
                        {
                            (members!==null) ?
                                members.map(function(obj,i){
                                    return(
                                        <li key={Math.random()}>
                                            <div className="all-people-div">
                                                <div className="all-people-img">
                                                    <a>
                                                        <img src={`${imgRoutes.USER_IMG_PATH}${obj.image}`} alt="" className="grp_list_img" />
                                                    </a>
                                                    <PlusAction/>
                                                </div>
                                                <div className="all-people-content d-flex">
                                                    <h4>{ obj.name }</h4>                        
                                                    <DropDownSocial
                                                        fbCount={(obj.hasOwnProperty('facebook')) ? obj.facebook.no_of_friends : 0 }
                                                        instaCount={(obj.hasOwnProperty('instagram')) ? obj.instagram.no_of_followers : 0 }
                                                        pintCount={(obj.hasOwnProperty('pinterest')) ? obj.pinterest.no_of_followers : 0 }
                                                        linkedCount={(obj.hasOwnProperty('linkedin')) ? obj.linkedin.no_of_followers : 0 }
                                                        twitCount={(obj.hasOwnProperty('twitter')) ? obj.twitter.no_of_followers : 0 }
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            :
                            <div className="no_data_found">
                                <img src={nodataImg} />
                            </div>
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
    const { groups } = state;
    return {
        loading: groups.get('loading'),
        error: groups.get('error'),
        members: groups.get('members'),
        totalMembers: groups.get('totalMembers'),
    }
}

export default connect(mapStateToProps)(GroupMemberList)