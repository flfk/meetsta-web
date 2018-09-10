import React from 'react';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

const CONTACT_EMAIL = 'contact.meetsta@gmail.com';
const CONTACT_INSTAGRAM = 'https://www.instagram.com/meetsta.app/';
const CONTACT_NUMBER = '+1 213-249-4523';

const ContactUs = props => {
  return (
    <Content>
      <FONTS.H1>Any questions? We're here to help!</FONTS.H1>
      <FONTS.P>
        Send us en email at <FONTS.A href={`mailto: ${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</FONTS.A>.
      </FONTS.P>
      <FONTS.P>
        Or message us on Instagram at{' '}
        <FONTS.A href={CONTACT_INSTAGRAM}>{CONTACT_INSTAGRAM}</FONTS.A>.
      </FONTS.P>
      <FONTS.P>
        Or just give us a call on <strong>{CONTACT_NUMBER}</strong>.
      </FONTS.P>
      <Content.Spacing />
    </Content>
  );
};

export default ContactUs;
