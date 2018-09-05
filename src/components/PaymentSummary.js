import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import FONTS from '../utils/Fonts';

const propTypes = {
  item: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  fees: PropTypes.number.isRequired
};

const defaultProps = {};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentSummary = props => {
  const { item, price, fees } = props;

  return (
    <div>
      <Row>
        <FONTS.P>{item} x 1</FONTS.P>
        <FONTS.P>${price.toFixed(2)}</FONTS.P>
      </Row>
      <Row>
        <FONTS.P>Payment Processing Fees</FONTS.P>
        <FONTS.P>${fees.toFixed(2)}</FONTS.P>
      </Row>
      <Content.Seperator />
      <Row>
        <FONTS.H2>Total</FONTS.H2>
        <FONTS.H2>${(price + fees).toFixed(2)}</FONTS.H2>
      </Row>
    </div>
  );
};

PaymentSummary.propTypes = propTypes;
PaymentSummary.defaultProps = defaultProps;

export default PaymentSummary;
