import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  ListItemText
} from '@material-ui/core';

const DepartmentSelect = props => {
  const {
    handleSelect,
    selectedDepartmentId,
    selectedDepartmentIds,
    departments,
    multiple
  } = props;

  console.log('[departmentSelect props]:', props);

  const departmentMenuItems = departments.map(dept => (
    <MenuItem key={dept.id} value={dept.id}>
      {dept.name}
    </MenuItem>
  ));

  return (
    <FormControl required>
      <InputLabel htmlFor="age-required">Department</InputLabel>
      {multiple ? (
        <Select
          multiple
          value={selectedDepartmentIds}
          onChange={handleSelect}
          name="department"
          renderValue={selected => {
            // Filter out and join department names for selected departments
            return departments
              .filter(dept => selected.indexOf(dept.id) > -1)
              .map(dept => dept.name)
              .join(', ');
          }}
          displayEmpty
          style={{ width: 300 }}
        >
          <MenuItem value="" disabled>
            Department
          </MenuItem>
          {departments.map(dept => (
            <MenuItem key={dept.id} value={dept.id}>
              <Checkbox checked={selectedDepartmentIds.indexOf(dept.id) > -1} />
              <ListItemText primary={dept.name} />
            </MenuItem>
          ))}
        </Select>
      ) : (
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
      )}
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
};

DepartmentSelect.defaultProps = {
  selectedDepartmentId: '',
  selectedDepartmentIds: [],
  multiple: false
};

DepartmentSelect.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedDepartmentId: PropTypes.string,
  selectedDepartmentIds: PropTypes.arrayOf(PropTypes.string),
  multiple: PropTypes.bool
};

export default DepartmentSelect;
