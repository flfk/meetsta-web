import PropTypes from 'prop-types';
import React from 'react';

import FONTS from '../utils/Fonts';

const propTypes = {};

const defaultProps = {};

const INFLUENCER = 'Andre Swiley';
const DATE = '26 August';
const TIME = '15:00 to 18:00 PDT';
const PRICE = 20.0;
const TICKETS = 25;

class Events extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <FONTS.LOGO>Meetsta</FONTS.LOGO>

        <FONTS.H1>{INFLUENCER} - Meet & Greet Online</FONTS.H1>

        <span>
          <FONTS.P>{DATE}</FONTS.P>
        </span>

        <span>
          <FONTS.P>{TIME}</FONTS.P>
        </span>

        <span>
          <FONTS.P>${PRICE}</FONTS.P>
        </span>

        <FONTS.P>Your chance to meet {INFLUENCER} in a 1-on-1 video call.</FONTS.P>
        <FONTS.P>Only {TICKETS} tickets available.</FONTS.P>
        <FONTS.P>{PRICE} per ticket - get yours now so you don't miss out!</FONTS.P>
      </div>
    );
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default Events;
