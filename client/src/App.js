import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import jwt_decode from 'jwt-decode';

import { setAuthenticatedUser, logOutUser } from './apolloClient';

import Layout from './components/Layout/index';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard/index';
import PrivateRoute from './components/common/PrivateRoute';

// Check for token in LS
const token = localStorage.getItem('token');
if (token) {
  const decoded = jwt_decode(token);
  // Set user data in Apollo cache
  setAuthenticatedUser(decoded);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    logOutUser();
    // Redirect to login
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <h1>Layout child</h1>
          <Route exact path="/" component={SignIn} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
