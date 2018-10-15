import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuBar from './MenuBar';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: '60px',
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

const Layout = props => {
  const { classes, children } = props;
  return (
    <div style={{ minHeight: '100vh' }}>
      <MenuBar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withStyles(styles)(Layout);
