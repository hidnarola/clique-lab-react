import React, { Component } from 'react';
import { connect } from 'react-redux';
import img1 from 'img/site/big-img011.jpg';
import img2 from 'img/site/big-img012.jpg';
import img3 from 'img/site/big-img013.jpg';
import fbImg from 'img/site/facebook-01.png';
import linkedImg from 'img/site/linkedin.png';
import pinImg from 'img/site/pintrest.png';
import twitterImg from 'img/site/twitter.png';
import instaImg from 'img/site/instagram.png';
import imgPlus from 'img/site/plus-01.png';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';

const PlusAction = () => {
    return (
        <UncontrolledDropdown className="festival-ftr-r dropdown">
            <DropdownToggle>
                <a className="cursor_pointer"><img src={imgPlus} alt="" /></a>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="javascript:void(0)">Add to Cart</a>
                <a className="dropdown-item" href="javascript:void(0)">Add user to Group</a>
                <a className="dropdown-item" href="javascript:void(0)">Modify status and purchase</a>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

class InspiredSubmissions extends Component {
    
    constructor(props){
        super(props);     
    }

    render() {
        return (
            <div className="every-people">
				<div className="everypeole-head d-flex">
					<div className="everypeole-head-l">
						<ul>
							<li className="dropdown age-dropdown active">
								<a href="#" className="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">21 - 25</a>
								<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
									<h4>Age group</h4>
									<div className="age-fillter"><img src="images/fillter.png" alt="" /></div>
									<div className="ftr-btn">
										<button className="bdr-btn">Apply</button>
									</div>
								</div>
							</li>
							<li><a href="">Gendar</a></li>
							<li><a href="">Location</a></li>
							<li><a href="">More filter</a></li>
						</ul>
					</div>
					<div className="everypeole-head-r">
						<ul>
							<li><a href="">Sort <i className="dropdown-arrow"></i></a></li>
						</ul>
					</div>
				</div>
				<div className="all-people">
					<ul className="fan-festival d-flex h-view">
						<li>
							<div className="fan-festival-box d-flex">
								<div className="festival-img"><img src={img1} alt="" /></div>
								<div className="fan-festival-r">
								<div className="festival-head d-flex">
									<div className="festival-head-l">
										<span></span>
										<h3>
											<big>Johnson Doe</big>
											<small>Bondi Beach, Sydney, Australia</small>
										</h3>
									</div>
									<div className="festival-head-r"><h3>$45.00</h3></div>
								</div>
								<div className="festival-body">
									<h2>Make up by morning. boyfriends happy, what a life I lead! <a href="">@thegrocer #morning #earlyriser #excited
#sponsored</a></h2>
								</div>
								<div className="festival-ftr d-flex">
									<div className="festival-ftr-l"><a href=""><i><img src={fbImg} alt="" /></i><strong>823M</strong></a></div>
									<div className="festival-ftr-r dropdown">
                                        <PlusAction />
									</div>
								</div>
								</div>
							</div>
						</li>
						<li>
							<div className="fan-festival-box d-flex">
								<div className="festival-img"><img src={img2} alt="" /></div>
								<div className="fan-festival-r">
								<div className="festival-head d-flex">
									<div className="festival-head-l">
										<span></span>
										<h3>
											<big>Johnson Doe</big>
											<small>Bondi Beach, Sydney, Australia</small>
										</h3>
									</div>
									<div className="festival-head-r"><h3>$45.00</h3></div>
								</div>
								<div className="festival-body">
									<h2>Make up by morning. boyfriends happy, what a life I lead! <a href="">@thegrocer #morning #earlyriser #excited
#sponsored</a></h2>
								</div>
								<div className="festival-ftr d-flex">
									<div className="festival-ftr-l"><a href=""><i><img src={linkedImg} alt="" /></i><strong>823M</strong></a></div>
									<div className="festival-ftr-r dropdown">
                                        <PlusAction />
									</div>
								</div>
								</div>
							</div>
						</li>
						<li>
							<div className="fan-festival-box d-flex">
								<div className="festival-img"><img src={img3} alt="" /></div>
								<div className="fan-festival-r">
								<div className="festival-head d-flex">
									<div className="festival-head-l">
										<span></span>
										<h3>
											<big>Johnson Doe</big>
											<small>Bondi Beach, Sydney, Australia</small>
										</h3>
									</div>
									<div className="festival-head-r"><h3>$45.00</h3></div>
								</div>
								<div className="festival-body">
									<h2>Make up by morning. boyfriends happy, what a life I lead! <a href="">@thegrocer #morning #earlyriser #excited
#sponsored</a></h2>
								</div>
								<div className="festival-ftr d-flex">
									<div className="festival-ftr-l"><a href=""><i><img src={instaImg} alt="" /></i><strong>823M</strong></a></div>
									<div className="festival-ftr-r dropdown">
										<PlusAction />
									</div>
								</div>
								</div>
							</div>
						</li>
					</ul> 
				</div>
			</div>
		
		
        );
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(InspiredSubmissions)