import React from 'react'
import { Mutation } from 'react-apollo'
import { Button, CircularProgress } from '@material-ui/core'
import moment from 'moment'

import { CLOCK_OUT } from '../../apollo/mutations'
import { LAST_PUNCH_QUERY } from '../../apollo/queries'

import Timer from './Timer'

const ClockOut = props => {
  const { clockInMsTime, department } = props.lastPunch
  const clockInMoment = moment(clockInMsTime, 'x')
  return (
    <>
      <h3>Last Clock In:</h3>
      <p>
        {clockInMoment.format('YYYY-MM-DD hh:mm:ssa')} in{' '}
        <em>{department.name}</em>
      </p>
      <h3>Time Elapsed since clock in:</h3>
      <Timer startTime={clockInMoment} />
      <Mutation
        mutation={CLOCK_OUT}
        update={(cache, { data: { clockOut } }) => {
          cache.writeQuery({
            query: LAST_PUNCH_QUERY,
            data: { lastPunch: clockOut },
          })
        }}
      >
        {(clockOut, { data, loading }) => {
          if (data || loading) {
            return <CircularProgress size={50} />
          }

          return (
            <Button
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault()
                clockOut().catch(err => console.log(err.message))
              }}
            >
              Clock Out
            </Button>
          )
        }}
      </Mutation>
    </>
  )
}

export default ClockOut
