import React, { Component } from 'react';
import { connect } from 'react-redux';


class Dashboard extends Component {
    
    constructor(props){
        super(props);
    }

    render() {
        
        return (
            <div className='dashboard-page'>
                
                <div className="right-box">
                    <div className="right-box-head d-flex">
                        <div className="social-dropdown">
                            <a href="javascript:void(0)" role="button" id="social-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Facebook
                                <i></i>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="social-dropdown">
                                <a className="dropdown-item" href="#">Twitter</a>
                                <a className="dropdown-item" href="#">Linkedin</a>
                            </div>
                        </div>
                        <div className="timeing-dropdown">
                            <a href="javascript:void(0)" role="button" id="timing-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Last Year
                                <i></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="social-dropdown">
                                <a className="dropdown-item" href="#">Last 6month</a>
                                <a className="dropdown-item" href="#">Last Month</a>
                                <a className="dropdown-item" href="#">Last Week</a>
                            </div>
                        </div>
                    </div>
                    <div className="right-box-content d-flex">
                        <div className="no-data">No Data Found</div>
                    </div>
                    <div className="right-box-btm">
                        <ul className="data-counter d-flex">
                            <li>
                                <a href="" className="active">
                                    <small>0</small>
                                    <span>Likes</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <small>0</small>
                                    <span>Shares</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <small>0</small>
                                    <span>Comments</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right-btm">
                    <div className="right-box-btm-head d-flex">
                        <div className="post-dropdown">
                            <a href="#" role="button" id="post-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Post
                                <span>Most Liked</span>
                                <i className="dropdown-arrow"></i>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="post-dropdown">
                                <a className="dropdown-item" href="#">Most Liked</a>
                                <a className="dropdown-item" href="#">Most Shared</a>
                                <a className="dropdown-item" href="#">Most Commented</a>
                                <a className="dropdown-item" href="#">Submissions</a>
                            </div>
                        </div>
                        <div className="view-all">
                            <a href="#"> View All
                                <i></i>
                            </a>
                        </div>
                    </div>
                    <div className="right-box-btm-content d-flex" style={{minHeight:'290px'}}>
                        <div className="no-data">No Posts Found</div>
                    </div>

                </div>

            </div>
        );
    }
}

export default connect(state => ({
    
}))(Dashboard)
