import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import {
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserForm from './UserForm';
import { USER_QUERY } from '../../../apollo/queries';
import { UPDATE_USER } from '../../../apollo/mutations';

const styles = theme => ({
  Paper: {
    padding: theme.spacing.unit * 3,
  },
  Button: {
    marginRight: theme.spacing.unit * 2,
  },
});

class User extends Component {
  state = {
    id: this.props.id,
    editMode: false,
  };

  toggleEditMode = () => {
    this.setState(({ editMode }) => ({
      editMode: !editMode,
    }));
  };

  render() {
    const { id, editMode } = this.state;
    const { classes, close } = this.props;

    return (
      <Query query={USER_QUERY} variables={{ id }}>
        {({ data, loading }) => {
          if (loading) {
            return <CircularProgress />;
          }
          if (data && data.user) {
            const { netId, idNumber, firstName, lastName } = data.user;
            return (
              <Paper className={classes.Paper}>
                <p>
                  <strong>NetID:</strong> {netId}
                </p>
                <p>
                  <strong>ID Number:</strong> {idNumber}
                </p>
                <p>
                  <strong>First Name:</strong> {firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {lastName}
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
                  onClick={close}
                  className={classes.Button}
                >
                  Back
                </Button>
                <Dialog
                  open={editMode}
                  onClose={this.handleToggle}
                  aria-labelledby="form-dialog-title"
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
                  <DialogContent>
                    <Mutation mutation={UPDATE_USER}>
                      {(updateUser, { loading: updating, error }) => {
                        if (updating) {
                          return <CircularProgress />;
                        }

                        return (
                          <UserForm
                            submit={updateUser}
                            error={error}
                            user={data.user}
                            close={this.toggleEditMode}
                          />
                        );
                      }}
                    </Mutation>
                  </DialogContent>
                </Dialog>
              </Paper>
            );
          }

          return <p>Pilgrim not found.</p>;
        }}
      </Query>
    );
  }
}

User.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default withStyles(styles)(User);
