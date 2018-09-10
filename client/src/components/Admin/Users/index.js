import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../../apollo/queries';
import { CircularProgress, Button } from '@material-ui/core';

import UserList from './UserList';
import AddUser from './AddUser';
import EditUser from './EditUser';

export default class Users extends Component {
  state = {
    showAddUser: false,
    showUpdateUser: false,
    selectedUser: null
  };

  showAddUser = () => {
    this.setState({ showAddUser: true, showUpdateUser: false });
  };
  hideAddUser = () => {
    this.setState({ showAddUser: false });
  };

  showUpdateUser = user => {
    this.setState({
      selectedUser: user,
      showUpdateUser: true,
      showAddUser: false
    });
  };

  hideUpdateUser = user => {
    console.log('hiding update user...');
    this.setState({
      showUpdateUser: false
    });
  };

  render() {
    const { showAddUser, showUpdateUser, selectedUser } = this.state;

    return (
      <div>
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              if (data.me && data.me.admin) {
                return (
                  <Fragment>
                    <h2>Manage Users</h2>

                    {showUpdateUser && (
                      <EditUser
                        user={selectedUser}
                        cancelUpdate={this.hideUpdateUser}
                      />
                    )}
                    {!showAddUser &&
                      !showUpdateUser && (
                        <UserList
                          selectUser={this.showUpdateUser}
                          cancelAdd={this.toggleShowAddUser}
                        />
                      )}
                    {showAddUser ? (
                      <AddUser cancelAdd={this.hideAddUser} />
                    ) : (
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={this.showAddUser}
                      >
                        Add New User
                      </Button>
                    )}
                  </Fragment>
                );
              } else {
                return <Redirect to="/dashboard" />;
              }
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}
