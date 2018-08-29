import React from 'react';
import { CardElement } from 'react-stripe-elements';

import COLORS from '../../utils/Colors';
import FONTS from '../../utils/Fonts';
import './Styles.CardElement.css';

const CardElementStyled = props => {
  return <CardElement className="card-element" style={Style} />;
};

const Style = {
  base: {
    iconColor: COLORS.primary.green,
    color: COLORS.greys.primary,
    lineHeight: '36px',
    fontFamily: FONTS.family.body,
    fontSize: FONTS.sizes.p,

    '::placeholder': {
      color: COLORS.greys.supporting
    }
  }
};

export default CardElementStyled;
