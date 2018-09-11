import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';

const DepartmentSelect = props => {
  const { handleSelect, selectedDepartmentId, departments } = props;

  const departmentMenuItems = departments.map(dept => (
    <MenuItem key={dept.id} value={dept.id}>
      {dept.name}
    </MenuItem>
  ));

  return (
    <FormControl required>
      <InputLabel htmlFor="age-required">Department</InputLabel>
      <Select
        value={selectedDepartmentId}
        onChange={handleSelect}
        name="department"
        inputProps={{
          id: 'department-required'
        }}
        displayEmpty
        style={{ width: 300 }}
      >
        <MenuItem value="" disabled>
          Department
        </MenuItem>
        {departmentMenuItems}
      </Select>
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
};

DepartmentSelect.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default DepartmentSelect;
