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
                <div class="right-box">
                    <div class="right-box-head d-flex">
                        <div class="social-dropdown">
                            <a href="javascript:void(0)" role="button" id="social-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Twitter <i></i> </a>
                            <div class="dropdown-menu" aria-labelledby="social-dropdown">
                                <a class="dropdown-item" href="#">Facebook</a>
                                <a class="dropdown-item" href="#">Linkedin</a>
                            </div>
                        </div>
                        <div class="timeing-dropdown">
                            <a href="javascript:void(0)" role="button" id="timing-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Last 3 month <i></i> </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="social-dropdown">
                                <a class="dropdown-item" href="#">Last 6 month</a>
                                <a class="dropdown-item" href="#">Last Month</a>
                                <a class="dropdown-item" href="#">Last Week</a>
                            </div>
                        </div>
                    </div>
                    <div class="right-box-content d-flex">
                        <div class="graph-img"><img src={graphImg} alt="" /></div>
                    </div>
                    <div class="right-box-btm">
                        <ul class="data-counter d-flex">
                            <li>
                                <a href="" class="active">
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
                <div class="right-btm">
                    <div class="right-box-btm-head d-flex">
                        <div class="post-dropdown">
                            <a href="#" role="button" id="post-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Post <span>Most Liked</span> <i class="dropdown-arrow"></i> </a>
                            <div class="dropdown-menu" aria-labelledby="post-dropdown">
                                <a class="dropdown-item" href="#">Most Liked</a>
                                <a class="dropdown-item" href="#">Most Shared</a>
                                <a class="dropdown-item" href="#">Most Commented</a>
                                <a class="dropdown-item" href="#">Submissions</a>
                            </div>
                        </div>
                        <div class="view-all">
                            <a href="#"> View All <i></i> </a>
                        </div>
                    </div>
                    <div class="right-box-btm-content d-flex">
                        <div class="data-box">
                            <ul class="d-flex">
                                <li>
                                    <div class="databox-div d-flex">
                                        <div class="databox-div-l"><img src={img1} alt=""/></div>
                                        <div class="databox-div-r">
                                            <h3>
                                                <big>LinkedIn Campaign</big>
                                                <small>John Doe</small>
                                            </h3>
                                            <p>I love the <a href="">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="">#thegrocer</a> <a href="">#warmsundays</a> <a href="">#sponsored</a></p>
                                            <div class="databox-div-r-btm d-flex">
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
                                    <div class="databox-div d-flex">
                                        <div class="databox-div-l"><img src={img2} alt=""/></div>
                                        <div class="databox-div-r">
                                            <h3>
                                                <big>Facebook Campaign</big>
                                                <small>John Doe</small>
                                            </h3>
                                            <p>I love the <a href="">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="">#thegrocer</a> <a href="">#warmsundays</a> <a href="">#sponsored</a></p>
                                            <div class="databox-div-r-btm d-flex">
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
                                    <div class="databox-div d-flex">
                                        <div class="databox-div-l"><img src={img3} alt=""/></div>
                                        <div class="databox-div-r">
                                            <h3>
                                                <big>Facebook Campaign</big>
                                                <small>John Doe</small>
                                            </h3>
                                            <p>I love the <a href="">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="">#thegrocer</a> <a href="">#warmsundays</a> <a href="">#sponsored</a></p>
                                            <div class="databox-div-r-btm d-flex">
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
                                    <div class="databox-div d-flex">
                                        <div class="databox-div-l"><img src={img4} alt=""/></div>
                                        <div class="databox-div-r">
                                            <h3>
                                                <big>LinkedIn Campaign</big>
                                                <small>John Doe</small>
                                            </h3>
                                            <p>I love the <a href="">@thegrocer</a> new dress range! Make life just that bit more bearable! <a href="">#thegrocer</a> <a href="">#warmsundays</a> <a href="">#sponsored</a></p>
                                            <div class="databox-div-r-btm d-flex">
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
