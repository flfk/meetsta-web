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
  };

  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
    console.log(validate.isEmail(this.state.email));
  };

  handleChange = event => {
    this.setState({ textInput: event.target.value });
  };

  handleSubmit = event => {
    alert(
      `name is ${this.state.firstName} ${this.state.lastName} and email is ${this.state.email}`
    );
  };

  onSuccess = payment => {
    console.log('Successful payment!', payment);
    this.setState({ toConfirmation: true });
  };

  onError = error => console.log('Erroneous payment OR failed to load script!', error);

  onCancel = data => {
    console.log('Cancelled payment!', data);
  };

  areInputsValid = () => {
    const { firstName, lastName, email } = this.state;
    if (validator.isEmpty(firstName)) {
      this.setState({ firstNameErrMsg: 'First name is required.' });
      return false;
    } else {
      this.setState({ firstNameErrMsg: '' });
    }
    return true;
  };

  render() {
    if (this.state.toConfirmation === true) return <Redirect to="/confirmation" />;

    const {
      firstName,
      firstNameErrMsg,
      lastName,
      lastNameErrMsg,
      email,
      emailErrMsg,
      price
    } = this.state;

    return (
      <Content>
        <FONTS.H1>Checkout</FONTS.H1>
        <FONTS.H2>Your order</FONTS.H2>
        <ImageTicket />
        <FONTS.P>1 x Andre Swiley Meet & Greet, 26 August 2018, 14:00 - 16:00 PDT</FONTS.P>
        <Content.Seperator />
        <form onSubmit={this.handleSubmit}>
          <FONTS.H2>Your basic information</FONTS.H2>
          <InputText
            label="First name*"
            placeholder="Jane"
            onChange={this.handleChangeFirstName}
            value={firstName}
            errMsg={firstNameErrMsg}
          />
          <InputText
            label="Last name*"
            placeholder="Doe"
            onChange={this.handleChangeLastName}
            value={lastName}
            errMsg={lastNameErrMsg}
          />
          <InputText
            label="Email*"
            placeholder="JaneDoe@email.com"
            onChange={this.handleChangeEmail}
            value={email}
            errMsg={emailErrMsg}
          />
          <Content.Seperator />
          <PayPalCheckout
            client={CLIENT}
            env={ENV}
            commit={true}
            currency={CURRENCY}
            total={price}
            onSuccess={this.onSuccess}
            onError={this.onError}
            onCancel={this.onCancel}
          />
        </form>
      </Content>
    );
  }
}

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
