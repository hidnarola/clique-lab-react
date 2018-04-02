import React,{Component} from 'react';

class Header extends Component{

    render(){
        return(
            <div className="right-hdr d-flex">
                <h2>Hello
                    <strong>John Doe,</strong> what would you like to do today?</h2>
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
                    <div className="hdr-user dropdown">
                        <a href="javascript:void(0)" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span></span>
                            <i className=""></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                            <a className="dropdown-item" href="#">
                                <span></span> My Profile
                                <img src="images/check-icon.png" alt="" />
                            </a>
                            <a className="dropdown-item" href="#">
                                <span></span> Jacob Robinson</a>
                            <a className="dropdown-item" href="#">
                                <i className="newaccount-icon"></i> New Account</a>
                            <a className="dropdown-item" href="#">
                                <i className="logout-icon"></i> Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;