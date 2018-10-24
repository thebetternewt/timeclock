import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import {
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import PunchForm from './PunchForm';
import { ADD_PUNCH } from '../../../apollo/mutations';

class AddPunch extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () =>
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen, // eslint-disable-line
    }));

  render() {
    const { isOpen } = this.state;
    const { user } = this.props;

    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleToggle}>
          Add Punch
        </Button>
        <Dialog
          open={isOpen}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Add Punch</DialogTitle>
          <DialogContent>
            <Mutation mutation={ADD_PUNCH}>
              {(addPunch, { loading, error }) => {
                if (loading) {
                  return <CircularProgress />;
                }

                return (
                  <PunchForm
                    submit={addPunch}
                    error={error}
                    close={this.handleToggle}
                    user={user}
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

AddPunch.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default AddPunch;
