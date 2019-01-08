import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import client from './apollo/client'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import ScrollToTop from './components/common/ScrollToTop'

const app = (
  <ApolloProvider client={client}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </MuiPickersUtilsProvider>
  </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
