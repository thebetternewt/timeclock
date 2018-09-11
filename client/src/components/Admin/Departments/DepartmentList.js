import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { DEPARTMENTS_QUERY } from '../../../apollo/queries';

import {
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  selected: {
    backgroundColor: 'green'
  }
};

class DepartmentList extends Component {
  state = {
    selectedId: ''
  };

  handleRowSelect = id => {
    this.setState({ selectedId: id });
  };

  render() {
    const { selectDepartment } = this.props;
    const { selectedId } = this.state;

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
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Representative</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {departments.map(dept => {
                        return (
                          <TableRow
                            hover
                            key={dept.id}
                            selected={dept.id === selectedId}
                            onClick={() => {
                              this.handleRowSelect(dept.id);
                              selectDepartment(dept);
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {dept.name}
                            </TableCell>
                            <TableCell>{dept.representativeId}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
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
  selectDepartment: PropTypes.func.isRequired
};

export default withStyles(styles)(DepartmentList);
