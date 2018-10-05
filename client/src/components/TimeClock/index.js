import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY, LAST_PUNCH_QUERY } from '../../apollo/queries';

import ClockIn from './ClockIn';
import ClockOut from './ClockOut';

const TimeClock = () => (
  <div>
    <Query query={CURRENT_USER_QUERY}>
      {({ loading, data }) => {
        if (loading) {
          return <span>Loading...</span>;
        }
        if (data && data.me) {
          return <h3>Welcome, {data.me.firstName}</h3>;
        }
        return null;
      }}
    </Query>
    <Query query={LAST_PUNCH_QUERY}>
      {({ loading, data }) => {
        if (loading) {
          return <span>Loading...</span>;
        }

        if (data) {
          const { lastPunch } = data;

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

export default TimeClock;
