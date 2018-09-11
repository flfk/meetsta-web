import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import validator from 'validator';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import MEDIA from '../utils/Media';
import InputText from '../components/InputText';

import db from '../data/firebase';

const EVENT_URL_BASE = 'https://www.meetsta.com/event?eventID=';

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
  handleClose: PropTypes.func.isRequired,
  eventID: PropTypes.string.isRequired,
  influencerName: PropTypes.string.isRequired
};

const defaultProps = {
  placeholder: '',
  erroMsg: ''
};

class PopupParentEmail extends React.Component {
  state = {
    popupStep: 0,
    nameFirst: '',
    nameFirstErrMsg: '',
    email: '',
    emailErrMsg: '',
    emailID: ''
  };

  handleChangeFirstName = event => {
    this.setState({ nameFirst: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleSend = () => {
    this.addParentEmailDoc();
    this.setState({ popupStep: 1 });
  };

  addParentEmailDoc = async () => {
    const { nameFirst, email } = this.state;
    const { influencerName, eventID } = this.props;
    const eventURL = EVENT_URL_BASE + eventID;
    const emailRequest = {
      email,
      nameFirst,
      influencerName,
      eventURL
    };
    const newEmail = await db.collection('emails').add(emailRequest);
    this.setState({ emailID: newEmail.id });
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
    const { popupStep, nameFirst, nameFirstErrMsg, email, emailErrMsg } = this.state;
    const { handleClose } = this.props;

    const emailFormStep = (
      <div>
        <Card>
          <Btn.Tertiary primary onClick={handleClose}>
            <FaTimes /> Close
          </Btn.Tertiary>
          <Content>
            <FONTS.H1>Share Event Info</FONTS.H1>
            <InputText
              label="Your first name"
              placeholder="Jane"
              onChange={this.handleChangeFirstName}
              value={nameFirst}
              errorMsg={nameFirstErrMsg}
            />
            <InputText
              label="Email address to send to"
              placeholder="Janes_Mum@Email.com"
              onChange={this.handleChangeEmail}
              value={email}
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
            <Btn primary onClick={handleClose}>
              Back to Event
            </Btn>
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
