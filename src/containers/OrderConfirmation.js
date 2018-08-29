import PropTypes from 'prop-types';
import React from 'react';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import Seperator from '../components/Seperator';

const URL_APPEARIN_IPHONE =
  'https://itunes.apple.com/au/app/appear-in-video-meetings/id878583078?mt=8';
const URL_APPEARIN_ANDROID = 'https://play.google.com/store/apps/details?id=appear.in.app&hl=en';
const CONTACT_EMAIL = 'contact.meetsta@gmail.com';
const CONTACT_INSTAGRAM = 'https://www.instagram.com/meetsta.app/';

const propTypes = {};

const defaultProps = {};

const OrderConfirmation = props => {
  return (
    <Content>
      <FONTS.H1>👏 Thanks for getting a ticket!</FONTS.H1>
      <FONTS.P>1 x Andre Swiley Meet & Greet, 26 August 2018, 14:00 - 16:00 PDT</FONTS.P>
      <FONTS.P>
        Your order confirmation number is <strong>123456.</strong>
      </FONTS.P>
      <Seperator />
      <FONTS.H1>What now?</FONTS.H1>
      <FONTS.H2>1. Check you recieved a confirmation email</FONTS.H2>
      <FONTS.P>This will include your order number and time slot.</FONTS.P>
      <FONTS.H2>2. Download AppearIn</FONTS.H2>
      <FONTS.P>AppearIn is the video call app (think skype) we will use for the event.</FONTS.P>
      <FONTS.P>
        iPhone users - you can download it <FONTS.A href={URL_APPEARIN_IPHONE}>here</FONTS.A>
      </FONTS.P>
      <FONTS.P>
        Android users - you can download it <FONTS.A href={URL_APPEARIN_ANDROID}>here</FONTS.A>
      </FONTS.P>
      <Seperator />
      <FONTS.H1>Any questions? We're here to help!</FONTS.H1>
      <FONTS.P>
        Send us en email at <FONTS.A href={`mailto: ${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FONTS.A>
      </FONTS.P>
      <FONTS.P>
        Or message us on Instagram at{' '}
        <FONTS.A href={CONTACT_INSTAGRAM}>{CONTACT_INSTAGRAM}</FONTS.A>
      </FONTS.P>
    </Content>
  );
};
<a href="" />;

OrderConfirmation.propTypes = propTypes;
OrderConfirmation.defaultProps = defaultProps;

export default OrderConfirmation;
