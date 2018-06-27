import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import CryptoJS from 'crypto-js';
import { reactLocalStorage } from 'reactjs-localstorage';
import PropTypes from 'prop-types';
import validator from 'validator';
import cx from 'classnames';
import { routeCodes } from '../../constants/routes';
import { SECRET_KEY } from '../../constants/usefulvar';
import { getJoinedRef, getRevenueRef } from '../../actions/myProfile';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import closeImg2 from 'img/site/close-2.png';
import '../../../css/campaign/fancy-example.css';

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
                    <div><p className="label" style={{ "marginBottom": "0px !important" }}>${payload[0].value}</p><p className="label" style={{ "marginBottom": "0px !important" }}>Earned</p></div>
                </div>
            );
        }

        return null;
    }
}

class PartnerShipProg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partnershipFAQModalshow: false,
        }
    }

    partnershipFAQModalshowOpen() { this.setState({ partnershipFAQModalshow: !this.state.partnershipFAQModalshow }); }
    partnershipFAQModaltoggle() { this.setState({ partnershipFAQModalshow: !this.state.partnershipFAQModalshow }); }
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
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
                        <a href="javascript:void(0)" onClick={() => this.partnershipFAQModalshowOpen()}>View Partnership Program FAQ.</a>
                    </p>
                </div>
                <div className='input-wrap'>
                    <label>Invite User</label>
                    <input type="text" placeholder={location.protocol + '//' + location.host + `?referal+id=` + userSession._id} value={location.protocol + '//' + location.host + `?referal+id=` + userSession._id} readOnly="readonly" />
                </div>
                <div className="partner-state">
                    <h3>State</h3>
                    <div className="state-box-wrap d-flex">
                        <div className="state-box joined_ref_chart">
                            <div className="chart_summary">
                                <label className="chart_heading">User Joined : </label> &nbsp;
                                <label className="chart_data">53,230</label>
                            </div>
                            <LineChart layout="horizontal" width={400} height={200} data={data}
                                margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" type="category" />
                                <YAxis type="number" domain={[0, 'dataMax + 50']} />
                                <Tooltip
                                    content={<CustomTooltip />}
                                />
                                <Tooltip />
                                <Line dataKey="pv" stroke="#6772e5" />
                            </LineChart>
                        </div>
                        <div className="state-box revenue_ref_chart">
                            <div className="chart_summary">
                                <label className="chart_heading">Revenue ($ AUD) : </label> &nbsp;
                                <label className="chart_data">53,230</label>
                            </div>
                            <BarChart width={400} height={200} data={data} barGap={7}
                                margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                                <CartesianGrid
                                    vertical={false}
                                    strokeDasharray="3 3"
                                />
                                <XAxis dataKey="name" type="category" />
                                <YAxis type="number" domain={[0, 'dataMax + 50']} />
                                <Tooltip
                                    content={<CustomTooltip />}
                                />
                                <Bar dataKey='pv' fill='#6772e5' barSize={17} />
                            </BarChart>
                        </div>
                    </div>
                </div>

                {/* Add Credit Card Modal */}
                <Modal isOpen={this.state.partnershipFAQModalshow} toggle={this.partnershipFAQModaltoggle} className={this.props.className} backdrop={true} id="congratulations" className="program_faq_modal" style={{ width: "1200px !important" }}>
                    <div className="custom_modal_btn_close">
                        <img className="cursor_pointer" src={closeImg2} onClick={() => this.partnershipFAQModaltoggle()} />
                    </div>
                    <ModalBody>
                        <div className="terms-conditions">
                            <h2 className="modal-heading">Partnership Program FAQ</h2>
                            <div className="body-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi .</p>
                                <Accordion>
                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            <h6>What lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ?</h6>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Cras pulvinar mattis nunc sed. Aliquam eleifend mi in nulla posuere sollicitudin. Pellentesque pulvinar pellentesque habitant morbi tristique.</p>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            <h6>What lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod ?</h6>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Cras pulvinar mattis nunc sed. Aliquam eleifend mi in nulla posuere sollicitudin. Pellentesque pulvinar pellentesque habitant morbi tristique.</p>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            <h6>What lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ?</h6>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Cras pulvinar mattis nunc sed. Aliquam eleifend mi in nulla posuere sollicitudin. Pellentesque pulvinar pellentesque habitant morbi tristique.</p>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemTitle>
                                            <h6>What lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod ?</h6>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Cras pulvinar mattis nunc sed. Aliquam eleifend mi in nulla posuere sollicitudin. Pellentesque pulvinar pellentesque habitant morbi tristique.</p>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemTitle>
                                        <h6>What lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ?</h6>
                                        </AccordionItemTitle>
                                        <AccordionItemBody>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra mauris in aliquam sem fringilla ut morbi tincidunt augue. Cras pulvinar mattis nunc sed. Aliquam eleifend mi in nulla posuere sollicitudin. Pellentesque pulvinar pellentesque habitant morbi tristique.</p>
                                        </AccordionItemBody>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
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