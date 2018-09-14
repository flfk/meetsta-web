import PropTypes from 'prop-types';
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import moment from 'moment-timezone';

import Dropdown from './Dropdown';
import InputText from './InputText';

const propTypes = {
  dateStart: PropTypes.number.isRequired,
  updateStartTime: PropTypes.func.isRequired,
  dateEnd: PropTypes.number,
  updateEndTime: PropTypes.func
};

const defaultProps = {
  dateEnd: 0,
  updateEndTime: () => null
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

class PlacesComponent extends React.Component {
  state = {
    address: ''
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async address => {
    const { dateStart, updateStartTime, dateEnd, updateEndTime } = this.props;
    try {
      const newStartTime = await this.getUpdatedDate(address, dateStart);
      updateStartTime(newStartTime);
      console.log('newStartTime ', newStartTime);
      if (dateEnd) {
        const newEndTime = await this.getUpdatedDate(address, dateEnd);
        updateEndTime(newEndTime);
        console.log('newEndTime ', newEndTime);
      }
    } catch (error) {
      console.error('Google Maps API error ', error);
    }
  };

  getUpdatedDate = async (address, date) => {
    const location = await this.getLocation(address);
    const { lat, lng } = location;
    const offsetUTCMillis = await this.getUTCOffsetMillis(lat, lng);
    const newDate = date + offsetUTCMillis;
    const newDateFormatted = this.formatStartTime(newDate);
    return newDateFormatted;
  };

  getLocation = async address => {
    const geocode = await geocodeByAddress(address);
    const location = await getLatLng(geocode[0]);
    return location;
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
    const time = moment.tz(startTime, 'UTC').format('H:mm a, dddd, MMM Do');
    return `${time}`;
  };

  render() {
    const { address } = this.state;
    return (
      <PlacesAutocomplete value={address} onChange={this.handleChange} onSelect={this.handleSelect}>
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
                  <Dropdown.RowActive>{suggestion.description}</Dropdown.RowActive>
                ) : (
                  <Dropdown.Row>{suggestion.description}</Dropdown.Row>
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

PlacesComponent.propTypes = propTypes;
PlacesComponent.defaultProps = defaultProps;

export default PlacesComponent;
