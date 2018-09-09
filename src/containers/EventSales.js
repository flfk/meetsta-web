import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

import db from '../data/firebase';

const MEETSTA_COMISSION = 0.15;

// const propTypes = {};

// const defaultProps = {};

class EventSales extends React.Component {
  state = {
    eventID: '',
    title: '',
    influencerName: '',
    tickets: [],
    ticketsSold: 0,
    revenue: 0
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
      eventID = '';
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
      const ticketsSold = this.getTotalTicketsSold(tickets);
      const revenue = this.getTotalTicketRevenue(tickets);
      const formattedData = {
        eventID,
        title: event.title,
        influencerName: event.organiserName,
        tickets
      };
      this.setState({ eventID, ...formattedData, ticketsSold, revenue });
    } catch (error) {
      console.error(error);
    }
  };

  getTotalTicketsSold = tickets => {
    let sold = 0;
    tickets.forEach(ticket => (sold += ticket.sold));
    return sold;
  };

  getTotalTicketRevenue = tickets => {
    let revenue = 0;
    tickets.forEach(ticket => (revenue += ticket.sold * ticket.price));
    return revenue;
  };

  render() {
    const { title, influencerName, ticketsSold, revenue, tickets } = this.state;

    let detailedSales = <div />;

    if (tickets) {
      detailedSales = tickets.map(ticket => {
        return (
          <div>
            <FONTS.H1>{ticket.name} Sales</FONTS.H1>
            <FONTS.H2>{ticket.sold} tickets sold</FONTS.H2>
            <FONTS.H2>${this.getTotalTicketRevenue([ticket])} earned</FONTS.H2>
            <Content.Seperator />
          </div>
        );
      });
    }

    return (
      <Content>
        <FONTS.H1>{title}</FONTS.H1>
        <FONTS.H2>{influencerName}</FONTS.H2>
        <Content.Seperator />
        <FONTS.H1>Total Sales</FONTS.H1>
        <FONTS.H2>{ticketsSold} tickets sold</FONTS.H2>
        <FONTS.H2>${revenue.toFixed(2)} earned</FONTS.H2>
        <Content.Seperator />
        {detailedSales}
      </Content>
    );
  }
}

// EventSales.propTypes = propTypes;
// EventSales.defaultProps = defaultProps;

export default EventSales;
