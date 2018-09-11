import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { USERS_QUERY } from '../../../apollo/queries';

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
import CircleLoader from '../../common/CircleLoader';

const styles = {
  selected: {
    backgroundColor: 'green'
  }
};

class UserList extends Component {
  state = {
    selectedId: ''
  };

  handleRowSelect = id => {
    this.setState({ selectedId: id });
  };

  render() {
    const { selectUser } = this.props;
    const { selectedId } = this.state;

    return (
      <div>
        <Query query={USERS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircleLoader />;
            }

            if (data) {
              const { users } = data;
              return (
                <div>
                  <p>Click on a user to view or edit.</p>
                  <Paper
                    elevation={12}
                    style={{ margin: '2rem 0', padding: 15 }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>NetId</TableCell>
                          <TableCell numeric>First Name</TableCell>
                          <TableCell numeric>Last Name</TableCell>
                          <TableCell numeric>Admin</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map(user => {
                          return (
                            <TableRow
                              hover
                              key={user.id}
                              selected={user.id === selectedId}
                              onClick={() => {
                                this.handleRowSelect(user.id);
                                selectUser(user);
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {user.netId}
                              </TableCell>
                              <TableCell numeric>{user.firstName}</TableCell>
                              <TableCell numeric>{user.lastName}</TableCell>
                              <TableCell numeric>
                                {user.admin ? 'Y' : '--'}
                              </TableCell>
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

UserList.propTypes = {
  selectUser: PropTypes.func.isRequired
};

export default withStyles(styles)(UserList);