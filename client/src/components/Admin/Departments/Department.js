import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import DepartmentForm from './DepartmentForm';
import { DEPARTMENT_QUERY } from '../../../apollo/queries';
import { UPDATE_DEPARTMENT } from '../../../apollo/mutations';

export default class Department extends Component {
  state = {
    id: this.props.id, // eslint-disable-line react/destructuring-assignment
    showEditMode: false,
  };

  toggleEditMode = () => {
    const { showEditMode } = this.state;
    this.setState({ showEditMode: !showEditMode });
  };

  render() {
    const { id, showEditMode } = this.state;
    const { cancelEdit } = this.props;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Department Details</h3>
        <Query query={DEPARTMENT_QUERY} variables={{ id }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.department) {
              const { name, representativeId } = data.department;

              if (showEditMode) {
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
                  >
                    Edit
                  </Button>
                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={cancelEdit}
                  >
                    Close
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
  id: PropTypes.string.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};
