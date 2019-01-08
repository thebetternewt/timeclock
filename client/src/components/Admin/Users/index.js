import React, { Component } from 'react'
import UserList from './UserList'
import AddUser from './AddUser'
import User from './User'
import Punches from '../Punches'

export default class Users extends Component {
  state = {
    showUser: false,
    selectedUserId: null,
  }

  showUser = id => {
    this.setState({
      selectedUserId: id,
      showUser: true,
    })
  }

  hideUser = () => {
    this.setState({
      showUser: false,
    })
  }

  render() {
    const { showUser, selectedUserId } = this.state

    return (
      <>
        <h2>Manage Users</h2>

        {showUser ? (
          <>
            <User id={selectedUserId} close={this.hideUser} isOpen={showUser} />
            <Punches userId={selectedUserId} />
          </>
        ) : (
          <>
            <AddUser />
            <UserList selectUser={this.showUser} />
          </>
        )}
      </>
    )
  }
}
