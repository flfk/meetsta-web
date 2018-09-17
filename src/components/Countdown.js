import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

import FONTS from '../utils/Fonts';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: 86400000,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const nextAnnouncement = this.getNextAnnouncement();
      const date = this.calculateCountdown(nextAnnouncement);
      if (date) {
        this.setState(date);
      } else {
        this.stop();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  getNextAnnouncement = () => {
    // currently set to 8am LA time
    const dateAnnouncement = moment()
      .tz('Etc/GMT-9')
      .endOf('day')
      .valueOf();
    return dateAnnouncement;
  };

  calculateCountdown = endDate => {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  };

  stop = () => {
    clearInterval(this.interval);
  };

  addLeadingZeros = value => {
    let valueUpdated = String(value);
    while (valueUpdated.length < 2) {
      valueUpdated = `0${valueUpdated}`;
    }
    return valueUpdated;
  };

  render() {
    const countDown = this.state;

    return (
      <Container>
        <div className="Countdown-col">
          <span className="Countdown-col-element">
            <H1>{this.addLeadingZeros(countDown.hours)}</H1>
            <FONTS.P>Hours</FONTS.P>
          </span>
        </div>

        <div className="Countdown-col">
          <span className="Countdown-col-element">
            <H1>{this.addLeadingZeros(countDown.min)}</H1>
            <FONTS.P>Min</FONTS.P>
          </span>
        </div>

        <div className="Countdown-col">
          <span className="Countdown-col-element">
            <H1>{this.addLeadingZeros(countDown.sec)}</H1>
            <FONTS.P>Sec</FONTS.P>
          </span>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const H1 = FONTS.H1.extend`
margin-bottom: 4px;
`;

Countdown.propTypes = {
  date: PropTypes.number.isRequired
};

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;
