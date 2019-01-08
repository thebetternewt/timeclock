import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import { withRouter } from 'react-router-dom'
import { CURRENT_USER_QUERY } from '../../apollo/queries'

import { userItems, supervisorItems, adminItems } from './SideDrawerItems'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  subheader: {
    textTransform: 'uppercase',
  },
})

const SideDrawer = props => {
  const { classes, match } = props

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
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
        {userItems(match.url)}
      </List>
      <Query query={CURRENT_USER_QUERY}>
        {({ data }) => {
          if (data && data.me && data.me.admin) {
            return (
              <>
                <Divider />
                <List
                  component="nav"
                  subheader={
                    <ListSubheader
                      component="div"
                      className={classes.subheader}
                    >
                      Supervisor
                    </ListSubheader>
                  }
                >
                  {supervisorItems(match.url)}
                </List>
                <Divider />
                <List
                  component="nav"
                  subheader={
                    <ListSubheader
                      component="div"
                      className={classes.subheader}
                    >
                      Admin
                    </ListSubheader>
                  }
                >
                  {adminItems(match.url)}
                </List>
              </>
            )
          }

          return null
        }}
      </Query>
    </Drawer>
  )
}

SideDrawer.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
}

export default withRouter(withStyles(styles)(SideDrawer))
