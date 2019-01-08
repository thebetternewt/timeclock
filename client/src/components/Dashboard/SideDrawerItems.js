import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListIcon from '@material-ui/icons/ListAlt'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import GroupIcon from '@material-ui/icons/Group'
import BusinessIcon from '@material-ui/icons/Business'
import TimerIcon from '@material-ui/icons/Timer'
import TimelineIcon from '@material-ui/icons/Timeline'
import EventIcon from '@material-ui/icons/Event'

export const userItems = path => (
  <div>
    <Link to={`${path}/timeclock`}>
      <ListItem button>
        <ListItemIcon>
          <TimerIcon />
        </ListItemIcon>
        <ListItemText primary="TimeClock" />
      </ListItem>
    </Link>
    <Link to={`${path}/timesheets`}>
      <ListItem button>
        <ListItemIcon>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Timesheets" />
      </ListItem>
    </Link>
  </div>
)

export const supervisorItems = path => (
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
)

export const adminItems = path => (
  <div>
    <Link to={`${path}/users`}>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    <Link to={`${path}/departments`}>
      <ListItem button>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Departments" />
      </ListItem>
    </Link>
    <Link to={`${path}/pay-periods`}>
      <ListItem button>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Pay Periods" />
      </ListItem>
    </Link>
  </div>
)
