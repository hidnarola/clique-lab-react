import React, { Component } from 'react';
import { connect } from 'react-redux';
import graph from 'img/site/graph.jpg';
import downarrowImg from 'img/site/down-arrow-1.png';
import moment from 'moment';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, position } from 'recharts';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { getSocialAnalytics } from '../../actions/analytics';
import PropTypes from 'prop-types';
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
                <label style={{"textTransform":"capitalize"}}>{props.currentValue}</label> &nbsp; <i className="dropdown-arrow"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => { props.socialSelect('twitter') }} > Twitter </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('facebook') }} > Facebook </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('linkedin') }} > Linkedin </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('pinterest') }} > Pinterest </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('instagram') }} > Instagram </DropdownItem>
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
            const { payload, label, totalNoCompare, whichCompare } = this.props;
            return (
                <div className="graph custom-tooltip">
                    {(totalNoCompare === 1) && <label className="label blue-color" style={{ "marginBottom": "0px !important" }}>2520</label>}
                    {(totalNoCompare == 2 && whichCompare.indexOf(2) > -1) && <div><label className="label blue-color" style={{ "marginBottom": "0px !important" }}>2520</label><label className="label sky-color" style={{ "marginBottom": "0px !important" }}>2520</label></div>}
                    {(totalNoCompare == 2 && whichCompare.indexOf(3) > -1) && <div><label className="label blue-color" style={{ "marginBottom": "0px !important" }}>2520</label><label className="label pink-color" style={{ "marginBottom": "0px !important" }}>2520</label></div>}
                    {(totalNoCompare == 3) && <div><label className="label blue-color" style={{ "marginBottom": "0px !important" }}>2520</label><label className="label sky-color" style={{ "marginBottom": "0px !important" }}>2520</label><label className="label pink-color" style={{ "marginBottom": "0px !important" }}>2520</label></div>}

                </div>
            );
        }

        return null;
    }
}

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            analytics: {
                'avg_cost_per_purchase': 0,
                'purchased_post': 0,
                'applicants': 0,
                'total_spend': 0,
                'reach_total': 0,
                'engage_total': 0,
            },
            social_analytics: null,
            timing_open: false,
            social_open: false,
            barChartData: null,

            monthCurrentValue: 3,
            socialCurrentValue: 'twitter',
            likes_share_cmt: 'likes',

            isRender: 0,
            isRenderChart: false,
            appliedFilter: null,
            currentAppliedFilter: null,
        }

        this.area = null;
        this.tooltip = null;
        this.point = null;

        this.onChartMouseMove = this.onChartMouseMove.bind(this);
        this.timing_toggle = this.timing_toggle.bind(this);
        this.social_toggle = this.social_toggle.bind(this);
    }

   

    timing_toggle() { this.setState({ timing_open: !this.state.timing_open }); }
    social_toggle() { this.setState({ social_open: !this.state.social_open }); }

    getDataMonthWise = (months) => {
        const { totalNoCompare, whichCompare, dispatch } = this.props;
        const { appliedFilter, socialCurrentValue } = this.state;
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
        let arrayFilter2 = [{
            "start_date": start_date,
            "end_date": end_date,
            "social_media_platform": socialCurrentValue,
            "filter": [
                this.state.appliedFilter[0]['filter'],
                this.state.appliedFilter[0]['filter2'],
                this.state.appliedFilter[0]['filter3'],
            ]
        }];
        if (totalNoCompare == 1) {
            arrayFilter2[0].filter.splice(1, 2);
        }

        if (totalNoCompare == 2 && whichCompare.indexOf(2) > -1) {
            arrayFilter2[0].filter.splice(2, 1);
        }
        if (totalNoCompare == 2 && whichCompare.indexOf(3) > -1) {
            arrayFilter2[0].filter.splice(1, 1);
        }
        this.setState({ isRender: 0 });
        dispatch(getSocialAnalytics(arrayFilter2));
    }

    getDataSocialWise = (socialName) => {
        const { totalNoCompare, whichCompare, dispatch } = this.props;
        const { appliedFilter } = this.state;
        this.setState({ socialCurrentValue: socialName });
        
        let arrayFilter2 = [{
            "start_date": moment(moment().format("YYYY-MM-DD")).subtract(this.state.monthCurrentValue, 'months').format('YYYY-MM-DD'),
            "end_date": moment().format("YYYY-MM-DD"),
            "social_media_platform": socialName,
            "filter": [
                this.state.appliedFilter[0]['filter'],
                this.state.appliedFilter[0]['filter2'],
                this.state.appliedFilter[0]['filter3'],
            ]
        }];

        // this.setState({ socialCurrentValue: socialName })
        if (totalNoCompare == 1) {
            arrayFilter2[0].filter.splice(1, 2);
        }

        if (totalNoCompare == 2 && whichCompare.indexOf(2) > -1) {
            arrayFilter2[0].filter.splice(2, 1);
        }
        if (totalNoCompare == 2 && whichCompare.indexOf(3) > -1) {
            arrayFilter2[0].filter.splice(1, 1);
        }
        this.setState({ isRender: 0 });
        dispatch(getSocialAnalytics(arrayFilter2));
        
    }

    renderLi = (obj) => {
        return (
            <ul className="d-flex" key={Math.random()}>
                <li>
                    <div className="average-box-inr">
                        <h3>Average cost per purchase</h3>
                        <h5 className="blue-color">${obj.average_cost_per_purchase}</h5>
                    </div>
                </li>
                <li>
                    <div className="average-box-inr">
                        <h3>Purchased posts</h3>
                        <h5 className="blue-color">{obj.purchased_campaign}</h5>
                    </div>
                </li>
                <li>
                    <div className="average-box-inr">
                        <h3>Applicants</h3>
                        <h5 className="blue-color">{obj.number_of_appplicants}</h5>
                    </div>
                </li>
                <li>
                    <div className="average-box-inr">
                        <h3>Total Spend</h3>
                        <h5 className="blue-color">${obj.total_spent}</h5>
                    </div>
                </li>
                <li>
                    <div className="average-box-inr">
                        <h3>Reach total</h3>
                        <h5 className="blue-color">{obj.no_of_reach_total}</h5>
                    </div>
                </li>
                <li>
                    <div className="average-box-inr">
                        <h3>Engagement total</h3>
                        <h5 className="blue-color">{obj.total_no_of_engagement}</h5>
                    </div>
                </li>
            </ul>
        );
    }

    componentWillReceiveProps() {
        const { appliedFilter, analyticsData, socialAnalyticsData } = this.props;
        this.setState({
            appliedFilter: appliedFilter,
            social_analytics: socialAnalyticsData,
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { social_analytics_data } = this.props;
        const { social_analytics, isRender } = this.state;
        if (social_analytics !== social_analytics_data.data) {
            if (social_analytics_data.status === 1 && social_analytics_data.data !== null) {
                this.setState({
                    isRender: 0,
                    social_analytics: social_analytics_data.data,
                    monthCurrentValue: social_analytics_data.data[0].length
                })
            }
        }
    }

    onChartMouseMove(chart) {
        console.log(chart);
        if (chart.isTooltipActive) {
            console.log(area);
            //let point = this.area.props.points[chart.activeTooltipIndex];
            let point = { x: chart.chartX, y: chart.chartY };
            if (point != this.point) {
                this.point = point;
                this.updateTooltip();
            }
        }
    }

    updateTooltip() {
        if (this.point) {
            let x = Math.round(this.point.x);
            let y = Math.round(this.point.y);

            this.tooltip.style.opacity = '1';
            this.tooltip.style.transform = `translate(${x}px, ${y}px)`;
            this.tooltip.childNodes[0].innerHTML = this.point.payload['value'];
        }
        else {
            this.tooltip.style.opacity = '0';
        }
    }

    like_share_comm = (value) => {
        if (this.state.likes_share_cmt !== value) {
            this.setState({ likes_share_cmt: value, isRender: 0 });
        }
    }

    componentWillMount = () => {
        const { appliedFilter, analyticsData, socialAnalyticsData } = this.props;
        this.setState({
            appliedFilter: appliedFilter,
            social_analytics: socialAnalyticsData,
        });
    }
    
    render() {
        const { barChartData, isRender, social_analytics, likes_share_cmt, isRenderChart } = this.state;
        const { loading, analyticsData, socialAnalyticsData, totalNoCompare, whichCompare } = this.props;
        let monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        let compareColor = ['blue-color', 'sky-color', 'pink-color'];
        if (isRender === 0 && likes_share_cmt) {
            if (social_analytics && social_analytics.length > 0) {
                let social_data = [];
                const arrayLength = social_analytics.length;
                social_analytics[0].map((obj, index) => {
                    // (arrayLength === 1) && social_data.push({ name: monthArr[obj._id - 1], compare1: obj.like_cnt });
                    // (arrayLength === 2) && social_data.push({ name: monthArr[social_analytics[arrayLength - 1][index]._id - 1], compare1: obj.like_cnt, compare2: social_analytics[arrayLength - 1][index].like_cnt });
                    // (arrayLength === 3) && social_data.push({ name: monthArr[social_analytics[arrayLength - 1][index]._id - 1], compare1: obj.like_cnt, compare2: social_analytics[arrayLength - 2][index].like_cnt, compare3: social_analytics[arrayLength - 1][index].like_cnt });
                    (arrayLength === 1) && social_data.push({ name: monthArr[obj._id - 1], compare1: (Math.floor(Math.random() * 201)) });
                    (arrayLength === 2) && social_data.push({ name: monthArr[social_analytics[arrayLength - 1][index]._id - 1], compare1: (Math.floor(Math.random() * 201)), compare2: (Math.floor(Math.random() * 201)) });
                    (arrayLength === 3) && social_data.push({ name: monthArr[social_analytics[arrayLength - 1][index]._id - 1], compare1: (Math.floor(Math.random() * 201)), compare2: (Math.floor(Math.random() * 201)), compare3: (Math.floor(Math.random() * 201)) });
                });
                this.setState({
                    barChartData: social_data,
                    isRender: 1,
                });
            }
        }
        if (loading) { return (<div className="loader"></div>) }
        return (
            <div className="analytics-body ">
                {(analyticsData !== null) &&
                    <div className="content-box average-box">
                        <ul className="d-flex">
                            <li>
                                <div className="average-box-inr">
                                    <h3>Average cost per purchase</h3>
                                    {
                                        analyticsData.map((obj, index) => (
                                            <h5 key={Math.random()} className={compareColor[index]}>{`$` + obj.average_cost_per_purchase}</h5>
                                        ))
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="average-box-inr">
                                    <h3>Purchased posts</h3>
                                    {
                                        analyticsData.map((obj, index) => (
                                            <h5 key={Math.random()} className={compareColor[index]}>{obj.purchased_campaign}</h5>
                                        ))
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="average-box-inr">
                                    <h3>Applicants</h3>
                                    {
                                        analyticsData.map((obj, index) => (
                                            <h5 key={Math.random()} className={compareColor[index]}>{obj.number_of_appplicants}</h5>
                                        ))
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="average-box-inr">
                                    <h3>Total Spend</h3>
                                    {
                                        analyticsData.map((obj, index) => (
                                            <h5 key={Math.random()} className={compareColor[index]}>{`$` + obj.total_spent}</h5>
                                        ))
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="average-box-inr">
                                    <h3>Reach total</h3>
                                    {
                                        analyticsData.map((obj, index) => (
                                            <h5 key={Math.random()} className={compareColor[index]}>{obj.no_of_reach_total}</h5>
                                        ))
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="average-box-inr">
                                    <h3>Engagement total</h3>
                                    {
                                        analyticsData.map((obj, index) => (
                                            <h5 key={Math.random()} className={compareColor[index]}>{obj.total_no_of_engagement}</h5>
                                        ))
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                }

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
                        <div className="graph-img" style={{ width: 'auto', height: '500px'}}>
                            <ResponsiveContainer>
                                <BarChart data={barChartData}
                                    //onMouseMove={this.onChartMouseMove}
                                    margin={{ top: 30, right: 50, left: 10, bottom: 50 }}>
                                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                    <XAxis dataKey="name" />

                                    {/* <YAxis /> */}
                                    <Tooltip
                                        content={<CustomTooltip />}
                                        totalNoCompare={totalNoCompare}
                                        whichCompare={whichCompare}
                                        position={{ y: 350 }}
                                    />
                                    {/* <Legend /> */}
                                    <Bar dataKey="compare1" stackId="a" fill="#6772e6" />
                                    <Bar dataKey="compare2" stackId="a" fill="#83bff7" />
                                    <Bar dataKey="compare3" stackId="a" fill="#f783c3" />
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { analytics } = state;
    return {
        loading: analytics.get('loading'),
        social_analytics_data: analytics.get('social_analytics'),
    }
}

export default connect(mapStateToProps)(Stats)