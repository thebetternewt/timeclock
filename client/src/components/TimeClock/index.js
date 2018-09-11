import React, { Component } from 'react';
import { LAST_PUNCH_QUERY } from '../../apollo/queries';
import { Query } from 'react-apollo';

import ClockIn from './ClockIn';
import ClockOut from './ClockOut';

export default class TimeClock extends Component {
  render() {
    return (
      <div>
        <Query query={LAST_PUNCH_QUERY}>
          {({ loading, data }) => {
            if (loading) {
              return <span>Loading...</span>;
            }

            if (data) {
              const { lastPunch } = data;
              console.log('lastPunch', lastPunch);

              return (
                <div>
                  {!lastPunch || lastPunch.clockOutMsTime ? (
                    <ClockIn lastPunch={lastPunch} />
                  ) : (
                    <ClockOut lastPunch={lastPunch} />
                  )}
                </div>
              );
            }

            return <span>No punch found.</span>;
          }}
        </Query>
        <br />
      </div>
    );
  }
}
