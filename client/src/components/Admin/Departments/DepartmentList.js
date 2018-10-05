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
import { DEPARTMENTS_QUERY } from '../../../apollo/queries';

const styles = {
  selected: {
    backgroundColor: 'green',
  },
};

class DepartmentList extends Component {
  state = {
    selectedId: '',
    page: 0,
    rowsPerPage: 10,
  };

  handleRowSelect = id => {
    const { selectDepartment } = this.props;

    this.setState({ selectedId: id });
    selectDepartment(id);
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
        <p>Click on a department to view or edit.</p>

        <Query query={DEPARTMENTS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              const { departments } = data;
              return (
                <Paper elevation={12} style={{ margin: '2rem 0', padding: 15 }}>
                  {departments.length > 0 ? (
                    <div>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Representative</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {departments.map(dept => (
                            <TableRow
                              hover
                              key={dept.id}
                              selected={dept.id === selectedId}
                              onClick={() => {
                                this.handleRowSelect(dept.id);
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {dept.name}
                              </TableCell>
                              <TableCell>{dept.representativeId}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        component="div"
                        count={departments.length}
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
                    <p>Not departments yet!</p>
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

DepartmentList.propTypes = {
  selectDepartment: PropTypes.func.isRequired,
};

export default withStyles(styles)(DepartmentList);
