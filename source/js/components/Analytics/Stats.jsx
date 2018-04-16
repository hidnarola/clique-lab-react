import React, { Component } from 'react';
import { connect } from 'react-redux';
import graph from 'img/site/graph.jpg';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';


class Stats extends Component {
    
    constructor(props){
        super(props);     
    }

    render() {
        return (
            <div className="analytics-body ">
                <div className="content-box average-box">
                    <ul className="d-flex">
                        <li>
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
                                <h5 className="blue-color">500</h5>
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
                        </li>
                    </ul>
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
                        <div className="graph-img"><img src={graph} alt="" /></div>
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