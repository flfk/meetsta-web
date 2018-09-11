import PropTypes from 'prop-types';
import React from 'react';
import { FaDollarSign, FaCalendar, FaClock } from 'react-icons/fa';
import qs from 'qs';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';

import Btn from '../components/Btn';
import BtnProfile from '../components/BtnProfile';
import Content from '../components/Content';
import EVENT_IMAGE_MACKENZIE from '../assets/eventImages/EventImageMackenzieSol.jpg';
import EVENT_IMAGE_LEXI from '../assets/eventImages/EventImageLexiJayde.jpg';
import PROFILE_IMAGE_MACKENZIE from '../assets/profileImages/ProfileImageMackenzieSol.png';
import PROFILE_IMAGE_LEXI from '../assets/profileImages/ProfileImageLexiJayde.png';
import FONTS from '../utils/Fonts';
import FooterEvents from '../components/FooterEvents';
import Wrapper from '../components/Wrapper';

import db from '../data/firebase';

const propTypes = {};

const defaultProps = {};

const DEFAULT_EVENT_ID = 'meet-lexi-jayde';

const GOOGLE_FORM_URL = 'https://goo.gl/forms/ArwJQbyWM0nkEfzN2';

class Events extends React.Component {
  state = {
    eventID: '',
    title: '',
    description: '',
    influencerName: '',
    influencerIGHandle: '',
    eventImgURL: '',
    profileURL: '',
    date: '',
    timeRange: '',
    tickets: [],
    priceMin: '',
    priceMax: '',
    toCheckout: false
  };

  componentDidMount() {
    try {
      this.setFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

  openMailForm = () => {
    window.open(GOOGLE_FORM_URL, '_blank');
  };

  getEventId = () => {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let { eventID } = params;
    if (!eventID) {
      eventID = DEFAULT_EVENT_ID;
    }
    return eventID;
  };

  getEventData = async eventID => {
    try {
      const eventRef = db.collection('events').doc(eventID);
      const snapshot = await eventRef.get();
      const data = await snapshot.data();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  getTicketData = async eventID => {
    try {
      const tickets = [];
      const ticketsRef = db
        .collection('events')
        .doc(eventID)
        .collection('tickets');
      const snapshot = await ticketsRef.get();
      snapshot.forEach(ticket => tickets.push({ ticketID: ticket.id, ...ticket.data() }));
      return tickets;
    } catch (error) {
      console.error(error);
    }
  };

  setFormattedData = async () => {
    const eventID = this.getEventId();

    try {
      const event = await this.getEventData(eventID);
      const tickets = await this.getTicketData(eventID);
      const formattedData = {
        eventID: eventID,
        title: event.title,
        description: event.description,
        influencerName: event.organiserName,
        influencerIGHandle: event.organiserIGHandle,
        eventImgURL: event.eventImgURL,
        profileURL: event.profileURL,
        timeRange: this.getTimeRange(event.dateStart, event.dateEnd),
        date: this.getDate(event.dateStart),
        tickets,
        priceMin: this.getPriceMin(tickets),
        priceMax: this.getPriceMax(tickets)
      };
      this.setState({ eventID, ...formattedData });
    } catch (error) {
      console.error(error);
    }
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

  getTimeRange = (dateStart, dateEnd) => {
    const timeStart = moment(dateStart).format('LT');
    const timeEnd = moment(dateEnd).format('LT');
    const timezone = moment()
      .tz(moment.tz.guess())
      .format('zz');
    // .utcOffset() / 60;
    const timeRange = `${timeStart} - ${timeEnd} (${timezone})`;
    return timeRange;
  };

  getDate = dateStart => moment(dateStart).format('dddd, MMM Do, YYYY');

  toCheckout = () => {
    const { title } = this.state;
    if (title) {
      this.setState({ toCheckout: true });
    }
  };

  render() {
    const {
      eventID,
      title,
      description,
      influencerName,
      eventImgURL,
      profileURL,
      timeRange,
      date,
      priceMin,
      priceMax,
      toCheckout
    } = this.state;

    if (toCheckout === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/checkout',
            search: `?eventID=${eventID}`,
            state: { eventData: this.state }
          }}
        />
      );

    let eventImg = null;
    let profileImg = null;
    switch (eventID) {
      case 'meet-lexi-jayde':
        eventImg = EVENT_IMAGE_LEXI;
        profileImg = PROFILE_IMAGE_LEXI;
        break;
      case 'meet-mackenzie-sol':
        eventImg = EVENT_IMAGE_MACKENZIE;
        profileImg = PROFILE_IMAGE_MACKENZIE;
        break;
      default:
        eventImg = null;
        profileImg = null;
    }

    return (
      <div>
        <Content.PaddingBottom>
          <FONTS.H1>{title}</FONTS.H1>

          <Wrapper.EventImage>
            <img src={eventImg} alt={influencerName} />
          </Wrapper.EventImage>

          <FONTS.A href={profileURL} target="_blank">
            <BtnProfile>
              <Wrapper.ProfileImage>
                <img src={profileImg} alt={influencerName} />
              </Wrapper.ProfileImage>{' '}
              {influencerName}
            </BtnProfile>
          </FONTS.A>

          <br />

          <FONTS.P>
            <FaCalendar /> {date}
          </FONTS.P>

          <FONTS.P>
            <FaClock /> {timeRange}
          </FONTS.P>

          <FONTS.P>
            <FaDollarSign /> ${priceMin} - ${priceMax}
          </FONTS.P>

          <br />

          <FONTS.P>{description}</FONTS.P>
        </Content.PaddingBottom>
        <FooterEvents>
          <Content>
            <Btn onClick={this.toCheckout} primary>
              Get Tickets
            </Btn>
            <Btn secondary onClick={this.openMailForm}>
              Send Info To Parents
            </Btn>
          </Content>
        </FooterEvents>
      </div>
    );
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default Events;
