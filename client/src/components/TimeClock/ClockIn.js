import React, { Component, Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Button, CircularProgress } from '@material-ui/core';
import moment from 'moment';

import { CURRENT_USER_QUERY, LAST_PUNCH_QUERY } from '../../apollo/queries';
import { CLOCK_IN } from '../../apollo/mutations';
import DepartmentSelect from '../common/DepartmentSelect';

class ClockIn extends Component {
  state = {
    selectedDepartmentId: ''
  };

  handleDepartmentSelect = e => {
    this.setState({ selectedDepartmentId: e.target.value });
  };

  render() {
    const { toggleClockingIn } = this.props;
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
        <Mutation
          mutation={CLOCK_IN}
          update={(cache, { data: { clockIn } }) => {
            cache.writeQuery({
              query: LAST_PUNCH_QUERY,
              data: { lastPunch: clockIn }
            });
          }}
        >
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
                  <Query query={CURRENT_USER_QUERY}>
                    {({ data }) => {
                      if (data) {
                        return (
                          <DepartmentSelect
                            departments={data.me.departments}
                            handleSelect={this.handleDepartmentSelect}
                            selectedDepartmentId={selectedDepartmentId}
                          />
                        );
                      }

                      return null;
                    }}
                  </Query>
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
