import React, { Component } from 'react';
import { connect } from 'react-redux';
import graph from 'img/site/graph.jpg';
import { BarChart } from 'react-d3-components';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';


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
            }
        }
    }

    // componentWillReceiveProps = (nextProps) => {
    //     let analytics = nextProps.analyticsData;
    //     console.log(nextProps.analyticsData);
    //     this.setState({
    //         analytics:{
    //             'avg_cost_per_purchase': 0,
    //             'purchased_post': 0,
    //             'applicants': analytics.number_of_appplicants,
    //             'total_spend': 0,
    //             'reach_total': 0,
    //             'engage_total': 0,
    //         }
    //     })
    // }

    renderLi = (obj) => {
        return (
            <ul className="d-flex" key={Math.random()}>
                <li>
                    <div className="average-box-inr">
                        <h3>Average cost per purchase</h3>
                        <h5 className="blue-color">$20,000</h5>
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

    render() {
        const { analyticsData } = this.props;
        let data = [{
            label: 'somethingA',
            values: [{ x: 'JUN', y: 10, color: 'red' }, { x: 'JUL', y: 4 }, { x: 'AUG', y: 3 }]
        }];
        let chartSeries = [
            {
                field: 'frequency',
                name: 'Frequency',
                color: 'red'
            }
        ]
        return (
            <div className="analytics-body ">
                <div className="content-box average-box">

                    {(analyticsData !== null) ? analyticsData.map((obj, index) => (this.renderLi(obj))) : ''}
                    {/* <li>
                            <div className="average-box-inr">
                                <h3>Average cost per purchase</h3>
                                <h5 className="blue-color">$20,000</h5>
                            </div>	
                        </li>
                        <li>
                            <div className="average-box-inr">
                                <h3>Purchased posts</h3>
                                <h5 className="blue-color">3000</h5>
                            </div>	
                        </li>
                        <li>
                            <div className="average-box-inr">
                                <h3>Applicants</h3>
                                <h5 className="blue-color">{analyticsData[0].number_of_appplicants}</h5>
                            </div>	
                        </li>
                        <li>
                            <div className="average-box-inr">
                                <h3>Total Spend</h3>
                                <h5 className="blue-color">$56,000</h5>
                            </div>	
                        </li>
                        <li>
                            <div className="average-box-inr">
                                <h3>Reach total</h3>
                                <h5 className="blue-color">1,10,000</h5>
                            </div>	
                        </li>
                        <li>
                            <div className="average-box-inr">
                                <h3>Engagement total</h3>
                                <h5 className="blue-color">6325</h5>
                            </div>	
                        </li> */}

                </div>

                <div className="right-box">
                    <div className="right-box-head d-flex">
                        <div className="social-dropdown">
                            <a href="javascript:void(0)" role="button" id="social-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Twitter <i></i> </a>
                            <div className="dropdown-menu" aria-labelledby="social-dropdown">
                                <a className="dropdown-item" href="#">Facebook</a>
                                <a className="dropdown-item" href="#">Linkedin</a>
                            </div>
                        </div>
                        <div className="timeing-dropdown">
                            <a href="javascript:void(0)" role="button" id="timing-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Last 3 month <i></i> </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="social-dropdown">
                                <a className="dropdown-item" href="#">Last 6 month</a>
                                <a className="dropdown-item" href="#">Last Month</a>
                                <a className="dropdown-item" href="#">Last Week</a>
                            </div>
                        </div>
                    </div>
                    <div className="right-box-content d-flex">
                        <div className="graph-img">
                            <BarChart
                                data={data}
                                width={750}
                                height={400}
                                margin={{ top: 30, bottom: 50, left: 10, right: 50 }}
                                categoricalColors= {d3.scale.category10()}
                                chartSeries = {chartSeries}
                            />
                            <img src={graph} alt="" />
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
    return {

    }
}

export default connect(mapStateToProps)(Stats)