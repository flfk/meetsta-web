import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

import Btn from '../Btn';
import MEDIA from '../../utils/Media';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.2;
`;

const BackgroundLight = styled(Background)`
  background-color: white
  opacity: 0.95;
`;

const Card = styled.div`
  position: fixed;
  top: 20px;
  // left: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 632px;
  height: 95%;
  background-color: white;
  opacity: 1;
  border-radius: 5px;

  ${MEDIA.tablet} {
    width: 95%;
    margin: 0;
  }
`;

const CardTransparent = styled(Card)`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  ${MEDIA.tablet} {
    width: 90%;
    margin: 0;
  }
`;

const Emoji = styled.div`
  font-size: 96px;
  align-self: center;
`;

const propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const defaultProps = {};

const BtnClose = ({ handleClose }) => {
  return (
    <Btn.Tertiary primary onClick={handleClose} style={{ alignSelf: 'flex-start' }}>
      <FaTimes /> Close
    </Btn.Tertiary>
  );
};

BtnClose.propTypes = propTypes;
BtnClose.defaultProps = defaultProps;

const Popup = {};
Popup.Background = Background;
Popup.BackgroundLight = BackgroundLight;
Popup.Card = Card;
Popup.CardTransparent = CardTransparent;
Popup.BtnClose = BtnClose;
Popup.Emoji = Emoji;

export default Popup;
