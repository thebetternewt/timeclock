import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PayPeriodForm from './PayPeriodForm';
import { PAY_PERIOD_QUERY } from '../../../apollo/queries';
import { UPDATE_PAY_PERIOD } from '../../../apollo/mutations';

const styles = theme => ({
  Paper: {
    padding: theme.spacing.unit * 3,
  },
  Button: {
    marginRight: theme.spacing.unit * 2,
  },
});

class PayPeriod extends Component {
  state = {
    id: this.props.id,
    editMode: false,
  };

  toggleEditMode = () => {
    this.setState(({ editMode }) => ({ editMode: !editMode }));
  };

  render() {
    const { id, editMode } = this.state;
    const { classes, cancelEdit } = this.props;

    return (
      <Paper elevation={12} className={classes.Paper}>
        <h3>Pay Period Details</h3>
        <Query query={PAY_PERIOD_QUERY} variables={{ id }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.payPeriod) {
              const {
                startDate,
                endDate,
                payPeriodId,
                fiscalYear,
              } = data.payPeriod;

              if (editMode) {
                return (
                  <Mutation mutation={UPDATE_PAY_PERIOD}>
                    {(updatePayPeriod, { loading: updating, error }) => {
                      if (updating) {
                        return <CircularProgress />;
                      }

                      return (
                        <PayPeriodForm
                          submit={updatePayPeriod}
                          error={error}
                          payPeriod={data.payPeriod}
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
                    <strong>Start Date:</strong> {startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {endDate}
                  </p>
                  <p>
                    <strong>Pay Period Id:</strong> {payPeriodId}
                  </p>
                  <p>
                    <strong>FiscalYear:</strong> {fiscalYear}
                  </p>

                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.toggleEditMode}
                    className={classes.Button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="raised"
                    onClick={cancelEdit}
                    className={classes.Button}
                  >
                    Back
                  </Button>
                </Fragment>
              );
            }

            return <p>PayPeriod not found.</p>;
          }}
        </Query>
      </Paper>
    );
  }
}

PayPeriod.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default withStyles(styles)(PayPeriod);
