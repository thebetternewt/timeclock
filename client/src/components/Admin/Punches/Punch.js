import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import PunchForm from './PunchForm';
import { UPDATE_PUNCH } from '../../../apollo/mutations';

import { PUNCH_QUERY } from '../../../apollo/queries';

export default class Punch extends Component {
  state = {
    id: this.props.id, // eslint-disable-line react/destructuring-assignment
    showEditMode: false,
  };

  toggleEditMode = () => {
    const { showEditMode } = this.state;
    this.setState({ showEditMode: !showEditMode });
  };

  render() {
    const { id, showEditMode } = this.state;
    const { cancelEdit } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Punch Details</h3>
        <Query query={PUNCH_QUERY} variables={{ id }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.punch) {
              console.log(data.punch);
              const {
                userId,
                clockInMsTime,
                clockOutMsTime,
                department: { name: deptName, id: deptId },
                user,
              } = data.punch;

              if (showEditMode) {
                return (
                  <Mutation mutation={UPDATE_PUNCH}>
                    {(updatePunch, { loading: updating, error }) => {
                      if (updating) {
                        return <CircularProgress />;
                      }

                      return (
                        <PunchForm
                          user={user}
                          submit={updatePunch}
                          error={error}
                          punch={data.punch}
                          close={this.toggleEditMode}
                        />
                      );
                    }}
                  </Mutation>
                );
              }

              return (
                <Fragment>
                  <h3>Detail:</h3>
                  <p>
                    <strong>User Id:</strong> {userId}
                  </p>
                  <p>
                    <strong>Clock In:</strong> {clockInMsTime}
                  </p>
                  <p>
                    <strong>Clock Out:</strong> {clockOutMsTime}
                  </p>
                  <p>
                    <strong>Department:</strong> {deptName}
                  </p>

                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.toggleEditMode}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={cancelEdit}
                  >
                    Close
                  </Button>
                </Fragment>
              );
            }

            return <p>Pilgrim not found.</p>;
          }}
        </Query>
      </Paper>
    );
  }
}

Punch.propTypes = {
  id: PropTypes.string.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};
