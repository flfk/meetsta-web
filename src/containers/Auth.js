import React from 'react';
import { Link } from 'react-router-dom';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';

class Auth extends React.Component {
  state = {};

  render() {
    return (
      <Content>
        <Fonts.H1 centered>Meetsta</Fonts.H1>

        <Fonts.H3 centered>Get rewards for being your favorite influencer </Fonts.H3>
        <br />
        <Btn primary> Continue with Instagram</Btn>
        <Fonts.FinePrint>
          By continuing, you agree to our{' '}
          <Link to="/termsConditions" target="_blank">
            Terms and Conditions of Use
          </Link>{' '}
          ,{' '}
          <Link to="/privacyPolicy" target="_blank">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/cookiesPolicy" target="_blank">
            Cookies Policy
          </Link>
          .
        </Fonts.FinePrint>
      </Content>
    );
  }
}

export default Auth;
