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
    showEditUser: false,
    selectedUser: null
  };

  showAddUser = () => {
    this.setState({ showAddUser: true, showEditUser: false });
  };
  hideAddUser = () => {
    this.setState({ showAddUser: false });
  };

  showEditUser = user => {
    this.setState({
      selectedUser: user,
      showEditUser: true,
      showAddUser: false
    });
  };

  hideUpdateUser = user => {
    console.log('hiding update user...');
    this.setState({
      showEditUser: false
    });
  };

  render() {
    const { showAddUser, showEditUser, selectedUser } = this.state;

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

                    {showEditUser && (
                      <EditUser
                        user={selectedUser}
                        cancelUpdate={this.hideUpdateUser}
                      />
                    )}
                    {!showAddUser &&
                      !showEditUser && (
                        <UserList
                          selectUser={this.showEditUser}
                          cancelAdd={this.toggleShowAddUser}
                        />
                      )}
                    {showAddUser && <AddUser cancelAdd={this.hideAddUser} />}
                    {!showAddUser &&
                      !showEditUser && (
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
