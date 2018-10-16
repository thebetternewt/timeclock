import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import {
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PAY_PERIODS_QUERY } from '../../../apollo/queries';

const styles = {
  selected: {
    backgroundColor: 'green',
  },
};

class PayPeriodList extends Component {
  state = {
    selectedId: '',
    page: 0,
    rowsPerPage: 10,
  };

  handleRowSelect = id => {
    const { selectPayPeriod } = this.props;

    this.setState({ selectedId: id });
    selectPayPeriod(id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { selectedId, page, rowsPerPage } = this.state;

    return (
      <div>
        <p>Click on a pay period to view or edit.</p>

        <Query query={PAY_PERIODS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              const { payPeriods } = data;
              return (
                <Paper elevation={12} style={{ margin: '2rem 0', padding: 15 }}>
                  {payPeriods.length > 0 ? (
                    <div>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Pay Period ID</TableCell>
                            <TableCell>Fiscal Year</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {payPeriods.map(pp => (
                            <TableRow
                              hover
                              key={pp.id}
                              selected={pp.id === selectedId}
                              onClick={() => {
                                this.handleRowSelect(pp.id);
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {pp.startDate}
                              </TableCell>
                              <TableCell>{pp.endDate}</TableCell>
                              <TableCell>{pp.payPeriodId}</TableCell>
                              <TableCell>{pp.fiscalYear}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        component="div"
                        count={payPeriods.length}
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
                    <p>Not pay periods yet!</p>
                  )}
                </Paper>
              );
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}

PayPeriodList.propTypes = {
  selectPayPeriod: PropTypes.func.isRequired,
};

export default withStyles(styles)(PayPeriodList);
