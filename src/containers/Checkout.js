import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import validator from 'validator';

import Btn from '../components/Btn';
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
    isChecked: false,
    isCheckedErrMsg: '',
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

  handleCheck = event => {
    const updatedState = { isChecked: !this.state.isChecked };
    this.setState(updatedState);
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
    const { firstName, lastName, email, isChecked } = this.state;

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

    if (!isChecked) {
      this.setState({ isCheckedErrMsg: 'You need to agree to continue' });
      isFormValid = false;
    } else {
      this.setState({ isCheckedErrMsg: '' });
    }

    return isFormValid;
  };

  toBasicInformation = () => this.setState({ showPayment: false });

  toPayment = () => {
    console.log('XX' + this.validateForm);
    if (this.validateForm()) {
      this.setState({ showPayment: true });
    }
  };

  render() {
    const {
      firstName,
      firstNameErrMsg,
      lastName,
      lastNameErrMsg,
      email,
      emailErrMsg,
      isChecked,
      isCheckedErrMsg,
      price,
      toConfirmation
    } = this.state;

    if (toConfirmation === true) return <Redirect to="/confirmation" />;

    const isCheckedErrLabel =
      isCheckedErrMsg === '' ? null : <InputText.ErrLabel>{isCheckedErrMsg}</InputText.ErrLabel>;

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
        <label>
          <input
            type="checkbox"
            onChange={this.handleCheck}
            defaultChecked={this.state.isChecked}
          />{' '}
          I agree to the terms and conditions and privacy policy
        </label>
        {isCheckedErrLabel}
        <Content.Spacing />
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

    const checkoutComponent = this.state.showPayment ? payment : basicInformation;

    return (
      <Content>
        <FONTS.H1>Checkout</FONTS.H1>
        <FONTS.H2>Your order</FONTS.H2>
        <ImageTicket />
        <FONTS.P>1 x Andre Swiley Meet & Greet, 26 August 2018, 14:00 - 16:00 PDT</FONTS.P>
        <Content.Seperator />
        {checkoutComponent}
      </Content>
    );
  }
}

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
