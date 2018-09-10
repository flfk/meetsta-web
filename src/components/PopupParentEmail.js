import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaTimes, FaCheck } from 'react-icons/fa';
import validator from 'validator';

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
  sendEmail: PropTypes.func.isRequired,
  closeWindow: PropTypes.func.isRequired
};

const defaultProps = {
  placeholder: '',
  erroMsg: ''
};

class PopupParentEmail extends React.Component {
  state = {
    popupStep: 0,
    nameFirstErrMsg: '',
    emailErrMsg: ''
  };

  handleSend = () => {
    this.setState({ popupStep: 1 });
  };

  validateForm = () => {
    const { nameFirst, email } = this.state;

    let isFormValid = true;

    if (nameFirst === '') {
      this.setState({ nameFirstErrMsg: 'First name required.' });
      isFormValid = false;
    } else {
      this.setState({ nameFirstErrMsg: '' });
    }

    if (!validator.isEmail(email)) {
      this.setState({ emailErrMsg: 'Valid email address required.' });
      isFormValid = false;
    } else {
      this.setState({ emailErrMsg: '' });
    }

    return isFormValid;
  };

  render() {
    const { popupStep, nameFirstErrMsg, emailErrMsg } = this.state;

    const emailFormStep = (
      <div>
        <Card>
          <Btn.Tertiary primary>
            <FaTimes />
          </Btn.Tertiary>
          <Content>
            <FONTS.H1>Share Event Info</FONTS.H1>
            <InputText label="Your first name" placeholder="Jane" errorMsg={nameFirstErrMsg} />
            <InputText
              label="Email address to send to"
              placeholder="Janes-Mum@gmail.com"
              errorMsg={emailErrMsg}
            />
            <Btn primary onClick={this.handleSend}>
              Send
            </Btn>
          </Content>
        </Card>
      </div>
    );

    const emailSentStep = (
      <div>
        <Card>
          <Content>
            <FONTS.H1>Email was sent!</FONTS.H1>
            <Btn primary>Back to Event</Btn>
          </Content>
        </Card>
      </div>
    );

    let popupComponent = <div />;
    switch (popupStep) {
      case 1:
        popupComponent = emailSentStep;
        break;
      default:
        popupComponent = emailFormStep;
    }

    return (
      <div>
        <Background />
        {popupComponent}
      </div>
    );
  }
}

PopupParentEmail.propTypes = propTypes;
PopupParentEmail.defaultProps = defaultProps;

export default PopupParentEmail;
