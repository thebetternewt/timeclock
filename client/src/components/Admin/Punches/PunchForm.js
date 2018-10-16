import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DateTimePicker } from 'material-ui-pickers';
import DepartmentSelect from '../../common/DepartmentSelect';

const styles = theme => ({
  FormControl: {
    margin: `${theme.spacing.unit}px 0`,
  },
  Button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
});

class PunchForm extends Component {
  state = this.getInitState();

  getInitState() {
    const { punch, user } = this.props;

    return (
      punch || {
        id: '',
        clockInMsTime: null,
        clockOutMsTime: null,
        departmentId: '',
        user,
      }
    );
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  // DateTime picker returns a moment object
  // Docs: https://material-ui-pickers.firebaseapp.com/
  // Convert datetime to msTime format
  handleClockInTimeChange = date => {
    console.log(date);
    this.setState({ clockInMsTime: date.format('x') });
  };

  // DateTime picker returns a moment object
  // Convert datetime to msTime format
  handleClockOutTimeChange = date => {
    console.log(date);
    this.setState({ clockOutMsTime: date.format('x') });
  };

  handleDepartmentSelect = e => this.setState({ departmentId: e.target.value });

  // Convert msTime to format for datetime picker
  toInputTime = msTime => moment(msTime, 'x').format('YYYY-MM-DDTHH:mm');

  render() {
    const {
      id,
      user,
      clockInMsTime,
      clockOutMsTime,
      departmentId,
    } = this.state;

    const { classes, submit, close, error } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit({
            variables: {
              id,
              userId: user.id,
              clockInMsTime,
              clockOutMsTime,
              departmentId,
            },
            refetchQueries: ['PunchesQuery'],
          })
            .then(() => close())
            .catch(console.error);
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

        <DateTimePicker
          name="clockInMsTime"
          value={moment(clockInMsTime, 'x')}
          onChange={this.handleClockInTimeChange}
          label="Clock-in Time"
          showTodayButton
          fullWidth
          allowKeyboardControl
          autoSubmit={false}
          invalidLabel="Choose DateTime"
        />

        <DateTimePicker
          name="clockOutMsTime"
          value={moment(clockOutMsTime, 'x')}
          onChange={this.handleClockOutTimeChange}
          label="Clock-out Time"
          showTodayButton
          fullWidth
          allowKeyboardControl
          autoSubmit={false}
          invalidLabel="Choose DateTime"
        />

        <DepartmentSelect
          departments={user.departments}
          handleSelect={this.handleDepartmentSelect}
          selectedDepartmentId={departmentId}
          className={classes.FormControl}
        />

        <Button
          type="submit"
          variant="raised"
          color="primary"
          className={classes.Button}
        >
          Submit
        </Button>

        <Button
          type="button"
          variant="raised"
          onClick={close}
          className={classes.Button}
        >
          Cancel
        </Button>
      </form>
    );
  }
}

PunchForm.defaultProps = {
  punch: null,
  error: null,
};

PunchForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  punch: PropTypes.shape(),
  error: PropTypes.shape(),
};

export default withStyles(styles)(PunchForm);
