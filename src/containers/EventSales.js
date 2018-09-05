import PropTypes from 'prop-types';
import React from 'react';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

import db from '../data/firebase';

const EVENT_ID = 'OU6FjdRhTH6k7I8URpUS';
const MEETSTA_COMISSION = 0.15;

const propTypes = {};

const defaultProps = {};

class EventSales extends React.Component {
  state = {
    name: 'Andre Swiley - Meet & Greet Online',
    influencerName: 'Andre Swiley',
    ticketsSold: 0,
    revenue: 0
  };

  componentDidMount() {
    try {
      this.getSalesData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

  getSalesData = async () => {
    const ticketsRef = db.collection('tickets');
    const queryRef = ticketsRef.where('eventID', '==', EVENT_ID);
    const snapshot = await queryRef.get();

    let ticketsSold = 0;
    let revenue = 0;
    snapshot.forEach(ticket => {
      ticketsSold += 1;
      const data = ticket.data();
      revenue += data.purchasePrice * (1 - MEETSTA_COMISSION);
      // console.log(ticketsSold, ' ', revenue);
    });
    this.setState({ ticketsSold, revenue });
  };

  render() {
    const { name, influencerName, ticketsSold, revenue } = this.state;

    return (
      <Content>
        <FONTS.H1>{name}</FONTS.H1>
        <FONTS.H2>{influencerName}</FONTS.H2>
        <Content.Seperator />
        <FONTS.H2>{ticketsSold} tickets sold</FONTS.H2>
        <FONTS.H1>${revenue.toFixed(2)} earned</FONTS.H1>
      </Content>
    );
  }
}

EventSales.propTypes = propTypes;
EventSales.defaultProps = defaultProps;

export default EventSales;
