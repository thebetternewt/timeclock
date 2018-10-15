import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  ListItemText,
} from '@material-ui/core';

const DepartmentSelect = props => {
  const {
    handleSelect,
    selectedDepartmentId,
    selectedDepartmentIds,
    departments,
    multiple,
    className,
  } = props;

  const departmentMenuItems = departments.map(dept => (
    <MenuItem key={dept.id} value={dept.id}>
      {dept.name}
    </MenuItem>
  ));

  return (
    <FormControl fullWidth required className={className}>
      <InputLabel shrink htmlFor="department">
        Department
      </InputLabel>
      {multiple ? (
        <Select
          multiple
          value={selectedDepartmentIds}
          onChange={handleSelect}
          name="department"
          renderValue={selected =>
            // Filter out and join department names for selected departments
            departments
              .filter(dept => selected.indexOf(dept.id) > -1)
              .map(dept => dept.name)
              .join(', ')
          }
          fullWidth
          displayEmpty
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
            id: 'department-required',
          }}
          fullWidth
          displayEmpty
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
  className: '',
  selectedDepartmentId: '',
  selectedDepartmentIds: [],
  multiple: false,
};

DepartmentSelect.propTypes = {
  className: PropTypes.string,
  handleSelect: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedDepartmentId: PropTypes.string,
  selectedDepartmentIds: PropTypes.arrayOf(PropTypes.string),
  multiple: PropTypes.bool,
};

export default DepartmentSelect;
