import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  FormControl: {
    margin: `${theme.spacing.unit}px 0`,
  },
  Button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
});

class DepartmentForm extends Component {
  state = this.getInitState();

  getInitState() {
    const { department } = this.props;

    return (
      department || {
        name: '',
        representativeId: '',
      }
    );
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  // state = {
  //   id: this.props.department.id || '',
  //   name: this.props.department.name || '',
  //   representativeId: this.props.department.representativeId || '',
  // };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id, name, representativeId } = this.state;
    const { classes, submit, close, error } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit({
            variables: {
              id,
              name,
              representativeId,
            },
            refetchQueries: ['DepartmentsQuery'],
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error:{' '}
            {error.graphQLErrors.map(({ message }) => (
              <span key={message}>{message}</span>
            ))}
          </pre>
        )}
        <FormControl required fullWidth className={classes.FormControl}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            autoFocus
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl required fullWidth className={classes.FormControl}>
          <InputLabel htmlFor="representativeId">
            Representative NetID
          </InputLabel>
          <Input
            type="text"
            id="representativeId"
            name="representativeId"
            value={representativeId}
            onChange={this.handleInputChange}
          />
        </FormControl>

        <Button
          type="submit"
          variant="raised"
          color="primary"
          className={classes.Button}
        >
          Submit
        </Button>
        <Button variant="raised" onClick={close} className={classes.Button}>
          Cancel
        </Button>
      </form>
    );
  }
}

DepartmentForm.defaultProps = {
  department: null,
  error: null,
};

DepartmentForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  department: PropTypes.shape(),
  error: PropTypes.shape(),
};

export default withStyles(styles)(DepartmentForm);
