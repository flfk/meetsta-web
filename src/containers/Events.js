import PropTypes from 'prop-types';
import React from 'react';
import { FaDollarSign, FaCalendar, FaClock } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';

import Btn from '../components/Btn';
import BtnProfile from '../components/BtnProfile';
import Content from '../components/Content';
import EVENT_IMAGE from '../assets/eventImages/EventImageAndreSwilley.jpg';
import PROFILE_IMAGE from '../assets/profileImages/ProfileImageAndreSwilley.jpg';
import FONTS from '../utils/Fonts';
import FooterSticky from '../components/FooterSticky';
import Wrapper from '../components/Wrapper';

import db from '../data/firebase';

const EVENT_ID = 'OU6FjdRhTH6k7I8URpUS';

const propTypes = {};

const defaultProps = {};

class Events extends React.Component {
  state = {
    eventID: '',
    title: '',
    description: '',
    influencerName: '',
    influencerIGHandle: '',
    eventImgUrl: '',
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
      .doc(EVENT_ID)
      .collection('tickets');
    const snapshot = await ticketsRef.get();
    snapshot.forEach(ticket => tickets.push({ ticketID: ticket.id, ...ticket.data() }));
    // console.log(tickets);
    return tickets;
  };

  setFormattedData = async () => {
    const event = await this.getEventData();
    const tickets = await this.getTicketData();
    const formattedData = {
      eventID: EVENT_ID,
      title: event.title,
      description: event.description,
      influencerName: event.organiserName,
      influencerIGHandle: event.organiserIGHandle,
      eventImgUrl: event.eventImgUrl,
      timeRange: this.getTimeRange(event.dateStart, event.dateEnd),
      date: this.getDate(event.dateStart),
      tickets,
      priceMin: this.getPriceMin(tickets),
      priceMax: this.getPriceMax(tickets)
    };
    // formattedData.eventID = EVENT_ID;
    // formattedData.title = event.title;
    // formattedData.description = event.description;
    // formattedData.influencerName = event.organiserName;
    // formattedData.influencerIGHandle = event.organiserIGHandle;
    // formattedData.eventImgUrl = event.eventImgUrl;
    // formattedData.timeRange = this.getTimeRange(event.dateStart, event.dateEnd);
    // formattedData.date = this.getDate(event.dateStart);
    // formattedData.tickets = tickets;
    // formattedData.priceMin = this.getPriceMin(tickets);
    // formattedData.priceMax = this.getPriceMax(tickets);
    this.setState({ ...formattedData });

    // const zoneName = moment.tz.guess();
    // console.log(zoneName);
    // const timezone = moment.tz(zoneName).zoneAbbr();
    // console.log(timezone);
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
    const timeStart = moment(dateStart, 'X').format('LT');
    const timeEnd = moment(dateEnd, 'X').format('LT');
    const timezone = moment()
      .tz(moment.tz.guess())
      .format('zz');
    // .utcOffset() / 60;
    const timeRange = `${timeStart} - ${timeEnd} (${timezone})`;
    return timeRange;
  };

  getDate = dateStart => moment(dateStart, 'X').format('dddd, MMM Do, YYYY');

  toCheckout = () => this.setState({ toCheckout: true });

  render() {
    const {
      title,
      description,
      influencerName,
      eventImgUrl,
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
            search: `?eventID=${EVENT_ID}`,
            state: { eventData: this.state }
          }}
        />
      );

    return (
      <div>
        <Content.PaddingBottom>
          <FONTS.H1>{title}</FONTS.H1>

          <Wrapper.EventImage>
            <img src={EVENT_IMAGE} alt={influencerName} />
          </Wrapper.EventImage>

          <FONTS.A href={this.getIGLink()}>
            <BtnProfile>
              <Wrapper.ProfileImage>
                <img src={PROFILE_IMAGE} alt={influencerName} />
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
        <FooterSticky>
          <Content.Row>
            <Btn secondary>Send Info To Parents</Btn>
            <Btn onClick={this.toCheckout} primary>
              Get Tickets
            </Btn>
          </Content.Row>
        </FooterSticky>
      </div>
    );
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default Events;
