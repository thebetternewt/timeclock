import React, { Component } from 'react';
import { LAST_PUNCH_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import Button from '@material-ui/core/Button';

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
              console.log(data);
              return <div>{data.lastPunch.id}</div>;
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
