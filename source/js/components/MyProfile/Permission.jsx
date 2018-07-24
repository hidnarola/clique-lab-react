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

// import editImg from 'img/site/edit-icon.png';
// import deleteImg from 'img/site/delete-icon.png';

import editImg from 'img/site/svg-icon/ic_document-edit_gray.svg';
import deleteImg from 'img/site/svg-icon/ic_trash_gray.svg';


import visaImg from 'img/site/visa-icon.png';
import plusImg from 'img/site/plus-01.png';

let Permission = props => {
	return(
        <div className="profile-body premission-body">
            <ul className="premission-ul d-flex"> 
                <li>
                    <div className="premission-box">
                        <div className="premission-head d-flex">
                            <div className="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div className="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div className="premission-points">
                            <ul className="d-flex">
                                <li><i className="fa fa-circle"></i> Create</li>
                                <li><i className="fa fa-circle"></i> Everyday People</li>
                                <li><i className="fa fa-circle"></i> Groups </li>
                                <li><i className="fa fa-circle"></i> Campaigns</li>
                                <li><i className="fa fa-circle"></i> Calendar</li>
                                <li><i className="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="premission-box">
                        <div className="premission-head d-flex">
                            <div className="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div className="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div className="premission-points">
                            <ul className="d-flex">
                                <li><i className="fa fa-circle"></i> Create</li>
                                <li><i className="fa fa-circle"></i> Everyday People</li>
                                <li><i className="fa fa-circle"></i> Groups </li>
                                <li><i className="fa fa-circle"></i> Campaigns</li>
                                <li><i className="fa fa-circle"></i> Calendar</li>
                                <li><i className="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="premission-box">
                        <div className="premission-head d-flex">
                            <div className="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div className="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div className="premission-points">
                            <ul className="d-flex">
                                <li><i className="fa fa-circle"></i> Create</li>
                                <li><i className="fa fa-circle"></i> Everyday People</li>
                                <li><i className="fa fa-circle"></i> Groups </li>
                                <li><i className="fa fa-circle"></i> Campaigns</li>
                                <li><i className="fa fa-circle"></i> Calendar</li>
                                <li><i className="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="premission-box">
                        <div className="premission-head d-flex">
                            <div className="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div className="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div className="premission-points">
                            <ul className="d-flex">
                                <li><i className="fa fa-circle"></i> Create</li>
                                <li><i className="fa fa-circle"></i> Everyday People</li>
                                <li><i className="fa fa-circle"></i> Groups </li>
                                <li><i className="fa fa-circle"></i> Campaigns</li>
                                <li><i className="fa fa-circle"></i> Calendar</li>
                                <li><i className="fa fa-circle"></i> Analytics</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="premission-box">
                        <div className="premission-head d-flex">
                            <div className="premission-head-l">
                                <span></span> <small>Johnson Doe</small>
                            </div>
                            <div className="premission-head-r">
                                <a href="" data-toggle="modal" data-target="#permission-edit"><img src={editImg} alt="" /></a>
                                <a href=""><img src={deleteImg} alt="" /></a>
                            </div>
                        </div>
                        <div className="premission-points">
                            <ul className="d-flex">
                                <li><i className="fa fa-circle"></i> Create</li>
                                <li><i className="fa fa-circle"></i> Everyday People</li>
                                <li><i className="fa fa-circle"></i> Groups </li>
                                <li><i className="fa fa-circle"></i> Campaigns</li>
                                <li><i className="fa fa-circle"></i> Calendar</li>
                                <li><i className="fa fa-circle"></i> Analytics</li>
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