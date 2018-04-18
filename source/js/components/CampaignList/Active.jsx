import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveCampaign } from '../../actions/campaign';
import fakeImg from 'img/site/people-01.jpg';
import { withRouter } from 'react-router'
import nodataImg from 'img/site/nodata.png';
import PropTypes from 'prop-types';
import { imgRoutes } from '../../constants/img_path';
import Pagination from "react-js-pagination";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

const PlusAction = () => {
    return (
        <UncontrolledDropdown className="plus-people dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src="/assets/img/site/plus-sign.png" alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">Stop</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}



class Active extends Component {    
    constructor(props){
        super(props);  
        this.state = {
            activePage: 1,
            totalRecord: 1,
            page_name: 'Active'
        };
        this.activeListing = this.activeListing.bind(this); 
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    activeListing(obj){
        return (
            <li key={Math.random()}>
                <div className="all-people-div">
                    <div className="all-people-img">
                        <a href=""><img src={`${imgRoutes.CAMPAIGN_IMG_PATH}${obj.cover_image}`} alt="" className="campaign_list_img" /></a>
                        <PlusAction />
                    </div>
                    <div className="all-people-content">
                        <h4>{obj.name}</h4>
                        <div className="submission-div d-flex">
                            <div className="submission-div-l">
                                <h5>Submissions :  <small>654</small></h5>
                            </div>
                            <div className="submission-div-r">
                                <h5><small>9 days left</small></h5>
                            </div>	
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(getActiveCampaign({"page_size":9,"page_no":1}))
    }
    
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        const { dispatch } = this.props;
        dispatch(getActiveCampaign({"getActiveCampaign":9,"page_no":pageNumber}))
    }

    render() {
        let { activeCampaign, totalActiveCampaign, loading } = this.props;
        if(loading) {
            return (
                <div className="loader"></div>
            )
        }
        return (
            <div className="active-campaigns">
                <ul className="all-people-ul d-flex">
                    {
                        (activeCampaign!==null) ? activeCampaign.map((obj,i) => (this.activeListing(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>
                    }
                </ul>	
                {(
                    activeCampaign!==null && <Pagination 
                            activePage={this.state.activePage} 
                            itemsCountPerPage={6} 
                            totalItemsCount={totalActiveCampaign} 
                            pageRangeDisplayed={5} 
                            onChange={this.handlePageChange}
                        />
                )}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(this.state);
    const {campaign} = state;
    return {
        loading: campaign.get('loading'),
        error: campaign.get('error'),
        message: campaign.get('message'),
        status: campaign.get('status'),
        activeCampaign: campaign.get('activeCampaign'),
        totalActiveCampaign: campaign.get('totalActiveCampaign'),
    }
}

export default connect(mapStateToProps)(withRouter(Active));