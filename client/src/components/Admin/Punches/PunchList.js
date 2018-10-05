import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import moment from 'moment';

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PUNCHES_QUERY } from '../../../apollo/queries';
import CircleLoader from '../../common/CircleLoader';

const styles = {
  selected: {
    backgroundColor: 'green',
  },
};

class PunchList extends Component {
  state = {
    selectedId: '',
    page: 0,
    rowsPerPage: 10,
  };

  handleRowSelect = id => {
    const { selectPunch } = this.props;
    this.setState({ selectedId: id });
    selectPunch(id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { userId } = this.props;
    const { selectedId, page, rowsPerPage } = this.state;

    return (
      <div>
        <Query query={PUNCHES_QUERY} variables={{ userId }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircleLoader />;
            }

            if (data) {
              const { punches } = data;

              return (
                <div>
                  <p>Click on a punch to view or edit.</p>
                  <Paper
                    elevation={12}
                    style={{ margin: '2rem 0', padding: 15 }}
                  >
                    {punches.length > 0 ? (
                      <div>
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
                            {punches
                              .filter(punch => punch.clockOutMsTime !== null)
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map(punch => (
                                <TableRow
                                  hover
                                  key={punch.id}
                                  selected={punch.id === selectedId}
                                  onClick={() => {
                                    this.handleRowSelect(punch.id);
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {moment(punch.clockInMsTime, 'x').format(
                                      'YYYY-MM-DD h:mma'
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {moment(punch.clockOutMsTime, 'x').format(
                                      'YYYY-MM-DD h:mma'
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {moment
                                      .duration(
                                        punch.clockOutMsTime -
                                          punch.clockInMsTime
                                      )
                                      .asHours()
                                      .toFixed(2)}
                                  </TableCell>
                                  <TableCell>{punch.department.name}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                        <TablePagination
                          component="div"
                          count={punches.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          backIconButtonProps={{
                            'aria-label': 'Previous Page',
                          }}
                          nextIconButtonProps={{
                            'aria-label': 'Next Page',
                          }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                      </div>
                    ) : (
                      <p>No punches yet!</p>
                    )}
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

PunchList.propTypes = {
  selectPunch: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(PunchList);
