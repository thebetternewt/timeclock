import React, { Component } from 'react';
import MenuBar from './MenuBar';

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div style={{ minHeight: '100vh' }}>
        <MenuBar children={children} />
        {/* <h1>Hello</h1> */}
      </div>
    );
  }
}
