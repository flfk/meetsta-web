import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

import styled from 'styled-components';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import Popup from '../components/Popup';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

const propTypes = {
  dateStart: PropTypes.number,
  dateEnd: PropTypes.number,
  handleClose: PropTypes.func,
  fromConfirmation: PropTypes.bool,
  handleLocalTimeSubmit: PropTypes.func
};

const defaultProps = {
  dateStart: null,
  dateEnd: null,
  handleClose: () => true,
  fromConfirmation: false,
  handleLocalTimeSubmit: () => true
};

class TimeConverter extends React.Component {
  state = {
    startTimeFormatted: '',
    endTimeFormatted: '',
    dateStart: null,
    dateEnd: null
  };

  componentDidMount() {
    const { dateEnd, dateStart } = this.props;
    this.setState({ dateStart, dateEnd });
  }

  updateStartTime = startTime => {
    this.setState({ startTimeFormatted: startTime });
  };

  updateEndTime = endTime => {
    this.setState({ endTimeFormatted: endTime });
  };

  getLocationDetails = (address, updatedStartTime) => {
    const { handleLocalTimeSubmit } = this.props;
    handleLocalTimeSubmit(address, updatedStartTime);
  };

  render() {
    const { startTimeFormatted, endTimeFormatted, dateStart, dateEnd } = this.state;

    const { handleClose, fromConfirmation } = this.props;

    const startRow = startTimeFormatted ? (
      <div>
        <FONTS.P>The start time is</FONTS.P>
        <FONTS.H3>{startTimeFormatted}</FONTS.H3>
      </div>
    ) : null;

    const endRow = endTimeFormatted ? (
      <div>
        <FONTS.P>And it will end at</FONTS.P>
        <FONTS.H3>{endTimeFormatted}</FONTS.H3>
      </div>
    ) : null;

    const BtnComplete = startTimeFormatted ? (
      <Btn primary fill onClick={handleClose}>
        Close
      </Btn>
    ) : null;

    return (
      <div>
        <Popup.Background />
        <Popup.Card>
          <Popup.BtnClose handleClose={handleClose} />
          <Content>
            <FONTS.H1>Event Time Calculator</FONTS.H1>
            <DropdownFiller />
            {startRow}
            {endRow}
            {BtnComplete}
            <FixedDropdown>
              <PlacesAutocomplete
                dateStart={dateStart}
                updateStartTime={this.updateStartTime}
                dateEnd={dateEnd}
                updateEndTime={this.updateEndTime}
                fromConfirmation={fromConfirmation}
                getLocationDetails={this.getLocationDetails}
              />
            </FixedDropdown>
          </Content>
        </Popup.Card>
      </div>
    );
  }
}

const DropdownFiller = styled.div`
  height: 104px;
  width: 100%;
`;

const FixedDropdown = styled.div`
  position: absolute;
  top: 144px;
  left: 16px;
  width: calc(100% - 32px);
`;

TimeConverter.propTypes = propTypes;
TimeConverter.defaultProps = defaultProps;

export default TimeConverter;
