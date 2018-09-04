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
import ImageTicket from '../components/ImageTicket';

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
    return params.eid;
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
        <FONTS.H2>Your order</FONTS.H2>
        <ImageTicket />
        <FONTS.P>1 x Andre Swiley Meet & Greet, 26 August 2018, 14:00 - 16:00 PDT</FONTS.P>
        <Content.Seperator />
        {checkoutComponent}
      </Content.PaddingBottom>
    );
  }
}

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
