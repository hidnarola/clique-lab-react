import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { routeCodes } from '../constants/routes';

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
  render() {
    return (
      <RouteStatus code={ 404 }>
        <div className="notfound-main-div">
          <div class="notfound-inner-box">
            <h1>Ooops... Error 404</h1>
            <h2>Sorry, but the page you are looking for dosen't exist.</h2>
            <Link to={routeCodes.DASHBOARD}>Back to home page</Link>
          </div>
        </div>
      </RouteStatus>
    );
  }
}
