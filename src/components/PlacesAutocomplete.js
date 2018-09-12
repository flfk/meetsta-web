import PropTypes from 'prop-types';
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import styled from 'styled-components';

import COLORS from '../utils/Colors';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';

const propTypes = {};

const defaultProps = {};

class PlacesComponent extends React.Component {
  state = {
    address: ''
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

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
              {...getInputProps({
                placeholder: 'Type your location here'
              })}
            />
            <Dropdown>
              {loading && <LoadingLbl>Loading...</LoadingLbl>}
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
  padding-left: 16px;
  padding-right: 16px;
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
