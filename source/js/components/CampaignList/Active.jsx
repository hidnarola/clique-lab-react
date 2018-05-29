import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveCampaign, stopCampaign } from '../../actions/campaign';
import fakeImg from 'img/site/people-01.jpg';
import { withRouter } from 'react-router'
import nodataImg from 'img/site/no_data/05.png';
import plusImg from 'img/site/plus-01.png';
import PropTypes from 'prop-types';
import { imgRoutes } from '../../constants/img_path';
import { routeCodes } from '../../constants/routes';
import Pagination from "react-js-pagination";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

// Plus Action Button
const PlusAction = (props) => {
    return (
        <UncontrolledDropdown className="plus-people dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src={plusImg} alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item cursor_pointer" onClick={() => props.showDeleteAlert(props.selectedId)}>Stop</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class Active extends Component {
    
    // Main Constructor
    constructor(props){
        super(props);  
        this.state = {
            activePage: 1,
            totalRecord: 1,
            page_name: 'Active',

            is_stop: false,
            delete_alert: false,
            selected_id: null
        };
        
        this.activeListing = this.activeListing.bind(this); 
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    /*********************************************
                Stop Campagin
    **********************************************/
        showDeleteAlert = (selectedId) => {
            this.setState({ 
                delete_alert: true,
                selected_id: selectedId
            });
        }

        stopCampaignFunc = () => { 
            let { selected_id, delete_alert } = this.state;
            if(selected_id!==null && delete_alert){
                const { dispatch } = this.props;
                dispatch(stopCampaign({"campaign_id": selected_id}))
            }
            this.setState({ 
                delete_alert: false,
                selected_id: null,
                is_stop: true,
            }) 
        }

        hideDeleteAlert = () => {
            this.setState({ 
                delete_alert: false,
                selected_id: null
            })
        }
    
    /*********************************************
                Lisitng of Active Campagin
    **********************************************/
        activeListing(obj){
            return (
                <li key={Math.random()}>
                    <div className="all-people-div">
                        <div className="all-people-img">
                            <Link className="cursor_pointer" to={`${routeCodes.CAMPAIGN_ACTIVE}/${obj._id}`}>
                                <img src={`${imgRoutes.CAMPAIGN_IMG_PATH}${obj.cover_image}`} alt="" className="campaign_list_img" />
                            </Link>
                            <PlusAction showDeleteAlert={this.showDeleteAlert} selectedId={obj._id}/>
                        </div>
                        <div className="all-people-content">
                            <h4>{obj.name}</h4>
                            <div className="submission-div d-flex">
                                <div className="submission-div-l">
                                    <h5>Submissions :  <small>{obj.submissions}</small></h5>
                                </div>
                                <div className="submission-div-r">
                                    <h5><small>{obj.remaining_days} days left</small></h5>
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
            const { dispatch } = this.props;
            dispatch(getActiveCampaign({"page_size":12,"page_no":1}))
        }
        
        componentDidUpdate(){
            const { isStop, dispatch } = this.props;
            const { is_stop } = this.state;
            if(isStop===1 && is_stop===true){
                this.setState({activePage: 1, is_stop: false});
                dispatch(getActiveCampaign({"page_size":12,"page_no":1}))
            }
        }
    
    /*********************************************
                Pagination
    **********************************************/
        handlePageChange(pageNumber) {
            this.setState({activePage: pageNumber});
            const { dispatch } = this.props;
            if (pageNumber !== this.state.activePage) 
            {
                dispatch(getActiveCampaign({"page_size":12,"page_no":pageNumber}))
            }
        }

    /*********************************************
                Render Method
    **********************************************/
        render() {
            let { activeCampaign, totalActiveCampaign, loading } = this.props;
            if(loading) {
                return (
                    <div className="loader"></div>
                )
            }
            
            return (
                <div className="active-campaigns">
                    {
                        this.state.delete_alert && 
                        <SweetAlert 
                            warning
                            showCancel
                            confirmBtnText="Yes, stop it!"
                            confirmBtnBsStyle="danger"
                            cancelBtnBsStyle="default"
                            title="Are you sure?"
                            onConfirm={this.stopCampaignFunc}
                            onCancel={this.hideDeleteAlert}
                        >
                            You will not be able to recover this data !
                        </SweetAlert>
                    }
                    <ul className="all-people-ul d-flex">
                        {
                            (activeCampaign!==null) ? 
                                activeCampaign.map((obj,i) => (this.activeListing(obj))) 
                            : 
                                <div className="no_data_found">
                                    <img src={nodataImg} />
                                    <p>No active campaigns.</p>
                                </div>
                        }
                    </ul>	
                    {
                        (activeCampaign!==null && totalActiveCampaign>12) && <Pagination 
                                activePage={this.state.activePage} 
                                itemsCountPerPage={12} 
                                totalItemsCount={totalActiveCampaign} 
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                    }
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
        activeCampaign: campaign.get('activeCampaign'),
        totalActiveCampaign: campaign.get('totalActiveCampaign'),
        isStop: campaign.get('isStop')
    }
}

export default connect(mapStateToProps)(withRouter(Active));