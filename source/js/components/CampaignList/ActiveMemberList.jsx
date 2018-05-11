import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { getActiveCampaignMem } from '../../actions/campaign';
import nodataImg from 'img/site/nodata.png';
import plusImg from 'img/site/plus-sign.png';
import fbImg from 'img/site/facebook-01.png';
import { imgRoutes } from '../../constants/img_path';
import { routeCodes } from '../../constants/routes';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import InputRange from 'react-input-range';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

// Plus Action Button
const PlusAction = (props) => {
    return (
        <UncontrolledDropdown className="festival-ftr-r dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src={plusImg} alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item cursor_pointer">Add to Cart</a>
                <a className="dropdown-item cursor_pointer">Add user to Group</a>
                <a className="dropdown-item cursor_pointer">Modify status and purchase</a>
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

class ActiveMemberList extends Component {
    
    // Main Constructor
    constructor(props){
        super(props);  
        this.state = {
            activePage: 1,
            totalRecord: 1,
            allSliders:[
                { 'slider': 'ageRange',    'value':{ min: 15, max: 65   } },
            ],
        };
        this.activeMemberListing = this.activeMemberListing.bind(this); 
        this.handlePageChange = this.handlePageChange.bind(this)
    }
    
    /*********************************************
                Lisitng of Active Campagin
    **********************************************/
        activeMemberListing(obj){
            return (
                <li key={Math.random()}>
                    <div className="fan-festival-box">
                        <div className="festival-head d-flex">
                            <div className="festival-head-l">
                                <span></span>
                                <h3>
                                    <big>{obj.name}</big>
                                    <small>Bondi Beach, Sydney, Australia</small>
                                </h3>
                            </div>
                            <div className="festival-head-r"><h3>$45.00</h3></div>
                        </div>
                        <div className="festival-img"><img src="http://placehold.it/450x215" alt="" /></div>
                        <div className="festival-body">
                            <h2>Make up by morning. boyfriends happy, what a life I lead! <a href="">@thegrocer #morning #earlyriser #excited #sponsored</a></h2>
                        </div>
                        <div className="festival-ftr d-flex">
                            <div className="festival-ftr-l">
                                <a href="javascript:void(0)"><i><img src={fbImg} alt="" /></i><strong>823M</strong></a>
                            </div>
                            <div className="festival-ftr-r dropdown">
                                <PlusAction />
                            </div>
                        </div>
                    </div>
                </li>
            )
        }

    /*********************************************
                Component Methods
    **********************************************/ 
        componentWillMount(){
            const { dispatch, match } = this.props;
            let campaignId = match.params.campaignId;
            dispatch(getActiveCampaignMem({"campaignId":campaignId,"page_size":6,"page_no":1}))
        }
    
    /*********************************************
                Pagination
    **********************************************/
        handlePageChange(pageNumber) {
            this.setState({activePage: pageNumber});
            const { dispatch, match } = this.props;
            let campaignId = match.params.campaignId;
            dispatch(getActiveCampaignMem({"campaignId":campaignId,"page_size":6,"page_no":pageNumber}));
        }
    
    /*********************************************
                Age Filtration
    **********************************************/
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

            let arrayFilter = {
                "filter":this.state.appliedFilter[0]['filter'],
                "sort":[{ "field": "name", "value":parseInt(sortDropArr['value']['value'])}],
                "page_size":6,
                "page_no":1
            }
            this.setState({"activePage":1});        
            this.filterSendReq(arrayFilter);
        }

        handleSLider = (selectedOption,secondParam) => {
            let {allSliders} = this.state;                
            let index = _.findIndex(allSliders, {slider: secondParam});
            allSliders.splice(index, 1, {slider: secondParam,value: selectedOption});
            this.setState({allSliders:allSliders});
        }
        
    /*********************************************
                Render Method
    **********************************************/
        render() {
            let { activeCampaignMem, totalActiveCampaignMem, loading } = this.props;
            const { allSliders } = this.state;
            if(loading) {
                return (
                    <div className="loader"></div>
                )
            }
            let allSliderArr = [];
            allSliderArr['ageRange'] = _.find(allSliders, function(o) { return o.slider == 'ageRange'; });
            return (
                <div className="every-people">
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
                                <li><a href="">Gendar</a></li>
                                <li><a href="">Location</a></li>
                                <li><a href="">More filter</a></li>
                            </ul>
                        </div>
                        <div className="everypeole-head-r">
                            <div className="new-permission">
                                <Link className="cursor_pointer" to={routeCodes.CAMPAIGN} >Purchase all result</Link>
                            </div>
                        </div>
                    </div>
                    <div className="all-people">
                        <ul className="fan-festival d-flex">
                            {
                                (activeCampaignMem!==null) ? activeCampaignMem.map((obj,i) => (this.activeMemberListing(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>
                            }
                        </ul>
                        {
                            (activeCampaignMem!==null && totalActiveCampaignMem>6) && <Pagination 
                                    activePage={this.state.activePage} 
                                    itemsCountPerPage={6} 
                                    totalItemsCount={totalActiveCampaignMem} 
                                    pageRangeDisplayed={5} 
                                    onChange={this.handlePageChange}
                                />
                        } 
                    </div>
                </div>
            );
        }
}


const mapStateToProps = (state) => {
    const {campaign} = state; 
    return {
        loading: campaign.get('loading'),
        error: campaign.get('error'),
        message: campaign.get('message'),
        status: campaign.get('status'),
        activeCampaignMem: campaign.get('activeCampaignMem'),
        totalActiveCampaignMem: campaign.get('totalActiveCampaignMem')
    }
}

export default connect(mapStateToProps)(withRouter(ActiveMemberList));