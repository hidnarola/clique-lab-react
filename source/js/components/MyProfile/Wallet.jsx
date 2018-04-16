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
            <div class="profile-body content-box wallet-page">
                <div class="wallet-balance">
                    <h3>Balance</h3>
                    <div class="wallet-balance-box">
                        <h4>
                            <strong>$4300</strong>
                            <small>Current Balance</small>
                        </h4>
                        <button type="submit" class="round-btn">Withdrawal</button>
                    </div>
                </div>
                <div class="wallet-card">
                    <h3>Credit Card</h3>
                    <div class="card-box">
                        <div class="card-box-head d-flex">
                            <i></i>
                            <div class="card-box-head-r">
                                <a href=""><img src={editImg} alt=""/></a>
                                <a href=""><img src={deleteImg} alt=""/></a>
                            </div>	
                        </div>
                        <div class="card-box-body">
                            <h4>John Doe</h4>
                            <p>****  ****  ****  3454</p>
                        </div>
                        <div class="card-box-ftr d-flex">
                            <p>Valid<br/>Thru</p>
                            <h6>07 / 22</h6>
                            <div class="card-box-ftr-r"><img src={visaImg} alt="" /></div>
                        </div>
                    </div>
                    <div class="card-box add-card-box">
                        <a href="" data-toggle="modal" data-target="#add-creditcard">
                            <img src={plusImg} alt="" />
                            <strong>Add Credit Card </strong>
                        </a>
                    </div>
                </div>	
                <div class="wallet-account">
                    <h3>Bank Account</h3>
                    <div class="card-box wallet-account-box">
                        <div class="card-box-head d-flex">
                            <i class="light-bg"></i>
                            <div class="card-box-head-r">
                                <a href=""><img src={editImg} alt=""/></a>
                                <a href=""><img src={deleteImg} alt=""/></a>
                            </div>	
                        </div>
                        <h4>Bank Australia</h4>
                        <h4><small>BSB</small> <strong>564623</strong></h4>
                        <h5><small>Account Name </small> <strong>John Doe</strong></h5>
                        <h5><small>Account Number</small> <strong>*********65</strong></h5>
                    </div>
                    <div class="card-box wallet-account-box">
                        <div class="card-box-head d-flex">
                            <i></i>
                            <div class="card-box-head-r">
                                <a href=""><img src={editImg} alt=""/></a>
                                <a href=""><img src={deleteImg} alt=""/></a>
                            </div>	
                        </div>
                        <h4>Bank Australia</h4>
                        <h4><small>BSB</small> <strong>564623</strong></h4>
                        <h5><small>Account Name </small> <strong>John Doe</strong></h5>
                        <h5><small>Account Number</small> <strong>*********65</strong></h5>
                    </div>
                    <div class="card-box add-card-box">
                        <a href="" data-toggle="modal" data-target="#add-bankaccount">
                            <img src={plusImg} alt="" />
                            <strong>Add Bank Account</strong>
                        </a>
                    </div>			
                </div>
            </div>		
            
            <div class="transactions-history">
                <div class="d-flex">
                    <h2>Transactions History</h2>
                    <form>
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button type="submit"></button>
                    </form>
                </div>	
                <div class="content-box transactions-body">
                    <table class="table">
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
                            <tr class="loadmore-btn">
                                <td colspan="4"><a href="" class="round-btn">Load more</a></td>
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