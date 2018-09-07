import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import FONTS from '../utils/Fonts';

const propTypes = {
  item: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  fee: PropTypes.number.isRequired
};

const defaultProps = {};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentSummary = props => {
  const { item, price, fee } = props;

  return (
    <div>
      <Row>
        <FONTS.P>1 x {item}</FONTS.P>
        <FONTS.P>${price.toFixed(2)}</FONTS.P>
      </Row>
      <Row>
        <FONTS.P>PayPal Processing Fee</FONTS.P>
        <FONTS.P>${fee.toFixed(2)}</FONTS.P>
      </Row>
      <Content.Seperator />
      <Row>
        <FONTS.H2>Total</FONTS.H2>
        <FONTS.H2>${(price + fee).toFixed(2)}</FONTS.H2>
      </Row>
    </div>
  );
};

PaymentSummary.propTypes = propTypes;
PaymentSummary.defaultProps = defaultProps;

export default PaymentSummary;
