import PropTypes from 'prop-types';
import qs from 'qs';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import moment from 'moment-timezone';
import validator from 'validator';

import Btn from '../components/Btn';
import Content from '../components/Content';
import EVENT_IMAGE_MACKENZIE from '../assets/eventImages/EventImageMackenzieSol2.png';
import EVENT_IMAGE_WILL from '../assets/eventImages/EventImageWillSimmons.png';
import FooterEvents from '../components/FooterEvents';
import FONTS from '../utils/Fonts';
import PopupTime from './PopupTime';
import PopupRegistered from '../components/PopupRegistered';
import InputText from '../components/InputText';
import Wrapper from '../components/Wrapper';

import db from '../data/firebase';
import actions from '../data/actions';

const propTypes = {};

const defaultProps = {};

const DEFAULT_EVENT_ID = 'cookie-cutters';

class Register extends React.Component {
  state = {
    eventID: '',
    title: '',
    freeTicketTotal: '',
    email: '',
    emailErrMsg: '',
    influencerName: '',
    registrationID: '',
    dateStart: null,
    dateEnd: null,
    showPopupTime: false,
    showPopupRegistered: false,
    toWinnerCountdown: false,
    isLoading: false
  };

  componentDidMount() {
    try {
      this.loadFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

  componentDidUpdate() {
    this.goToWinnerCountdown();
  }

  getEventId = () => {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let { eventID } = params;
    if (!eventID) {
      eventID = DEFAULT_EVENT_ID;
    }
    return eventID;
  };

  loadFormattedData = async () => {
    const eventID = this.getEventId();
    try {
      const event = await actions.getDocEvent(eventID);
      const formattedData = {
        eventID: eventID,
        title: event.title,
        freeTicketTotal: event.freeTicketTotal,
        description: event.description,
        influencerName: event.organiserName,
        dateStart: event.dateStart,
        dateEnd: event.dateEnd,
        timeRange: this.getTimeRange(event.dateStart, event.dateEnd),
        date: this.getDate(event.dateStart)
      };
      this.setState({ eventID, ...formattedData });
    } catch (error) {
      console.error(error);
    }
  };

  getTimeRange = (dateStart, dateEnd) => {
    const timeStart = moment.tz(dateStart, 'America/Los_Angeles').format('H:mm');
    const timeEnd = moment.tz(dateEnd, 'America/Los_Angeles').format('H:mm');
    const timeRange = `${timeStart} - ${timeEnd} Pacific Daylight Time`;
    return timeRange;
  };

  getDate = dateStart => moment(dateStart).format('dddd, MMM Do, YYYY');

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  testExisting = (email, registrations) => {
    let isExisting = false;
    registrations.reduce((bool, registration) => {
      if (registration.email === email) {
        isExisting = true;
      }
    }, isExisting);
    return isExisting;
  };

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    const { email, eventID, influencerName } = this.state;
    // Validating email is correct
    if (this.validateForm()) {
      // If the email has already been submitted set the rego ID in state and log them in
      let registrationID = '';
      try {
        const registrations = await actions.getDocsRegistrations(eventID);
        const isExisting = this.testExisting(email, registrations);
        // Else create a new registration
        if (!isExisting) {
          const newRegistration = {
            email,
            dateCreated: Date.now(),
            eventID,
            influencerName,
            hasDoneTrivia: false,
            hasDoneInvite: false,
            hasDoneSurvey: false,
            isWinner: false
          };
          const addedRegistration = await actions.addDocRegistration(newRegistration);
          registrationID = addedRegistration.id;
        } else {
          const registration = registrations.filter(rego => rego.email === email)[0];
          registrationID = registration.id;
        }
        this.setState({ registrationID });
      } catch (error) {
        console.error('Error handling registration submit ', error);
      }
    } else {
      this.setState({ isLoading: false });
    }
  };

  handleTimePopupOpen = () => this.setState({ showPopupTime: true });

  handleTimePopupClose = () => this.setState({ showPopupTime: false });

  handleShowPopup = popupName => {
    const key = `showPopup${popupName}`;
    return () => this.setState({ [key]: true });
  };

  handleClosePopup = popupName => {
    const key = `showPopup${popupName}`;
    return () => this.setState({ [key]: false });
  };

  goToWinnerCountdown = () => {
    const { registrationID } = this.state;
    if (registrationID) {
      this.setState({ toWinnerCountdown: true });
    }
  };

  validateForm = () => {
    const { email } = this.state;
    let isFormValid = true;
    if (!validator.isEmail(email)) {
      this.setState({ emailErrMsg: 'Valid email address required.' });
      isFormValid = false;
    } else {
      this.setState({ emailErrMsg: '' });
    }
    return isFormValid;
  };

  render() {
    const {
      eventID,
      title,
      freeTicketTotal,
      registrationID,
      email,
      emailErrMsg,
      influencerName,
      showPopupTime,
      showPopupRegistered,
      date,
      timeRange,
      dateStart,
      dateEnd,
      toWinnerCountdown,
      isLoading
    } = this.state;

    if (toWinnerCountdown === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/countdown',
            search: `?id=${registrationID}`
          }}
        />
      );

    const popupTime = showPopupTime ? (
      <PopupTime
        handleClose={this.handleClosePopup('Time')}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />
    ) : null;

    const popupRegistered = showPopupRegistered ? (
      <PopupRegistered handleClose={this.handleClosePopup('Registered')} />
    ) : null;

    const btnText = isLoading ? <PulseLoader color="white" size={8} /> : 'Register / Log In';

    let eventImg = null;
    switch (eventID) {
      case 'meet-will-simmons':
        eventImg = <img src={EVENT_IMAGE_WILL} alt="Will Simmons Online Meet & Greet" />;
        break;
      case 'meet-mackenzie-sol-2':
        eventImg = <img src={EVENT_IMAGE_MACKENZIE} alt="Mackenzie Sol Online Meet & Greet" />;
        break;
      default:
        eventImg = null;
    }

    return (
      <div>
        <Content.PaddingBottom>
          <FONTS.H1>{title}</FONTS.H1>
          <Wrapper.EventImage>{eventImg}</Wrapper.EventImage>

          <Content>
            <Btn.Tertiary onClick={this.handleShowPopup('Time')}>
              {date}
              <br />
              <br />
              {timeRange}
            </Btn.Tertiary>
          </Content>

          <FONTS.P>
            {' '}
            Claim one of the {freeTicketTotal} free tickets to meet {influencerName} for a
            one-on-one video call for 1 minute OR get a full ticket for 10 minutes.
          </FONTS.P>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Content.PaddingBottom>

        <FooterEvents>
          <Content>
            <FONTS.H1 centered>Claim 1 of {freeTicketTotal} free tickets!</FONTS.H1>
            <InputText
              placeholder="Enter your email"
              value={email}
              errMsg={emailErrMsg}
              onChange={this.handleChangeEmail}
            />
            <Btn primary onClick={this.handleSubmit}>
              {btnText}
            </Btn>
            <FONTS.FinePrint>
              By clicking on Register / Log In, you agree with Meetsta's{' '}
              <Link to="/termsConditions" target="_blank">
                Terms and Conditions of Use
              </Link>{' '}
              and{' '}
              <Link to="/privacyPolicy" target="_blank">
                Privacy Policy
              </Link>
              .
            </FONTS.FinePrint>
          </Content>
        </FooterEvents>
        {popupTime}
        {popupRegistered}
      </div>
    );
  }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
