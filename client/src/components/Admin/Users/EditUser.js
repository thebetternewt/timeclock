import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import { Mutation } from 'react-apollo';
import { UPDATE_USER } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class EditUser extends Component {
  state = {
    user: this.props.user
  };

  render() {
    const { user } = this.state;
    const { cancelEdit } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Edit User</h3>
        <Mutation mutation={UPDATE_USER}>
          {(updateUser, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log('data:', data);
            }

            return (
              <UserForm
                submit={updateUser}
                error={error}
                user={user}
                close={cancelEdit}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

EditUser.propTypes = {
  user: PropTypes.shape().isRequired,
  cancelEdit: PropTypes.func.isRequired
};
