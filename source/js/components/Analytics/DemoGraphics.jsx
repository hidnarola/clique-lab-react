import React, { Component } from 'react';
import { connect } from 'react-redux';
import pieChart from 'img/site/pie-chart.png';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,UncontrolledDropdown } from 'reactstrap';


class DemoGraphics extends Component {
    
    constructor(props){
        super(props);     
    }

    render() {
        return (
            <div className="analytics-body content-box">
				<ul className="demographics-ul d-flex">
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Country</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul>
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Australia</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>New Zealand</strong></li>
									<li className="purple-icon"><i className="fa fa-circle"></i> <strong>Thailand</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>State</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul>
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>NSW</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>South Australia</strong></li>
									<li className="purple-icon"><i className="fa fa-circle"></i> <strong>Northern Territory</strong></li>
									<li className="yellow-icon"><i className="fa fa-circle"></i> <strong>Tasmania</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Suburb</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul>
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Bondi Beach</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>Bondi Junction</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Gender</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul>
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Male</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>Female</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Social media friends</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul className="ul-column-2 d-flex">
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Facebook</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>twitter</strong></li>
									<li className="purple-icon"><i className="fa fa-circle"></i> <strong>Instagram</strong></li>
									<li className="yellow-icon"><i className="fa fa-circle"></i> <strong>Pinterest</strong></li>
									<li className="green-icon"><i className="fa fa-circle"></i> <strong>Likedin</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Job Industry</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul >
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Information Technology</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>Construction</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Education Level</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul className="">
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Bachelor Degree</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>Master Degree</strong></li>
									<li className="purple-icon"><i className="fa fa-circle"></i> <strong>High School</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Languages Spoken</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul className="">
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>English</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>Chinese</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Ethnicity</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul className="">
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Australians</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>Han Chinese Subgroups</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Sexual Orientation</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul className="">
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Straight</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>Gay</strong></li>
									<li className="purple-icon"><i className="fa fa-circle"></i> <strong>Unspecifield</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Relationship status</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul className="">
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Single</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>Divorced</strong></li>
									<li className="purple-icon"><i className="fa fa-circle"></i> <strong>Married</strong></li>
									<li className="yellow-icon"><i className="fa fa-circle"></i> <strong>Widowed</strong></li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="demographics-div">
							<div className="demographics-head d-flex">
								<div className="demographics-head-l"><h3>Music tastes</h3></div>
								<div className="demographics-head-r"><a href=""><i className="fa fa-ellipsis-h"></i></a></div>
							</div>
							<div className="demographics-graph"> <img src={pieChart} alt="" /></div>
							<div className="demographics-body">
								<ul className="">
									<li className="pink-icon"><i className="fa fa-circle"></i> <strong>Hip-Hop</strong></li>
									<li className="sky-icon"><i className="fa fa-circle"></i> <strong>R&B </strong></li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
        );
    }
}


const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(DemoGraphics)