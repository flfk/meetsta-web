import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import validator from 'validator';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import Popup from '../components/Popup';
import InputText from '../components/InputText';

import db from '../data/firebase';

const EVENT_URL_BASE = 'https://www.meetsta.com/event?eventID=';

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
    if (this.validateForm()) {
      this.addParentEmailDoc();
      this.setState({ popupStep: 1 });
    }
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
        <Popup.Card>
          <Popup.BtnClose handleClose={handleClose} />
          <Content>
            <FONTS.H1>Share Event Info</FONTS.H1>
            <InputText
              label="Your first name"
              placeholder="Jane"
              onChange={this.handleChangeFirstName}
              value={nameFirst}
              errMsg={nameFirstErrMsg}
            />
            <InputText
              label="Email address to send to"
              placeholder="Janes_Mum@Email.com"
              onChange={this.handleChangeEmail}
              value={email}
              errMsg={emailErrMsg}
            />
            <Btn primary onClick={this.handleSend}>
              Send
            </Btn>
          </Content>
        </Popup.Card>
      </div>
    );

    const emailSentStep = (
      <div>
        <Popup.Card>
          <Content>
            <FONTS.H1>Email was sent!</FONTS.H1>
            <Btn primary onClick={handleClose}>
              Back to Event
            </Btn>
          </Content>
        </Popup.Card>
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
        <Popup.Background />
        {popupComponent}
      </div>
    );
  }
}

PopupParentEmail.propTypes = propTypes;
PopupParentEmail.defaultProps = defaultProps;

export default PopupParentEmail;
