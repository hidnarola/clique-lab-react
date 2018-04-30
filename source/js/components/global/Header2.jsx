import React,{Component} from 'react';
import LogoImg from 'img/common/logo.png';
import { reactLocalStorage } from 'reactjs-localstorage';

class Header2 extends Component{

    render(){
        let user = JSON.parse(reactLocalStorage.get('user', true));
        return(
            <header className="header">
                <div className="container d-flex">
                    <div className="logo">
                        <a href="">
                            <img src={LogoImg} alt="" />
                        </a>
                    </div>
                    <div className="hdr-user">
                        <a href="javascript:void(0)">
                            <p>Welcome <strong>{user.username}</strong></p>
                        </a>
                        &nbsp;&nbsp;
                        <a href="javascript:void(0)">
                            <span></span>
                        </a>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header2;