import PropTypes from 'prop-types';
import React from 'react';
import { FaDollarSign, FaCalendar, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Btn from '../components/Btn';
import BtnProfile from '../components/BtnProfile';
import Content from '../components/Content';
import EVENT_IMAGE from '../assets/eventImages/EventImageAndreSwilley.jpg';
import PROFILE_IMAGE from '../assets/profileImages/ProfileImageAndreSwilley.jpg';
import FONTS from '../utils/Fonts';
import FooterSticky from '../components/FooterSticky';
import WrapperEventImage from '../components/WrapperEventImage';
import WrapperProfileImage from '../components/WrapperProfileImage';

const propTypes = {};

const defaultProps = {};

const INFLUENCER_NAME = 'Andre Swiley';
const INFLUENCER_URL = 'https://www.instagram.com/andreswilley/';
const EVENT_IMAGE_URL = '/EventImageAndreSwilley.jpg';
const DATE = '26 August';
const TIME = '15:00 to 18:00 PDT';
const PRICE = 20.0;
const LENGTH = 5;
const TICKETS = 25;

class Events extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Content.Event>
          <FONTS.H1>{INFLUENCER_NAME} - Meet & Greet Online</FONTS.H1>

          <WrapperEventImage>
            <img src={EVENT_IMAGE} alt={INFLUENCER_NAME} />
          </WrapperEventImage>

          <FONTS.A href={INFLUENCER_URL}>
            <BtnProfile>
              <WrapperProfileImage>
                <img src={PROFILE_IMAGE} alt={INFLUENCER_NAME} />
              </WrapperProfileImage>{' '}
              <FONTS.A>{INFLUENCER_NAME}</FONTS.A>
            </BtnProfile>
          </FONTS.A>

          <br />

          <FONTS.P>
            <FaCalendar /> {DATE}
          </FONTS.P>

          <FONTS.P>
            <FaClock /> {TIME}
          </FONTS.P>

          <FONTS.P>
            <FaDollarSign /> {PRICE} per {LENGTH} mins
          </FONTS.P>

          <br />

          <FONTS.P>Your chance to meet {INFLUENCER_NAME} in a 1-on-1 video call.</FONTS.P>
          <FONTS.P>Only {TICKETS} tickets available.</FONTS.P>
          <FONTS.P>{PRICE} per ticket - get yours now so you don't miss out!</FONTS.P>
        </Content.Event>
        <FooterSticky>
          <Link to="/checkout">
            <Btn primary>Get Ticket</Btn>
          </Link>
          <Btn secondary>Send Info To Parents</Btn>
        </FooterSticky>
      </div>
    );
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default Events;
