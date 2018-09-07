// import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import queryString from 'query-string';
import moment from 'moment-timezone';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import PayPalCheckout from '../components/PayPalCheckout';
import PaymentSummary from '../components/PaymentSummary';
import TicketCard from '../components/TicketCard';

import db from '../data/firebase';

const PAYPAL_VARIABLE_FEE = 0.036;
const PAYPAL_FIXED_FEE = 0.3;
const TICKETS_PER_BREAK = 5;
const BREAK_LENGTH_MINS = 5;
const MILLISECS_PER_MIN = 60000;

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION
};
const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';
const CURRENCY = 'USD';

const propTypes = {};

const defaultProps = {};

class Checkout extends React.Component {
  state = {
    eventID: '',
    nameFirst: '',
    nameFirstErrMsg: '',
    nameLast: '',
    nameLastErrMsg: '',
    email: '',
    emailErrMsg: '',
    checkoutStep: 0,
    ticketSelected: {},
    ticketID: null,
    ticketOrdered: null,
    paid: false,
    toConfirmation: false,
    paypalErrorMsg: ''
  };

  componentDidMount() {
    const eventData = this.getEventData();
    this.setState({ ...eventData });
  }

  componentDidUpdate() {
    this.toConfirmation();

    this.getTimeSlot();
  }

  getEventData = () => this.props.location.state.eventData;

  handleChangeFirstName = event => {
    this.setState({ nameFirst: event.target.value });
  };

