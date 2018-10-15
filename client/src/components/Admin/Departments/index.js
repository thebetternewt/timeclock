import React, { Component, Fragment } from 'react';

import DepartmentList from './DepartmentList';
import AddDepartment from './AddDepartment';
import Department from './Department';

export default class Departments extends Component {
  state = {
    showDepartment: false,
    selectedDepartmentId: null,
  };

  showDepartment = id => {
    this.setState({
      selectedDepartmentId: id,
      showDepartment: true,
    });
  };

  hideDepartment = () => {
    this.setState({
      showDepartment: false,
    });
  };

  render() {
    const { showDepartment, selectedDepartmentId } = this.state;

    return (
      <Fragment>
        <h2>Manage Departments</h2>
        {showDepartment ? (
          <Department
            id={selectedDepartmentId}
            cancelEdit={this.hideDepartment}
          />
        ) : (
          <Fragment>
            <AddDepartment cancelAdd={this.hideAddDepartment} />
            <DepartmentList selectDepartment={this.showDepartment} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
