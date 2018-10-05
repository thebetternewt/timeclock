import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Paper, CircularProgress } from '@material-ui/core';
import UserForm from './UserForm';
import { ADD_USER } from '../../../apollo/mutations';

const AddUser = props => {
  const { cancelAdd } = props;

  return (
    <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
      <h3>Add User</h3>
      <Mutation mutation={ADD_USER}>
        {(addUser, { loading, error }) => {
          if (loading) {
            return <CircularProgress />;
          }

          return <UserForm submit={addUser} error={error} close={cancelAdd} />;
        }}
      </Mutation>
    </Paper>
  );
};

AddUser.propTypes = {
  cancelAdd: PropTypes.func.isRequired,
};

export default AddUser;
