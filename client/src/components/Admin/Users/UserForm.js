import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  Button,
  Checkbox,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CURRENT_USER_QUERY, DEPARTMENTS_QUERY } from '../../../apollo/queries';
import DepartmentSelect from '../../common/DepartmentSelect';

const styles = theme => ({
  FormControl: {
    margin: `${theme.spacing.unit}px 0`,
  },
  Button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
});

class UserForm extends Component {
  state = this.getInitState();

  getInitState() {
    const { user } = this.props;

    if (user) {
      return {
        ...user,
        departmentIds: user.departments.map(dept => dept.id),
      };
    }

    return {
      netId: '',
      idNumber: '',
      firstName: '',
      lastName: '',
      password: '',
      departmentIds: [],
      admin: false,
      active: true,
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheck = e => {
    this.setState({ [e.target.value]: e.target.checked });
  };

  handleDepartmentSelect = e => {
    this.setState({ departmentIds: e.target.value });
  };

  render() {
    const { classes, submit, close, error } = this.props;
    const {
      id,
      netId,
      idNumber,
      firstName,
      lastName,
      password,
      admin,
      active,
      departmentIds,
    } = this.state;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          const variables = {
            id,
            netId,
            idNumber,
            firstName,
            lastName,
            admin,
            active,
            departments: departmentIds.join(', '),
          };

          // Only submit password if value in state
          if (password && password.trim().length > 0) {
            variables.password = password;
          }

          submit({
            variables,
            refetchQueries: ['UsersQuery'],
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error:{' '}
            {error.graphQLErrors.map(({ message }) => (
              <span key={message}>{message}</span>
            ))}
          </pre>
        )}
        <FormControl required fullWidth className={classes.FormControl}>
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
        <FormControl required fullWidth className={classes.FormControl}>
          <InputLabel htmlFor="idNumber">ID Number (9-digit)</InputLabel>
          <Input
            type="number"
            id="idNumber"
            name="idNumber"
            value={idNumber}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl required fullWidth className={classes.FormControl}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl required fullWidth className={classes.FormControl}>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={this.handleInputChange}
          />
        </FormControl>
        {!id && (
          <FormControl required fullWidth className={classes.FormControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </FormControl>
        )}
        <Query query={DEPARTMENTS_QUERY}>
          {({ data }) => {
            if (data && data.departments) {
              return (
                <DepartmentSelect
                  departments={data.departments}
                  handleSelect={this.handleDepartmentSelect}
                  selectedDepartmentIds={departmentIds}
                  multiple
                  className={classes.FormControl}
                />
              );
            }
            return null;
          }}
        </Query>
        <Query query={CURRENT_USER_QUERY}>
          {({ data }) => {
            if (data && data.me.admin) {
              return (
                <Fragment>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={admin}
                        onChange={e => this.handleCheck(e)}
                        value="admin"
                        color="primary"
                        disabled={data.me.id === id}
                      />
                    }
                    label="Admin"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={active}
                        onChange={e => this.handleCheck(e)}
                        value="active"
                        color="primary"
                        disabled={data.me.id === id}
                      />
                    }
                    label="Active"
                  />
                </Fragment>
              );
            }

            return null;
          }}
        </Query>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.Button}
        >
          Submit
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={close}
          className={classes.Button}
        >
          Cancel
        </Button>
      </form>
    );
  }
}

UserForm.defaultProps = {
  user: null,
  error: null,
};

UserForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.shape(),
  error: PropTypes.shape(),
};

export default withStyles(styles)(UserForm);
