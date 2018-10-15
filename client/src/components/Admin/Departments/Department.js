import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DepartmentForm from './DepartmentForm';
import { DEPARTMENT_QUERY } from '../../../apollo/queries';
import { UPDATE_DEPARTMENT } from '../../../apollo/mutations';

const styles = theme => ({
  Paper: {
    padding: theme.spacing.unit * 3,
  },
  Button: {
    marginRight: theme.spacing.unit * 2,
  },
});

class Department extends Component {
  state = {
    id: this.props.id,
    editMode: false,
  };

  toggleEditMode = () => {
    this.setState(({ editMode }) => ({ editMode: !editMode }));
  };

  render() {
    const { id, editMode } = this.state;
    const { classes, cancelEdit } = this.props;

    return (
      <Paper elevation={12} className={classes.Paper}>
        <h3>Department Details</h3>
        <Query query={DEPARTMENT_QUERY} variables={{ id }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.department) {
              const { name, representativeId } = data.department;

              if (editMode) {
                return (
                  <Mutation mutation={UPDATE_DEPARTMENT}>
                    {(updateDepartment, { loading: updating, error }) => {
                      if (updating) {
                        return <CircularProgress />;
                      }

                      return (
                        <DepartmentForm
                          submit={updateDepartment}
                          error={error}
                          department={data.department}
                          close={this.toggleEditMode}
                        />
                      );
                    }}
                  </Mutation>
                );
              }
              return (
                <Fragment>
                  <p>
                    <strong>Name:</strong> {name}
                  </p>
                  <p>
                    <strong>Representative Id:</strong> {representativeId}
                  </p>

                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.toggleEditMode}
                    className={classes.Button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="raised"
                    onClick={cancelEdit}
                    className={classes.Button}
                  >
                    Back
                  </Button>
                </Fragment>
              );
            }

            return <p>Department not found.</p>;
          }}
        </Query>
      </Paper>
    );
  }
}

Department.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default withStyles(styles)(Department);
