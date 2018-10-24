import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@material-ui/core';
import UserForm from './UserForm';
import { ADD_USER } from '../../../apollo/mutations';

class AddUser extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen, // eslint-disable-line
    }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleToggle}>
          Add User
        </Button>
        <Dialog
          open={isOpen}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Add User</DialogTitle>
          <DialogContent>
            <Mutation mutation={ADD_USER}>
              {(addUser, { loading, error }) => {
                if (loading) {
                  return <CircularProgress />;
                }

                return (
                  <UserForm
                    submit={addUser}
                    error={error}
                    close={this.handleToggle}
                  />
                );
              }}
            </Mutation>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default AddUser;
