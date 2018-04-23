import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { getActiveCampaignMem } from '../../actions/campaign';
import nodataImg from 'img/site/nodata.png';
import { imgRoutes } from '../../constants/img_path';
import PropTypes from 'prop-types';
import Pagination from "react-js-pagination";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

// Plus Action Button
const PlusAction = (props) => {
    return (
        <UncontrolledDropdown className="plus-people dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src="/assets/img/site/plus-sign.png" alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item cursor_pointer">Add to Cart</a>
                <a className="dropdown-item cursor_pointer">Add user to Group</a>
                <a className="dropdown-item cursor_pointer">Modify status and purchase</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class ActiveMemberList extends Component {
    
    // Main Constructor
    constructor(props){
        super(props);  
        this.state = {
            activePage: 1,
            totalRecord: 1,
            page_name: 'Active',
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
                            <div className="festival-ftr-l"><a href=""><i><img src="images/facebook-01.png" alt="" /></i><strong>823M</strong></a></div>
                            <div className="festival-ftr-r dropdown">
                                <a href="javascript:void(0)" role="button" id="dropdownMenuLink-06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="images/plus-sign.png" alt="" /></a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink-06">
                                    <a className="dropdown-item" href="#">Add to Cart</a>
                                    <a className="dropdown-item" href="#">Add user to Group</a>
                                    <a className="dropdown-item" href="#">Modify status and purchase</a>
                                </div>
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
            dispatch(getActiveCampaignMem({"campaignId":campaignId,"page_size":9,"page_no":1}))
        }
        
        // componentDidUpdate(){
        //     const { isStop, dispatch } = this.props;
        //     if(isStop===1){
        //         dispatch(getActiveCampaign({"page_size":9,"page_no":1}))
        //     }
        // }
    
    /*********************************************
                Pagination
    **********************************************/
        handlePageChange(pageNumber) {
            this.setState({activePage: pageNumber});
            const { dispatch } = this.props;
            dispatch(getActiveCampaign({"page_size":9,"page_no":pageNumber}))
        }

    /*********************************************
                Render Method
    **********************************************/
        render() {
            let { activeCampaignMem, totalActiveCampaignMem, loading } = this.props;
            if(loading) {
                return (
                    <div className="loader"></div>
                )
            }
            
            return (
                <div className="every-people">
                    <div className="everypeole-head d-flex">
                        <div className="everypeole-head-l">
                            <ul>
                                <li className="dropdown age-dropdown active">
                                    <a href="#" className="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">21 - 25</a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <h4>Age group</h4>
                                        <div className="age-fillter"><img src="images/fillter.png" alt="" /></div>
                                        <div className="ftr-btn">
                                            <button className="bdr-btn">Apply</button>
                                        </div>
                                    </div>
                                </li>
                                <li><a href="">Gendar</a></li>
                                <li><a href="">Location</a></li>
                                <li><a href="">More filter</a></li>
                            </ul>
                        </div>
                        <div className="everypeole-head-r">
                            <ul>
                                <li><a href="">Sort <i className="dropdown-arrow"></i></a></li>
                            </ul>
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