import React, { Component } from 'react';
// import { Route, Switch,Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, withRouter } from "react-router-dom";

import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import { DefaultLayout, PrivateRoute, LoginPrivateRoute } from '../components/global/RouterWrapper';
import ScrollToTop from 'components/global/ScrollToTop';
import { connect } from 'react-redux';

import Home from 'views/Home';
import People from 'views/People';
import NotFound from 'views/NotFound';
import Login from 'components/Common/Login';
import EmailVerify from 'components/Common/EmailVerify';
import ForgotPassword from 'components/Common/ForgotPassword';
import ResetPassword from 'components/Common/ResetPassword';
import Register from 'components/Common/Register';
import AfterRegister from './AfterRegister';
import CampaignForm from './Campaign';
import Dashboard from './Dashboard';
import EverydayPeople from './EverydayPeople';

//Campaign
import CampaignList from './CampaignList';
import CampaignInspiredSub from 'components/CampaignList/InspiredSubmissions';
import CampaignPurchasedPosts from 'components/CampaignList/PurchasedPosts';

// Groups
import ListGroups from 'components/Group/GroupList';
import ListGroupMembers from 'components/Group/GroupMemberList';
import FullCalendar from './Calendar';

// Analytics
import Analytics from './Analytics';

//payment
import Cart from '../components/Payment/Cart/Cart';
import Checkout from './Checkout';

import MyProfile from './MyProfile';

import createHistory from "history/createBrowserHistory"
import ActiveMemberList from '../components/CampaignList/ActiveMemberList';

import { ToastContainer, toast, Slide } from 'react-toastify';
import '../../css/campaign/ReactToastify.css';

const history = createHistory()

// const notify = () => {
//     toast.error("Success Notification !", {
//         position: "top-right",
//         autoClose: 4000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//     });
// }

class App extends Component {
    constructor(props) {
        super(props);
    }

   /* notify = (message) => {
        toast.success(`${message} !`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
    */

    render() {
        const { alertMessage } = this.props;
        return (
            <div>
                {/* {(alertMessage !== null && this.notify(alertMessage))}
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    transition={Slide}
                /> */}
                <Router>
                    <ScrollToTop>
                        <Switch>
                            <LoginPrivateRoute exact path={routeCodes.HOME} component={Login} />
                            <LoginPrivateRoute path={routeCodes.LOGIN} component={Login} />
                            <Route path={`${routeCodes.FORGOT}/:forgot_token?`} component={ForgotPassword} />
                            <Route path={`${routeCodes.RESET}/:forgot_token?`} component={ResetPassword} />

                            <Route path={routeCodes.REGISTER} component={Register} />

                            <Route path="/email_confirm/:refId" component={EmailVerify} />

                            <PrivateRoute path={routeCodes.AFTERREGISTER} component={AfterRegister} showHeader={false} />
                            <PrivateRoute path={routeCodes.DASHBOARD} component={Dashboard} showHeader={true} />

                            {/* EveryDay */}
                            <PrivateRoute path={routeCodes.EVERYDAYPEOPLE} component={EverydayPeople} showHeader={true} />

                            {/* Groups */}
                            <PrivateRoute exact path={routeCodes.LISTGROUPS} component={ListGroups} showHeader={true} />
                            <PrivateRoute path={`${routeCodes.LISTGROUPS}/:grpId/members`} component={EverydayPeople} showHeader={true} />

                            {/* Campaign */}
                            <PrivateRoute exact path={routeCodes.CAMPAIGN} component={CampaignForm} showHeader={true} />
                            <PrivateRoute exact path={routeCodes.CAMPAIGNS} component={CampaignList} showHeader={true} />
                            <PrivateRoute exact path={routeCodes.CAMPAIGN_ACTIVE} component={CampaignList} showHeader={true} />
                            <PrivateRoute path={`${routeCodes.CAMPAIGN_ACTIVE}/:campaignId`} component={EverydayPeople} showHeader={true} />
                            <PrivateRoute path={routeCodes.CAMPAIGN_FUTURE} component={CampaignList} showHeader={true} />
                            <PrivateRoute path={routeCodes.CAMPAIGN_PAST} component={CampaignList} showHeader={true} />
                            {/* <PrivateRoute path={routeCodes.CAMPAIGN_INSPIRED_SUB} component={CampaignInspiredSub} showHeader={true} /> */}
                            <PrivateRoute path={routeCodes.CAMPAIGN_INSPIRED_SUB} component={EverydayPeople} showHeader={true} />
                            <PrivateRoute path={routeCodes.CAMPAIGN_PURCHASED_POSTS} component={CampaignPurchasedPosts} showHeader={true} />

                            {/* Calendar */}
                            <PrivateRoute path={`${routeCodes.CALENDAR}`} component={FullCalendar} showHeader={true} />

                            {/* Analytics */}
                            <PrivateRoute exact path={`${routeCodes.ANALYTICS}`} component={Analytics} showHeader={true} />
                            <PrivateRoute path={`${routeCodes.ANALYTICS_STATS}`} component={Analytics} showHeader={true} />
                            <PrivateRoute path={`${routeCodes.ANALYTICS_DEMOGRAPHICS}`} component={Analytics} showHeader={true} />

                            {/* Profile */}
                            <PrivateRoute path={routeCodes.MY_PROFILE} component={MyProfile} showHeader={true} />
                            <PrivateRoute path={routeCodes.PARTNERSHIP_PROGRAM} component={MyProfile} showHeader={true} />
                            <PrivateRoute path={routeCodes.WALLET} component={MyProfile} showHeader={true} />
                            <PrivateRoute path={routeCodes.PERMISSION} component={MyProfile} showHeader={true} />

                            {/* Payment */}
                            <PrivateRoute path={routeCodes.MY_CART} component={Cart} showHeader={true} />
                            <PrivateRoute path={routeCodes.CHECKOUT} component={Checkout} showHeader={true} />


                            <Route path='*' component={NotFound} />
                        </Switch>
                    </ScrollToTop>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { campaign } = state;
    return {
        loading: campaign.get('loading'),
        error: campaign.get('error'),
        message: campaign.get('message'),
        status: campaign.get('status'),
        activeCampaignMem: campaign.get('activeCampaignMem'),
        totalActiveCampaignMem: campaign.get('totalActiveCampaignMem')
    }
}

// export default connect(mapStateToProps)(withRouter(ActiveMemberList));
export default (connect((state) => {
    const { campaign } = state;
    let alertMessage = null;
    if (campaign.get('alertMessage') !== null) { alertMessage = campaign.get('alertMessage'); }

    return {
        alertMessage: alertMessage
    }
}))(hot(module)(App));

// export default (connect((state) => {

// }))(hot(module)(App));