import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Button, CircularProgress } from '@material-ui/core';
import moment from 'moment';

import { CLOCK_IN_MUTATION } from '../../apollo/mutations';
import DepartmentSelect from './DepartmentSelect';

class ClockIn extends Component {
  state = {
    selectedDepartmentId: ''
  };

  handleDepartmentSelect = e => {
    this.setState({ selectedDepartmentId: e.target.value });
  };

  render() {
    const { selectedDepartmentId } = this.state;

    const { clockInMsTime, clockOutMsTime } = this.props.lastPunch;
    const department = this.props.lastPunch.department.name;
    const clockInMoment = moment(clockInMsTime, 'x');
    const clockOutMoment = moment(clockOutMsTime, 'x');

    return (
      <div>
        <h3>Last Shift:</h3>
        <p>
          {clockInMoment.format('YYYY-MM-DD hh:mm:ssa')} -{' '}
          {clockOutMoment.format('YYYY-MM-DD hh:mm:ssa')}
          <br />
          <strong>Department: </strong>
          {department}
        </p>
        <Mutation mutation={CLOCK_IN_MUTATION}>
          {(clockIn, { loading, error }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            return (
              <Fragment>
                {error && (
                  <pre>
                    Error:{' '}
                    {error.graphQLErrors.map(({ message }, i) => (
                      <span key={i}>{message}</span>
                    ))}
                  </pre>
                )}
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    clockIn({
                      variables: { departmentId: selectedDepartmentId }
                    }).catch(err => console.log(err.message));
                  }}
                >
                  <DepartmentSelect
                    handleSelect={this.handleDepartmentSelect}
                    selectedDepartmentId={selectedDepartmentId}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={selectedDepartmentId === ''}
                  >
                    Clock In
                  </Button>
                </form>
              </Fragment>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default ClockIn;
