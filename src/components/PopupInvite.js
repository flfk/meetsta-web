import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import moment from 'moment-timezone';
import validator from 'validator';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import Popup from '../components/Popup';
import InputText from '../components/InputText';

import actions from '../data/actions';

const EVENT_URL_BASE = 'https://www.meetsta.com/register?eventID=';
const EMAIL_TYPE = 'invite';

const propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  eventID: PropTypes.string.isRequired,
  influencerName: PropTypes.string.isRequired,
  dateStart: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired
};

const defaultProps = {};

class PopupInvite extends React.Component {
  state = {
    popupStep: 0,
    daysLeft: 0,
    nameFirst: '',
    nameFirstErrMsg: '',
    email: '',
    refereesEmail: '',
    emailErrMsg: '',
    emailID: ''
  };

  componentDidMount() {
    const { dateStart, email } = this.props;
    const daysLeft = this.getDaysLeft(dateStart);
    this.setState({ daysLeft, refereesEmail: email });
  }

  getDaysLeft = dateStart => {
    const dateCurrent = moment();
    const daysLeft = moment(dateStart).diff(dateCurrent, 'days');
    return daysLeft;
  };

  handleChangeFirstName = event => {
    this.setState({ nameFirst: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  emailRequestInvite = async () => {
    const { nameFirst, email, daysLeft } = this.state;
    const { influencerName, eventID } = this.props;
    const eventURL = EVENT_URL_BASE + eventID;
    const emailRequest = {
      type: EMAIL_TYPE,
      eventID,
      email,
      nameFirst,
      influencerName,
      eventURL,
      daysLeft
    };
    const newEmail = await actions.addDocEmailRequest(emailRequest);
    this.setState({ emailID: newEmail.id });
  };

  handleSend = () => {
    if (this.validateForm()) {
      const { handleComplete } = this.props;
      // TODO MAKE SURE THAT YOU ENABLE EMAIL
      this.emailRequestInvite();
      handleComplete();
      this.setState({ popupStep: 1 });
    }
  };

  validateForm = () => {
    const { nameFirst, email, refereesEmail } = this.state;

    let isFormValid = true;

    if (nameFirst === '') {
      this.setState({ nameFirstErrMsg: 'First name required.' });
      isFormValid = false;
      return isFormValid;
    }
    this.setState({ nameFirstErrMsg: '' });

    if (refereesEmail === email) {
      this.setState({
        emailErrMsg: "You can't invite yourself. Why not share this with a friend instead?"
      });
      isFormValid = false;
      return isFormValid;
    }

    if (!validator.isEmail(email)) {
      this.setState({ emailErrMsg: 'Valid email address required.' });
      isFormValid = false;
      return isFormValid;
    }
    this.setState({ emailErrMsg: '' });

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
            <FONTS.H1>Invite a friend {this.state.refereesEmail}</FONTS.H1>
            <InputText
              label="Your first name"
              placeholder="Jane"
              onChange={this.handleChangeFirstName}
              value={nameFirst}
              errMsg={nameFirstErrMsg}
            />
            <InputText
              label="Email address of person you are inviting"
              placeholder="my-best-friend@example.com"
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
            <FONTS.H1>
              <span role="img" aria-label="Ok Hand">
                👌{' '}
              </span>
              Invite Sent!
            </FONTS.H1>
            <Btn primary onClick={handleClose}>
              Close
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

PopupInvite.propTypes = propTypes;
PopupInvite.defaultProps = defaultProps;

export default PopupInvite;
