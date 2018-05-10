import React, { Component } from 'react';
import LogoImg from 'img/common/logo.png';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/login';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import { routeCodes } from 'constants/routes';

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
        // return <Redirect to="/" />
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
                        <a href="">
                            <img src={LogoImg} alt="" />
                        </a>
                    </div>
                    <div className="hdr-user" style={{"display":"flex"}}>
                        <a href="javascript:void(0)">
                            <p>Welcome <strong>{user.username}</strong></p>
                        </a>
                        &nbsp;&nbsp;
                        <Dropdown direction='down' isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                            <DropdownToggle caret>
                                <a id="">
                                    <span></span>
                                    <i className=""></i>
                                </a>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <span></span>
                                    <Link className="cursor_pointer" to={routeCodes.MY_PROFILE}> My Profile </Link>
                                </DropdownItem>
                                <DropdownItem><span></span>Jacob Robinson</DropdownItem>
                                <DropdownItem><i className="newaccount-icon"></i>New Account</DropdownItem>
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