import React, { Component } from 'react';
import { LAST_PUNCH_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import Button from '@material-ui/core/Button';

import moment from 'moment';

import Timer from './Timer';

export default class TimeClock extends Component {
  render() {
    return (
      <div>
        <Query query={LAST_PUNCH_QUERY}>
          {({ loading, data }) => {
            if (loading) {
              return <span>Loading...</span>;
            }

            if (data && data.lastPunch) {
              const { clockInMsTime } = data.lastPunch;
              const clockInMoment = moment(clockInMsTime, 'x');

              return (
                <div>
                  <h3>Last Clock In:</h3>
                  <p>{clockInMoment.format('YYYY-MM-DD HH:MM:SS')}</p>
                  <h3>Time Elapsed since clock in:</h3>
                  <Timer startTime={clockInMoment} />
                </div>
              );
            }

            return <span>Nothing.</span>;
          }}
        </Query>
        <Button variant="contained" color="primary">
          Clock In
        </Button>
      </div>
    );
  }
}
