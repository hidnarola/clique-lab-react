import React, { Component } from 'react';
import { connect } from 'react-redux';
import graphImg from 'img/site/graph-01.jpg';
import img1 from "img/site/img-01.jpg";
import img2 from "img/site/img-02.jpg";
import img3 from "img/site/img-03.jpg";
import img4 from "img/site/img-04.jpg";

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
                        <div className="graph-img"><img src={graphImg} alt="" /></div>
                    </div>
                    <div className="right-box-btm">
                        <ul className="data-counter d-flex">
                            <li>
                                <a href="javascript:void(0)" className="active">
                                    <small>235</small>
                                    <span>Likes</span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <small>26</small>
                                    <span>Shares</span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <small>86</small>
                                    <span>Comments</span>
                                </a>
                            </li>
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
                                        <div className="databox-div-l"><img src={img1} alt=""/></div>
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
                                        <div className="databox-div-l"><img src={img2} alt=""/></div>
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
                                        <div className="databox-div-l"><img src={img3} alt=""/></div>
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
                                        <div className="databox-div-l"><img src={img4} alt=""/></div>
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

export default connect(state => ({
    
}))(Dashboard)
