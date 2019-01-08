import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { USERS_QUERY } from '../../../apollo/queries'
import CircleLoader from '../../common/CircleLoader'

const styles = {
  selected: {
    backgroundColor: 'green',
  },
}

class UserList extends Component {
  state = {
    selectedId: '',
    page: 0,
    rowsPerPage: 10,
  }

  handleRowSelect = id => {
    const { selectUser } = this.props
    this.setState({ selectedId: id })
    selectUser(id)
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { selectedId, page, rowsPerPage } = this.state

    return (
      <div>
        <Query query={USERS_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircleLoader />
            }

            if (data) {
              const { users } = data
              return (
                <div>
                  <p>Click on a user to view or edit.</p>
                  <Paper
                    elevation={12}
                    style={{ margin: '2rem 0', padding: 15 }}
                  >
                    {users.length > 0 ? (
                      <div>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>NetId</TableCell>
                              <TableCell>First Name</TableCell>
                              <TableCell>Last Name</TableCell>
                              <TableCell>Admin</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users
                              .filter(user => user.active)
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map(user => (
                                <TableRow
                                  hover
                                  key={user.id}
                                  selected={user.id === selectedId}
                                  onClick={() => {
                                    this.handleRowSelect(user.id)
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {user.netId}
                                  </TableCell>
                                  <TableCell>{user.firstName}</TableCell>
                                  <TableCell>{user.lastName}</TableCell>
                                  <TableCell>
                                    {user.admin ? 'Y' : '--'}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                        <TablePagination
                          component="div"
                          count={users.length}
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
                      <p>No users yet!</p>
                    )}
                  </Paper>

                  {/* TODO: Extract users table into separate component to avoid duplication */}
                  <h4>Inactive Users</h4>
                  <Paper
                    elevation={12}
                    style={{ margin: '2rem 0', padding: 15 }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>NetId</TableCell>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Admin</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users
                          .filter(user => !user.active)
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map(user => (
                            <TableRow
                              hover
                              key={user.id}
                              selected={user.id === selectedId}
                              onClick={() => {
                                this.handleRowSelect(user.id)
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {user.netId}
                              </TableCell>
                              <TableCell>{user.firstName}</TableCell>
                              <TableCell>{user.lastName}</TableCell>
                              <TableCell>{user.admin ? 'Y' : '--'}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              )
            }

            return null
          }}
        </Query>
      </div>
    )
  }
}

UserList.propTypes = {
  selectUser: PropTypes.func.isRequired,
}

export default withStyles(styles)(UserList)
