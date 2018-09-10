import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../../apollo/queries';
import { CircularProgress, Button } from '@material-ui/core';

import DepartmentList from './DepartmentList';
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';

export default class Departments extends Component {
  state = {
    showAddDepartment: false,
    showEditDepartment: false,
    selectedDepartment: null
  };

  showAddDepartment = () => {
    this.setState({ showAddDepartment: true, showEditDepartment: false });
  };
  hideAddDepartment = () => {
    this.setState({ showAddDepartment: false });
  };

  showEditDepartment = department => {
    this.setState({
      selectedDepartment: department,
      showEditDepartment: true,
      showAddDepartment: false
    });
  };

  hideEditDepartment = department => {
    this.setState({
      showEditDepartment: false
    });
  };

  render() {
    const {
      showAddDepartment,
      showEditDepartment,
      selectedDepartment
    } = this.state;

    return (
      <div>
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress size={50} />;
            }

            if (data) {
              if (data.me && data.me.admin) {
                return (
                  <Fragment>
                    <h2>Manage Departments</h2>

                    {showEditDepartment && (
                      <EditDepartment
                        department={selectedDepartment}
                        cancelEdit={this.hideEditDepartment}
                      />
                    )}
                    {!showAddDepartment &&
                      !showEditDepartment && (
                        <DepartmentList
                          selectDepartment={this.showEditDepartment}
                          cancelAdd={this.showAddDepartment}
                        />
                      )}
                    {showAddDepartment && (
                      <AddDepartment cancelAdd={this.hideAddDepartment} />
                    )}
                    {!showAddDepartment &&
                      !showEditDepartment && (
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={this.showAddDepartment}
                        >
                          Add New Department
                        </Button>
                      )}
                  </Fragment>
                );
              } else {
                return <Redirect to="/dashboard" />;
              }
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}
