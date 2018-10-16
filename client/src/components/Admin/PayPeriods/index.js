import React, { Component, Fragment } from 'react';

import PayPeriodList from './PayPeriodList';
import AddPayPeriod from './AddPayPeriod';
import PayPeriod from './PayPeriod';

export default class PayPeriods extends Component {
  state = {
    showPayPeriod: false,
    selectedPayPeriodId: null,
  };

  showPayPeriod = id => {
    this.setState({
      selectedPayPeriodId: id,
      showPayPeriod: true,
    });
  };

  hidePayPeriod = () => {
    this.setState({
      showPayPeriod: false,
    });
  };

  render() {
    const { showPayPeriod, selectedPayPeriodId } = this.state;

    return (
      <Fragment>
        <h2>Manage PayPeriods</h2>
        {showPayPeriod ? (
          <PayPeriod id={selectedPayPeriodId} cancelEdit={this.hidePayPeriod} />
        ) : (
          <Fragment>
            <AddPayPeriod cancelAdd={this.hideAddPayPeriod} />
            <PayPeriodList selectPayPeriod={this.showPayPeriod} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
