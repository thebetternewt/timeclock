import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import { userItems, supervisorItems, adminItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  subheader: {
    textTransform: 'uppercase'
  }
});

const SideDrawer = props => {
  const { classes } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.subheader}>
            User
          </ListSubheader>
        }
      >
        {userItems}
      </List>
      <Divider />
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.subheader}>
            Supervisor
          </ListSubheader>
        }
      >
        {supervisorItems}
      </List>
      <Divider />
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" className={classes.subheader}>
            Admin
          </ListSubheader>
        }
      >
        {adminItems}
      </List>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideDrawer);
