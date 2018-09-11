import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../../apollo/queries';

import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  Button,
  Checkbox
} from '@material-ui/core';

export default class UserForm extends Component {
  state = {
    id: this.props.user.id || '',
    netId: this.props.user.netId || '',
    idNumber: this.props.user.idNumber || '',
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
    password: null,
    admin: this.props.user.admin || false
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheck = e => {
    console.log(e.target.value, e.target.checked);
    this.setState({ [e.target.value]: e.target.checked });
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
      admin
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
            admin
          };

          // Only submit password if value in state
          if (password) {
            variables.password = password;
          }

          submit({
            variables,
            refetchQueries: ['UsersQuery']
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error:{' '}
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
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
        <Query query={CURRENT_USER_QUERY}>
          {({ data }) => {
            if (data && data.me.admin) {
              console.log(data);
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={admin}
                      onChange={e => this.handleCheck(e)}
                      value="admin"
                      color="primary"
                    />
                  }
                  label="Admin"
                />
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
  user: {}
};

UserForm.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.shape()
};
