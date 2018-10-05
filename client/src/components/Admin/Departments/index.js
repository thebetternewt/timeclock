import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CircularProgress, Button } from '@material-ui/core';
import { CURRENT_USER_QUERY } from '../../../apollo/queries';

import DepartmentList from './DepartmentList';
import AddDepartment from './AddDepartment';
import Department from './Department';

export default class Departments extends Component {
  state = {
    showAddDepartment: false,
    showDepartment: false,
    selectedDepartmentId: null,
  };

  showAddDepartment = () => {
    this.setState({ showAddDepartment: true, showDepartment: false });
  };

  hideAddDepartment = () => {
    this.setState({ showAddDepartment: false });
  };

  showDepartment = id => {
    this.setState({
      selectedDepartmentId: id,
      showDepartment: true,
      showAddDepartment: false,
    });
  };

  hideDepartment = () => {
    this.setState({
      showDepartment: false,
    });
  };

  render() {
    const {
      showAddDepartment,
      showDepartment,
      selectedDepartmentId,
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

                    {showDepartment && (
                      <Department
                        id={selectedDepartmentId}
                        cancelEdit={this.hideDepartment}
                      />
                    )}
                    {!(showAddDepartment || showDepartment) && (
                      <DepartmentList selectDepartment={this.showDepartment} />
                    )}
                    {showAddDepartment && (
                      <AddDepartment cancelAdd={this.hideAddDepartment} />
                    )}
                    {!(showAddDepartment || showDepartment) && (
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
              }
              return <Redirect to="/dashboard" />;
            }

            return null;
          }}
        </Query>
      </div>
    );
  }
}
