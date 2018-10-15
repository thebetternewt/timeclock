import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import UserForm from './UserForm';
import { USER_QUERY } from '../../../apollo/queries';
import { UPDATE_USER } from '../../../apollo/mutations';

export default class User extends Component {
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

    console.log(this.props);

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>User Detail</h3>
        <Query query={USER_QUERY} variables={{ id }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.user) {
              const {
                netId,
                idNumber,
                firstName,
                lastName,
                // admin,
                // active,
              } = data.user;

              if (showEditMode) {
                return (
                  <Mutation mutation={UPDATE_USER}>
                    {(updateUser, { loading: updating, error }) => {
                      if (updating) {
                        return <CircularProgress />;
                      }

                      return (
                        <UserForm
                          submit={updateUser}
                          error={error}
                          user={data.user}
                          close={this.toggleEditMode}
                        />
                      );
                    }}
                  </Mutation>
                );
              }

              return (
                <Fragment>
                  <p>
                    <strong>NetID:</strong> {netId}
                  </p>
                  <p>
                    <strong>ID Number:</strong> {idNumber}
                  </p>
                  <p>
                    <strong>First Name:</strong> {firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {lastName}
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

User.propTypes = {
  id: PropTypes.string.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};
