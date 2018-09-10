import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/ListAlt';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import GroupIcon from '@material-ui/icons/Group';
import BusinessIcon from '@material-ui/icons/Business';
import TimerIcon from '@material-ui/icons/Timer';
import TimelineIcon from '@material-ui/icons/Timeline';

export const userItems = (
  <div>
    <Link to="/dashboard/timeclock">
      <ListItem button>
        <ListItemIcon>
          <TimerIcon />
        </ListItemIcon>
        <ListItemText primary="TimeClock" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Stats" />
    </ListItem>
  </div>
);

export const supervisorItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InsertChartIcon />
      </ListItemIcon>
      <ListItemText primary="Stats" />
    </ListItem>
  </div>
);

export const adminItems = (
  <div>
    <Link to="/dashboard/user-admin">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    <Link to="/dashboard/department-admin">
      <ListItem button>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Departments" />
      </ListItem>
    </Link>
  </div>
);
