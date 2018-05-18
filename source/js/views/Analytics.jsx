import React, { Component } from 'react';

import Stats from '../components/Analytics/Stats';
import DemoGraphics from '../components/Analytics/DemoGraphics';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { BrowserRouter as Router,Link,Switch,Route,NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';

import { getAnalytics } from '../actions/analytics';

const Compare = () => {
    return(
        <div className="everypeole-head d-flex">
            <div className="everypeole-head-l">
                <ul>
                    <li className="age-dropdown active"><a href="#" >Age</a></li>
                    <li><a href="">Gendar</a></li>
                    <li><a href="">Location</a></li>
                    <li><a href="">More filter</a></li>
                </ul>
            </div>
            <div className="everypeole-head-r">
                <ul>
                    <li><a href="">Add Copare <i className="fa fa-plus"></i></a></li>
                </ul>
            </div>
        </div>
    );
}

class Analytics extends Component {
    constructor(props){
        super(props);
        this.state = {
            analytics : null,
        }
    }

    // Component will mount
    componentWillMount = () => {
        const { dispatch } = this.props;
        let arrayFilter = [
            {
                "filter": [
                    []
                ]
            }   
        ]; 
        dispatch(getAnalytics(arrayFilter));
    }

    // Component did update
    componentDidUpdate = (prevProps, prevState) => {
        const { analytics_data } = this.props;
        const { analytics } = this.state;
        if(analytics===null){
            if(analytics_data.status===1 && analytics_data.data!==null){
                this.setState({analytics : analytics_data.data})        
            }
        }
    }
    
    


    render() {
        let curt_page  = this.props.history.location.pathname;
        const { analytics } = this.state;
        if(curt_page==routeCodes.ANALYTICS){
            this.props.history.push(routeCodes.ANALYTICS_STATS);
        }
        return (
            <div>
                <div className="analytics-head">
                    <div className="profile-head d-flex campaigns-links">
                        <ul>
                            <li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.ANALYTICS_STATS}>Stats</NavLink></li>
                            <li><NavLink activeClassName="active" className="cursor_pointer" to={routeCodes.ANALYTICS_DEMOGRAPHICS}>Demographics</NavLink></li>
                        </ul>
                    </div>
                    { curt_page==routeCodes.ANALYTICS_STATS && <Compare />}
                </div>
                { curt_page==routeCodes.ANALYTICS_STATS && <Stats analyticsData={analytics} />}
                { curt_page==routeCodes.ANALYTICS_DEMOGRAPHICS && <DemoGraphics />}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { analytics } = state;
    return {
        loading: analytics.get('loading'),
        analytics_data: analytics.get('analytics'),
    }
}
export default connect(mapStateToProps)(withRouter(Analytics));
