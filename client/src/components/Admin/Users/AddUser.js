import React, { Component } from 'react';
import UserForm from './UserForm';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class AddUser extends Component {
  render() {
    const { cancelAdd } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Add User</h3>
        <Mutation mutation={ADD_USER}>
          {(addUser, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log(data);
            }

            return (
              <UserForm submit={addUser} error={error} cancel={cancelAdd} />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}
