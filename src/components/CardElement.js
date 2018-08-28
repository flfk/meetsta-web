import React from 'react';
import { CardElement } from 'react-stripe-elements';

import COLORS from '../utils/Colors';
import FONTS from '../utils/Fonts';

const CardElementStyled = props => {
  return <CardElement style={Style} />;
};

const Style = {
  base: {
    iconColor: COLORS.primary.green,
    color: COLORS.greys.primary,
    lineHeight: '40px',
    fontFamily: FONTS.family.body,
    fontSize: FONTS.sizes.p,

    '::placeholder': {
      color: COLORS.greys.supporting
    }
  }
};

export default CardElementStyled;
