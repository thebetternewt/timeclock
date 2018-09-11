import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { PUNCHES_QUERY } from '../../../apollo/queries';
import moment from 'moment';

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CircleLoader from '../../common/CircleLoader';

const styles = {
  selected: {
    backgroundColor: 'green'
  }
};

class PunchList extends Component {
  state = {
    selectedId: ''
  };

  handleRowSelect = id => {
    this.setState({ selectedId: id });
  };

  render() {
    console.log(this.props);
    const { selectPunch, user } = this.props;
    const { selectedId } = this.state;

    return (
      <div>
        <Query query={PUNCHES_QUERY} variables={{ userId: user.id }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircleLoader />;
            }

            if (data) {
              const { punches } = data;
              console.log(punches);
              return (
                <div>
                  <p>Click on a punch to view or edit.</p>
                  <Paper
                    elevation={12}
                    style={{ margin: '2rem 0', padding: 15 }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Clock In</TableCell>
                          <TableCell>Clock Out</TableCell>
                          <TableCell>Hours Elapsed</TableCell>
                          <TableCell>Department</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {punches.map(punch => {
                          return (
                            <TableRow
                              hover
                              key={punch.id}
                              selected={punch.id === selectedId}
                              onClick={() => {
                                this.handleRowSelect(punch.id);
                                selectPunch(punch);
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {moment(punch.clockInMsTime, 'x').format(
                                  'YYYY-MM-DD h:mm a'
                                )}
                              </TableCell>
                              <TableCell>
                                {moment(punch.clockOutMsTime, 'x').format(
                                  'YYYY-MM-DD h:mm a'
                                )}
                              </TableCell>
                              <TableCell>
                                {moment
                                  .duration(
                                    punch.clockOutMsTime - punch.clockInMsTime
                                  )
                                  .asHours()
                                  .toFixed(2)}
                              </TableCell>
                              <TableCell>{punch.department.name}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              );
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}

PunchList.defaultProps = {
  user: null
};

PunchList.propTypes = {
  selectPunch: PropTypes.func.isRequired,
  user: PropTypes.shape()
};

export default withStyles(styles)(PunchList);
