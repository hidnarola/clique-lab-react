import React, { Component } from 'react';
import LogoImg from 'img/common/logo.png';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/login';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import { routeCodes } from 'constants/routes';
import { imgRoutes } from 'constants/img_path';

class Header2 extends Component {
    constructor(props) {
        super(props);
        this.mylogout = this.mylogout.bind(this);
        
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }
        
    mylogout(){        
        const { dispatch, history } = this.props;
        dispatch(logout());
        history.push('/');
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        let user = JSON.parse(reactLocalStorage.get('user', true));
        return (
            <header className="header">
                <div className="container d-flex">
                    <div className="logo">
                        <NavLink to={routeCodes.DASHBOARD}>
                            <img src={LogoImg} alt="" />
                        </NavLink>
                    </div>
                    <div className="hdr-user" style={{"display":"flex"}}>
                        <a>
                            <p>Welcome <strong>{user.username}</strong></p>
                        </a>
                        &nbsp;&nbsp;
                        <Dropdown direction='down' isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                            <DropdownToggle caret>
                                <a id="">
                                    <span style={{"background":"url('"+imgRoutes.ORG_PROMOTER_IMG_PATH+user.avatar+"') 100% center / 100% no-repeat","width": "40px"}}></span>
                                    <i className=""></i>
                                </a>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <span></span>
                                    <Link className="cursor_pointer" to={routeCodes.MY_PROFILE}> My Profile </Link>
                                </DropdownItem>
                                {/* <DropdownItem><span></span>Jacob Robinson</DropdownItem>
                                <DropdownItem><i className="newaccount-icon"></i>New Account</DropdownItem> */}
                                <DropdownItem onClick={this.mylogout}>
                                    <i className="logout-icon"></i>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </header>
        );
    }
}

export default withRouter(connect()(Header2));