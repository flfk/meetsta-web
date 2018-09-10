import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

import db from '../data/firebase';

// const propTypes = {};

// const defaultProps = {};

class EventSales extends React.Component {
  state = {
    eventID: '',
    tickets: []
  };

  componentDidMount() {
    try {
      this.getTicketData();
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

  getTicketData = async () => {
    const eventID = this.getEventId();
    try {
      const ticketsRef = db.collection('tickets');
      const queryRef = ticketsRef.where('eventID', '==', eventID);
      const snapshot = await queryRef.get();
      const tickets = [];
      snapshot.forEach(snap => {
        const ticket = snap.data();
        tickets.push(ticket);
      });
      const ticketsSorted = tickets.sort((a, b) => a.startTime - b.startTime);
      console.log(ticketsSorted);
      this.setState({ tickets: ticketsSorted });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { tickets } = this.state;

    let schedule = <div />;

    if (tickets) {
      schedule = tickets.map(ticket => (
        <div key={ticket.orderNum}>
          <Content.Row>
            <FONTS.P>{ticket.startTime}</FONTS.P>
            <FONTS.P>{ticket.purchaseNameFirst}</FONTS.P>
          </Content.Row>
          <Content.Seperator />
        </div>
      ));
    }

    return (
      <Content>
        <FONTS.H1>Schedule</FONTS.H1>
        {schedule}
      </Content>
    );
  }
}

// EventSales.propTypes = propTypes;
// EventSales.defaultProps = defaultProps;

export default EventSales;
