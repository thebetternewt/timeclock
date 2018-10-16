import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import {
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import PayPeriodForm from './PayPeriodForm';
import { ADD_PAY_PERIOD } from '../../../apollo/mutations';

class AddPayPeriod extends Component {
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
        <Button variant="raised" color="primary" onClick={this.handleToggle}>
          Add Pay Period
        </Button>
        <Dialog
          open={isOpen}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Add Pay Period</DialogTitle>
          <DialogContent>
            <Mutation mutation={ADD_PAY_PERIOD}>
              {(addPayPeriod, { loading, error }) => {
                if (loading) {
                  return <CircularProgress />;
                }

                return (
                  <PayPeriodForm
                    submit={addPayPeriod}
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

export default AddPayPeriod;
