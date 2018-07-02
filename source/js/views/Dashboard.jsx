import React, { Component } from 'react';
import { connect } from 'react-redux';
import graphImg from 'img/site/graph-01.jpg';
import img1 from "img/site/img-01.jpg";
import img2 from "img/site/img-02.jpg";
import img3 from "img/site/img-03.jpg";
import img4 from "img/site/img-04.jpg";
import { getCheckoutList } from '../actions/Checkout';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, position } from 'recharts';
import { getSocialAnalytics } from '../actions/analytics';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from "classnames";


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
                <label style={{"textTransform":"capitalize"}}>{props.currentValue} &nbsp; </label><i className="dropdown-arrow"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => { props.socialSelect('twitter') }} > Twitter </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('facebook') }} > Facebook </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('linkedin') }} > Linkedin </DropdownItem>
            </DropdownMenu>
        </Dropdown>
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
            socialCurrentValue: 'twitter',
            likes_share_cmt: 'likes',

            isRender: 0,
            isRenderChart: false,

            timing_open: false,
            social_open: false,
        }
    }

    timing_toggle = () => { this.setState({ timing_open: !this.state.timing_open }); }
    social_toggle = () => { this.setState({ social_open: !this.state.social_open }); }

    componentWillMount = () => {
        const { dispatch } = this.props;
        let arrayFilter = [{
            "start_date": moment(moment().format("YYYY-MM-DD")).subtract(3, 'months').format('YYYY-MM-DD'),
            "end_date": moment().format("YYYY-MM-DD"),
            "social_media_platform": "twitter",
            "filter": [
                []
            ]
        }];
        this.setState({ isRender: 1 });
        dispatch(getCheckoutList());
        dispatch(getSocialAnalytics(arrayFilter));
    }

    componentDidUpdate() {
        const { social_analytics_data } = this.props;
        const { social_analytics, isRender } = this.state;
        let monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        if (social_analytics !== social_analytics_data.data && isRender===1) {
            if (social_analytics_data.status === 1 && social_analytics_data.data !== null) {
                let social_data = [];
                let analytics_data = social_analytics_data.data[0];
                analytics_data.map((obj, index) => {
                    social_data.push({ name: monthArr[obj._id - 1], compare1: (Math.floor(Math.random() * 201)) });
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
        if (this.state.likes_share_cmt !== value) {
            this.setState({ likes_share_cmt: value, isRender: 1 });
        }
    }
    getDataMonthWise = (months) => {
        const { dispatch } = this.props;
        const { socialCurrentValue } = this.state;
        let start_date = '';
        let end_date = moment().format("YYYY-MM-DD");
        if (months == '3M') {
            start_date = moment(end_date).subtract(3, 'months').format('YYYY-MM-DD');
            this.setState({ monthCurrentValue: 3 })
        } else if (months == '6M') {
            start_date = moment(end_date).subtract(6, 'months').format('YYYY-MM-DD');
            this.setState({ monthCurrentValue: 6 })
        } else if (months == '9M') {
            start_date = moment(end_date).subtract(9, 'months').format('YYYY-MM-DD');
            this.setState({ monthCurrentValue: 9 })
        } else if (months == '12M') {
            start_date = moment(end_date).subtract(12, 'months').format('YYYY-MM-DD');
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
    }
    getDataSocialWise = (socialName) => {
        const { dispatch } = this.props;
        let arrayFilter = [{
            "start_date": moment(moment().format("YYYY-MM-DD")).subtract(this.state.monthCurrentValue, 'months').format('YYYY-MM-DD'),
            "end_date": moment().format("YYYY-MM-DD"),
            "social_media_platform": socialName,
            "filter": [
                []
            ]
        }];
        dispatch(getSocialAnalytics(arrayFilter));
        this.setState({ isRender: 1, socialCurrentValue: socialName });
    }
    /****************   End : Dashboard Graph    ****************/
    render() {
        const { barChartData, isRender, social_analytics, likes_share_cmt, isRenderChart } = this.state;
        const { loading, socialAnalyticsData } = this.props;
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
                            <ResponsiveContainer>
                                <BarChart data={social_analytics}
                                    margin={{ top: 30, right: 0, left: 0, bottom: 20 }}>
                                    <XAxis dataKey="name" />
                                    <Tooltip
                                        content={<CustomTooltip />}
                                        position={{ y: 240 }}
                                    />
                                    <Bar dataKey="compare1" stackId="a" fill="#6772e6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="right-box-btm">
                        <ul className="data-counter d-flex">
                            <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'likes') ? true : false })} onClick={() => { this.like_share_comm('likes') }}> <small>235</small><span>Likes</span> </a> </li>
                            <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'shares') ? true : false })} onClick={() => { this.like_share_comm('shares') }}> <small>26</small><span>Shares</span> </a> </li>
                            <li> <a href="javascript:void(0)" className={cx({ 'active': (this.state.likes_share_cmt === 'comments') ? true : false })} onClick={() => { this.like_share_comm('comments') }}> <small>86</small><span>Comments</span> </a> </li>
                        </ul>
                    </div>
                </div>
                <div className="right-btm">
                    <div className="right-box-btm-head d-flex">
                        <div className="post-dropdown">
                            <a href="#" role="button" id="post-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Posts <span>Most Liked</span> <i className="dropdown-arrow"></i> </a>
                            <div className="dropdown-menu" aria-labelledby="post-dropdown">
                                <a className="dropdown-item" href="#">Most Liked</a>
                                <a className="dropdown-item" href="#">Most Shared</a>
                                <a className="dropdown-item" href="#">Most Commented</a>
                                <a className="dropdown-item" href="#">Submissions</a>
                            </div>
                        </div>
                        <div className="view-all">
                            <a href="#"> View All <i></i> </a>
                        </div>
                    </div>
                    <div className="right-box-btm-content d-flex">
                        <div className="data-box">
                            <ul className="d-flex">
                                <li>
                                    <div className="databox-div d-flex">
                                        <div className="databox-div-l"><img src={img1} alt="" /></div>
                                        <div className="databox-div-r">
                                            <h3>
                                                <big>LinkedIn Campaign</big>
                                                <small>John Doe</small>
                                            </h3>
                                            <p>I love the <a href="javascript:void(0)">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="javascript:void(0)">#thegrocer</a> <a href="javascript:void(0)">#warmsundays</a> <a href="javascript:void(0)">#sponsored</a></p>
                                            <div className="databox-div-r-btm d-flex">
                                                <h5>
                                                    <big>335</big>
                                                    <small>Likes</small>
                                                </h5>
                                                <h5>
                                                    <big>31</big>
                                                    <small>shares</small>
                                                </h5>
                                                <h5>
                                                    <big>36</big>
                                                    <small>Comments</small>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="databox-div d-flex">
                                        <div className="databox-div-l"><img src={img2} alt="" /></div>
                                        <div className="databox-div-r">
                                            <h3>
                                                <big>Facebook Campaign</big>
                                                <small>John Doe</small>
                                            </h3>
                                            <p>I love the <a href="javascript:void(0)">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="javascript:void(0)">#thegrocer</a> <a href="javascript:void(0)">#warmsundays</a> <a href="javascript:void(0)">#sponsored</a></p>
                                            <div className="databox-div-r-btm d-flex">
                                                <h5>
                                                    <big>335</big>
                                                    <small>Likes</small>
                                                </h5>
                                                <h5>
                                                    <big>31</big>
                                                    <small>shares</small>
                                                </h5>
                                                <h5>
                                                    <big>36</big>
                                                    <small>Comments</small>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="databox-div d-flex">
                                        <div className="databox-div-l"><img src={img3} alt="" /></div>
                                        <div className="databox-div-r">
                                            <h3>
                                                <big>Facebook Campaign</big>
                                                <small>John Doe</small>
                                            </h3>
                                            <p>I love the <a href="javascript:void(0)">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="javascript:void(0)">#thegrocer</a> <a href="javascript:void(0)">#warmsundays</a> <a href="javascript:void(0)">#sponsored</a></p>
                                            <div className="databox-div-r-btm d-flex">
                                                <h5>
                                                    <big>335</big>
                                                    <small>Likes</small>
                                                </h5>
                                                <h5>
                                                    <big>31</big>
                                                    <small>shares</small>
                                                </h5>
                                                <h5>
                                                    <big>36</big>
                                                    <small>Comments</small>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="databox-div d-flex">
                                        <div className="databox-div-l"><img src={img4} alt="" /></div>
                                        <div className="databox-div-r">
                                            <h3>
                                                <big>LinkedIn Campaign</big>
                                                <small>John Doe</small>
                                            </h3>
                                            <p>I love the <a href="javascript:void(0)">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="javascript:void(0)">#thegrocer</a> <a href="javascript:void(0)">#warmsundays</a> <a href="javascript:void(0)">#sponsored</a></p>
                                            <div className="databox-div-r-btm d-flex">
                                                <h5>
                                                    <big>335</big>
                                                    <small>Likes</small>
                                                </h5>
                                                <h5>
                                                    <big>31</big>
                                                    <small>shares</small>
                                                </h5>
                                                <h5>
                                                    <big>36</big>
                                                    <small>Comments</small>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </li>
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
    }
}
export default connect(mapStateToProps)(Dashboard)