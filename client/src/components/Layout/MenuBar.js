import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logOutUser, isAuthenticated } from '../../apollo/client';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: '60px',
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
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
          <Typography variant="title" color="inherit" className={classes.flex}>
            TimeClock
          </Typography>

          {isAuthenticated() && (
            <Button variant="raised" onClick={this.handleLogOut}>
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
