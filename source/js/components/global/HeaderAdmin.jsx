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
import checkImg from 'img/site/check-icon.png';
import noUserImg2 from 'img/site/no_data/no_user2.png';

class HeaderAdmin extends Component {
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
        history.push('/admin');
    }

    myProfile = () => { this.props.history.push(routeCodes.MY_PROFILE); }
    toggle() { this.setState({ dropdownOpen: !this.state.dropdownOpen }); }

    render() {
        let { match, carts } = this.props;
        let page_name_Array = {
            'Dashboard': routeCodes.ADMIN_DASHBOARD,
            'Members': routeCodes.ADMIN_MEMBERS,
            'Transactions': routeCodes.ADMIN_TRANSACTIONS,
        }
        let pg_name = (_.invert(page_name_Array))[this.props.history.location.pathname];
        let admin = JSON.parse(reactLocalStorage.get('admin', true));
        return (
            <div className="right-hdr d-flex">
                <h2> {pg_name} </h2>
                <div className="right-hdr-r">
                    <div className="hdr-user">
                        <Dropdown direction='down' isOpen={this.state.dropdownOpen}
                            toggle={this.toggle} >
                            <DropdownToggle caret>
                                <a id="">
                                    <span style={{ "background": "url('" + noUserImg2 + "') center -7px / auto 55px no-repeat" }}></span>
                                    {/* <i className=""></i> */}
                                </a>
                            </DropdownToggle>
                            <DropdownMenu right>
                                {/* <DropdownItem onClick={() => this.myProfile()}>
                                    <span style={{ "background": "url('" + imgRoutes.ORG_PROMOTER_IMG_PATH + user.avatar + "') 100% center / 100% no-repeat" }}></span>
                                    <a href="javascript:void(0)" className="cursor_pointer"> My Profile {pg_name == 'Profile' && <img src={checkImg} alt="" />}</a>
                                </DropdownItem> */}
                                {/* <DropdownItem><span></span>Jacob Robinson</DropdownItem> */}
                                {/* <DropdownItem><i className="newaccount-icon"></i>New Account</DropdownItem> */}
                                {/* <DropdownItem divider /> */}
                                <DropdownItem onClick={this.mylogout}>
                                    <i className="logout-icon"></i>
                                    <a href="javascript:void(0)" className="cursor_pointer">Logout</a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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
export default withRouter(connect(mapStateToProps)(HeaderAdmin));