import React, { Component } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  CircularProgress
} from '@material-ui/core';

export default class UserForm extends Component {
  state = {
    netId: '',
    idNumber: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { netId, idNumber, password, firstName, lastName } = this.state;
    return (
      <form>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="netId">NetId</InputLabel>
          <Input
            type="text"
            id="netId"
            name="netId"
            value={netId}
            autoFocus
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={this.handleInputChange}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="raised" color="primary">
          Add User
        </Button>
      </form>
    );
  }
}
