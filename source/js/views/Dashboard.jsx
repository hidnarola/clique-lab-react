import React, { Component } from 'react';
import { connect } from 'react-redux';
import graphImg from 'img/site/graph-01.jpg';
import img1 from "img/site/img-01.jpg";
import img2 from "img/site/img-02.jpg";
import img3 from "img/site/img-03.jpg";
import img4 from "img/site/img-04.jpg";
import Pagination from "react-js-pagination";
import { getCheckoutList } from '../actions/Checkout';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, position } from 'recharts';
import { getSocialAnalytics, getDashboard, set_DashboardCurrentValue } from '../actions/analytics';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from "classnames";
import { Facebook, Code } from 'react-content-loader';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

import { imgRoutes } from '../constants/img_path';
import noCampaignImg from 'img/site/no_data/no_campaign.png';
import nodataImg from 'img/site/no_data/04.png';


/**
 * Timing Selection dropdown popup 
 * @author  : PAV
 * @param   : Props
 * @return  : Html Render
 *
 **/
const TimingDropdown = (props) => {
    return (
        <Dropdown isOpen={props.open} toggle={props.toggle}>
            <DropdownToggle>
                {"Last " + props.currentValue + " Months"} &nbsp; <i className="dropdown-arrow"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => { props.monthSelect('3M') }} > Last 3 Months </DropdownItem>
                <DropdownItem onClick={() => { props.monthSelect('6M') }} > Last 6 Months </DropdownItem>
                <DropdownItem onClick={() => { props.monthSelect('9M') }} > Last 9 Months </DropdownItem>
                <DropdownItem onClick={() => { props.monthSelect('12M') }} > Last 12 Months </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

/**
 * Social Selection dropdown popup 
 * @author  : PAV
 * @param   : Props
 * @return  : Html Render
 *
 **/
const SocialDropdown = (props) => {
    return (
        <Dropdown isOpen={props.open} toggle={props.toggle}>
            <DropdownToggle>
                <label style={{ "textTransform": "capitalize" }}>{props.currentValue} &nbsp; </label><i className="dropdown-arrow"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => { props.socialSelect('facebook') }} > Facebook </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('twitter') }} > Twitter </DropdownItem>
                {/* <DropdownItem onClick={() => { props.socialSelect('instagram') }} > Instagram </DropdownItem> */}
                <DropdownItem onClick={() => { props.socialSelect('pinterest') }} > Pinterest </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('linkedin') }} > Linkedin </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

