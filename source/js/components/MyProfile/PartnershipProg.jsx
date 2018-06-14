import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SubmissionError } from 'redux-form'
import { routeCodes } from '../../constants/routes';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../../constants/usefulvar';
import { Alert } from 'reactstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import { getJoinedRef, getRevenueRef } from '../../actions/myProfile';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import validator from 'validator';
import cx from 'classnames';

class PartnerShipProg extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        const { dispatch } = this.props;
        let data = {
            "start_date": "2017-03-10",
            "end_date": "2018-10-09"
        }
        dispatch(getJoinedRef(data));
        dispatch(getRevenueRef(data));
    }

    render() {
        let userSession = JSON.parse(localStorage.getItem('user'));
        let data = [
            { name: '1 Aug', pv: 400 },
            { name: '10 Aug', pv: 398 },
            { name: '14 Aug', pv: 800 },
            { name: '18 Aug', pv: 908 },
            { name: '22 Aug', pv: 800 },
            { name: '26 Aug', pv: 800 },
        ];
        return (
            <div className="profile-body content-box">
                <div className="partner-program-top">
                    <h2>What is Partnership Program</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate. <a href="" data-toggle="modal" data-target="#partner-faq">View Partnership Program FAQ.</a></p>
                </div>
                <div className='input-wrap'>
                    <label>Invite User</label>
                    <input type="text" placeholder={`https://www.cliquelabs.com/?referal+id=` + userSession._id} value={`https://www.cliquelabs.com/?referal+id=` + userSession._id} readOnly="readonly" />
                </div>
                <div className="partner-state">
                    <h3>State</h3>
                    <div className="state-box-wrap d-flex">
                        <div className="state-box joined_ref_chart">
                            {/* <img src="/assets/img/site/graph-02.jpg" alt="" /> */}
                            <div className="chart_summary">
                                <label className="chart_heading">User Joined : </label> &nbsp;
                                <label className="chart_data">53,230</label>
                            </div>
                            <LineChart layout="horizontal" width={400} height={200} data={data}
                                margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" type="category" />
                                <YAxis type="number" />
                                <Tooltip />
                                <Line dataKey="pv" stroke="#8884d8" />
                            </LineChart>
                        </div>
                        <div className="state-box revenue_ref_chart">
                            <div className="chart_summary">
                                <label className="chart_heading">Revenue ($ AUD) : </label> &nbsp;
                                <label className="chart_data">53,230</label>
                            </div>
                            {/* <img src="/assets/img/site/graph-03.png" alt="" /> */}
                            <BarChart width={400} height={200} data={data} barGap={7}
                                margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" type="category" />
                                <YAxis type="number" />
                                <Tooltip />
                                <Bar dataKey='pv' fill='#8884d8' />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { myProfile } = state;
    return {
        joined_ref_response: myProfile.get('joined_ref'),
        revenue_ref_response: myProfile.get('revenue_ref')
    }
}

export default withRouter(connect(mapStateToProps)(PartnerShipProg))