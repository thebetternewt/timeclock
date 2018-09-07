import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

import SideDrawer from './SideDrawer';
import TimeClock from '../TimeClock';
import { CURRENT_USER_QUERY } from '../../apollo/queries';
import Users from '../Admin/Users/index';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  content: {
    marginLeft: drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SideDrawer width={drawerWidth} />
        <main className={classes.content}>
          <h1>Dashboard</h1>
          <Query query={CURRENT_USER_QUERY}>
            {({ loading, data }) => {
              if (loading) {
                return <span>Loading...</span>;
              }
              if (data && data.me) {
                return <h3>Welcome, {data.me.firstName}</h3>;
              }
              return null;
            }}
          </Query>
          <Route exact path="/dashboard/timeclock" component={TimeClock} />
          <Route exact path="/dashboard/user-admin" component={Users} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
