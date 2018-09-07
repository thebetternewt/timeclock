import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class Timer extends Component {
  state = {
    hours: null,
    minutes: null,
    seconds: null
  };

  componentDidMount = () => {
    this.startTimer();
  };

  static getDerivedStateFromProps(nextProps) {
    const { startTime } = nextProps;
    const now = moment();
    const duration = moment.duration(now.diff(startTime));

    return {
      hours: duration.asHours().toFixed(0),
      minutes: (duration.asMinutes() % (60 ^ 2)).toFixed(0),
      seconds: (duration.asSeconds() % 60).toFixed(0)
    };
  }

  componentWillUnmount = () => {
    this.stopTimer();
  };

  startTimer = () => {
    const { startTime } = this.props;
    this.interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(now.diff(startTime));

      this.setState({
        hours: duration.asHours().toFixed(0),
        minutes: (duration.asMinutes() % (60 ^ 2)).toFixed(0),
        seconds: (duration.asSeconds() % 60).toFixed(0)
      });
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  render() {
    const { hours, minutes, seconds } = this.state;
    return (
      <div>
        {seconds && `${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`}
      </div>
    );
  }
}

Timer.propTypes = {
  startTime: PropTypes.shape().isRequired
};

export default Timer;
