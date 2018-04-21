import React, { Component } from 'react';
import { connect } from 'react-redux';
import fakeImg from 'img/site/people-01.jpg';
import nodataImg from 'img/site/nodata.png';
import trashImg from 'img/site/trash-icon.png';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';
import { withRouter } from 'react-router';
import { getFutureCampaign, deleteCampaign } from '../../actions/campaign';
import Pagination from "react-js-pagination";
import { imgRoutes } from '../../constants/img_path';
import SweetAlert from "react-bootstrap-sweetalert";

class Future extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activePage: 1,
            totalRecord: 1,
            page_name: 'Future Campaign',

            delete_alert: false,
            selected_id: null,
        };
        this.futureListing = this.futureListing.bind(this); 
        this.handlePageChange = this.handlePageChange.bind(this)  
    }

    showDeleteAlert = (selectedId) => {
        this.setState({ 
            delete_alert: true,
            selected_id: selectedId
        });
    }

    deleteCampaignFunc = () => { 
        let { selected_id, delete_alert } = this.state;
        if(selected_id!==null && delete_alert){
            const { dispatch } = this.props;
            dispatch(deleteCampaign({"campaign_id": selected_id}))
        }
        this.setState({ 
            delete_alert: false,
            selected_id: null
        }) 
    }

    hideDeleteAlert = () => {
        this.setState({ 
            delete_alert: false,
            selected_id: null
        })
    }

    futureListing(obj){
        let d = new Date(obj.start_date);
        let YYYY = d.getFullYear();
        let MM = (d.getMonth()<10) ? '0'+d.getMonth() : d.getMonth();
        let DD = (d.getDate()<10) ? '0'+d.getDate() : d.getDate();
        let date = YYYY+'-'+MM+'-'+DD;
        return (
            <li key={Math.random()}>
                <div className="all-people-div">
                    <div className="all-people-img">
                        <a href=""><img src={`${imgRoutes.CAMPAIGN_IMG_PATH}${obj.cover_image}`} alt="" className="campaign_list_img"/></a>
                    </div>
                    <div className="all-people-content">
                        <h4>{obj.name}</h4>
                        <div className="submission-div d-flex">
                            <div className="submission-div-l">
                                
                                <h5>Start Date: <small>{date}</small></h5>
                                <h5>Starts in <small>{obj.starts_in} days</small></h5>
                            </div>
                            <div className="submission-div-r">
                                <a className="cursor_pointer" onClick={this.showDeleteAlert.bind(this,obj._id)}><img src={trashImg} alt="" /></a>
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

    componentDidUpdate(){
        const { isDelete, dispatch } = this.props;
        if(isDelete===1){
            dispatch(getFutureCampaign({"page_size":9,"page_no":1}))
        }
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
                {
                    this.state.delete_alert && 
                    <SweetAlert 
                        warning
                        showCancel
                        confirmBtnText="Yes, stop it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="Are you sure?"
                        onConfirm={this.deleteCampaignFunc}
                        onCancel={this.hideDeleteAlert}
                    >
                        You will not be able to recover this data !
                    </SweetAlert>
                }
                <ul className="all-people-ul d-flex">
                    {
                        (futureCampaign!==null) ? futureCampaign.map((obj,i) => (this.futureListing(obj))) : <div className="no_data_found"><img src={nodataImg} /></div>
                    }
                </ul>
                {
                    (futureCampaign!==null && totalFutureCampaign>9) && <Pagination 
                            activePage={this.state.activePage} 
                            itemsCountPerPage={6} 
                            totalItemsCount={totalFutureCampaign} 
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
        futureCampaign: campaign.get('futureCampaign'),
        totalFutureCampaign: campaign.get('totalFutureCampaign'),
        isDelete: campaign.get('isDelete'),
    }
}

export default connect(mapStateToProps)(withRouter(Future))