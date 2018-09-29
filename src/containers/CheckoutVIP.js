import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import validator from 'validator';
import qs from 'qs';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import PayPalCheckout from '../components/PayPalCheckout';
import PaymentSummary from '../components/PaymentSummary';
import CardTicket from '../components/CardTicket';
import CardSouvenirs from '../components/CardSouvenirs';

import actions from '../data/actions';

const PAYPAL_VARIABLE_FEE = 0.036;
const PAYPAL_FIXED_FEE = 0.3;
const TICKETS_PER_BREAK = 5;
const BREAK_LENGTH_MINS = 5;
const QUEUE_START_PRE_EVENT_MINS = 20;
const MILLISECS_PER_MIN = 60000;

const DEFAULT_EVENT_ID = 'default-event-id';

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
    addOns: [],
    eventID: '',
    dateStart: null,
    dateEnd: null,
    nameFirst: '',
    nameFirstErrMsg: '',
    nameLast: '',
    nameLastErrMsg: '',
    email: '',
    emailErrMsg: '',
    checkoutStep: 0,
    tickets: [],
    addOns: [],
    ticketSelected: {},
    ticketID: null,
    ticketOrdered: null,
    paid: false,
    toConfirmation: false,
    paypalErrorMsg: ''
  };

  componentDidMount() {
    try {
      this.loadFormattedData();
      this.getEventId();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

  componentDidUpdate() {
    this.toConfirmation();
  }

  getEventId = () => {
    let { eventID } = this.getParams();
    if (!eventID) {
      eventID = DEFAULT_EVENT_ID;
    }
    return eventID;
  };

  getParams = () => {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
  };

  loadFormattedData = async () => {
    const eventID = this.getEventId();
    try {
      const event = await actions.getDocEvent(eventID);
      const formattedDataEvent = {
        eventID,
        title: event.title,
        influencerName: event.organiserName,
        dateStart: event.dateStart,
        dateEnd: event.dateEnd
      };
      const tickets = await actions.getCollEventTickets(eventID);
      const addOns = await actions.getCollAddOns(eventID);
      this.setState({ eventID, ...formattedDataEvent, tickets, addOns });
    } catch (error) {
      console.error('Error loading formatted data ', error);
    }
  };

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
    const {
      eventID,
      title,
      influencerName,
      ticketSelected,
      nameFirst,
      nameLast,
      email,
      dateStart
    } = this.state;
    const orderNum = await actions.getNewOrderNum();
    // const startTime = await this.getTimeSlot();
    const { addOnsSelected } = ticketSelected;
    const additionalMins = addOnsSelected.reduce((total, addOn) => {
      if (addOn.additionalMins) {
        total += addOn.additionalMins;
      }
      return total;
    }, 0);
    const addOnsList = addOnsSelected.map(addOn => addOn.name);
    const ticket = {
      eventID,
      eventTitle: title,
      influencerName,
      name: ticketSelected.name,
      priceTotal: ticketSelected.priceTotal,
      priceBase: ticketSelected.priceBase,
      fee: this.calculateFee(ticketSelected.priceTotal),
      lengthMins: ticketSelected.lengthMins + additionalMins,
      startTime: dateStart,
      purchaseNameFirst: nameFirst,
      purchaseNameLast: nameLast,
      purchaseEmail: email,
      purchaseDate: Date.now(),
      instaHandle: '',
      location: '',
      timeLocalised: '',
      mobileOS: '',
      orderNum,
      payPalPaymentID,
      userID: '',
      addOns: addOnsList
    };
    this.setState({ ticketOrdered: ticket });
    // TODO XX
    // this.incrementTicketsSold();
    const newTicket = await actions.addDocTicket(ticket);
    this.setState({ ticketID: newTicket.id });
  };

  // getQueueStartTime = () => {
  //   const { dateStart } = this.state;
  //   const dateStartQueue = dateStart - QUEUE_START_PRE_EVENT_MINS * MILLISECS_PER_MIN;
  //   return dateStartQueue;
  // };

  // getTimeSlot = async () => {
  //   const { eventID, dateStart } = this.state;
  //   const ticketsSold = await actions.getDocsTicketsSold(eventID);
  //   const ticketsSoldCount = ticketsSold.length;
  //   const minsSold = ticketsSold.reduce((total, ticket) => (total += ticket.lengthMins), 0);
  //   let breakLengthMins = 0;
  //   if (ticketsSoldCount >= TICKETS_PER_BREAK) {
  //     breakLengthMins = Math.floor(ticketsSoldCount / TICKETS_PER_BREAK) * BREAK_LENGTH_MINS;
  //   }
  //   const startTimeMins = 0;
  //   const millisecsFromStart = (startTimeMins + minsSold + breakLengthMins) * MILLISECS_PER_MIN;
  //   // Time slot in milliseconds
  //   const timeSlot = dateStart + millisecsFromStart;
  //   // const timeSlot = moment.tz(timeSlotMillisecs, 'America/Los_Angeles').format();
  //   return timeSlot;
  // };

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
      paypalErrorMsg: 'Oops, looks like the Paypal payment was cancelled. Please try again.'
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
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    return params.eventID;
  };

  handleTicketSelect = ticket => {
    console.log('handling select ticket is', ticket);
    this.setState({ ticketSelected: ticket, checkoutStep: 1 });
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
      addOns,
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
            search: `?ticketID=${ticketID}`,
            state: { ticket: ticketOrdered }
          }}
        />
      );

    let ticketCards = <div />;
    if (tickets) {
      ticketCards = tickets.map((ticket, index) => (
        <CardTicket
          key={ticket.ticketID}
          eventID={eventID}
          ticketID={ticket.ticketID}
          name={ticket.name}
          description={ticket.description}
          lengthMins={ticket.lengthMins}
          priceBase={ticket.priceBase}
          onSelect={this.handleTicketSelect}
          isPremium={ticket.isPremium}
          extras={ticket.extras}
          addOns={addOns}
        />
      ));
    }

    const params = this.getParams();
    if (params.souvenirs && addOns) {
      const souvenirs = addOns.filter(addOn => !addOn.additionalMins);
      ticketCards = (
        <CardSouvenirs
          eventID={eventID}
          name={'Souvenirs'}
          lengthMins={0}
          priceBase={0}
          onSelect={this.handleTicketSelect}
          addOns={souvenirs}
        />
      );
    }

    const selectTicket = <div>{ticketCards}</div>;

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
        <Content.Row>
          <Btn.Tertiary onClick={this.handlePrevious}>{'< Back'}</Btn.Tertiary>
          <Btn primary onClick={this.toPayment}>
            Proceed to Payment
          </Btn>
        </Content.Row>
      </div>
    );

    const paypalError = paypalErrorMsg ? <FONTS.ERROR>{paypalErrorMsg}</FONTS.ERROR> : null;

    const priceTotalFeeIncl = (
      ticketSelected.priceTotal + this.calculateFee(ticketSelected.priceTotal)
    ).toFixed(2);

    const payPalCheckout = (
      <PayPalCheckout
        client={CLIENT}
        env={ENV}
        commit={true}
        currency={CURRENCY}
        total={priceTotalFeeIncl}
        onSuccess={this.onSuccess}
        onError={this.onError}
        onCancel={this.onCancel}
        validateForm={this.validateForm}
        isFormValid={true}
      />
    );

    const payPalButton = paid ? null : payPalCheckout;

    const payment = (
      <div>
        <FONTS.H2>Payment</FONTS.H2>
        <PaymentSummary
          item={ticketSelected.name}
          lengthMins={ticketSelected.lengthMins}
          priceBase={ticketSelected.priceBase}
          priceTotal={ticketSelected.priceTotal}
          addOns={ticketSelected.addOnsSelected}
          fee={this.calculateFee(ticketSelected.priceTotal)}
          priceTotalFeeIncl={priceTotalFeeIncl}
        />
        <Content.Spacing />
        {paypalError}
        {payPalButton}
        <Content>
          <FONTS.FinePrint>
            By clicking on Checkout, you agree with Meetsta's{' '}
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
        <Btn.Tertiary onClick={this.handlePrevious}>{'< Back'}</Btn.Tertiary>
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
