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
    firstName: '',
    firstNameErrMsg: '',
    lastName: '',
    lastNameErrMsg: '',
    email: '',
    emailErrMsg: '',
    price: 19.99,
    checkoutStep: 0,
    ticketSelected: {},
    toConfirmation: false,
    paypalErrorMsg: ''
  };

  componentDidMount() {
    const eventData = this.getEventData();
    this.setState({ ...eventData });
  }

  getEventData = () => {
    return this.props.location.state.eventData;
  };

  handleChangeFirstName = event => {
    this.setState({ firstName: event.target.value });
  };

  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  createTicket = () => {
    console.log('creatingTicket');
  };

  onSuccess = payment => {
    console.log('Successful payment!', payment);
    this.setState({ toConfirmation: true });
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
    const { firstName, lastName, email } = this.state;

    let isFormValid = true;

    if (firstName === '') {
      this.setState({ firstNameErrMsg: 'First name required.' });
      isFormValid = false;
    } else {
      this.setState({ firstNameErrMsg: '' });
    }

    if (lastName === '') {
      this.setState({ lastNameErrMsg: 'Last name required.' });
      isFormValid = false;
    } else {
      this.setState({ lastNameErrMsg: '' });
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
      firstName,
      firstNameErrMsg,
      lastName,
      lastNameErrMsg,
      email,
      emailErrMsg,
      price,
      toConfirmation,
      checkoutStep,
      tickets,
      ticketSelected,
      paypalErrorMsg
    } = this.state;

    if (toConfirmation === true) return <Redirect push to="/confirmation" />;

    let ticketCards = <div />;
    if (tickets) {
      ticketCards = tickets.map(ticket => (
        <TicketCard
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
          value={firstName}
          errMsg={firstNameErrMsg}
        />
        <InputText
          label="Last name"
          placeholder="Doe"
          onChange={this.handleChangeLastName}
          value={lastName}
          errMsg={lastNameErrMsg}
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
        <PayPalCheckout
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={CURRENCY}
          total={price}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onCancel={this.onCancel}
          validateForm={this.validateForm}
          isFormValid={true}
        />
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
