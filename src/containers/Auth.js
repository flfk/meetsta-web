import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';

class Auth extends React.Component {
  state = {};

  render() {
    return (
      <Content>
        <Fonts.H1 centered>Meetsta</Fonts.H1>

        <Fonts.H3 centered>Get rewards for being a top fan.</Fonts.H3>
        <br />
        <Btn primary>
          <FaInstagram /> Continue with Instagram
        </Btn>
        <br />
        <Fonts.FinePrint>
          By continuing, you agree to our{' '}
          <Link to="/termsConditions" target="_blank">
            Terms and Conditions of Use
          </Link>
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
