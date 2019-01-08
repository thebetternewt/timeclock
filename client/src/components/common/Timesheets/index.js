import React, { Component } from 'react'
import moment from 'moment'
import { Query } from 'react-apollo'
import { Typography, CircularProgress } from '@material-ui/core'
import { CURRENT_USER_QUERY, TIMESHEET_QUERY } from '../../../apollo/queries'
import TimesheetForm from './TimesheetForm'
import Timesheet from './Timesheet'

class TimeSheets extends Component {
  state = {
    payPeriodId: 1,
    fiscalYear: moment()
      .add(5, 'months')
      .year(),
    departmentId: '',
    getPunches: false,
  }

  handleSelect = ({ target: { name, value } }) =>
    this.setState({ [name]: value, getPunches: false })

  handleDepartmentSelect = ({ target: { value } }) =>
    this.setState({ departmentId: value, getPunches: false })

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value,
      getPunches: false,
    })

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ getPunches: true })
  }

  render() {
    const { payPeriodId, fiscalYear, departmentId, getPunches } = this.state

    return (
      <div>
        <Typography variant="h3" gutterBottom>
          Timesheets
        </Typography>
        <TimesheetForm
          payPeriodId={payPeriodId}
          fiscalYear={fiscalYear}
          departmentId={departmentId}
          onSelect={this.handleSelect}
          onDepartmentSelect={this.handleDepartmentSelect}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />

        {getPunches && (
          <Query query={CURRENT_USER_QUERY}>
            {({ data: currentUserData, loading: userLoading }) => {
              if (userLoading) {
                return <CircularProgress />
              }
              if (currentUserData && currentUserData.me) {
                const { me } = currentUserData
                return (
                  <Query
                    query={TIMESHEET_QUERY}
                    variables={{
                      payPeriodId,
                      fiscalYear,
                      departmentId,
                      userId: me.id,
                    }}
                    fetchPolicy="network-only"
                  >
                    {({ data, loading }) => {
                      if (loading) {
                        return <CircularProgress />
                      }

                      if (data && data.payPeriod) {
                        return (
                          <Timesheet payPeriod={data.payPeriod} user={me} />
                        )
                      }

                      return (
                        <Typography variant="p" color="textPrimary">
                          No punches found for this pay period!
                        </Typography>
                      )
                    }}
                  </Query>
                )
              }
              return null
            }}
          </Query>
        )}
      </div>
    )
  }
}

export default TimeSheets
