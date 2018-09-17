import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Content from './Content';
import FONTS from '../utils/Fonts';
import Popup from './Popup';

const propTypes = {
  handleClose: PropTypes.func.isRequired
};

const defaultProps = {};

class PopupTrivia extends React.Component {
  state = {};

  render() {
    const { startTimeFormatted, endTimeFormatted, dateStart, dateEnd } = this.state;

    const { handleClose } = this.props;

    return (
      <div>
        <Popup.Background />
        <Popup.Card>
          <Popup.BtnClose handleClose={handleClose} />
          <Content>
            <FONTS.H1>Popup Trivia</FONTS.H1>
          </Content>
        </Popup.Card>
      </div>
    );
  }
}

PopupTrivia.propTypes = propTypes;
PopupTrivia.defaultProps = defaultProps;

export default PopupTrivia;
