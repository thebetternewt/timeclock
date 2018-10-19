import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated, setRedirectPath } from '../../apollo/client';
import checkToken from '../../util/checkToken';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Check for expired token in LS
  checkToken();

  return (
    <Route
      {...rest}
      render={props => {
        // Check to see if authenticated
        if (isAuthenticated()) {
          return <Component {...props} />;
        }

        setRedirectPath(props.location.pathname);

        return <Redirect to="/" />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
