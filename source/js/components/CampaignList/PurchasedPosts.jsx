import React, {Component} from 'react';
import {connect} from 'react-redux';
import img1 from 'img/big-img01.jpg';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';
import instaImg from 'img/site/instagram.png';
import imgPlus from 'img/site/plus-01.png';
import { puchasedPostSend } from '../../actions/purchasedPosts';

import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';

const PlusAction = () => {
    return (
        <UncontrolledDropdown className="festival-ftr-r dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src={imgPlus} alt=""/></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="javascript:void(0)">Download</a>
                <a className="dropdown-item" href="javascript:void(0)">Add user to Group</a>
                <a className="dropdown-item" href="javascript:void(0)">Add user to Campaign</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class PurchasedPosts extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(puchasedPostSend({ "page_size":1,"page_no":1}));
    }

    render() {
        return (
            <div className="every-people">
                <div className="all-people">
                    <ul className="fan-festival d-flex">
                        <li>
                            <div className="fan-festival-box">
                                <div className="festival-head d-flex">
                                    <div className="festival-head-l">
                                        <span></span>
                                        <h3>
                                            <big>Johnson Doe</big>
                                            <small>Bondi Beach, Sydney, Australia</small>
                                        </h3>
                                    </div>
                                    <div className="festival-head-r">
                                        <h3>$45.00</h3>
                                    </div>
                                </div>
                                <div className="festival-img"><img src={img1} alt=""/></div>
                                <div className="festival-body">
                                    <h2>Make up by morning. boyfriends happy, what a life I lead!
                                        <a href="">@thegrocer #morning #earlyriser #excited #sponsored</a>
                                    </h2>
                                </div>
                                <div className="festival-ftr d-flex">
                                    <div className="festival-ftr-l">
                                        <a href="">
                                            <i><img src={fbImg} alt=""/></i>
                                            <strong>823M</strong>
                                        </a>
                                    </div>
                                    <div className="festival-ftr-r dropdown">
                                        <PlusAction/>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(PurchasedPosts)