import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import DepartmentSelect from '../../common/DepartmentSelect';

export default class PunchForm extends Component {
  state = {
    id: this.props.punch.id || '',
    userId: this.props.punch.userId || this.props.user.id,
    clockInMsTime: this.props.punch.clockInMsTime || '',
    clockOutMsTime: this.props.punch.clockOutMsTime || '',
    departmentId: this.props.punch.departmentId || ''
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDepartmentSelect = e => {
    this.setState({ departmentId: e.target.value });
  };

  render() {
    const {
      id,
      userId,
      clockInMsTime,
      clockOutMsTime,
      departmentId
    } = this.state;
    const { submit, close, error, user } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit({
            variables: {
              id,
              userId,
              clockInMsTime,
              clockOutMsTime,
              departmentId
            },
            refetchQueries: ['PunchesQuery']
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error:{' '}
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </pre>
        )}
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="clockInMsTime">Clock In</InputLabel>
          <Input
            type="text"
            id="clockInMsTime"
            name="clockInMsTime"
            value={clockInMsTime}
            autoFocus
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="clockOutMsTime">Clock Out</InputLabel>
          <Input
            type="text"
            id="clockOutMsTime"
            name="clockOutMsTime"
            value={clockOutMsTime}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <DepartmentSelect
          departments={user.departments}
          handleSelect={this.handleDepartmentSelect}
          selectedDepartmentId={departmentId}
        />

        <Button type="submit" variant="raised" color="primary">
          Submit
        </Button>
        <Button variant="raised" color="secondary" onClick={close}>
          Cancel
        </Button>
      </form>
    );
  }
}

PunchForm.defaultProps = {
  punch: {},
  user: {}
};

PunchForm.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  punch: PropTypes.shape(),
  user: PropTypes.shape()
};
