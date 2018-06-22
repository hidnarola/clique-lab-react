import jQuery from 'jquery';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { routeCodes } from '../constants/routes';
import pageNotFoundImg from 'img/site/no_data/Page_Not_Found.png';
// This component is used for Server rendering
// When you want to return 40x http statuses
const RouteStatus = ({ code, children }) => (
  <Route
    render={
      ({ staticContext }) => {
        if (staticContext) {
          staticContext.status = code; // eslint-disable-line no-param-reassign
        }
        return children;
      }
    }
  />
);

RouteStatus.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.object,
};

export default class NotFound extends Component {
  componentWillMount(){
    //jQuery('body').css('background-color','#6772e5')
  }
  render() {
    return (
      <RouteStatus code={ 404 }>
        <div className="notfound-main-div">
            <img src={pageNotFoundImg} />
            <Link to={routeCodes.DASHBOARD}>BACK TO HOME</Link>
        </div>
      </RouteStatus>
    );
  }
}
