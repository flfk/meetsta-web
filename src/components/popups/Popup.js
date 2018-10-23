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

const propTypes = {
  handleClose: PropTypes.func.isRequired
};

const defaultProps = {};

const BtnClose = props => {
  const { handleClose } = props;

  return (
    <Btn.Tertiary primary onClick={handleClose}>
      <FaTimes /> Close
    </Btn.Tertiary>
  );
};

BtnClose.propTypes = propTypes;
BtnClose.defaultProps = defaultProps;

const Popup = {};
Popup.Background = Background;
Popup.Card = Card;
Popup.BtnClose = BtnClose;

export default Popup;
