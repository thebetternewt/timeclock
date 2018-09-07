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

import { CURRENT_USER_QUERY } from '../../apollo/queries';

const DepartmentSelect = props => {
  const { handleSelect, selectedDepartmentId } = props;

  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ loading, data }) => {
        if (loading) {
          return <span>Loading...</span>;
        }

        if (data) {
          const { departments } = data.me;

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
        }

        return <span>Nothing.</span>;
      }}
    </Query>
  );
};

DepartmentSelect.propTypes = {
  handleSelect: PropTypes.func.isRequired
};

export default DepartmentSelect;
