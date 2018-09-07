// import PropTypes from 'prop-types';
import React from 'react';
import queryString from 'query-string';
import moment from 'moment-timezone';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

import db from '../data/firebase';

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
    ticket: {
      eventID: '',
      name: '',
      description: '',
      purchasePrice: null,
      purchaseFees: null,
      purchaseNameFirst: '',
      purchaseNameLast: '',
      purchaseEmail: '',
      purchaseDate: null,
      orderNum: '',
      payPalPaymentID: '',
      userID: '',
      hasStarted: false
    }
  };

  componentDidMount() {
    this.getTicketData();
  }

  getOrderId = () => {
    const params = queryString.parse(this.props.location.search);
    return params.ticketID;
  };

  getTicketData = async () => {
    const ticketID = this.getOrderId();
    const ticketRef = db.collection('tickets').doc(ticketID);
    const snapshot = await ticketRef.get();
    const data = await snapshot.data();
    const startTimeFormatted = this.formatStartTime(data.startTime);
    this.setState({ ticket: { ...data }, startTimeFormatted });
  };

  formatStartTime = startTime => {
    const time = moment.tz(startTime, 'America/Los_Angeles').format('H:mm a, dddd, MMM Do');
    return `${time} PDT`;
  };

  render() {
    const { ticket, startTimeFormatted } = this.state;

    return (
      <Content>
        <FONTS.H1>
          {' '}
          <span role="img" aria-label="Clapping">
            👏
          </span>{' '}
          Thanks for getting a ticket to meet {ticket.influencerName}!
        </FONTS.H1>

        <FONTS.H2>Your time slot starts at {startTimeFormatted}.</FONTS.H2>
        <FONTS.P>Your ordered 1 x {ticket.eventTitle}.</FONTS.P>
        <FONTS.P>
          Your order confirmation number is <strong>{ticket.orderNum}.</strong>
        </FONTS.P>
        <Content.Seperator />
        <FONTS.H1>What now?</FONTS.H1>
        <FONTS.H2>1. You will recieve a confirmation email</FONTS.H2>
        <FONTS.P>This will include your order number and time slot.</FONTS.P>
        <FONTS.H2>2. Download AppearIn</FONTS.H2>
        <FONTS.P>AppearIn is the video call app we will use for the event.</FONTS.P>
        <FONTS.P>
          iPhone users - you can download it <FONTS.A href={URL_APPEARIN_IPHONE}>here</FONTS.A>
        </FONTS.P>
        <FONTS.P>
          Android users - you can download it <FONTS.A href={URL_APPEARIN_ANDROID}>here</FONTS.A>
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
      </Content>
    );
  }
}

// OrderConfirmation.propTypes = propTypes;
// OrderConfirmation.defaultProps = defaultProps;

export default OrderConfirmation;
