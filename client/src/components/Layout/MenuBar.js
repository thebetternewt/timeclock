import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logOutUser, isAuthenticated } from '../../apollo/client';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flexGrow: 1,
  },
});

class MenuBar extends Component {
  handleLogOut = () => {
    logOutUser();
    window.location.href = '/';
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            TimeClock
          </Typography>

          {isAuthenticated() && (
            <Button variant="contained" onClick={this.handleLogOut}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withRouter(withStyles(styles)(MenuBar));
