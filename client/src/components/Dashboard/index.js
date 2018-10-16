import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import SideDrawer from './SideDrawer';
import TimeClock from '../TimeClock';
import Users from '../Admin/Users';
import Departments from '../Admin/Departments';
import PayPeriods from '../Admin/PayPeriods';

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
  content: {
    marginLeft: drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

const Dashboard = props => {
  const { classes, match } = props;

  return (
    <div className={classes.root}>
      <SideDrawer width={drawerWidth} />
      <main className={classes.content}>
        <Route exact path={`${match.path}/timeclock`} component={TimeClock} />
        <Route exact path={`${match.path}/users`} component={Users} />
        <Route
          exact
          path={`${match.path}/departments`}
          component={Departments}
        />
        <Route
          exact
          path={`${match.path}/pay-periods`}
          component={PayPeriods}
        />
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Dashboard);
