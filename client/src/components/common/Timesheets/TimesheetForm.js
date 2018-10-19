import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DEPARTMENTS_QUERY } from '../../../apollo/queries';
import DepartmentSelect from '../DepartmentSelect';

const styles = theme => ({
  Form: {
    maxWidth: 300,
  },
  FormControl: {
    margin: `${theme.spacing.unit}px 0`,
  },
  Button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
});

const TimesheetForm = props => {
  // Generate pay period menu items for periods 1-24
  const payPeriodIdMenuItems = () =>
    Array.from(Array(24), (_, i) => (
      <MenuItem key={i + 1} value={i + 1}>
        {i + 1}
      </MenuItem>
    ));

  const {
    classes,
    payPeriodId,
    fiscalYear,
    onSelect,
    onChange,
    onSubmit,
    error,
  } = props;

  return (
    <form className={classes.Form}>
      {error && (
        <pre style={{ margin: '1rem', color: 'red' }}>
          Error:{' '}
          {error.graphQLErrors.map(({ message }) => (
            <span key={message}>{message}</span>
          ))}
        </pre>
      )}
      <Query query={DEPARTMENTS_QUERY}>
        {({ data, loading }) => {
          if (loading) {
            return <span>Loading departments...</span>;
          }
          if (data && data.departments) {
            return (
              <DepartmentSelect
                departments={data.departments}
                classes={classes.FormControl}
              />
            );
          }

          return null;
        }}
      </Query>
      <FormControl className={classes.FormControl} fullWidth>
        <InputLabel htmlFor="age-helper">Pay Period</InputLabel>
        <Select
          value={payPeriodId}
          name="payPeriodId"
          onChange={onSelect}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {payPeriodIdMenuItems()}
        </Select>
        <FormHelperText>e.g. &quot;13&quot;</FormHelperText>
      </FormControl>

      <TextField
        label="Fiscal Year"
        className={classes.FormControl}
        value={fiscalYear}
        onChange={onChange}
        fullWidth
        helperText="e.g. &quot;2019&quot;"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.Button}
        onClick={onSubmit}
      >
        Build Timesheet
      </Button>
    </form>
  );
};

TimesheetForm.defaultProps = {
  error: null,
};

TimesheetForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  payPeriodId: PropTypes.number.isRequired,
  fiscalYear: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape(),
};

export default withStyles(styles)(TimesheetForm);
