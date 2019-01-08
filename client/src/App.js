import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { MuiThemeProvider } from '@material-ui/core/styles'
import checkToken from './util/checkToken'
import Layout from './components/Layout/index'
import SignIn from './components/Auth/SignIn'
import Dashboard from './components/Dashboard/index'
import PrivateRoute from './components/common/PrivateRoute'
import theme from './components/common/MuiTheme'

// Check for token in LS
checkToken()

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
)

export default App
