import React, { Component } from 'react';
import { connect } from 'react-redux';
import graph from 'img/site/graph.jpg';
import downarrowImg from 'img/site/down-arrow-1.png';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { getSocialAnalytics } from '../../actions/analytics';
import PropTypes from 'prop-types';

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
                {"Last "+ props.currentValue +" Months"} &nbsp; <i className="dropdown-arrow"></i>
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
                Twitter &nbsp; <i className="dropdown-arrow"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => { props.socialSelect('twitter') }} > Twitter </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('facebook') }} > Facebook </DropdownItem>
                <DropdownItem onClick={() => { props.socialSelect('linkedin') }} > Linkedin </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

class CustomTooltip extends Component{
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
            <p className="label">2520</p>
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

            isRender: 0,
            appliedFilter: null,
            currentAppliedFilter: null,
        }
        this.timing_toggle = this.timing_toggle.bind(this);
        this.social_toggle = this.social_toggle.bind(this);
    }

    timing_toggle() { this.setState({ timing_open: !this.state.timing_open }); }
    social_toggle() { this.setState({ social_open: !this.state.social_open }); }

    getDataMonthWise = (months) => {
        const { totalNoCompare, whichCompare, dispatch } = this.props;
        const { appliedFilter } = this.state;
        let start_date = '';
        let end_date = moment().format("YYYY-MM-DD");
        if (months == '3M') {
            start_date = moment(end_date).subtract(3, 'months').format('YYYY-MM-DD');
            this.setState({monthCurrentValue:3})
        } else if (months == '6M') {
            start_date = moment(end_date).subtract(6, 'months').format('YYYY-MM-DD');
            this.setState({monthCurrentValue:6})
        } else if (months == '9M') {
            start_date = moment(end_date).subtract(9, 'months').format('YYYY-MM-DD');
            this.setState({monthCurrentValue:9})
        } else if (months == '12M') {
            start_date = moment(end_date).subtract(12, 'months').format('YYYY-MM-DD');
            this.setState({monthCurrentValue:12})
        }
        let arrayFilter2 = [{
            "start_date": start_date,
            "end_date": end_date,
            "social_media_platform": "facebook",
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
        if (totalNoCompare == 1) {
            arrayFilter2[0].filter.splice(1, 2);
        }

        if (totalNoCompare == 2 && whichCompare.indexOf(2) > -1) {
            arrayFilter2[0].filter.splice(2, 1);
        }
        if (totalNoCompare == 2 && whichCompare.indexOf(3) > -1) {
            arrayFilter2[0].filter.splice(1, 1);
        }
        this.setState({ isRender: 0, socialCurrentValue: socialName });
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
            console.log('sb => in');
            if (social_analytics_data.status === 1 && social_analytics_data.data !== null) {
                this.setState({ isRender:0, social_analytics: social_analytics_data.data })
            }
        }
    }

    render() {
        const { barChartData, isRender, social_analytics } = this.state;
        const { loading, analyticsData, socialAnalyticsData } = this.props;
        let monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        let compareColor = ['blue-color', 'sky-color', 'pink-color'];

        let dummy_data = [
            { name: 'JAN', compare1: 4000, compare2: 2400, compare3: 4000, amt: 2400 },
            { name: 'FEB', compare1: 3000, compare2: 1398, compare3: 3000, amt: 2210 },
            { name: 'MAR', compare1: 2000, compare2: 9800, compare3: 2000, amt: 2290 },
            { name: 'APR', compare1: 2780, compare2: 3908, compare3: 2780, amt: 2000 },
            { name: 'MAY', compare1: 1890, compare2: 4800, compare3: 1890, amt: 2181 },
            { name: 'JUN', compare1: 2390, compare2: 3800, compare3: 2390, amt: 2500 },
            { name: 'JUL', compare1: 3490, compare2: 4300, compare3: 3490, amt: 2100 },
            { name: 'AUG', compare1: 4000, compare2: 2400, compare3: 4000, amt: 2400 },
            { name: 'SEP', compare1: 3000, compare2: 1398, compare3: 3000, amt: 2210 },
            { name: 'OCT', compare1: 2000, compare2: 9800, compare3: 2000, amt: 2290 },
            { name: 'NOV', compare1: 2780, compare2: 3908, compare3: 2780, amt: 2000 },
            { name: 'DEC', compare1: 1890, compare2: 4800, compare3: 1890, amt: 2181 },
        ];
        if (isRender === 0 && !loading) {
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
                                            <h5 key={Math.random()} className={compareColor[index]}>{`$` + obj.purchased_campaign}</h5>
                                        ))
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="average-box-inr">
                                    <h3>Applicants</h3>
                                    {
                                        analyticsData.map((obj, index) => (
                                            <h5 key={Math.random()} className={compareColor[index]}>{`$` + obj.number_of_appplicants}</h5>
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
                                            <h5 key={Math.random()} className={compareColor[index]}>{`$` + obj.no_of_reach_total}</h5>
                                        ))
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="average-box-inr">
                                    <h3>Engagement total</h3>
                                    {
                                        analyticsData.map((obj, index) => (
                                            <h5 key={Math.random()} className={compareColor[index]}>{`$` + obj.total_no_of_engagement}</h5>
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
                                open={this.state.social_open}
                                toggle={this.social_toggle}
                            />
                            {/* <a href="javascript:void(0)" role="button" id="social-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Twitter <i></i> </a>
                            <div className="dropdown-menu" aria-labelledby="social-dropdown">
                                <a className="dropdown-item" href="#">Facebook</a>
                                <a className="dropdown-item" href="#">Linkedin</a>
                            </div> */}
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
                        <div className="graph-img">
                            <BarChart width={900} height={500} data={barChartData}
                                margin={{ top: 30, right: 50, left: 10, bottom: 50 }}>
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                {/* <YAxis /> */}
                                <Tooltip content={<CustomTooltip />}/>
                                {/* <Legend /> */}
                                <Bar dataKey="compare1" stackId="a" fill="#6772e6" />
                                <Bar dataKey="compare2" stackId="a" fill="#83bff7" />
                                <Bar dataKey="compare3" stackId="a" fill="#f783c3" />
                            </BarChart>
                            {/* <BarChart
                                data={data}
                                width={750}
                                height={400}
                                margin={{ top: 30, bottom: 50, left: 10, right: 50 }}
                                categoricalColors={d3.scale.category10()}
                                chartSeries={chartSeries}
                            /> */}
                            {/* <img src={graph} alt="" /> */}
                        </div>
                    </div>
                    <div className="right-box-btm">
                        <ul className="data-counter d-flex">
                            <li>
                                <a href="" className="active">
                                    <small>235</small>
                                    <span>Likes</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <small>26</small>
                                    <span>Shares</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <small>86</small>
                                    <span>Comments</span>
                                </a>
                            </li>
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