// import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import moment from 'moment-timezone';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import PopupTime from './PopupTime';

import db from '../data/firebase';
import actions from '../data/actions';

const URL_APPEARIN_IPHONE =
  'https://itunes.apple.com/au/app/appear-in-video-meetings/id878583078?mt=8';
const URL_APPEARIN_ANDROID = 'https://play.google.com/store/apps/details?id=appear.in.app&hl=en';
const CONTACT_EMAIL = 'contact.meetsta@gmail.com';
const CONTACT_INSTAGRAM = 'https://www.instagram.com/meetsta.app/';

const propTypes = {};

// const defaultProps = {};

class OrderConfirmation extends React.Component {
  state = {
    ticketID: null,
    startTimeFormatted: '',
    submittedInsta: false,
    ticket: {
      eventID: '',
      name: '',
      description: '',
      purchasePrice: null,
      purchaseFees: null,
      purchaseNameFirst: '',
      purchaseNameLast: '',
      purchaseEmail: '',
      instaHandle: '',
      purchaseDate: null,
      orderNum: '',
      payPalPaymentID: '',
      userID: '',
      hasStarted: false,
      dateStart: '',
      showTimePopup: false
    }
  };

  componentDidMount() {
    try {
      this.loadFormattedData();
    } catch (error) {
      console.error('Error loading data', error);
    }
  }

  getOrderId = () => {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    return params.ticketID;
  };

  loadFormattedData = async () => {
    const ticketID = this.getOrderId();
    const ticket = await actions.getDocTicket(ticketID);
    const startTimeFormatted = this.formatStartTime(ticket.startTime);
    const submittedInsta = ticket.instaHandle ? true : false;
    this.setState({
      ticket: { ...ticket },
      startTimeFormatted,
      submittedInsta,
      dateStart: ticket.startTime
    });
  };

  formatStartTime = startTime => {
    const time = moment.tz(startTime, 'America/Los_Angeles').format('H:mm a, dddd, MMM Do');
    return `${time} Pacific Daylight Time`;
  };

  handleTimePopupOpen = () => this.setState({ showTimePopup: true });

  handleTimePopupClose = () => this.setState({ showTimePopup: false });

  updateInstaHandle = async instaHandle => {
    const ticketID = this.getOrderId();
    const ticketRef = db.collection('tickets').doc(ticketID);
    const updateInstaHandle = ticketRef.update({ instaHandle });
  };

  handleChangeInstaHandle = event => {
    const { ticket } = this.state;
    const ticketUpdated = { ...ticket, instaHandle: event.target.value };
    this.setState({ ticket: ticketUpdated });
  };

  handleInstaSubmit = () => {
    const { ticket } = this.state;
    const { instaHandle } = ticket;
    if (instaHandle) {
      this.updateInstaHandle(instaHandle);
      this.setState({ submittedInsta: true });
    }
  };

  handleInstaEdit = () => {
    this.setState({ submittedInsta: false });
  };

  render() {
    const { ticket, startTimeFormatted, showTimePopup, dateStart, submittedInsta } = this.state;

    const timePopup = showTimePopup ? (
      <PopupTime handleClose={this.handleTimePopupClose} dateStart={dateStart} />
    ) : null;

    const instaForm = (
      <div>
        <InputText
          placeholder="@example.handle"
          value={ticket.instaHandle}
          onChange={this.handleChangeInstaHandle}
        />
        <Btn primary fill onClick={this.handleInstaSubmit}>
          Submit
        </Btn>
      </div>
    );

    const instaSubmitted = (
      <div>
        <FONTS.H3>
          <span role="img" aria-label="Tick">
            ✅
          </span>{' '}
          {ticket.instaHandle}
          <Btn.Tertiary onClick={this.handleInstaEdit}>Edit</Btn.Tertiary>
        </FONTS.H3>
      </div>
    );

    const instaSubmit = submittedInsta ? instaSubmitted : instaForm;

    return (
      <Content>
        <FONTS.H1>
          {' '}
          <span role="img" aria-label="Clapping">
            👏
          </span>{' '}
          Thanks for getting a ticket to meet {ticket.influencerName}!
        </FONTS.H1>
        <FONTS.H2>
          Your time slot is{' '}
          <FONTS.A onClick={this.handleTimePopupOpen}>{startTimeFormatted}.</FONTS.A>
        </FONTS.H2>
        <FONTS.P>
          You ordered <strong>1 x {ticket.name}.</strong>
        </FONTS.P>
        <FONTS.P>
          Your order confirmation number is <strong>{ticket.orderNum}.</strong>
        </FONTS.P>
        <Content.Seperator />
        <FONTS.H1>What now?</FONTS.H1>

        <FONTS.H2>1. Send us your Instagram Handle</FONTS.H2>
        <FONTS.P>We will use this to send you the link for the video call on the day.</FONTS.P>
        {instaSubmit}

        <FONTS.H2>2. Double check when the event starts where you live</FONTS.H2>
        <FONTS.P>
          If you don't live in California, you will need to double check when the event starts in
          your local time.
        </FONTS.P>
        <br />
        <Btn onClick={this.handleTimePopupOpen}>Check My Time</Btn>

        <FONTS.H2>3. Download AppearIn</FONTS.H2>
        <FONTS.P>AppearIn is the video call app we will use for the event.</FONTS.P>
        <br />
        <Content.Anchor href={URL_APPEARIN_IPHONE} target="_blank">
          <Btn>I Have An iPhone</Btn>
        </Content.Anchor>
        <br />
        <Content.Anchor href={URL_APPEARIN_ANDROID} target="_blank">
          <Btn>I Have An Android</Btn>
        </Content.Anchor>

        <FONTS.H2>4. You will receive a confirmation email</FONTS.H2>
        <FONTS.P>
          If you do not receive this email within a few minutes, check your spam folder. This email
          will have a link to get you back to this page later.
        </FONTS.P>
        <Content.Seperator />

        <FONTS.H1>Any questions? We're here to help!</FONTS.H1>
        <FONTS.P>
          Send us en email at <FONTS.A href={`mailto: ${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FONTS.A>
        </FONTS.P>
        <FONTS.P>
          Or message us on Instagram at{' '}
          <FONTS.A href={CONTACT_INSTAGRAM}>{CONTACT_INSTAGRAM}</FONTS.A>
        </FONTS.P>
        <Content.Spacing />
        {timePopup}
      </Content>
    );
  }
}

// OrderConfirmation.propTypes = propTypes;
// OrderConfirmation.defaultProps = defaultProps;

export default OrderConfirmation;
