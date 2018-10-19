import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import jwtDecode from 'jwt-decode';
import {
  isAuthenticated,
  setAuthenticatedUser,
  getRedirectPath,
  setRedirectPath,
} from '../../apollo/client';
import { LOGIN } from '../../apollo/mutations';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component {
  state = {
    netId: '',
    password: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const { netId, password } = this.state;
    if (isAuthenticated()) {
      return <Redirect to="/dashboard/timeclock" />;
    }

    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <Mutation mutation={LOGIN}>
              {(login, { data, loading, error }) => {
                if (loading) {
                  return (
                    <CircularProgress
                      color="secondary"
                      style={{ margin: '1rem 0' }}
                    />
                  );
                }

                if (data) {
                  const token = data.login;
                  localStorage.setItem('token', token);
                  setAuthenticatedUser(jwtDecode(token));
                  const path = getRedirectPath();
                  if (path) {
                    setRedirectPath(null);
                    return <Redirect to={path} />;
                  }
                  return <Redirect to="/dashboard/timeclock" />;
                }
                return (
                  <Fragment>
                    {error && (
                      <pre>
                        Bad:{' '}
                        {error.graphQLErrors.map(({ message }) => (
                          <span key={message}>{message}</span>
                        ))}
                      </pre>
                    )}
                    <form
                      className={classes.form}
                      onSubmit={e => {
                        e.preventDefault();
                        login({
                          variables: { netId, password },
                        }).catch(err => console.log(err.message));
                        this.setState({ netId: '', password: '' });
                      }}
                    >
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="netId">NetId</InputLabel>
                        <Input
                          type="text"
                          id="netId"
                          name="netId"
                          value={netId}
                          autoFocus
                          onChange={this.handleInputChange}
                        />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          name="password"
                          type="password"
                          id="password"
                          value={password}
                          autoComplete="current-password"
                          onChange={this.handleInputChange}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign in
                      </Button>
                    </form>
                  </Fragment>
                );
              }}
            </Mutation>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(SignIn);
