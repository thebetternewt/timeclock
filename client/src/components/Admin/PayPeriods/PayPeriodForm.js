import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextField, Button } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  FormControl: {
    margin: `${theme.spacing.unit}px 0`,
  },
  Button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
});

class PayPeriodForm extends Component {
  state = this.getInitState();

  getInitState() {
    const { payPeriod } = this.props;

    return (
      payPeriod || {
        startDate: null,
        endDate: null,
        payPeriodId: '',
        fiscalYear: '',
      }
    );
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  // DateTime picker returns a moment object
  // Docs: https://material-ui-pickers.firebaseapp.com/
  // Convert date to string format
  handleStartDateChange = date =>
    this.setState({ startDate: date.format('YYYY-MM-DD') });

  // DateTime picker returns a moment object
  // Convert date to string format
  handleEndDateChange = date =>
    this.setState({ endDate: date.format('YYYY-MM-DD') });

  render() {
    const { id, startDate, endDate, payPeriodId, fiscalYear } = this.state;
    const { classes, submit, close, error } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit({
            variables: {
              id,
              startDate,
              endDate,
              payPeriodId,
              fiscalYear,
            },
            refetchQueries: ['PayPeriodsQuery'],
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error:{' '}
            {error.graphQLErrors.map(({ message }) => (
              <span key={message}>{message}</span>
            ))}
          </pre>
        )}

        <DatePicker
          name="startDate"
          value={moment(startDate, 'YYYY-MM-DD')}
          onChange={this.handleStartDateChange}
          label="Start Date"
          fullWidth
          allowKeyboardControl
          invalidLabel="Choose Date"
          format="MMM Do, YYYY"
          className={classes.FormControl}
        />

        <DatePicker
          name="endDate"
          value={moment(endDate, 'YYYY-MM-DD')}
          onChange={this.handleEndDateChange}
          label="End Date"
          fullWidth
          allowKeyboardControl
          invalidLabel="Choose Date"
          format="MMM Do, YYYY"
          className={classes.FormControl}
        />

        <TextField
          required
          fullWidth
          className={classes.FormControl}
          type="number"
          name="payPeriodId"
          label="Pay Period ID"
          value={payPeriodId}
          onChange={this.handleInputChange}
          helperText="e.g. '13'"
        />

        <TextField
          required
          fullWidth
          className={classes.FormControl}
          type="number"
          name="fiscalYear"
          label="Fiscal Year"
          value={fiscalYear}
          onChange={this.handleInputChange}
          helperText="e.g. '2019'"
        />

        <Button
          type="submit"
          variant="raised"
          color="primary"
          className={classes.Button}
        >
          Submit
        </Button>
        <Button variant="raised" onClick={close} className={classes.Button}>
          Cancel
        </Button>
      </form>
    );
  }
}

PayPeriodForm.defaultProps = {
  payPeriod: null,
  error: null,
};

PayPeriodForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  payPeriod: PropTypes.shape(),
  error: PropTypes.shape(),
};

export default withStyles(styles)(PayPeriodForm);
