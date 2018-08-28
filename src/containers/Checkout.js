import PropTypes from 'prop-types';
import React from 'react';
import { Elements } from 'react-stripe-elements';

import Btn from '../components/Btn';
import CardElement from '../components/CardElement';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import InputText from '../components/InputText';

import styled from 'styled-components';

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

  render() {
    return (
      <Content>
        <FONTS.H1>Checkout</FONTS.H1>
        <Elements>
          <form onSubmit={this.handleSubmit}>
            <FONTS.H2>1. Your basic information</FONTS.H2>
            <InputText
              label="First name"
              placeholder="Jane"
              onChange={this.handleChangeFirstName}
            />
            <InputText label="Last name" placeholder="Doe" onChange={this.handleChangeLastName} />
            <InputText
              label="Email"
              placeholder="JaneDoe@email.com"
              onChange={this.handleChangeEmail}
            />
            <FONTS.H2>2. Your payment information</FONTS.H2>
            <CardElement />
            <Btn primary type="submit">
              Pay ${this.state.price} USD
            </Btn>
            powered by stripe
          </form>
        </Elements>
      </Content>
    );
  }
}

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
