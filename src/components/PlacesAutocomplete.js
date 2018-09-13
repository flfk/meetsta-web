import PropTypes from 'prop-types';
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import styled from 'styled-components';
import moment from 'moment-timezone';

import COLORS from '../utils/Colors';
import FONTS from '../utils/Fonts';
import InputText from './InputText';

const propTypes = {
  dateStart: PropTypes.number.isRequired
};

const defaultProps = {};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const START_TIME_MILLIS = 1537122600000;

class PlacesComponent extends React.Component {
  state = {
    address: ''
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async address => {
    const { dateStart, updateStartTime } = this.props;
    try {
      const geocode = await geocodeByAddress(address);
      const location = await getLatLng(geocode[0]);
      const { lat, lng } = location;
      const offsetUTCMillis = await this.getUTCOffsetMillis(lat, lng);
      const startTimeOffset = dateStart + offsetUTCMillis;
      const startTimeOffsetFormatted = this.formatStartTime(startTimeOffset);
      updateStartTime(startTimeOffsetFormatted);
    } catch (error) {
      console.error('Google Maps API error ', error);
    }
  };

  getUTCOffsetMillis = async (lat, lng) => {
    const apiKey = GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=1458000000&key=${apiKey}`;
    const timeZone = await fetch(url);
    const data = await timeZone.json();
    const offsetUTCSecs = data.dstOffset + data.rawOffset;
    const offsetUTCMillis = offsetUTCSecs * 1000;
    return offsetUTCMillis;
  };

  formatStartTime = startTime => {
    const time = moment.tz(startTime, 'UTC').format('H:mm a, dddd, MMM Do YYYY');
    // console.log(moment.tz.names());
    return `${time}`;
  };

  // getTimeZone = (lat, long) => {
  //   var apiKey = 'AIzaSyB4QPY6MzFMVjoirVFTHHkX3pMSK9FL2dM';
  //   var url =
  //     'https://maps.googleapis.com/maps/api/timezone/json?location=' +
  //     lat +
  //     ',' +
  //     long +
  //     '&timestamp=1331161200&key=' +
  //     apiKey;
  //   var response = fetch(url);
  //   var data = JSON.parse(response.getContentText());
  //   console.log(data);
  //   return data['timeZoneName'];
  // };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <InputText
              noMargin={true}
              {...getInputProps({
                placeholder: 'Type your location here'
              })}
            />
            <Dropdown>
              {suggestions.map(suggestion => {
                const suggestionDiv = suggestion.active ? (
                  <SuggestionActive>{suggestion.description}</SuggestionActive>
                ) : (
                  <Suggestion>{suggestion.description}</Suggestion>
                );
                return <div {...getSuggestionItemProps(suggestion)}>{suggestionDiv}</div>;
              })}
            </Dropdown>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const Dropdown = styled.div`
  background-color: white;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const LoadingLbl = FONTS.H3.extend`
  color: ${COLORS.greys.supporting};
  margin: 0;
  padding: 8px;
  font-size: ${FONTS.sizes.p};
`;

const Suggestion = FONTS.H3.extend`
  background-color: white;
  margin: 0;
  padding: 8px;
  cursor: pointer;
  font-size: ${FONTS.sizes.p};
`;
const SuggestionActive = Suggestion.extend`
  background-color: ${COLORS.greys.light};
`;

PlacesComponent.propTypes = propTypes;
PlacesComponent.defaultProps = defaultProps;

export default PlacesComponent;
