import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PunchForm from './PunchForm';
import { Mutation } from 'react-apollo';
import { ADD_PUNCH } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class AddPunch extends Component {
  render() {
    const { cancelAdd, user } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Add User</h3>
        <Mutation mutation={ADD_PUNCH}>
          {(addPunch, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log(data);
            }

            return (
              <PunchForm
                submit={addPunch}
                error={error}
                close={cancelAdd}
                user={user}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

AddPunch.propTypes = {
  user: PropTypes.shape().isRequired
};
