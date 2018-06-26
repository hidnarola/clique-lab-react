import React, { Component } from 'react';
import { logout } from '../../actions/login';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { routeCodes } from 'constants/routes';
import { imgRoutes } from 'constants/img_path';
import { reactLocalStorage } from 'reactjs-localstorage';
import _ from 'lodash';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            pimg: '',
        };

        this.mylogout = this.mylogout.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    mylogout() {
        const { dispatch, history } = this.props;
        dispatch(logout());
        history.push('/');
    }

    toggle() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    render() {
        let { match, carts } = this.props;
        let page_name_Array = {
            'Hello John Doe, what would you like to do today?': routeCodes.DASHBOARD,
            'New Campaign': routeCodes.CAMPAIGN,
            'Everyday People': routeCodes.EVERYDAYPEOPLE,
            'Groups': routeCodes.LISTGROUPS,
            'Group\'s Members List': routeCodes.LISTGROUPS + '/' + match.params.grpId + '/members',
            'Campaigns (Active)': routeCodes.CAMPAIGN_ACTIVE,
            'Campaign\'s Submission List': routeCodes.CAMPAIGN_ACTIVE + '/' + match.params.campaignId,
            'Campaigns (Future)': routeCodes.CAMPAIGN_FUTURE,
            'Campaigns (Past)': routeCodes.CAMPAIGN_PAST,
            'Inspired submissions': routeCodes.CAMPAIGN_INSPIRED_SUB,
            'Purchased posts': routeCodes.CAMPAIGN_PURCHASED_POSTS,
            'Calendar': routeCodes.CALENDAR,
            'Analytics (Stats)': routeCodes.ANALYTICS_STATS,
            'Analytics (DemoGraphics)': routeCodes.ANALYTICS_DEMOGRAPHICS,
            'Profile': routeCodes.MY_PROFILE,
            'Profile (Partnership Program)': routeCodes.PARTNERSHIP_PROGRAM,
            'Profile (Wallet)': routeCodes.WALLET,
            'Profile (Permission)': routeCodes.PERMISSION,
            'Cart': routeCodes.MY_CART,
            'Checkout': routeCodes.CHECKOUT,
        }
        let page_name = (_.invert(page_name_Array))[this.props.history.location.pathname];
        let user = JSON.parse(reactLocalStorage.get('user', true));
        let pg_name;

        if (page_name === 'Campaigns (Active)' || page_name === 'Campaigns (Future)' || page_name === 'Campaigns (Past)') {
            pg_name = 'Campaigns';
        }
        else {
            pg_name = page_name;
        }
        return (
            <div className="right-hdr d-flex">
                <h2>
                    {
                        (this.props.history.location.pathname === routeCodes.DASHBOARD) ?
                            <label>Hello <b style={{ "fontWeight": "600" }}>{user.full_name}</b>, what would you like to do today?</label>
                            :
                            pg_name
                    }
                </h2>
                <div className="right-hdr-r">
                    <div className="hdr-cart">
                        <Link to={routeCodes.MY_CART}>
                            <i className=""></i>
                            {/* {carts.data !== null && <span>{carts.data.length}</span>} */}

                        </Link>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="cart-dropdown">
                            <h3>Manage Orders</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Ut enim ad</p>
                            <div className="cart-btm-dropdown">
                                <a href="">Got it</a>
                                <a href="">Previous</a>
                                <a href="">Next</a>
                            </div>
                        </div>
                    </div>

                    <div className="hdr-user ">
                        <Dropdown direction='down' isOpen={this.state.dropdownOpen}
                            toggle={this.toggle} >
                            <DropdownToggle caret>
                                <a id="">
                                    <span style={{ "background": "url('" + imgRoutes.ORG_PROMOTER_IMG_PATH + user.avatar + "') 100% center / 100% no-repeat", "width": "40px" }}></span>
                                    <i className=""></i>
                                </a>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <span></span>
                                    <Link className="cursor_pointer" to={routeCodes.MY_PROFILE}> My Profile </Link>
                                    {page_name == 'profile' && <img src="../assets/img/site/check-icon.png" alt="" />}
                                </DropdownItem>
                                {/* <DropdownItem><span></span>Jacob Robinson</DropdownItem> */}
                                {/* <DropdownItem><i className="newaccount-icon"></i>New Account</DropdownItem> */}
                                {/* <DropdownItem divider /> */}
                                <DropdownItem onClick={this.mylogout}>
                                    <i className="logout-icon"></i>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     const { checkout } = state;
//     return {
//         carts: checkout.get('carts'),
//     }
// }
export default withRouter(connect()(Header));