const MostDataDropdown = (props) => {

    let title = '';

    // if (props.socialCurrentValue === 'facebook') {
    if (props.socialCurrentValue === 'facebook' || props.socialCurrentValue === 'linkedin') {
        if (props.currentValue === 'no_of_likes') {
            title = 'Most Liked'
        }
        else if (props.currentValue === 'no_of_shares') {
            title = 'Most Shared'
        }
        else if (props.currentValue === 'no_of_comments') {
            title = 'Most Commented'
        }
        else if (props.currentValue === 'submission') {
            title = 'submission';
        }
    }
    else if (props.socialCurrentValue === 'twitter') {
        if (props.currentValue === 'no_of_likes') {
            title = 'Most Favorite'
        }
        else if (props.currentValue === 'no_of_shares') {
            title = 'Most Retweet'
        }
    }
    else if (props.socialCurrentValue === 'pinterest') {
        if (props.currentValue === 'no_of_comments') {
            title = 'Most Comment'
        }
        else if (props.currentValue === 'no_of_shares') {
            title = 'Most Save'
        }
    }
    else { }

    return (
        // (props.socialCurrentValue === 'facebook') ?
        (props.socialCurrentValue === 'facebook' || props.socialCurrentValue === 'linkedin') ?
            <Dropdown isOpen={props.open} toggle={props.toggle}>
                <DropdownToggle>
                    <label style={{ "textTransform": "capitalize" }}>Posts <span style={{ "color": "#6772e5", "paddingLeft": "5px" }}>{title}</span></label><i className="dropdown-arrow"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={() => { props.dashboardDataSelect('no_of_likes') }} > Most Liked </DropdownItem>
                    <DropdownItem onClick={() => { props.dashboardDataSelect('no_of_shares') }} > Most Shared </DropdownItem>
                    <DropdownItem onClick={() => { props.dashboardDataSelect('no_of_comments') }} > Most Commented </DropdownItem>
                    {/* <DropdownItem onClick={() => { props.dashboardDataSelect('submission') }} > Submissions </DropdownItem> */}
                </DropdownMenu>
            </Dropdown>
            : (props.socialCurrentValue === 'twitter') ?
                <Dropdown isOpen={props.open} toggle={props.toggle}>
                    <DropdownToggle>
                        <label style={{ "textTransform": "capitalize" }}>Posts <span style={{ "color": "#6772e5", "paddingLeft": "5px" }}>{title}</span></label><i className="dropdown-arrow"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={() => { props.dashboardDataSelect('no_of_likes') }} > Most Favorite </DropdownItem>
                        <DropdownItem onClick={() => { props.dashboardDataSelect('no_of_shares') }} > Most Retweet </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                : (props.socialCurrentValue === 'pinterest') ?
                    <Dropdown isOpen={props.open} toggle={props.toggle}>
                        <DropdownToggle>
                            <label style={{ "textTransform": "capitalize" }}>Posts <span style={{ "color": "#6772e5", "paddingLeft": "5px" }}>{title}</span></label><i className="dropdown-arrow"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={() => { props.dashboardDataSelect('no_of_comments') }} > Most Comment </DropdownItem>
                            <DropdownItem onClick={() => { props.dashboardDataSelect('no_of_shares') }} > Most Save </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    ''
    );
}


