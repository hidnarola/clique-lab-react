import React, { Component } from 'react';
import { connect } from 'react-redux';
import fakeImg from 'img/site/people-01.jpg';
import nodataImg from 'img/site/nodata.png';
import trashImg from 'img/site/trash-icon.png';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';
import { withRouter } from 'react-router';
import { getPastCampaign } from '../../actions/campaign';
import Pagination from "react-js-pagination";

class Past extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activePage: 1,
            totalRecord: 1,
            page_name: 'Past Campaign'
        };
        this.pastListing = this.pastListing.bind(this); 
        this.handlePageChange = this.handlePageChange.bind(this)   
    }

    pastListing(obj){
        return (
            <li key={Math.random()}>
                <div className="all-people-div">
                    <div className="all-people-img">
                        <a href=""><img src={fakeImg} alt=""/></a>
                    </div>
                    <div className="all-people-content">
                        <h4>Content Marketplace by your fans at Festival</h4>
                        <div className="submission-div d-flex">
                            <div className="submission-div-l">
                                <h5>Submissions :  <small>654</small></h5>
                                <h5>Starts in   <small>3 days</small></h5>
                            </div>
                            <div className="submission-div-r">
                                <a href=""><img src={trashImg} alt="" /></a>
                            </div>	
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(getPastCampaign({"page_size":9,"page_no":1}))
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        const { dispatch } = this.props;
        dispatch(getPastCampaign({"page_size":9,"page_no":pageNumber}))
    }

    render() {
        let { pastCampaign, totalPastCampaign, loading } = this.props;

        if(loading) {
            return (
                <div className="loader"></div>
            )
        }
        return (
            <div className="active-campaigns">
                <ul className="all-people-ul d-flex">
                    {
                        (pastCampaign!==null) ? pastCampaign.map((obj,i) => (this.pastListing(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>
                    }
                </ul>
                {(
                    pastCampaign!==null && <Pagination 
                            activePage={this.state.activePage} 
                            itemsCountPerPage={6} 
                            totalItemsCount={totalPastCampaign} 
                            pageRangeDisplayed={5} 
                            onChange={this.handlePageChange}
                        />
                )}
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
        pastCampaign: campaign.get('pastCampaign'),
        totalPastCampaign: campaign.get('totalPastCampaign'),
    }
}

export default connect(mapStateToProps)(withRouter(Past))