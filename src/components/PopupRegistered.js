import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Btn from './Btn';
import Content from './Content';
import FONTS from '../utils/Fonts';
import InputText from './InputText';
import Popup from './Popup';

const propTypes = {
  handleClose: PropTypes.func.isRequired
};

const defaultProps = {};

class PopupRegistered extends React.Component {
  state = {};

  render() {
    const { handleClose } = this.props;

    return (
      <div>
        <Popup.Background />
        <Popup.Card>
          <Popup.BtnClose handleClose={handleClose} />
          <Content>
            <FONTS.H1>Check your email.</FONTS.H1>
            <FONTS.P>You should have gotten a registration email with a big red button.</FONTS.P>
            <FONTS.P>When you press that button it will take you to your status page.</FONTS.P>
            <FONTS.P>If you didn't get an email, check your spam folder.</FONTS.P>
            <FONTS.P>
              Still can't find it? Send us an email at <strong>contact.meetsta@gmail.com</strong>
            </FONTS.P>
            <br />
            <Btn primary onClick={handleClose}>
              Close
            </Btn>
          </Content>
        </Popup.Card>
      </div>
    );
  }
}

PopupRegistered.propTypes = propTypes;
PopupRegistered.defaultProps = defaultProps;

export default PopupRegistered;
