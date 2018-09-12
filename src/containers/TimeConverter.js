import Geocode from 'react-geocode';
import React from 'react';
import PropTypes from 'prop-types';

import Content from '../components/Content';
import InputText from '../components/InputText';
import FONTS from '../utils/Fonts';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

const propTypes = {};

const defaultProps = {};

class TimeConverter extends React.Component {
  state = {
    location: ''
  };

  handleChangeLocation = event => {
    this.setState({ location: event.target.value });
  };

  // getCityName = async () => {
  //   // https://tutorialzine.com/2016/06/quick-tip-detecting-your-location-with-javascript

  //   console.log('getCityName called');

  //   const location = window.navigator && window.navigator.geolocation;

  //   let latitude = '0';
  //   let longitude = '0';

  //   const coordinates = await location.getCurrentPosition(position => {
  //     // console.log(position.coords);
  //     latitude = position.coords.latitude;
  //     longitude = position.coords.longitude;
  //   });

  // const geocode = await Geocode.fromLatLng('-34.596', '-34.596');
  // const address = geocode.results[0].formatted_address;
  // console.log(address);

  // Geocode.fromLatLng('-34.596', '2.2922926').then(
  //   response => {
  //     const address = response.results[0].formatted_address;
  //     console.log(address);
  //   },
  //   error => {
  //     console.error(error);
  //   }
  // );

  // Geocode.fromLatLng(latitude, longitude).then(
  //   response => {
  //     const address = response.results[0].formatted_address;
  //     console.log(address);
  //   },
  //   error => {
  //     console.error(error);
  //   }
  // );
  // };

  render() {
    const { location } = this.state;

    return (
      <Content>
        <FONTS.H1>Where do you live?</FONTS.H1>
        <InputText
          placeholder="Type location here"
          value={location}
          onChange={this.handleChangeLocation}
        />
        <Content.Row>
          <FONTS.H2>startTime</FONTS.H2>
          <FONTS.H1>14:00 pm</FONTS.H1>
        </Content.Row>
        <PlacesAutocomplete />
      </Content>
    );
  }
}

TimeConverter.propTypes = propTypes;
TimeConverter.defaultProps = defaultProps;

export default TimeConverter;
