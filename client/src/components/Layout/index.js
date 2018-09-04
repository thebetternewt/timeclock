import React, { Component } from 'react';
import MenuBar from './MenuBar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: '60px',
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  }
});

class Layout extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div style={{ minHeight: '100vh' }}>
        <MenuBar />
        <main className={classes.content}>{children}</main>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
