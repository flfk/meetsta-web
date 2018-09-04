import React from 'react';
import { CardElement, Elements } from 'react-stripe-elements';
import { Link } from 'react-router-dom';

import Btn from '../Btn';
import COLORS from '../../utils/Colors';
import FONTS from '../../utils/Fonts';
import StripeIcon from '../../assets/StripeIcon.png';
import Wrapper from '../Wrapper';
import './Styles.CardElement.css';

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

const CardElementStyled = props => {
  return (
    <div>
      <Elements>
        <CardElement className="card-element" style={Style} />
      </Elements>
      <Link to="/confirmation">
        <Btn primary type="submit">
          Pay $20 USD
        </Btn>
      </Link>
      <a href="https://stripe.com/">
        <Wrapper.StripeIcon>
          <img src={StripeIcon} alt="Powered by Stripe" />
        </Wrapper.StripeIcon>
      </a>
    </div>
  );
};

export default CardElementStyled;
