import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import {
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import DepartmentForm from './DepartmentForm';
import { ADD_DEPARTMENT } from '../../../apollo/mutations';

class AddDepartment extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () =>
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen, // eslint-disable-line
    }));

  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleToggle}>
          Add Department
        </Button>
        <Dialog
          open={isOpen}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Add Department</DialogTitle>
          <DialogContent>
            <Mutation mutation={ADD_DEPARTMENT}>
              {(addDepartment, { loading, error }) => {
                if (loading) {
                  return <CircularProgress />;
                }

                return (
                  <DepartmentForm
                    submit={addDepartment}
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

export default AddDepartment;
