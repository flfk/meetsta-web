import mixpanel from 'mixpanel-browser';
import React from 'react';
import { Redirect } from 'react-router-dom';

import CardOptions from '../components/CardOptions';
import Content from '../components/Content';
import { getParams } from '../utils/Helpers';

import actions from '../data/actions';

class TicketOptions extends React.Component {
  state = {
    eventID: '',
    tickets: [],
    ticketSelectedID: '',
    toCheckout: false,
  };

  componentDidMount() {
    try {
      this.loadFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
    const { eventID } = this.state;
    mixpanel.identify();
    mixpanel.track('Visited Ticket Options', { eventID });
  }

  getEventID = () => {
    const { eventID } = getParams(this.props);
    return eventID;
  };

  loadFormattedData = async () => {
    const eventID = this.getEventID();
    try {
      const event = await actions.getDocEvent(eventID);
      const formattedDataEvent = {
        eventID,
        influencerName: event.organiserName,
      };
      const tickets = await actions.getCollEventTickets(eventID);
      this.setState({ eventID, ...formattedDataEvent, tickets });
    } catch (error) {
      console.error('Error loading formatted data on Ticket Options', error);
    }
  };

  handleSelect = event => {
    const ticketSelectedID = event.target.value;
    this.setState({ ticketSelectedID });
    this.goToCheckout();
  };

  goToCheckout = () => this.setState({ toCheckout: true });

  render() {
    const { eventID, tickets, ticketSelectedID, toCheckout } = this.state;

    if (toCheckout === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/checkout',
            search: `?eventID=${eventID}&ticketID=${ticketSelectedID}`,
          }}
        />
      );

    let ticketsDiv = null;
    if (tickets) {
      const ticketsSorted = tickets.sort((a, b) => b.priceBase - a.priceBase);
      ticketsDiv = ticketsSorted.map(ticket => (
        <CardOptions
          key={ticket.ticketID}
          description={ticket.description}
          isPremium={ticket.isPremium}
          handleSelect={this.handleSelect}
          name={ticket.name}
          priceBase={ticket.priceBase}
          previewImgURL={ticket.previewImgURL}
          ticketID={ticket.ticketID}
        />
      ));
    }

    return <Content>{ticketsDiv}</Content>;
  }
}

export default TicketOptions;
