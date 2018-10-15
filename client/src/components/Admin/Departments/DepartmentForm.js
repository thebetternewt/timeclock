import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

export default class DepartmentForm extends Component {
  state = {
    id: this.props.department.id || '',
    name: this.props.department.name || '',
    representativeId: this.props.department.representativeId || '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id, name, representativeId } = this.state;
    const { submit, close, error } = this.props;

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
        <FormControl margin="normal" required fullWidth>
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
        <FormControl margin="normal" required fullWidth>
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

        <Button type="submit" variant="raised" color="primary">
          Submit
        </Button>
        <Button variant="raised" color="secondary" onClick={close}>
          Cancel
        </Button>
      </form>
    );
  }
}

DepartmentForm.defaultProps = {
  department: {},
  error: null,
};

DepartmentForm.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  department: PropTypes.shape(),
  error: PropTypes.shape(),
};
