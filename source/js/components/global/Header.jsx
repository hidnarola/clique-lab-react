import React,{Component} from 'react';
import { logout } from '../../actions/login';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { routeCodes } from 'constants/routes';

class Header extends Component{

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

    render(){
        let page_name = (((this.props.history.location.pathname).replace('/','')).replace('-',' ')).replace('_',' ');
        return(
            <div className="right-hdr d-flex">
                <h2>{ page_name.toUpperCase() }</h2>
                <div className="right-hdr-r">
                    
                    <div className="hdr-cart">
                        <a href="javascript:void(0)" role="button" id="cart-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className=""></i>
                            <span>2</span>
                        </a>
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
                                    <span></span>
                                    <i className=""></i>
                                </a>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <span></span>
                                    <Link className="cursor_pointer" to={routeCodes.MY_PROFILE}>
                                        My Profile
                                    </Link>
                                    {page_name=='profile' && <img src="../assets/img/site/check-icon.png" alt="" />}
                                </DropdownItem>
                                <DropdownItem><span></span>Jacob Robinson</DropdownItem>
                                <DropdownItem><i className="newaccount-icon"></i>New Account</DropdownItem>
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

export default connect()(withRouter(Header));