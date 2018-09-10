import React, { Component } from 'react';
import DepartmentForm from './DepartmentForm';
import { Mutation } from 'react-apollo';
import { ADD_DEPARTMENT } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class AddDepartment extends Component {
  render() {
    const { cancelAdd } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Add Department</h3>
        <Mutation mutation={ADD_DEPARTMENT}>
          {(addDepartment, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log(data);
            }

            return (
              <DepartmentForm
                submit={addDepartment}
                error={error}
                close={cancelAdd}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}
