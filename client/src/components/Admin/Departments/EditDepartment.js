import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DepartmentForm from './DepartmentForm';
import { Mutation } from 'react-apollo';
import { UPDATE_DEPARTMENT } from '../../../apollo/mutations';

import { Paper, CircularProgress } from '@material-ui/core';

export default class EditDepartment extends Component {
  static getDerivedStateFromProps(nextProps) {
    console.log('[nextProps from Update]:', nextProps);
    return { department: nextProps.department };
  }

  state = {
    department: this.props
  };

  render() {
    const { department } = this.state;
    const { cancelEdit } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Edit Department</h3>
        <Mutation mutation={UPDATE_DEPARTMENT}>
          {(updateDepartment, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data) {
              console.log('data:', data);
            }

            return (
              <DepartmentForm
                submit={updateDepartment}
                error={error}
                department={department}
                close={cancelEdit}
              />
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}

EditDepartment.propTypes = {
  department: PropTypes.shape().isRequired,
  cancelEdit: PropTypes.func.isRequired
};
