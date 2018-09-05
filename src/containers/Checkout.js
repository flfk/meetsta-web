// import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import queryString from 'query-string';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import PayPalCheckout from '../components/PayPalCheckout';
import PaymentSummary from '../components/PaymentSummary';
import TicketCard from '../components/TicketCard';

import db from '../data/firebase';

const FEE = 1.65;

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
    price: 19.99,
    checkoutStep: 0,
    ticketSelected: {},
    orderID: null,
    ticketOrdered: null,
    orderNum: null,
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
  }

  getEventData = () => {
    return this.props.location.state.eventData;
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

  createTicketOrder = async payPalPaymentID => {
    const { eventID, ticketSelected, nameFirst, nameLast, email } = this.state;
    const orderNum = await this.getNewOrderNum();
    const ticket = {
      eventID,
      name: ticketSelected.name,
      description: ticketSelected.description,
      purchasePrice: ticketSelected.price,
      purchaseFees: FEE,
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
    this.addTicketDoc(ticket);
  };

  getNewOrderNum = async () => {
    const lastOrderRef = db.collection('tickets').doc('lastOrder');
    const snapshot = await lastOrderRef.get();
    const data = await snapshot.data();
    const newOrderNum = data.orderNum + 1;
    await lastOrderRef.set({ orderNum: newOrderNum });
    return data.orderNum + 1;
  };

  addTicketDoc = async ticket => {
    const ref = await db.collection('tickets').add(ticket);
    this.setState({ orderID: ref.id });
    console.log('ticketID is ', ref.id);
  };

  toConfirmation = () => {
    const { ticketOrdered, paid } = this.state;
    // if (ticketOrdered && paid) {
    //   this.setState({ toConfirmation: true });
    // }
    console.log('XX orderID type is, ', this.state.orderID);
    if (typeof this.state.orderID === 'string' && paid) {
      this.setState({ toConfirmation: true });
    }
  };

  onSuccess = payment => {
    console.log('Successful payment!', payment);
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
      price,
      toConfirmation,
      checkoutStep,
      tickets,
      ticketSelected,
      ticketOrdered,
      paypalErrorMsg
    } = this.state;

    if (toConfirmation === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/confirmation',
            search: `?eventID=${eventID}&orderID=${this.state.orderID}`,
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

    const payPalButton = this.state.paid ? null : (
      <PayPalCheckout
        client={CLIENT}
        env={ENV}
        commit={true}
        currency={CURRENCY}
        total={ticketSelected.price + FEE}
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
        <PaymentSummary item={ticketSelected.name} price={ticketSelected.price} fees={FEE} />
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
