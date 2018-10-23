// import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import moment from 'moment-timezone';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

import actions from '../data/actions';

// const propTypes = {};

// const defaultProps = {};

const MEETSTA_COMMISSION = 0.15;

class Sales extends React.Component {
  state = {
    eventTitle: '',
    tickets: [],
    registrations: []
  };

  componentDidMount() {
    try {
      this.loadFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

  getEventId = () => {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let { eventID } = params;
    if (!eventID) {
      eventID = '';
    }
    return eventID;
  };

  loadFormattedData = async () => {
    const eventID = this.getEventId();
    try {
      const event = await actions.getDocEvent(eventID);
      const eventTitle = event.title;

      const tickets = await actions.getDocsTicketsSold(eventID);
      const ticketsSorted = tickets.sort((a, b) => a.startTime - b.startTime);

      const registrations = await actions.getDocsRegistrations(eventID);

      this.setState({ tickets: ticketsSorted, eventTitle, registrations });
    } catch (error) {
      console.error('Error loading formatted data ', error);
    }
  };

  formatStartTime = startTime => {
    const time = moment.tz(startTime, 'America/Los_Angeles').format('H:mm a, dddd, MMM Do');
    return `${time} PDT`;
  };

  render() {
    const { tickets, eventTitle, registrations } = this.state;

    const totalRegistrations = registrations.length;

    const totalRevenue = tickets.reduce((total, ticket) => total + ticket.priceTotal, 0);
    const totalRevenueInfluencer = (totalRevenue * (1 - MEETSTA_COMMISSION)).toFixed(2);
    const ticketsSold = tickets.length;
    const addOnsSold = tickets.reduce((total, ticket) => total + ticket.addOns.length, 0);

    return (
      <Content>
        <FONTS.H1>Sales - {eventTitle}</FONTS.H1>
        <FONTS.H1>
          ${totalRevenueInfluencer} <FONTS.P>earned</FONTS.P>
        </FONTS.H1>
        <FONTS.H1>
          {ticketsSold} <FONTS.P>tickets sold</FONTS.P>
        </FONTS.H1>
        <FONTS.H1>
          {addOnsSold} <FONTS.P>VIP add ons sold</FONTS.P>
        </FONTS.H1>
        <FONTS.H1>
          {totalRegistrations} <FONTS.P>total free ticket registrations</FONTS.P>
        </FONTS.H1>
        <br />
      </Content>
    );
  }
}

// Sales.propTypes = propTypes;
// Sales.defaultProps = defaultProps;

export default Sales;
