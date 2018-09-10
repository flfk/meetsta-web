import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

import Btn from './Btn';
import Content from './Content';
import FONTS from '../utils/Fonts';
import MEDIA from '../utils/Media';
import InputText from './InputText';

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
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  erroMsg: PropTypes.string
};

const defaultProps = {
  placeholder: '',
  erroMsg: ''
};

const PopupParentEmail = props => {
  const shareInfoScreen = (
    <div>
      <Background />
      <Card>
        <Btn.Tertiary primary>
          <FaTimes />
        </Btn.Tertiary>
        <Content>
          <FONTS.H1>Share Event Info</FONTS.H1>
          <InputText label="Your name" placeholder="Jane Doe" />
          <InputText label="Email address to send to" placeholder="Janes-Mum@gmail.com" />
          <Btn primary>Send</Btn>
        </Content>
      </Card>
    </div>
  );

  return <div>{shareInfoScreen}</div>;
};

PopupParentEmail.propTypes = propTypes;
PopupParentEmail.defaultProps = defaultProps;

export default PopupParentEmail;
