// import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import queryString from 'query-string';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import ImageTicket from '../components/ImageTicket';
import PayPalCheckout from '../components/PayPalCheckout';
import Ticket from '../components/Ticket';

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
    showPayment: false,
    toConfirmation: false
  };

  componentDidMount() {
    // get the event ID
    // retrieve the data
    // load the data
  }

  handleChangeFirstName = event => {
    this.setState({ firstName: event.target.value });
  };

  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onSuccess = payment => {
    console.log('Successful payment!', payment);
    this.setState({ toConfirmation: true });
  };

  onError = error => console.log('Erroneous payment OR failed to load script!', error);

  onCancel = data => {
    console.log('Cancelled payment!', data);
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

  toBasicInformation = () => this.setState({ showPayment: false });

  toPayment = () => {
    if (this.validateForm()) {
      this.setState({ showPayment: true });
    }
  };

  getEventId = () => {
    const params = queryString.parse(this.props.location.search);
    return params.eventID;
  };

  render() {
    console.log(this.getEventId());

    const {
      firstName,
      firstNameErrMsg,
      lastName,
      lastNameErrMsg,
      email,
      emailErrMsg,
      price,
      toConfirmation,
      showPayment
    } = this.state;

    if (toConfirmation === true) return <Redirect push to="/confirmation" />;

    const selectTicket = (
      <div>
        <Ticket name={'NameTest'} description={'DescriptionTest'} lengthMins={10} price={15.0} />
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
        <Btn primary onClick={this.toPayment}>
          Proceed to Payment
        </Btn>
      </div>
    );

    const payment = (
      <div>
        <FONTS.H2>Payment</FONTS.H2>
        <p>Total price ${price}</p>
        <Content.Spacing />
        <FONTS.P>
          By clicking on Checkout, you agree with Meetsta's Terms and Conditions of Use and Privacy
          Policy.
        </FONTS.P>
        <Content.Spacing />
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
        <Btn.Tertiary onClick={this.toBasicInformation}>
          {'< Back to basic information'}
        </Btn.Tertiary>
      </div>
    );

    const checkoutComponent = showPayment ? payment : basicInformation;

    return (
      <Content.PaddingBottom>
        <FONTS.H1>Checkout</FONTS.H1>
        <ImageTicket />
        <Content.Seperator />
        {selectTicket}
        <Content.Seperator />
        {checkoutComponent}
      </Content.PaddingBottom>
    );
  }
}

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