  handleChangeLastName = event => {
    this.setState({ nameLast: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  calculateFee = price => price * PAYPAL_VARIABLE_FEE + PAYPAL_FIXED_FEE;

  createTicketOrder = async payPalPaymentID => {
    const { eventID, ticketSelected, nameFirst, nameLast, email } = this.state;
    const orderNum = await this.getNewOrderNum();
    const startTime = await this.getTimeSlot();
    const ticket = {
      eventID,
      eventName: ticketSelected.name,
      description: ticketSelected.description,
      price: ticketSelected.price,
      fee: this.calculateFee(ticketSelected.price),
      lengthMins: ticketSelected.lengthMins,
      startTime,
      purchaseNameFirst: nameFirst,
      purchaseNameLast: nameLast,
      purchaseEmail: email,
      purchaseDate: Date.now(),
      orderNum,
      payPalPaymentID,
      userID: '',
      hasStarted: false
    };
    this.setState({ ticketOrdered: ticket });
    this.incrementTicketsSold();
    this.addTicketDoc(ticket);
  };

  getNewOrderNum = async () => {
    const lastOrderRef = db.collection('utils').doc('lastOrder');
    const snapshot = await lastOrderRef.get();
    const data = await snapshot.data();
    const newOrderNum = data.orderNum + 1;
    await lastOrderRef.set({ orderNum: newOrderNum });
    return data.orderNum + 1;
  };

  getEventTickets = async () => {
    const { eventID } = this.state;
    const eventTickets = [];
    const eventTicketsRef = db
      .collection('events')
      .doc(eventID)
      .collection('tickets');
    const snapshot = await eventTicketsRef.get();
    snapshot.forEach(snap => {
      eventTickets.push(snap.data());
    });
    return eventTickets;
  };

  getTicketsSold = async () => {
    let ticketsSold = 0;
    const eventTickets = await this.getEventTickets();
    eventTickets.forEach(ticket => (ticketsSold += ticket.sold));
    console.log('total tickets sold is ', ticketsSold);
    return ticketsSold;
  };

  getMinsSold = async () => {
    let minsSold = 0;
    const eventTickets = await this.getEventTickets();
    eventTickets.forEach(ticket => (minsSold += ticket.sold * ticket.lengthMins));
    console.log('total mins sold is ', minsSold);
    return minsSold;
  };

  getEventStart = async () => {
    const { eventID } = this.state;
    const eventRef = db.collection('events').doc(eventID);
    const snapshot = await eventRef.get();
    const data = await snapshot.data();
    const eventStart = data.dateStart;
    console.log('event start is at ', eventStart);
    return eventStart;
  };

  getTimeSlot = async () => {
    const ticketsSold = await this.getTicketsSold();
    const minsSold = await this.getMinsSold();
    const eventStart = await this.getEventStart();
    let breakLengthMins = 0;
    if (ticketsSold >= TICKETS_PER_BREAK) {
      breakLengthMins = Math.floor(ticketsSold / TICKETS_PER_BREAK) * BREAK_LENGTH_MINS;
    }
    const startTimeMins = 0;
    const millisecsFromStart = (startTimeMins + minsSold + breakLengthMins) * MILLISECS_PER_MIN;
    // Time slot in milliseconds
    const timeSlot = eventStart + millisecsFromStart;
    // const timeSlot = moment.tz(timeSlotMillisecs, 'America/Los_Angeles').format();
    return timeSlot;
  };

  addTicketDoc = async ticket => {
    const newTicket = await db.collection('tickets').add(ticket);
    this.setState({ ticketID: newTicket.id });
  };

  incrementTicketsSold = async () => {
    try {
      const { eventID, ticketSelected } = this.state;
      const { ticketID } = ticketSelected;
      const ticketRef = db
        .collection('events')
        .doc(eventID)
        .collection('tickets')
        .doc(ticketID);
      const snapshot = await ticketRef.get();
      const data = await snapshot.data();
      const newSold = data.sold + 1;
      await ticketRef.update({ sold: newSold });
    } catch (err) {
      console.error(err);
    }
  };

  toConfirmation = () => {
    const { ticketID, paid } = this.state;
    if (typeof ticketID === 'string' && paid) {
      this.setState({ toConfirmation: true });
    }
  };

  onSuccess = payment => {
    this.createTicketOrder(payment.paymentID);
    this.setState({ paid: true });
  };

  onError = error => {
    this.setState({
      paypalErrorMsg: 'Oops, looks like there was a PayPal payment error. Please try again.'
    });
    console.error('Erroneous payment OR failed to load script', error);
  };

  onCancel = data => {
    this.setState({
      paypalErrorMsg: 'Ooops, looks like the Paypal payment was cancelled. Please try again.'
    });
    console.error('Cancelled payment', data);
  };

  validateForm = () => {
    const { nameFirst, nameLast, email } = this.state;

    let isFormValid = true;

    if (nameFirst === '') {
      this.setState({ nameFirstErrMsg: 'First name required.' });
      isFormValid = false;
    } else {
      this.setState({ nameFirstErrMsg: '' });
    }

    if (nameLast === '') {
      this.setState({ nameLastErrMsg: 'Last name required.' });
      isFormValid = false;
    } else {
      this.setState({ nameLastErrMsg: '' });
    }

    if (!validator.isEmail(email)) {
      this.setState({ emailErrMsg: 'Valid email address required.' });
      isFormValid = false;
    } else {
      this.setState({ emailErrMsg: '' });
    }

    return isFormValid;
  };

  toPayment = () => {
    if (this.validateForm()) {
      this.setState({ checkoutStep: 2 });
    }
  };

  getEventId = () => {
    const params = queryString.parse(this.props.location.search);
    return params.eventID;
  };

  handleTicketSelect = event => {
    const { tickets } = this.state;
    const ticketSelected = tickets.filter(ticket => ticket.ticketID === event.target.id)[0];
    this.setState({ ticketSelected, checkoutStep: 1 });
  };

  handlePrevious = () => {
    this.setState(PrevState => {
      return { checkoutStep: PrevState.checkoutStep - 1 };
    });
  };

  render() {
    const {
      eventID,
      nameFirst,
      nameFirstErrMsg,
      nameLast,
      nameLastErrMsg,
      email,
      emailErrMsg,
      toConfirmation,
      checkoutStep,
      tickets,
      ticketSelected,
      ticketOrdered,
      ticketID,
      paypalErrorMsg,
      paid
    } = this.state;

    if (toConfirmation === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/confirmation',
            search: `?eventID=${eventID}&ticketID=${ticketID}`,
            state: { ticket: ticketOrdered }
          }}
        />
      );

    let ticketCards = <div />;
    if (tickets) {
      ticketCards = tickets.map(ticket => (
        <TicketCard
          key={ticket.ticketID}
          ticketID={ticket.ticketID}
          name={ticket.name}
          description={ticket.description}
          lengthMins={ticket.lengthMins}
          price={ticket.price}
          onSelect={this.handleTicketSelect}
        />
      ));
    }

    const selectTicket = (
      <div>
        <FONTS.H2>Select Ticket</FONTS.H2>
        {ticketCards}
      </div>
    );

    const basicInformation = (
      <div>
        <FONTS.H2>Basic information</FONTS.H2>
        <InputText
          label="First name"
          placeholder="Jane"
          onChange={this.handleChangeFirstName}
          value={nameFirst}
          errMsg={nameFirstErrMsg}
        />
        <InputText
          label="Last name"
          placeholder="Doe"
          onChange={this.handleChangeLastName}
          value={nameLast}
          errMsg={nameLastErrMsg}
        />
        <InputText
          label="Email"
          placeholder="JaneDoe@email.com"
          onChange={this.handleChangeEmail}
          value={email}
          errMsg={emailErrMsg}
        />
        <Btn.Tertiary onClick={this.handlePrevious}>{'< Select different ticket'}</Btn.Tertiary>
        <Btn primary onClick={this.toPayment}>
          Proceed to Payment
        </Btn>
      </div>
    );

    const paypalError = paypalErrorMsg ? <FONTS.ERROR>{paypalErrorMsg}</FONTS.ERROR> : null;

    const payPalButton = paid ? null : (
      <PayPalCheckout
        client={CLIENT}
        env={ENV}
        commit={true}
        currency={CURRENCY}
        total={ticketSelected.price + this.calculateFee(ticketSelected.price)}
        onSuccess={this.onSuccess}
        onError={this.onError}
        onCancel={this.onCancel}
        validateForm={this.validateForm}
        isFormValid={true}
      />
    );

    const payment = (
      <div>
        <FONTS.H2>Payment</FONTS.H2>
        <PaymentSummary
          item={ticketSelected.name}
          price={ticketSelected.price}
          fee={this.calculateFee(ticketSelected.price)}
        />
        <Content.Spacing />
        <FONTS.P>
          By clicking on Checkout, you agree with Meetsta's Terms and Conditions of Use and Privacy
          Policy.
        </FONTS.P>
        <Content.Spacing />
        {paypalError}
        {payPalButton}
        <Content.Spacing />
        <Btn.Tertiary onClick={this.handlePrevious}>{'< Back to basic information'}</Btn.Tertiary>
      </div>
    );

    let checkoutComponent = <div />;
    switch (checkoutStep) {
      case 2:
        checkoutComponent = payment;
        break;
      case 1:
        checkoutComponent = basicInformation;
        break;
      default:
        checkoutComponent = selectTicket;
    }

    return (
      <Content.PaddingBottom>
        <FONTS.H1>Checkout</FONTS.H1>
        <Content.Seperator />
        {checkoutComponent}
      </Content.PaddingBottom>
    );
  }
}

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
