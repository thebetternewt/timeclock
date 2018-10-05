import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CircularProgress, Button } from '@material-ui/core';
import { CURRENT_USER_QUERY } from '../../../apollo/queries';

import UserList from './UserList';
import AddUser from './AddUser';
import User from './User';
import Punches from '../Punches';

export default class Users extends Component {
  state = {
    showAddUser: false,
    showUser: false,
    selectedUserId: null,
  };

  showAddUser = () => {
    this.setState({ showAddUser: true, showUser: false });
  };

  hideAddUser = () => {
    this.setState({ showAddUser: false });
  };

  showUser = id => {
    this.setState({
      selectedUserId: id,
      showUser: true,
      showAddUser: false,
    });
  };

  hideUser = () => {
    this.setState({
      showUser: false,
    });
  };

  hideForms = () => {
    this.setState({
      showAddUser: false,
      showUser: false,
    });
  };

  render() {
    const { showAddUser, showUser, selectedUserId } = this.state;

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

                    {showUser && (
                      <Fragment>
                        <User id={selectedUserId} cancelEdit={this.hideUser} />
                        <Punches userId={selectedUserId} />
                      </Fragment>
                    )}
                    {!(showAddUser || showUser) && (
                      <UserList selectUser={this.showUser} />
                    )}
                    {showAddUser && <AddUser cancelAdd={this.hideAddUser} />}
                    {!(showAddUser || showUser) && (
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
              }
              return <Redirect to="/dashboard" />;
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}
