import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Paper, CircularProgress } from '@material-ui/core';
import DepartmentForm from './DepartmentForm';
import { ADD_DEPARTMENT } from '../../../apollo/mutations';

const AddDepartment = props => {
  const { cancelAdd } = props;

  return (
    <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
      <h3>Add Department</h3>
      <Mutation mutation={ADD_DEPARTMENT}>
        {(addDepartment, { loading, error }) => {
          if (loading) {
            return <CircularProgress />;
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
};

AddDepartment.propTypes = {
  cancelAdd: PropTypes.func.isRequired,
};

export default AddDepartment;
