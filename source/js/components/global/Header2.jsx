import React,{Component} from 'react';
import LogoImg from 'img/common/logo.png';

class Header2 extends Component{

    render(){
        return(
            <header className="header">
                <div className="container d-flex">
                    <div className="logo">
                        <a href="">
                            <img src={LogoImg} alt="" />
                        </a>
                    </div>
                    <div className="hdr-user">
                        <a href="#">
                            <p>Welcome
                                <strong>John Doe</strong>
                            </p>
                            <span></span>
                        </a>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header2;