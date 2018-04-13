import React, { Component } from 'react';
import { connect } from 'react-redux';
import fakeImg from 'img/site/people-01.jpg';
import downloadImg from 'img/site/download-icon.png';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

class Past extends Component {
    
    constructor(props){
        super(props);     
    }

    render() {
        return (
            <div className="active-campaigns">
                <ul className="all-people-ul d-flex">
                    <li>
                        <div className="all-people-div">
                            <div className="all-people-img">
                                <a href=""><img src={fakeImg} alt=""/></a>
                            </div>
                            <div className="all-people-content">
                                <h4>Content Marketplace by your fans at Festival</h4>
                                <div className="submission-div d-flex">
                                    <div className="submission-div-l">
                                        <h5>Submissions :  <small>654</small></h5>
                                    </div>
                                    <div className="submission-div-r">
                                        <a href=""><img src={downloadImg} alt="" /></a>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="all-people-div">
                            <div className="all-people-img">
                                <a href=""><img src={fakeImg} alt=""/></a>
                            </div>
                            <div className="all-people-content">
                                <h4>Content Marketplace by your fans at Festival</h4>
                                <div className="submission-div d-flex">
                                    <div className="submission-div-l">
                                        <h5>Submissions :  <small>654</small></h5>
                                    </div>
                                    <div className="submission-div-r">
                                        <a href=""><img src={downloadImg} alt="" /></a>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="all-people-div">
                            <div className="all-people-img">
                                <a href=""><img src={fakeImg} alt=""/></a>
                            </div>
                            <div className="all-people-content">
                                <h4>Content Marketplace by your fans at Festival</h4>
                                <div className="submission-div d-flex">
                                    <div className="submission-div-l">
                                        <h5>Submissions :  <small>654</small></h5>
                                    </div>
                                    <div className="submission-div-r">
                                        <a href=""><img src={downloadImg} alt="" /></a>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>	
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Past)