import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { setAuthenticatedUser, logOutUser } from './apollo/client';

import Layout from './components/Layout/index';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard/index';
import PrivateRoute from './components/common/PrivateRoute';
import theme from './components/common/MuiTheme';

// Check for token in LS
const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
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

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div className="App">
      <Helmet>
        <title>Timeclock 3</title>
      </Helmet>
      <Layout>
        <Route exact path="/" component={SignIn} />
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Layout>
    </div>
  </MuiThemeProvider>
);

export default App;
