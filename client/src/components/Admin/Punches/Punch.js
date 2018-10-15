import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Query, Mutation } from 'react-apollo';
import {
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PunchForm from './PunchForm';
import { UPDATE_PUNCH } from '../../../apollo/mutations';
import { PUNCH_QUERY } from '../../../apollo/queries';

const styles = theme => ({
  Button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
});

class Punch extends Component {
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
    const { classes, close, isOpen } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleToggle}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">
          {editMode ? 'Edit Punch' : 'Punch Details'}
        </DialogTitle>
        <DialogContent>
          <Query query={PUNCH_QUERY} variables={{ id }}>
            {({ data, loading }) => {
              if (loading) {
                return <CircularProgress />;
              }

              if (data && data.punch) {
                const {
                  clockInMsTime,
                  clockOutMsTime,
                  department: { name: deptName },
                  user,
                } = data.punch;

                if (editMode) {
                  return (
                    <Mutation mutation={UPDATE_PUNCH}>
                      {(updatePunch, { loading: updating, error }) => {
                        if (updating) {
                          return <CircularProgress />;
                        }

                        return (
                          <PunchForm
                            user={user}
                            submit={updatePunch}
                            error={error}
                            punch={data.punch}
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
                      <strong>Clock In:</strong>{' '}
                      {moment(clockInMsTime, 'x').format('YYYY-MM-DD h:mm A')}
                    </p>
                    <p>
                      <strong>Clock Out:</strong>{' '}
                      {moment(clockOutMsTime, 'x').format('YYYY-MM-DD h:mm A')}
                    </p>
                    <p>
                      <strong>Department:</strong> {deptName}
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
                  </Fragment>
                );
              }

              return <p>Punch not found.</p>;
            }}
          </Query>
        </DialogContent>
      </Dialog>
    );
  }
}

Punch.propTypes = {
  classes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Punch);