class CustomTooltip extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        type: PropTypes.string,
        payload: PropTypes.array,
        label: PropTypes.string,
    }

    getIntroOfPage(label) {
        if (label === 'Page A') {
            return "Page A is about men's clothing";
        } else if (label === 'Page B') {
            return "Page B is about women's dress";
        } else if (label === 'Page C') {
            return "Page C is about women's bag";
        } else if (label === 'Page D') {
            return "Page D is about household goods";
        } else if (label === 'Page E') {
            return "Page E is about food";
        } else if (label === 'Page F') {
            return "Page F is about baby food";
        }
    }

    render() {
        const { active } = this.props;

        if (active) {
            const { payload, label } = this.props;
            return (
                <div className="graph custom-tooltip">
                    <label className="label blue-color" style={{ "marginBottom": "0px !important" }}>2520</label>
                </div>
            );
        }
        return null;
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            social_analytics: null,
            timing_open: false,
            social_open: false,
            barChartData: null,

            monthCurrentValue: 3,
            // socialCurrentValue: 'twitter',
            socialCurrentValue: 'facebook',
            likes_share_cmt: 'likes',

            dashboardCurrentValue: 'no_of_likes',

            isRender: 0,
            isload: 1,
            isRenderChart: false,

            timing_open: false,
            social_open: false,
            dashboard_open: false,
            activePage: 1,
            totalcmt: 0,
            totalshare: 0,
            totallike: 0,
        }
    }

    timing_toggle = () => { this.setState({ timing_open: !this.state.timing_open }); }
    social_toggle = () => { this.setState({ social_open: !this.state.social_open }); }
    dashboard_toggle = () => { this.setState({ dashboard_open: !this.state.dashboard_open }); }

    componentWillMount = () => {
        const { dispatch } = this.props;

        //
        const { socialCurrentValue, dashboardCurrentValue } = this.state;
        if (socialCurrentValue === 'facebook' || socialCurrentValue === 'twitter') {
            this.setState({ dashboardCurrentValue: 'no_of_likes' });
        }
        else if (socialCurrentValue === 'pinterest') {
            this.setState({ dashboardCurrentValue: 'no_of_comments' });
        }

        let arrayFilter = [{
            "start_date": moment(moment().endOf('month').format("YYYY-MM-DD")).subtract(2, 'months').startOf('month').format('YYYY-MM-DD'),
            "end_date": moment().endOf('month').format("YYYY-MM-DD"),
            "social_media_platform": "facebook",
            "filter": [
                []
            ]
        }];

        let dashboardFilter = [{
            "start_date": moment(moment().endOf('month').format("YYYY-MM-DD")).subtract(2, 'months').startOf('month').format('YYYY-MM-DD'),
            "end_date": moment().endOf('month').format("YYYY-MM-DD"),
            "social_media_platform": "facebook",
            "page_size": 4,
            "page_no": 1,
            "sort": [{ "field": this.state.dashboardCurrentValue, "value": -1 }] //
            // "sort": [{ "field":'no_of_likes' , "value": -1}] //
        }]

        this.setState({ isRender: 1 });
        dispatch(getCheckoutList());
        toast.dismiss(this.toastId);
        dispatch(getSocialAnalytics(arrayFilter));

        dispatch(getDashboard(dashboardFilter)); // Dashboard
    }

    componentDidUpdate() {
        const { social_analytics_data } = this.props;
        const { social_analytics, isRender } = this.state;
        let monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        if (social_analytics !== social_analytics_data.data && isRender === 1) {
            if (social_analytics_data.status === 1 && social_analytics_data.data !== null) {
                let social_data = [];
                let analytics_data = social_analytics_data.data[0];

                // now
                let { socialCurrentValue, likes_share_cmt } = this.state;
                let showChart = '';
                if (socialCurrentValue === 'facebook' || socialCurrentValue === 'pinterest' || socialCurrentValue === 'twitter') {
                    if (likes_share_cmt === 'likes') { showChart = 'likes'; }
                    if (likes_share_cmt === 'shares') { showChart = 'shares'; }
                    if (likes_share_cmt === 'comments') { showChart = 'comments'; }
                }
                analytics_data.map((obj, index) => {
                    // social_data.push({ name: monthArr[obj._id - 1], compare1: (Math.floor(Math.random() * 201)) });
                    if (showChart === 'likes') {
                        social_data.push({ name: monthArr[obj._id - 1], compare1: obj.like_cnt });
                    }
                    else if (showChart === 'shares') {
                        social_data.push({ name: monthArr[obj._id - 1], compare1: obj.share_cnt });
                    }
                    else if (showChart === 'comments') {
                        social_data.push({ name: monthArr[obj._id - 1], compare1: obj.comment_cnt });
                    }
                });
                this.setState({
                    social_analytics: social_data,
                    isRender: 0,
                });
            }
        }
    }
    /*************************************************************
                        Start : Dashboard Graph
    *************************************************************/

    like_share_comm = (value) => {
        const { dispatch } = this.props;
        const { socialCurrentValue, monthCurrentValue } = this.state;
        if (this.state.likes_share_cmt !== value) {
            // this.setState({ likes_share_cmt: value, isRender: 1 });
            this.setState({ likes_share_cmt: value, isRender: 1 });

            // Now
            let arrayFilter = [{
                "start_date": moment(moment().endOf('month').format("YYYY-MM-DD")).subtract(monthCurrentValue - 1, 'months').startOf('month').format('YYYY-MM-DD'),
                "end_date": moment().endOf('month').format("YYYY-MM-DD"),
                "social_media_platform": socialCurrentValue,
                "filter": [
                    []
                ]
            }];

            dispatch(getSocialAnalytics(arrayFilter));
        }
    }
    getDataMonthWise = (months) => {
        const { dispatch } = this.props;
        const { socialCurrentValue } = this.state;
        let start_date = '';
        // let end_date = moment().format("YYYY-MM-DD");
        let end_date = moment().endOf('month').format("YYYY-MM-DD");
        if (months == '3M') {
            start_date = moment(end_date).startOf('month').subtract(2, 'months').format('YYYY-MM-DD');
            this.setState({ monthCurrentValue: 3 })
        } else if (months == '6M') {
            start_date = moment(end_date).startOf('month').subtract(5, 'months').format('YYYY-MM-DD');
            this.setState({ monthCurrentValue: 6 })
        } else if (months == '9M') {
            start_date = moment(end_date).startOf('month').subtract(8, 'months').format('YYYY-MM-DD');
            this.setState({ monthCurrentValue: 9 })
        } else if (months == '12M') {
            start_date = moment(end_date).startOf('month').subtract(11, 'months').format('YYYY-MM-DD');
            this.setState({ monthCurrentValue: 12 })
        }
        let arrayFilter = [{
            "start_date": start_date,
            "end_date": end_date,
            "social_media_platform": socialCurrentValue,
            "filter": [
                [],
            ]
        }];
        this.setState({ isRender: 1 });
        dispatch(getSocialAnalytics(arrayFilter));

        if (socialCurrentValue === 'facebook' || socialCurrentValue === 'twitter') {
            this.setState({ dashboardCurrentValue: 'no_of_likes' });
        }
        else if (socialCurrentValue === 'pinterest') {
            this.setState({ dashboardCurrentValue: 'no_of_comments' });
        }

        let dashboardFilter = [{
            "start_date": start_date,
            "end_date": end_date,
            "social_media_platform": socialCurrentValue,
            "page_size": 4,
            "page_no": 1,
            "sort": [{ "field": this.state.dashboardCurrentValue, "value": -1 }] //
            // "sort": [{ "field":'no_of_likes' , "value": -1}] //

        }]

        // this.setState({socialCurrentValue:socialCurrentValue});
        dispatch(getDashboard(dashboardFilter)); //Dashboard

    }

    getDataSocialWise = (socialName) => {
        const { dispatch } = this.props;
        //
        let d = ''; // dashboard current value
        // if (socialName === 'facebook' || socialName === 'twitter') {
        if (socialName === 'facebook' || socialName === 'twitter' || socialName === 'linkedin') {
            this.setState({ dashboardCurrentValue: 'no_of_likes' });
            this.setState({ likes_share_cmt: 'likes' });
            d = 'no_of_likes';
        }
        else if (socialName === 'pinterest') {
            this.setState({ dashboardCurrentValue: 'no_of_comments' });
            this.setState({ likes_share_cmt: 'comments' })
            d = 'no_of_comments';
        }

        let arrayFilter = [{
            "start_date": moment(moment().endOf('month').format("YYYY-MM-DD")).subtract(this.state.monthCurrentValue - 1, 'months').startOf('month').format('YYYY-MM-DD'),
            "end_date": moment().endOf('month').format("YYYY-MM-DD"),
            "social_media_platform": socialName,
            "filter": [
                []
            ]
        }];

        let dashboardFilter = [{
            // "start_date": moment(moment().format("YYYY-MM-DD")).subtract(3, 'months').format('YYYY-MM-DD'),
            "start_date": moment(moment().endOf('month').format("YYYY-MM-DD")).subtract(this.state.monthCurrentValue - 1, 'months').startOf('month').format('YYYY-MM-DD'),
            "end_date": moment().endOf('month').format("YYYY-MM-DD"),
            "social_media_platform": socialName,
            "page_size": 4,
            "page_no": 1,
            // "sort": [{ "field": this.state.dashboardCurrentValue, "value": -1 }] //
            "sort": [{ "field": d, "value": -1 }] //

        }]

        dispatch(getSocialAnalytics(arrayFilter));

        dispatch(getDashboard(dashboardFilter)); // Dashboard

        this.setState({ isRender: 1, socialCurrentValue: socialName });
        this.setState({
            totallike: 0,
            totalcmt: 0,
            totalshare: 0,
            isload: 1,
        });
    }
    /****************   End : Dashboard Graph    ****************/

    /** ************ Start : Dashborad Bottom ******* */

    getDashboardDataSelect = (dashbordValue) => {
        const { dispatch } = this.props;
        const { socialCurrentValue, monthCurrentValue } = this.state;
        let dashboardFilter = [{
            "start_date": moment(moment().endOf('month').format("YYYY-MM-DD")).subtract(monthCurrentValue - 1, 'months').startOf('month').format('YYYY-MM-DD'),
            "end_date": moment().endOf('month').format("YYYY-MM-DD"),
            "social_media_platform": socialCurrentValue,
            "page_size": 4,
            "page_no": 1,
            "sort": [{ "field": dashbordValue, "value": -1 }]
        }]

        this.setState({ dashboardCurrentValue: dashbordValue });
        dispatch(getDashboard(dashboardFilter)); // Dashboard
    }


    // Display post on dashboard
    renderPost = (obj, index, socialCurrentValue) => {

        let likes = ''
        let shares = ''
        let comments = ''

        // if (socialCurrentValue === 'facebook') {
        if (socialCurrentValue === 'facebook' || socialCurrentValue === 'linkedin') {
            likes = 'Likes';
            shares = 'Shares';
            comments = 'Comments';
        }
        else if (socialCurrentValue === 'twitter') {
            likes = 'Favorite';
            shares = 'Retweet';
        }
        else if (socialCurrentValue === 'pinterest') {
            shares = 'Save';
            comments = 'Comments';
        }

        /** Set image for post */
        let post_img = '';
        if (obj.type === 'applied_post') {
            if (obj.image === undefined) {
                post_img = noCampaignImg;
            }
            else {
                post_img = imgRoutes.CAMPAIGN_POST_IMG_PATH + obj.image
            }
        }
        else if (obj.type === 'inspired_post') {
            if (obj.image === undefined) {
                post_img = noCampaignImg;
            }
            else {
                post_img = imgRoutes.CAMPAIGN_INSPIRED_IMG_PATH + obj.image
            }
        }
        //--------------change color of # and @ text---------------------------
        // var str = obj.description;
        // var arr = str.split(' ');
        // var finalStr = [];
        // arr.map(function (value, index) {
        //     var t = value.substring(0, 1);
        //     console.log(t, ' ', value);
        //     if (t === '#' || t === '@') {
        //     finalStr.push(<span>value</span>);
        //     } else {
        //         finalStr.push(value);
        //     }
        // });
        // var text = finalStr.toString();
        // console.log('Type>',finalStr);
        // var finalString = text.replace(/,/g, " ");
    
        //-----------------------------------------
        return (
            <li key={index}>
                <div className="databox-div d-flex dashbord-post">
                    {/* <div className="databox-div-l"><img src={post_img} alt="" /></div> */}
                    <div className="databox-div-l" style={{ "background": "url('" + post_img + "') no-repeat center", "backgroundSize": "cover" }}></div>
                    <div className="databox-div-r">
                        <h3>
                            <big>{obj.campaign_name}</big>
                            <small>{obj.user.name}</small>
                        </h3>
                        {/* <p>I love the <a href="javascript:void(0)">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="javascript:void(0)">#thegrocer</a> <a href="javascript:void(0)">#warmsundays</a> <a href="javascript:void(0)">#sponsored</a></p> */}
                        <p>{(obj.description.length > 50) ? obj.description.substring(0, 50) + '...' : obj.description}</p>
                        {/* <p>{finalString}</p> */}
                        <div className="databox-div-r-btm d-flex">
                            {/* {(socialCurrentValue === 'facebook' || socialCurrentValue === 'twitter') ? */}
                            {(socialCurrentValue === 'facebook' || socialCurrentValue === 'twitter' || socialCurrentValue === 'linkedin') ?
                                <h5>
                                    <big>{obj.no_of_likes}</big>
                                    {/* <small>Likes</small> */}
                                    <small>{likes}</small>
                                </h5>
                                : ''
                            }
                            {/* {(socialCurrentValue === 'facebook' || socialCurrentValue === 'pinterest' || socialCurrentValue === 'twitter') ? */}
                            {(socialCurrentValue === 'facebook' || socialCurrentValue === 'pinterest' || socialCurrentValue === 'twitter' || socialCurrentValue === 'linkedin') ?
                                <h5>
                                    <big>{obj.no_of_shares}</big>
                                    {/* <small>shares</small> */}
                                    <small>{shares}</small>
                                </h5> : ''
                            }
                            {/* {(socialCurrentValue === 'facebook' || socialCurrentValue === 'pinterest') ? */}
                            {(socialCurrentValue === 'facebook' || socialCurrentValue === 'pinterest' || socialCurrentValue === 'linkedin') ?
                                <h5>
                                    <big>{obj.no_of_comments}</big>
                                    {/* <small>Comments</small> */}
                                    <small>{comments}</small>
                                </h5>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    /** Counter to count share,like,comments */
    getCounter = (obj) => {
        // const { totallike, totalshare, totalcmt} = this.state;
        if (this.state.isload === 1) {
            this.setState({
                totallike: obj.like_cnt,
                totalshare: obj.share_cnt,
                totalcmt: obj.comment_cnt,
                isload: 0
            })
        }
    }

    render() {
        const { barChartData, isRender, social_analytics, likes_share_cmt, isRenderChart, socialCurrentValue } = this.state;
        const { loading, dbloading, error, socialAnalyticsData, dashboard_data, social_analytics_data } = this.props;
        const { totallike, totalshare, totalcmt } = this.state;

        if (!dbloading && social_analytics_data.data !== null) {
            let myData = social_analytics_data.data[0];
            let d = {
                "like_cnt": 0,
                "comment_cnt": 0,
                "share_cnt": 0
            };
            myData.map((obj, index) => {
                d.like_cnt += obj.like_cnt;
                d.comment_cnt += obj.comment_cnt;
                d.share_cnt += obj.share_cnt;
            });

            this.getCounter(d);
        }

        let monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return (
            <div className='dashboard-page'>
                <div className="right-box">
                    <div className="right-box-head d-flex">
                        <div className="social-dropdown">
                            <SocialDropdown
                                socialSelect={(value) => { this.getDataSocialWise(value); }}
                                currentValue={this.state.socialCurrentValue}
                                open={this.state.social_open}
                                toggle={this.social_toggle}
                            />
                        </div>
                        <div className="timeing-dropdown">
                            <TimingDropdown
                                monthSelect={(value) => { this.getDataMonthWise(value); }}
                                currentValue={this.state.monthCurrentValue}
                                open={this.state.timing_open}
                                toggle={this.timing_toggle}
                            />
                        </div>
                    </div>
                    <div className="right-box-content d-flex">
                        <div className="graph-img" style={{ width: 'auto', height: '350px' }}>
                            {(totallike > 0 || totalshare > 0 || totalcmt > 0) ?
                                <ResponsiveContainer>
                                    <BarChart data={social_analytics}
                                        margin={{ top: 30, right: 0, left: 0, bottom: 20 }}>
                                        <XAxis dataKey="name" />
                                        <Tooltip
                                            // content={<CustomTooltip/>}
                                            // // content={<CustomTooltip data={this.state.social_analytics}/>}
                                            position={{ y: 215 }}

                                        />
                                        <Bar dataKey="compare1" fill="#6772e6" />
                                    </BarChart>
                                </ResponsiveContainer>
                                :
                                <h4 style={{ "fontSize": "30px", "marginTop": "150px", "fontWeight": "600", "color": "rgb(103, 114, 230)" }}>No Data Found</h4>
                            }
                        </div>
                    </div>
                    <div className="right-box-btm">
                        {/* (socialCurrentValue === 'facebook') ? */}
                        {
                            (socialCurrentValue === 'facebook' || socialCurrentValue === 'linkedin') ?
                                <ul className="data-counter d-flex">
                                    <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'likes') ? true : false })} onClick={() => { this.like_share_comm('likes') }}> <small>{totallike > 0 ? totallike : 0}</small><span>Likes</span> </a> </li>
                                    <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'shares') ? true : false })} onClick={() => { this.like_share_comm('shares') }}> <small>{totalshare > 0 ? totalshare : 0}</small><span>Shares</span> </a> </li>
                                    <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'comments') ? true : false })} onClick={() => { this.like_share_comm('comments') }}> <small>{totalcmt > 0 ? totalcmt : 0}</small><span>Comments</span> </a> </li>
                                </ul>
                                : (socialCurrentValue === 'twitter') ?
                                    <ul className="data-counter d-flex">
                                        <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'likes') ? true : false })} onClick={() => { this.like_share_comm('likes') }}> <small>{totallike > 0 ? totallike : 0}</small><span>Favorite</span> </a> </li>
                                        <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'shares') ? true : false })} onClick={() => { this.like_share_comm('shares') }}> <small>{totalshare > 0 ? totalshare : 0}</small><span>Retweet</span> </a> </li>
                                    </ul>
                                    : (socialCurrentValue === 'pinterest') ?
                                        <ul className="data-counter d-flex">
                                            <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'comments') ? true : false })} onClick={() => { this.like_share_comm('comments') }}> <small>{totalcmt > 0 ? totalcmt : 0}</small><span>Comments</span> </a> </li>
                                            <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'shares') ? true : false })} onClick={() => { this.like_share_comm('shares') }}> <small>{totalshare > 0 ? totalshare : 0}</small><span>Save</span> </a> </li>
                                        </ul>
                                        : ''
                        }
                    </div>
                </div>
                <div className="right-btm">
                    <div className="right-box-btm-head d-flex">
                        {/* <div className="post-dropdown"> */}
                        <div className="social-dropdown">
                            <MostDataDropdown
                                dashboardDataSelect={(value) => { this.getDashboardDataSelect(value); }}
                                currentValue={this.state.dashboardCurrentValue}
                                open={this.state.dashboard_open}
                                toggle={this.dashboard_toggle}
                                socialCurrentValue={this.state.socialCurrentValue}
                            />
                        </div>
                        <div className="view-all">
                            {(dashboard_data.data !== null && dashboard_data.total > 0) ?
                                <a href="javascript:void(0)"><NavLink to={routeCodes.CAMPAIGN_ACTIVE}>View All</NavLink> <i></i> </a>
                                : ''
                            }
                        </div>
                    </div>
                    <div className="right-box-btm-content d-flex">
                        <div className="data-box">
                            <ul className="d-flex">
                                {
                                    (dbloading) ?
                                        <li>
                                            <div className="databox-div d-flex">
                                                {/* <Facebook />
                                                <Code /> */}
                                                <div className="loader" style={{ "zIndex": "999999999" }}></div>
                                            </div>
                                        </li>
                                        :
                                        (dashboard_data.data !== null && dashboard_data.total > 0) ? dashboard_data.data.map((obj, index) => this.renderPost(obj, index, socialCurrentValue))
                                            : <h4 style={{ "fontSize": "30px", "fontWeight": "600", "margin": "0 auto", "color": "rgb(103, 114, 230)" }}>No Posts Found</h4>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { checkout, analytics } = state;
    return {
        loading: checkout.get('loading'),
        error: checkout.get('error'),
        carts: checkout.get('carts'),
        social_analytics_data: analytics.get('social_analytics'),

        dashboard_data: analytics.get('dashboard'),
        dbloading: analytics.get('dashboard').dbloading,
        error: analytics.get('error'),
        db_currentValue: analytics.get('dashboardCurrentValue'),
    }
}
export default connect(mapStateToProps)(Dashboard)