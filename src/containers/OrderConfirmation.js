// import PropTypes from 'prop-types';
import React from 'react';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

const URL_APPEARIN_IPHONE =
  'https://itunes.apple.com/au/app/appear-in-video-meetings/id878583078?mt=8';
const URL_APPEARIN_ANDROID = 'https://play.google.com/store/apps/details?id=appear.in.app&hl=en';
const CONTACT_EMAIL = 'contact.meetsta@gmail.com';
const CONTACT_INSTAGRAM = 'https://www.instagram.com/meetsta.app/';

const propTypes = {};

// const defaultProps = {};

const OrderConfirmation = props => {
  const getTicketData = () => {
    console.log(props.location.state);
    return props.location.state;
  };

  const ticket = getTicketData();

  return (
    <Content>
      <FONTS.H1>
        {' '}
        <span role="img" aria-label="Clapping">
          👏
        </span>{' '}
        Thanks for getting a ticket!
      </FONTS.H1>
      <FONTS.P>{ticket.name}</FONTS.P>
      <FONTS.P>
        Your order confirmation number is <strong>{ticket.orderNum}.</strong>
      </FONTS.P>
      <Content.Seperator />
      <FONTS.H1>What now?</FONTS.H1>
      <FONTS.H2>1. You will recieve a confirmation email</FONTS.H2>
      <FONTS.P>This will include your order number and time slot.</FONTS.P>
      <FONTS.H2>2. Download AppearIn</FONTS.H2>
      <FONTS.P>AppearIn is the video call app (think skype) we will use for the event.</FONTS.P>
      <FONTS.P>
        iPhone users - you can download it <FONTS.A href={URL_APPEARIN_IPHONE}>here</FONTS.A>
      </FONTS.P>
      <FONTS.P>
        Android users - you can download it <FONTS.A href={URL_APPEARIN_ANDROID}>here</FONTS.A>
      </FONTS.P>
      <Content.Seperator />
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

// OrderConfirmation.propTypes = propTypes;
// OrderConfirmation.defaultProps = defaultProps;

export default OrderConfirmation;
