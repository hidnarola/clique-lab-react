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

let Permission = props => {
	return(
        <div class="profile-body premission-body">
            <ul class="premission-ul d-flex"> 
                <li>
                    <div class="premission-box">
                        <div class="premission-head d-flex">
                            <div class="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div class="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div class="premission-points">
                            <ul class="d-flex">
                                <li><i class="fa fa-circle"></i> Create</li>
                                <li><i class="fa fa-circle"></i> Everyday People</li>
                                <li><i class="fa fa-circle"></i> Groups </li>
                                <li><i class="fa fa-circle"></i> Campaigns</li>
                                <li><i class="fa fa-circle"></i> Calendar</li>
                                <li><i class="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="premission-box">
                        <div class="premission-head d-flex">
                            <div class="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div class="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div class="premission-points">
                            <ul class="d-flex">
                                <li><i class="fa fa-circle"></i> Create</li>
                                <li><i class="fa fa-circle"></i> Everyday People</li>
                                <li><i class="fa fa-circle"></i> Groups </li>
                                <li><i class="fa fa-circle"></i> Campaigns</li>
                                <li><i class="fa fa-circle"></i> Calendar</li>
                                <li><i class="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="premission-box">
                        <div class="premission-head d-flex">
                            <div class="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div class="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div class="premission-points">
                            <ul class="d-flex">
                                <li><i class="fa fa-circle"></i> Create</li>
                                <li><i class="fa fa-circle"></i> Everyday People</li>
                                <li><i class="fa fa-circle"></i> Groups </li>
                                <li><i class="fa fa-circle"></i> Campaigns</li>
                                <li><i class="fa fa-circle"></i> Calendar</li>
                                <li><i class="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="premission-box">
                        <div class="premission-head d-flex">
                            <div class="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div class="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div class="premission-points">
                            <ul class="d-flex">
                                <li><i class="fa fa-circle"></i> Create</li>
                                <li><i class="fa fa-circle"></i> Everyday People</li>
                                <li><i class="fa fa-circle"></i> Groups </li>
                                <li><i class="fa fa-circle"></i> Campaigns</li>
                                <li><i class="fa fa-circle"></i> Calendar</li>
                                <li><i class="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="premission-box">
                        <div class="premission-head d-flex">
                            <div class="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div class="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div class="premission-points">
                            <ul class="d-flex">
                                <li><i class="fa fa-circle"></i> Create</li>
                                <li><i class="fa fa-circle"></i> Everyday People</li>
                                <li><i class="fa fa-circle"></i> Groups </li>
                                <li><i class="fa fa-circle"></i> Campaigns</li>
                                <li><i class="fa fa-circle"></i> Calendar</li>
                                <li><i class="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
			
	);
}


export default connect(state => ({
    
}))(Permission)