import PropTypes from 'prop-types';
import React from 'react';
import { FaDollarSign, FaCalendar, FaClock } from 'react-icons/fa';
import qs from 'qs';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';

import Btn from '../components/Btn';
import BtnProfile from '../components/BtnProfile';
import Content from '../components/Content';
import EVENT_IMAGE from '../assets/eventImages/EventImageMackenzieSol.jpg';
import PopupParentEmail from './PopupParentEmail';
import PROFILE_IMAGE from '../assets/profileImages/ProfileImageMackenzieSol.png';
import FONTS from '../utils/Fonts';
import FooterEvents from '../components/FooterEvents';
import Wrapper from '../components/Wrapper';

import db from '../data/firebase';

const propTypes = {};

const defaultProps = {};

const DEFAULT_EVENT_ID = 'meet-mackenzie-sol';

const GOOGLE_FORM_URL = 'https://goo.gl/forms/ArwJQbyWM0nkEfzN2';

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
    showEmailPopup: false,
    toCheckout: false
  };

  componentDidMount() {
    try {
      this.setFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

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
        eventImgUrl: event.eventImgUrl,
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

  formatText = text => {
    const textSplit = text.split('NEWLINE');
    const textFormatted = textSplit.map(line => <FONTS.P key={line}>{line}</FONTS.P>);
    return textFormatted;
  };

  handlePopupOpen = () => this.setState({ showEmailPopup: true });

  handlePopupClose = () => this.setState({ showEmailPopup: false });

  render() {
    const {
      eventID,
      title,
      description,
      influencerName,
      eventImgUrl,
      timeRange,
      date,
      priceMin,
      priceMax,
      showEmailPopup,
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

    const descriptionFormatted = this.formatText(description);

    const emailPopup = showEmailPopup ? (
      <PopupParentEmail
        eventID={eventID}
        influencerName={influencerName}
        handleClose={this.handlePopupClose}
      />
    ) : null;

    console.log('showEmailPopup, ', showEmailPopup);

    return (
      <div>
        <Content.PaddingBottom>
          <FONTS.H1>{title}</FONTS.H1>

          <Wrapper.EventImage>
            <img src={EVENT_IMAGE} alt={influencerName} />
          </Wrapper.EventImage>

          <FONTS.A href={this.getIGLink()} target="_blank">
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

          {descriptionFormatted}
        </Content.PaddingBottom>
        <FooterEvents>
          <Content>
            <Btn onClick={this.toCheckout} primary>
              Get Tickets
            </Btn>
            <Btn secondary onClick={this.handlePopupOpen}>
              Send Info To Parents
            </Btn>
          </Content>
        </FooterEvents>
        {emailPopup}
      </div>
    );
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;

export default Events;
