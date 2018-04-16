import React,{Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { SubmissionError } from 'redux-form'
import { routeCodes } from '../../constants/routes';
import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../../constants/usefulvar';
import { Alert } from 'reactstrap';
import validator from 'validator';
import cx from 'classnames';

import editImg from 'img/site/edit-icon.png';
import deleteImg from 'img/site/delete-icon.png';
import visaImg from 'img/site/visa-icon.png';
import plusImg from 'img/site/plus-01.png';

let Wallet = props => {
	return(
        <div>
            <div className="profile-body content-box wallet-page">
                <div className="wallet-balance">
                    <h3>Balance</h3>
                    <div className="wallet-balance-box">
                        <h4>
                            <strong>$4300</strong>
                            <small>Current Balance</small>
                        </h4>
                        <button type="submit" className="round-btn">Withdrawal</button>
                    </div>
                </div>
                <div className="wallet-card">
                    <h3>Credit Card</h3>
                    <div className="card-box">
                        <div className="card-box-head d-flex">
                            <i></i>
                            <div className="card-box-head-r">
                                <a href=""><img src={editImg} alt=""/></a>
                                <a href=""><img src={deleteImg} alt=""/></a>
                            </div>	
                        </div>
                        <div className="card-box-body">
                            <h4>John Doe</h4>
                            <p>****  ****  ****  3454</p>
                        </div>
                        <div className="card-box-ftr d-flex">
                            <p>Valid<br/>Thru</p>
                            <h6>07 / 22</h6>
                            <div className="card-box-ftr-r"><img src={visaImg} alt="" /></div>
                        </div>
                    </div>
                    <div className="card-box add-card-box">
                        <a href="" data-toggle="modal" data-target="#add-creditcard">
                            <img src={plusImg} alt="" />
                            <strong>Add Credit Card </strong>
                        </a>
                    </div>
                </div>	
                <div className="wallet-account">
                    <h3>Bank Account</h3>
                    <div className="card-box wallet-account-box">
                        <div className="card-box-head d-flex">
                            <i className="light-bg"></i>
                            <div className="card-box-head-r">
                                <a href=""><img src={editImg} alt=""/></a>
                                <a href=""><img src={deleteImg} alt=""/></a>
                            </div>	
                        </div>
                        <h4>Bank Australia</h4>
                        <h4><small>BSB</small> <strong>564623</strong></h4>
                        <h5><small>Account Name </small> <strong>John Doe</strong></h5>
                        <h5><small>Account Number</small> <strong>*********65</strong></h5>
                    </div>
                    <div className="card-box wallet-account-box">
                        <div className="card-box-head d-flex">
                            <i></i>
                            <div className="card-box-head-r">
                                <a href=""><img src={editImg} alt=""/></a>
                                <a href=""><img src={deleteImg} alt=""/></a>
                            </div>	
                        </div>
                        <h4>Bank Australia</h4>
                        <h4><small>BSB</small> <strong>564623</strong></h4>
                        <h5><small>Account Name </small> <strong>John Doe</strong></h5>
                        <h5><small>Account Number</small> <strong>*********65</strong></h5>
                    </div>
                    <div className="card-box add-card-box">
                        <a href="" data-toggle="modal" data-target="#add-bankaccount">
                            <img src={plusImg} alt="" />
                            <strong>Add Bank Account</strong>
                        </a>
                    </div>			
                </div>
            </div>		
            
            <div className="transactions-history">
                <div className="d-flex">
                    <h2>Transactions History</h2>
                    <form>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button type="submit"></button>
                    </form>
                </div>	
                <div className="content-box transactions-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Campaign name</th>
                                <th>Brand</th>
                                <th>Submitted Image</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>I love the way this Jacket Looks @Streetwear #Gorgeous #Spon</td>
                                <td>Adidas</td>
                                <td><img src="images/img-11.png" alt="" /></td>
                                <td>$3420</td>
                            </tr>
                            <tr>
                                <td>Lit lyfe with my Friends @Streetwear #Yes #Spon</td>
                                <td>Reebok</td>
                                <td><img src="images/img-12.png" alt="" /></td>
                                <td>$5000</td>
                            </tr>
                            <tr>
                                <td>I love the way this Jacket Looks @Streetwear #Gorgeous #Spon</td>
                                <td>Adidas</td>
                                <td><img src="images/img-11.png" alt="" /></td>
                                <td>$3420</td>
                            </tr>
                            <tr>
                                <td>Lit lyfe with my Friends @Streetwear #Yes #Spon</td>
                                <td>Reebok</td>
                                <td><img src="images/img-12.png" alt="" /></td>
                                <td>$5000</td>
                            </tr>
                            <tr className="loadmore-btn">
                                <td colspan="4"><a href="" className="round-btn">Load more</a></td>
                            </tr>	
                        </tbody>
                    </table>
                </div>
            </div>
		</div>
	);
}


export default connect(state => ({
    
}))(Wallet)