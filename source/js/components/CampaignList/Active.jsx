import React, { Component } from 'react';
import { connect } from 'react-redux';
import fakeImg from 'img/site/people-01.jpg';


import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

const PlusAction = () => {
    return (
        <UncontrolledDropdown className="plus-people dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src="/assets/img/site/plus-sign.png" alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">Stop</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class Active extends Component {    
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
                                <PlusAction />
                            </div>
                            <div className="all-people-content">
                                <h4>Content Marketplace by your fans at Festival</h4>
                                <div className="submission-div d-flex">
                                    <div className="submission-div-l">
                                        <h5>Submissions :  <small>654</small></h5>
                                    </div>
                                    <div className="submission-div-r">
                                        <h5><small>9 days left</small></h5>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="all-people-div">
                            <div className="all-people-img">
                                <a href=""><img src={fakeImg} alt=""/></a>
                                <PlusAction />
                            </div>
                            <div className="all-people-content">
                                <h4>Content Marketplace by your fans at Festival</h4>
                                <div className="submission-div d-flex">
                                    <div className="submission-div-l">
                                        <h5>Submissions :  <small>654</small></h5>
                                    </div>
                                    <div className="submission-div-r">
                                        <h5><small>9 days left</small></h5>
                                    </div>	
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="all-people-div">
                            <div className="all-people-img">
                                <a href=""><img src={fakeImg} alt=""/></a>
                                <PlusAction />
                            </div>
                            <div className="all-people-content">
                                <h4>Content Marketplace by your fans at Festival</h4>
                                <div className="submission-div d-flex">
                                    <div className="submission-div-l">
                                        <h5>Submissions :  <small>654</small></h5>
                                    </div>
                                    <div className="submission-div-r">
                                        <h5><small>9 days left</small></h5>
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

export default connect(mapStateToProps)(Active)