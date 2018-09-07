import React, { Component } from 'react';

import UserForm from './UserForm';

export default class Users extends Component {
  render() {
    return (
      <div>
        <h2>Manage Users</h2>
        <UserForm />
      </div>
    );
  }
}
