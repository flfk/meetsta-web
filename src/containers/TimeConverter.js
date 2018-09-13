import Geocode from 'react-geocode';
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment-timezone';

import Content from '../components/Content';
import InputText from '../components/InputText';
import FONTS from '../utils/Fonts';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

const propTypes = {};

const defaultProps = {};

const TEST_TIME = 1537120800000;

class TimeConverter extends React.Component {
  state = {
    location: '',
    startTime: ''
  };

  handleChangeLocation = event => {
    this.setState({ location: event.target.value });
  };

  formatStartTime = startTime => {
    const time = moment.tz(startTime, 'America/Los_Angeles').format('H:mm a, dddd, MMM Do');
    return `${time} PDT`;
  };

  updateStartTime = startTime => {
    this.setState({ startTime });
  };

  render() {
    const { startTime } = this.state;

    return (
      <Content>
        <FONTS.H1>Where do you live?</FONTS.H1>
        <Content.Row>
          <FONTS.H2>startTime PDT</FONTS.H2>
          <FONTS.H1>{this.formatStartTime(TEST_TIME)}</FONTS.H1>
        </Content.Row>
        <Content.Row>
          <FONTS.H2>Start Time</FONTS.H2>
          <FONTS.H1>{startTime}</FONTS.H1>
        </Content.Row>
        <PlacesAutocomplete dateStart={TEST_TIME} updateStartTime={this.updateStartTime} />
      </Content>
    );
  }
}

TimeConverter.propTypes = propTypes;
TimeConverter.defaultProps = defaultProps;

export default TimeConverter;
