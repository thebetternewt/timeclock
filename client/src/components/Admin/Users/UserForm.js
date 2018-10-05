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
import { CURRENT_USER_QUERY, DEPARTMENTS_QUERY } from '../../../apollo/queries';

import DepartmentSelect from '../../common/DepartmentSelect';

export default class UserForm extends Component {
  state = {
    /* eslint-disable react/destructuring-assignment */
    id: this.props.user.id || '',
    netId: this.props.user.netId || '',
    idNumber: this.props.user.idNumber || '',
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
    password: '',
    departmentIds: this.props.user.departments.map(dept => dept.id) || [],
    admin: this.props.user.admin || false,
    active: this.props.user.active,
    /* eslint-enable react/destructuring-assignment */
  };

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
    const { user, submit, close, error } = this.props;
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
          if (password.trim().length > 0) {
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
          <InputLabel htmlFor="idNumber">ID Number (9-digit)</InputLabel>
          <Input
            type="text"
            id="idNumber"
            name="idNumber"
            value={idNumber}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={this.handleInputChange}
          />
        </FormControl>
        {!user.id && (
          <FormControl margin="normal" required fullWidth>
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
                        disabled={data.me.id === user.id}
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
                        disabled={data.me.id === user.id}
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

        <Button type="submit" variant="raised" color="primary">
          Submit
        </Button>
        <Button variant="raised" color="secondary" onClick={close}>
          Cancel
        </Button>
      </form>
    );
  }
}

UserForm.defaultProps = {
  user: {},
  error: null,
};

UserForm.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.shape(),
  error: PropTypes.shape(),
};
