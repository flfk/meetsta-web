import PropTypes from 'prop-types';
import React from 'react';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';
import PayPalCheckout from '../components/PayPalCheckout';
import StripeCardElement from '../components/StripeCardElement';

const CLIENT = {
  sandbox: 'xxxXXX',
  production: 'xxxXXX'
};

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

const propTypes = {};

const defaultProps = {};

class Checkout extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    price: 19.99
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

  handleChange = event => {
    this.setState({ textInput: event.target.value });
  };

  handleSubmit = event => {
    alert(
      `name is ${this.state.firstName} ${this.state.lastName} and email is ${this.state.email}`
    );
  };

  onSuccess = payment => console.log('Successful payment!', payment);

  onError = error => console.log('Erroneous payment OR failed to load script!', error);

  onCancel = data => console.log('Cancelled payment!', data);

  render() {
    return (
      <Content>
        <FONTS.H1>Checkout</FONTS.H1>
        <FONTS.H2>Your order</FONTS.H2>
        <FONTS.P>1 x Andre Swiley Meet & Greet, 26 August 2018, 14:00 - 16:00 PDT</FONTS.P>
        <Content.Seperator />
        <form onSubmit={this.handleSubmit}>
          <FONTS.H2>Your basic information</FONTS.H2>
          <InputText label="First name" placeholder="Jane" onChange={this.handleChangeFirstName} />
          <InputText label="Last name" placeholder="Doe" onChange={this.handleChangeLastName} />
          <InputText
            label="Email"
            placeholder="JaneDoe@email.com"
            onChange={this.handleChangeEmail}
          />
          <Content.Seperator />
          <FONTS.H2>Your payment information</FONTS.H2>
          <StripeCardElement />
          <Content.Divider />
          <PayPalCheckout
            client={CLIENT}
            env={ENV}
            commit={true}
            currency="USD"
            total={100}
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
