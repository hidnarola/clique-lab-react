import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";

class EverydayPeople extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activePage: 1
        };
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render() {
        
        return (
            <div className="every-people">

            

            <div className="everypeole-head d-flex">
                <div className="everypeole-head-l">
                    <ul>
                        <li className="dropdown age-dropdown active">
                            <a href="#" className="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">21 - 25</a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <h4>Age group</h4>
                                <div className="age-fillter">
                                    <img src="images/fillter.png" alt="" />
                                </div>
                                <div className="ftr-btn">
                                    <button className="bdr-btn">Apply</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="">Gendar</a>
                        </li>
                        <li>
                            <a href="">Location</a>
                        </li>
                        <li>
                            <a href="">More filter</a>
                        </li>
                    </ul>
                </div>
                <div className="everypeole-head-r">
                    <ul>
                        <li>
                            <a href="">Sort
                                <i className="dropdown-arrow"></i>
                            </a>
                        </li>
                        <li className="dropdown ">
                            <a href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add All Results
                                <i className="dropdown-arrow"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#">Add to Campaign</a>
                                <a className="dropdown-item" href="#">Add to Group</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="all-people">
                <div className="all-people-head d-flex">
                    <h3>Filtered List (12,400 Results)</h3>
                    <a href="">
                        <i className="fa fa-plus"></i> Save the results as a Group</a>
                </div>
                <ul className="all-people-ul d-flex">
                    <li>
                        <div className="all-people-div">
                            <div className="all-people-img">
                                <a href="">
                                    <img src="images/people-01.jpg" alt="" />
                                </a>
                                <div className="plus-people dropdown">
                                    <a href="javascript:void(0)" role="button" id="dropdownMenuLink-05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="images/plus-sign.png" alt="" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-05">
                                        <a className="dropdown-item" href="#">Add to Campaign</a>
                                        <a className="dropdown-item" href="#">Add to Group</a>
                                    </div>
                                </div>
                            </div>
                            <div className="all-people-content d-flex">
                                <h4>John Doe</h4>
                                <div className="btn-group dropup">
                                    <a href="" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">1036 Follower
                                        <i className="dropdown-arrow"></i>
                                    </a>
                                    <div className="dropdown-menu">
                                        <ul>
                                            <li>
                                                <a href="">
                                                    <i>
                                                        <img src="images/facebook-01.png" alt="" />
                                                    </i>
                                                    <span>823</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <i>
                                                        <img src="images/linkedin.png" alt="" />
                                                    </i>
                                                    <span>1.1k</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <i>
                                                        <img src="images/pintrest.png" alt="" />
                                                    </i>
                                                    <span>432</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <i>
                                                        <img src="images/twitter.png" alt="" />
                                                    </i>
                                                    <span>240</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="">
                                                    <i>
                                                        <img src="images/instagram.png" alt="" />
                                                    </i>
                                                    <span>240</span>
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="close-div">
                                            <a href="">
                                                <img src="images/close.png" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                <Pagination 
                    activePage={this.state.activePage} 
                    itemsCountPerPage={10} 
                    totalItemsCount={450} 
                    pageRangeDisplayed={5} 
                    onChange={this.handlePageChange}
                />
            </div>

        </div>
        );
    }
}

export default connect(state => ({
    
}))(EverydayPeople)
