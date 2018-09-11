import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PunchForm from './PunchForm';
import { Mutation } from 'react-apollo';
import { UPDATE_PUNCH } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class EditPunch extends Component {
  state = {
    punch: this.props.punch
  };

  render() {
    const { punch } = this.state;
    const { cancelEdit, user } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Edit Punch</h3>
        <Mutation mutation={UPDATE_PUNCH}>
          {(updatePunch, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log('data:', data);
            }

            return (
              <PunchForm
                user={user}
                submit={updatePunch}
                error={error}
                punch={punch}
                close={cancelEdit}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

EditPunch.propTypes = {
  user: PropTypes.shape().isRequired,
  punch: PropTypes.shape().isRequired,
  cancelEdit: PropTypes.func.isRequired
};
