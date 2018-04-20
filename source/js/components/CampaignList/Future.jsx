import React, { Component } from 'react';
import { connect } from 'react-redux';
import fakeImg from 'img/site/people-01.jpg';
import nodataImg from 'img/site/nodata.png';
import trashImg from 'img/site/trash-icon.png';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';
import { withRouter } from 'react-router';
import { getFutureCampaign } from '../../actions/campaign';
import Pagination from "react-js-pagination";

class Future extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activePage: 1,
            totalRecord: 1,
            page_name: 'Future Campaign'
        };
        this.futureListing = this.futureListing.bind(this); 
        this.handlePageChange = this.handlePageChange.bind(this)   
    }

    futureListing(obj){
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
                                <h5>Start Date: <small>654</small></h5>
                                <h5>Starts in <small>3 days</small></h5>
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
        dispatch(getFutureCampaign({"page_size":9,"page_no":1}))
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        const { dispatch } = this.props;
        dispatch(getFutureCampaign({"page_size":9,"page_no":pageNumber}))
    }

    render() {
        let { futureCampaign, totalFutureCampaign, loading } = this.props;

        if(loading) {
            return (
                <div className="loader"></div>
            )
        }
        return (
            <div className="active-campaigns">
                <ul className="all-people-ul d-flex">
                    {
                        (futureCampaign!==null) ? futureCampaign.map((obj,i) => (this.futureListing(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>
                    }
                </ul>
                {(
                    futureCampaign!==null && <Pagination 
                            activePage={this.state.activePage} 
                            itemsCountPerPage={6} 
                            totalItemsCount={totalFutureCampaign} 
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
        futureCampaign: campaign.get('futureCampaign'),
        totalFutureCampaign: campaign.get('totalFutureCampaign'),
    }
}

export default connect(mapStateToProps)(withRouter(Future))