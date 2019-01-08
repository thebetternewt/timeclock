import React, { Component } from 'react'

import PayPeriodList from './PayPeriodList'
import AddPayPeriod from './AddPayPeriod'
import PayPeriod from './PayPeriod'

export default class PayPeriods extends Component {
  state = {
    showPayPeriod: false,
    selectedPayPeriodId: null,
  }

  showPayPeriod = id => {
    this.setState({
      selectedPayPeriodId: id,
      showPayPeriod: true,
    })
  }

  hidePayPeriod = () => {
    this.setState({
      showPayPeriod: false,
    })
  }

  render() {
    const { showPayPeriod, selectedPayPeriodId } = this.state

    return (
      <>
        <h2>Manage PayPeriods</h2>
        {showPayPeriod ? (
          <PayPeriod id={selectedPayPeriodId} cancelEdit={this.hidePayPeriod} />
        ) : (
          <>
            <AddPayPeriod cancelAdd={this.hideAddPayPeriod} />
            <PayPeriodList selectPayPeriod={this.showPayPeriod} />
          </>
        )}
      </>
    )
  }
}
