import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../apollo/client';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === true ? <Component {...rest} /> : <Redirect to="/" />
    }
  />
);

export default PrivateRoute;
