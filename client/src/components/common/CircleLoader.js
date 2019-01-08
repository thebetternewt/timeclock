import React from 'react'
import { CircularProgress } from '@material-ui/core'

const CircleLoader = () => (
  <CircularProgress
    size={50}
    style={{ margin: '0 auto', alignSelf: 'center' }}
  />
)

export default CircleLoader
