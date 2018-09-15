import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import FONTS from '../utils/Fonts';

const propTypes = {
  item: PropTypes.string,
  price: PropTypes.number,
  fee: PropTypes.number
};

const defaultProps = {
  item: '',
  price: 0,
  fee: 0
};

const PaymentSummary = props => {
  const { item, price, fee } = props;

  return (
    <div>
      <Content.Row>
        <FONTS.P>1 x {item}</FONTS.P>
        <FONTS.P>${price.toFixed(2)}</FONTS.P>
      </Content.Row>
      <Content.Row>
        <FONTS.P>PayPal Processing Fee</FONTS.P>
        <FONTS.P>${fee.toFixed(2)}</FONTS.P>
      </Content.Row>
      <Content.Seperator />
      <Content.Row>
        <FONTS.H2>Total</FONTS.H2>
        <FONTS.H2>${(price + fee).toFixed(2)}</FONTS.H2>
      </Content.Row>
    </div>
  );
};

PaymentSummary.propTypes = propTypes;
PaymentSummary.defaultProps = defaultProps;

export default PaymentSummary;
