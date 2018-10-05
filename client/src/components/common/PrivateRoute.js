import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated, setRedirectPath } from '../../apollo/client';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthenticated()) {
        return <Component {...props} />;
      }

      setRedirectPath(props.match.path);

      return <Redirect to="/" />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
