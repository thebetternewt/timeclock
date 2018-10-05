import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

const DepartmentSelect = props => {
  const { handleSelect, selectedDepartmentId, departments } = props;

  const departmentMenuItems = departments.map(dept => (
    <MenuItem key={dept.id} value={dept.id}>
      {dept.name}
    </MenuItem>
  ));

  return (
    <FormControl fullWidth required style={{ padding: '1rem 0' }}>
      <InputLabel htmlFor="age-required">Department</InputLabel>
      <Select
        value={selectedDepartmentId}
        onChange={handleSelect}
        name="department"
        inputProps={{
          id: 'department-required',
        }}
        displayEmpty
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

DepartmentSelect.defaultProps = {
  selectedDepartmentId: '',
};

DepartmentSelect.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedDepartmentId: PropTypes.string,
};

export default DepartmentSelect;
