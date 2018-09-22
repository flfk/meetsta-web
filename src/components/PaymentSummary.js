import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import FONTS from '../utils/Fonts';

const propTypes = {
  item: PropTypes.string,
  price: PropTypes.number,
  fee: PropTypes.number,
  addOnsSelected: PropTypes.array
};

const defaultProps = {
  item: '',
  price: 0,
  fee: 0,
  addOnsSelected: []
};

const PaymentSummary = props => {
  const { item, lengthMins, priceBase, fee, addOns, priceTotal, priceTotalFeeIncl } = props;

  let callDiv = <div />;
  let addOnsDiv = <div />;

  if (lengthMins) {
    callDiv = (
      <Content.Row>
        <FONTS.P>{lengthMins} minute one-on-one video call</FONTS.P>
        <FONTS.P>${priceBase.toFixed(2)}</FONTS.P>
      </Content.Row>
    );
  }

  if (addOns) {
    const addOnsSorted = addOns.sort((a, b) => b.price - a.price);
    addOnsDiv = addOnsSorted.map(addOn => (
      <Content.Row key={addOn.name}>
        <FONTS.P>{addOn.name}</FONTS.P>
        <FONTS.P>${addOn.price.toFixed(2)}</FONTS.P>
      </Content.Row>
    ));
  }

  return (
    <div>
      {callDiv}
      {addOnsDiv}
      <Content.Row>
        <FONTS.P>PayPal Processing Fee</FONTS.P>
        <FONTS.P>${fee.toFixed(2)}</FONTS.P>
      </Content.Row>
      <Content.Seperator />
      <Content.Row>
        <FONTS.H2>Total</FONTS.H2>
        <FONTS.H2>${priceTotalFeeIncl}</FONTS.H2>
      </Content.Row>
    </div>
  );
};

PaymentSummary.propTypes = propTypes;
PaymentSummary.defaultProps = defaultProps;

export default PaymentSummary;
