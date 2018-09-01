import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import Content from '../components/Content';
import validate from '../utils/Validators';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import PayPalCheckout from '../components/PayPalCheckout';
import PayPalInvalid from '../components/PayPalInvalid';
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
    isFormValid: false,
    price: 19.99,
    toConfirmation: false
  };

  handleChangeFirstName = event => {
    this.setState({ firstName: event.target.value });
    this.validateForm();
  };

  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
    if (!validator.isEmail(event.target.value)) {
      this.setState({ emailErrMsg: 'Please enter a valid email.' });
    } else {
      this.setState({ emailErrMsg: '' });
    }
  };

  handleChange = event => {
    this.setState({ textInput: event.target.value });
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
    console.log('XX VALIDATE FORM CALLED');
    this.setState({ state: this.state });

    if (this.state.firstName === '') {
      this.setState({ isFormValid: false });
      console.log('XX FORM INVALID');
      return;
    }

    console.log('XX FORM IS VALID');
    this.setState({ firstNameErrMsg: '' });
    this.setState({ isFormValid: true });
  };

  showErrorMessages = () => {
    this.setState({ firstNameErrMsg: 'First name required' });
  };

  render() {
    const {
      firstName,
      firstNameErrMsg,
      lastName,
      lastNameErrMsg,
      email,
      emailErrMsg,
      isFormValid,
      price,
      toConfirmation
    } = this.state;

    if (toConfirmation === true) return <Redirect to="/confirmation" />;

    const payPalBtn = isFormValid ? (
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
    ) : (
      <div>
        <PayPalCheckout
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={CURRENCY}
          total={price}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onCancel={this.onCancel}
          validateForm={this.showErrorMessages}
          isFormValid={false}
        />
      </div>
    );

    return (
      <Content>
        <FONTS.H1>Checkout</FONTS.H1>
        <FONTS.H2>Your order</FONTS.H2>
        <ImageTicket />
        <FONTS.P>1 x Andre Swiley Meet & Greet, 26 August 2018, 14:00 - 16:00 PDT</FONTS.P>
        <Content.Seperator />

        <FONTS.H2>Your basic information</FONTS.H2>
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
        <Content.Seperator />

        <p id="msg">Please check the checkbox</p>
        <label>
          <input id="check" type="checkbox" /> Check here to continue
        </label>
        {payPalBtn}
      </Content>
    );
  }
}

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
