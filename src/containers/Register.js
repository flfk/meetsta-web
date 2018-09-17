import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';

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
    description: '',
    influencerName: '',
    dateStart: null,
    dateEnd: null,
    showPopupTime: false,
    showPopupRegistered: false,
    toWinnerCountdown: false
  };

  componentDidMount() {
    try {
      this.setFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
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

  setFormattedData = async () => {
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

  handleSubmit = () => {
    // Need to check for valid email address

    // Need to check the email address hasn't already entered

    this.setState({ toWinnerCountdown: true });
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

  toWinnerCountdown = () => {
    const { title } = this.state;
    if (title) {
      this.setState({ toWinnerCountdown: true });
    }
  };

  render() {
    const {
      eventID,
      title,
      influencerName,
      showPopupTime,
      showPopupRegistered,
      date,
      timeRange,
      dateStart,
      dateEnd,
      toWinnerCountdown
    } = this.state;

    if (toWinnerCountdown === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/countdown',
            search: `?eventID=${eventID}`,
            state: { eventData: this.state }
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
        </Content.PaddingBottom>

        <FooterEvents>
          <Content>
            <FONTS.H2>Win 1 of 30 free tickets!</FONTS.H2>
            <InputText placeholder="Enter your email" />
            <Btn primary onClick={this.handleSubmit}>
              Submit
            </Btn>
            <Btn.Tertiary onClick={this.handleShowPopup('Registered')}>
              Already registered?
            </Btn.Tertiary>
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
