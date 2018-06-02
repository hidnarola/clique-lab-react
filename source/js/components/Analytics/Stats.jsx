import React, { Component } from 'react';
import { connect } from 'react-redux';
import graph from 'img/site/graph.jpg';
// import { BarChart } from 'react-d3-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';

class StackedBarChart extends Component {

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
            }
        }
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

    render() {
        const { analyticsData } = this.props;
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

        let compareColor = [
            'blue-color',
            'sky-color',
            'pink-color'
        ]
        // console.log(analyticsData);
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
                }

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
                            <BarChart width={900} height={500} data={dummy_data}
                                margin={{ top: 30, right: 50, left: 10, bottom: 50 }}>
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                <XAxis dataKey="name" />
                                {/* <YAxis /> */}
                                <Tooltip />
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
    return {

    }
}

export default connect(mapStateToProps)(Stats)