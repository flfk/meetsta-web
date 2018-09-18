import PropTypes from 'prop-types';
import qs from 'qs';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import moment from 'moment-timezone';
import validator from 'validator';

import Btn from '../components/Btn';
import Content from '../components/Content';
import EVENT_IMAGE_MACKENZIE from '../assets/eventImages/EventImageMackenzieSol.jpg';
import FooterEvents from '../components/FooterEvents';
import FONTS from '../utils/Fonts';
import PopupTime from './PopupTime';
import PopupRegistered from '../components/PopupRegistered';
import InputText from '../components/InputText';
import Wrapper from '../components/Wrapper';

import db from '../data/firebase';

const propTypes = {};

const defaultProps = {};

const DEFAULT_EVENT_ID = 'cookie-cutters';

class Register extends React.Component {
  state = {
    eventID: '',
    title: '',
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

  getEventData = async eventID => {
    try {
      const eventRef = db.collection('events').doc(eventID);
      const snapshot = await eventRef.get();
      const data = await snapshot.data();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  loadFormattedData = async () => {
    const eventID = this.getEventId();

    try {
      const event = await this.getEventData(eventID);
      const formattedData = {
        eventID: eventID,
        title: event.title,
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

  testExistingRegistration = async email => {
    const registrationsRef = db.collection('registrations');
    const snapshot = await registrationsRef.get();
    let isExistingUser = false;
    await snapshot.forEach(snap => {
      const data = snap.data();
      if (data.email === email) {
        isExistingUser = true;
        this.setState({ registrationID: snap.id });
      }
    });
    return isExistingUser;
  };

  addDocRegistration = async email => {
    const { eventID } = this.state;
    const registration = {
      email,
      eventID,
      hasDoneTrivia: false,
      hasDoneInvite: false,
      hasDoneSurvey: false
    };
    const newRegistration = await db.collection('registrations').add(registration);
    this.setState({ registrationID: newRegistration.id });
  };

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    const { email } = this.state;

    // Validating email is correct
    if (this.validateForm()) {
      // If the email has already been submitted set the rego ID in state and log them in
      try {
        const isExistingRegistration = await this.testExistingRegistration(email);
        // Else create a new registration
        if (!isExistingRegistration) {
          const newRegistration = await this.addDocRegistration(email);
        }
      } catch (err) {
        console.error(err);
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

    return (
      <div>
        <Content.PaddingBottom>
          <FONTS.H1>{title}</FONTS.H1>
          <Wrapper.EventImage>
            <img src={EVENT_IMAGE_MACKENZIE} alt={influencerName} />
          </Wrapper.EventImage>

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
            Join the running to win one of thirty free tickets to meet {influencerName} on a 1-on-1
            video call for one minute.
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
            <FONTS.H1 centered>Win 1 of 30 free tickets!</FONTS.H1>
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
