import React, { Component } from 'react';

import CampaignActive from '../components/CampaignList/Active';
import CampaignFuture from '../components/CampaignList/Future';
import CampaignPast from '../components/CampaignList/Past';

import ModalPopUp from '../components/Common/ModalPopUp';
import { connect } from 'react-redux';
import { BrowserRouter as Router,Link,Switch,Route,NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

class CampaignList extends Component {
    constructor(props){
		super(props);
		this.state = {
			page_title : 'abc'
		}
    }

    render() {
		let curt_page  = this.props.history.location.pathname;
		console.log(curt_page);
        return (
            <div className="profile-page">
				<div className="profile-head d-flex campaigns-links">
					<ul>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.CAMPAIGN_ACTIVE}>Active Campaigns</NavLink></li>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.CAMPAIGN_FUTURE}>Future Campaigns</NavLink></li>
						<li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.CAMPAIGN_PAST}>Past Campaigns</NavLink></li>
					</ul>
					<div className="new-permission">
						<Link className="cursor_pointer" to={routeCodes.CAMPAIGN} >Create New Campaign</Link>
					</div>
				</div>
				
				{ curt_page==routeCodes.CAMPAIGNS && <CampaignActive />}
				{ curt_page==routeCodes.CAMPAIGN_ACTIVE && <CampaignActive />}
				{ curt_page==routeCodes.CAMPAIGN_FUTURE && <CampaignFuture />}
				{ curt_page==routeCodes.CAMPAIGN_PAST && <CampaignPast />}
			</div>
        );
    }
}

export default connect(state => ({
    
}))(CampaignList)
