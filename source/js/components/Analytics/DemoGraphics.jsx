import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie, Legend } from 'recharts';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { getDemoGraphics } from '../../actions/analytics';

import pieChart from 'img/site/pie-chart.png';

class DemoGrpahicChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		const { chartData, chartDataIndex } = this.props;
		let dataArr = chartData[1][chartData[0]];
		// let data = [
		// 	{ name: 'A2', value: 50, fill: '#6772e5', stroke: '#6772e5' },
		// 	{ name: 'A3', value: 50, fill: '#83bff7', stroke: '#83bff7' },
		// 	{ name: 'A1', value: 100, fill: '#f783c3', stroke: '#f783c3' },
		// ]
		let data = [];
		let colorArr = [
			'#f789c6',
			'#83bff7',
			'#6772e5',
			'#f7c583',
			'#6adbac',
		];
		dataArr.map((obj, index) => {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			data.push({ name: obj.name, value: obj.count, fill: colorArr[index], stroke: colorArr[index] })
		});

		let title = '';

		if(chartData[0] === 'country'){
			title = 'Country';
		}
		else if(chartData[0] === 'state'){
			title = 'State';
		}
		else if(chartData[0] === 'suburb'){
			title = 'Suburb';
		}
		else if(chartData[0] === 'gender'){
			title = 'Gender';
		}
		else if(chartData[0] === 'job_industry'){
			title = 'Job Industry';
		}
		else if(chartData[0] === 'education'){
			title = 'Education level';
		}
		else if(chartData[0] === 'language'){
			title = 'Language spoken';
		}
		else if(chartData[0] === 'ethnicity'){
			title = 'Ethnicity';
		}
		else if(chartData[0] === 'music_taste')	{
			title = 'Music tastes';
		}
		else if(chartData[0] === 'relationship_status')	{
			title = 'Relationship status';
		}
		else if(chartData[0] === 'sexual_orientation')	{
			title = 'Sexual orientation';
		}


		return (
			<li key={Math.random()}>
				<div className="demographics-div">
					<div className="demographics-head d-flex">
						<div className="demographics-head-l">
							{/* <h3 style={{ 'textTransform': 'capitalize'}}>{chartData[0]}</h3> */}
							<h3>{title}</h3>
						</div>
						{/* <div style={{"fontWeight": "700","marginLeft":"auto","color":"#525f7f"}}>...</div> */}
						
					</div>
					<div className="demographics-graph">
						<PieChart
							width={200}
							height={130}
						>
							<Pie
								data={data}
								cx={115}
								innerRadius={35}
								outerRadius={58}
								fill="#8884d8"
							/>
						</PieChart>
					</div>
					<div className="demographics-body">
						<ul>
							{
								dataArr.map((obj, index) => {
									return <li key={index}>
										<i className="fa fa-circle" style={{ "color": colorArr[index] }}></i>
										<strong style={{ "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis", "width": "14em" }}>
											{(obj.name == null) ? 'Other' : obj.name.charAt(0).toUpperCase() + obj.name.slice(1)}
										</strong>
									</li>
								})
							}
						</ul>
					</div>
				</div>
			</li>
		)
	}
}

class DemoGraphics extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentWillMount = () => {
		const { dispatch } = this.props;
		dispatch(getDemoGraphics());		
	}

	render() {
		const { isRender } = this.state;
		const { demo_graphics_data } = this.props;
		let result = [];
		if (demo_graphics_data.status == 1) {
			result = Object.keys(demo_graphics_data.data).map(function (key) {
				return [key, demo_graphics_data.data[key]];
			});
		}
		let data01 = [
			{ name: 'A2', value: 50, fill: '#6772e5', stroke: '#6772e5' },
			{ name: 'A3', value: 50, fill: '#83bff7', stroke: '#83bff7' },
			{ name: 'A1', value: 100, fill: '#f783c3', stroke: '#f783c3' },
		]
		if (demo_graphics_data.loading) { return (<div className="loader"></div>) }
		return (
			<div className="analytics-body content-box">
				<ul className="demographics-ul d-flex">
					{
						(demo_graphics_data.status == 1) ?
							(result.length > 0) &&
							result.map((obj, index) => {
								return (
									<DemoGrpahicChart
										chartData={obj}
										chartDataIndex={index}
									/>
								)
							})
							: ''
					}
				</ul>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	const { analytics } = state;
	return {
		demo_graphics_data: analytics.get('demo_graphics'),
		loading: analytics.get('loading'),
		social_analytics_data: analytics.get('social_analytics'),
	}
}

export default connect(mapStateToProps)(DemoGraphics)