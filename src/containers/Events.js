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

import db from '../data/firebase';

const propTypes = {};

const defaultProps = {};

// const INFLUENCER_NAME = 'Andre Swiley';
// const INFLUENCER_URL = 'https://www.instagram.com/andreswilley/';
// const EVENT_IMAGE_URL = '/EventImageAndreSwilley.jpg';
const DATE = '26 August';
const TIME = '15:00 to 18:00 PDT';
const PRICE = 20.0;
const LENGTH = 5;
const TICKETS = 25;

class Events extends React.Component {
  state = {
    title: '',
    influencerName: '',
    influencerIGHandle: '',
    eventImgUrl: 'testImgUrl',
    dateStart: 'testStartDate',
    dateEnd: 'testEndDate',
    tickets: [],
    priceMin: '',
    priceMax: ''
  };

  componentDidMount() {
    try {
      this.setFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

  getEventData = async () => {
    const eventRef = db.collection('events').doc('OU6FjdRhTH6k7I8URpUS');
    const snapshot = await eventRef.get();
    const data = await snapshot.data();
    // console.log(data);
    return data;
  };

  getTicketData = async () => {
    const tickets = [];
    const ticketsRef = db
      .collection('events')
      .doc('OU6FjdRhTH6k7I8URpUS')
      .collection('tickets');
    const snapshot = await ticketsRef.get();
    snapshot.forEach(ticket => tickets.push(ticket.data()));
    return tickets;
    // console.log(tickets);
  };

  setFormattedData = async () => {
    const event = await this.getEventData();
    const tickets = await this.getTicketData();
    const formattedData = {};
    formattedData.title = event.title;
    formattedData.influencerName = event.organiserName;
    formattedData.influencerIGHandle = event.organiserIGHandle;
    formattedData.eventImgUrl = event.eventImgUrl;
    formattedData.dateStart = event.dateStart;
    formattedData.dateEnd = event.dateEnd;
    formattedData.tickets = tickets;
    formattedData.priceMin = this.getPriceMin(tickets);
    formattedData.priceMax = this.getPriceMax(tickets);
    this.setState({ ...formattedData });
  };

  getIGLink = () => `https://www.instagram.com/${this.state.influencerIGHandle}`;

  getPriceMin = tickets => {
    let priceMin = 'N/A';
    if (tickets) {
      const reducer = (min, ticket) => (min < ticket.price ? min : ticket.price);
      priceMin = tickets.reduce(reducer, tickets[0].price);
    }
    return priceMin;
  };

  getPriceMax = tickets => {
    let priceMax = 'N/A';
    if (tickets) {
      const reducer = (max, ticket) => (max > ticket.price ? max : ticket.price);
      priceMax = tickets.reduce(reducer, tickets[0].price);
    }
    return priceMax;
  };

  render() {
    const {
      title,
      influencerName,
      eventImgUrl,
      dateStart,
      dateEnd,
      priceMin,
      priceMax
    } = this.state;

    return (
      <div>
        <Content.Event>
          <FONTS.H1>{title}</FONTS.H1>

          <WrapperEventImage>
            <img src={EVENT_IMAGE} alt={influencerName} />
          </WrapperEventImage>

          <FONTS.A href={this.getIGLink()}>
            <BtnProfile>
              <WrapperProfileImage>
                <img src={PROFILE_IMAGE} alt={influencerName} />
              </WrapperProfileImage>{' '}
              {influencerName}
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
            <FaDollarSign /> ${priceMin} - ${priceMax}
          </FONTS.P>

          <br />

          <FONTS.P>Your chance to meet {influencerName} in a 1-on-1 video call.</FONTS.P>
          <FONTS.P>Only {TICKETS} tickets available.</FONTS.P>
          <FONTS.P>{PRICE} per ticket - get yours now so you don't miss out!</FONTS.P>
        </Content.Event>
        <FooterSticky>
          <Link to="/Checkout">
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
