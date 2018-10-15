import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
        clockInMsTime: '',
        clockOutMsTime: '',
        departmentId: '',
        user,
      }
    );
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleDateTimeChange = ({ target: { name, value } }) => {
    // Convert time back to msTime format
    this.setState({ [name]: moment(value, 'YYYY-MM-DDTHH:mm').format('x') });
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

    console.log(this.props);

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

        <TextField
          id="clock-in-time"
          name="clockInMsTime"
          label="Clock-in Time"
          type="datetime-local"
          value={this.toInputTime(clockInMsTime)}
          onChange={this.handleDateTimeChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          className={classes.FormControl}
        />

        <TextField
          id="clock-out-time"
          name="clockOutMsTime"
          label="Clock-out Time"
          type="datetime-local"
          value={this.toInputTime(clockOutMsTime)}
          onChange={this.handleDateTimeChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          className={classes.FormControl}
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
