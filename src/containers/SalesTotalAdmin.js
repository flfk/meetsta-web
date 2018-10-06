import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import moment from 'moment-timezone';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

import actions from '../data/actions';

// const propTypes = {};

// const defaultProps = {};

const MEETSTA_COMMISSION = 0.15;

const TEST_EVENT_IDS = [
  'freemium-test',
  'cookie-cutters',
  'meet-lexi-jayde',
  'meet-mackenzie-sol',
  'masterclass-test'
];

class Sales extends React.Component {
  state = {
    events: [
      {
        eventID: '',
        eventTitle: '',
        tickets: [],
        registrations: []
      }
    ]
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
    console.log('loading all events');
    const eventsColl = await actions.getDocsEvent();
    const events = eventsColl.map(async event => {
      const { eventID } = event;
      const data = this.getEventData(eventID);
      return data;
    });
    Promise.all(events).then(completed => this.setState({ events: completed }));
  };

  getEventData = async eventID => {
    try {
      const event = await actions.getDocEvent(eventID);
      const eventTitle = event.title;

      const tickets = await actions.getDocsTicketsSold(eventID);
      const ticketsSorted = tickets.sort((a, b) => a.startTime - b.startTime);

      const registrations = await actions.getDocsRegistrations(eventID);

      return { eventID, tickets: ticketsSorted, eventTitle, registrations };

      // const updatedEvent = { eventID, tickets: ticketsSorted, eventTitle, registrations };
      // const { events } = this.state;
      // const updatedEvents = events.filter(item => item.eventID !== eventID).push(updatedEvent);
      // this.setState({ events: updatedEvents });
    } catch (error) {
      console.error('Error loading formatted data ', error);
    }
  };

  formatStartTime = startTime => {
    const time = moment.tz(startTime, 'America/Los_Angeles').format('H:mm a, dddd, MMM Do');
    return `${time} PDT`;
  };

  getRevenue = event => event.tickets.reduce((total, ticket) => total + ticket.priceTotal, 0);

  getRevenueTickets = event => event.tickets.reduce((total, ticket) => total + ticket.priceBase, 0);

  getRevenueAddOns = event =>
    event.tickets.reduce((total, ticket) => total + (ticket.priceTotal - ticket.priceBase), 0);

  getTicketsSolds = event => event.tickets.length;

  getAddOnsSolds = event =>
    event.tickets.reduce((total, ticket) => total + ticket.addOns.length, 0);

  getRegistrations = event => event.registrations.length;

  getTaskCompletions = (event, taskID) =>
    event.registrations.reduce((total, registration) => {
      if (registration[taskID]) {
        return total + 1;
      }
      return total;
    }, 0);

  render() {
    const { events } = this.state;

    // const totalRegistrations = registrations.length;
    // const surveyCompletions = registrations.reduce((total, registration) => {
    //   if (registration.hasDoneSurvey) {
    //     return total + 1;
    //   }
    //   return total;
    // }, 0);
    // const inviteCompletions = registrations.reduce((total, registration) => {
    //   if (registration.hasDoneInvite) {
    //     return total + 1;
    //   }
    //   return total;
    // }, 0);
    // const triviaCompletions = registrations.reduce((total, registration) => {
    //   if (registration.hasDoneTrivia) {
    //     return total + 1;
    //   }
    //   return total;
    // }, 0);

    // const totalRevenue = tickets.reduce((total, ticket) => total + ticket.priceTotal, 0);
    // const totalRevenueInfluencer = totalRevenue * (1 - MEETSTA_COMMISSION);
    // const ticketsSold = tickets.length;
    // const addOnsSold = tickets.reduce((total, ticket) => total + ticket.addOns.length, 0);

    let totalRevenue = 0;
    let totalRevenueTickets = 0;
    let totalRevenueAddOns = 0;
    let totalTicketsSold = 0;
    let totalAddOnsSold = 0;
    let totalRegistrations = 0;
    let totalSurveyCompletions = 0;
    let totalInviteCompletions = 0;
    let totalTriviaCompletions = 0;

    console.log(events);

    let eventsDiv = <div />;
    if (events) {
      const eventsFiltered = events.filter(event => !(TEST_EVENT_IDS.indexOf(event.eventID) > -1));
      eventsDiv = eventsFiltered.map(event => {
        const revenue = this.getRevenue(event);
        const revenueTickets = this.getRevenueTickets(event);
        const revenueAddOns = this.getRevenueAddOns(event);
        const ticketsSold = this.getTicketsSolds(event);
        const addOnsSold = this.getAddOnsSolds(event);
        const registrations = this.getRegistrations(event);
        const surveyCompletions = this.getTaskCompletions(event, 'hasDoneSurvey');
        const inviteCompletions = this.getTaskCompletions(event, 'hasDoneInvite');
        const triviaCompletions = this.getTaskCompletions(event, 'hasDoneTrivia');

        totalRevenue += revenue;
        totalRevenueTickets += revenueTickets;
        totalRevenueAddOns += revenueAddOns;
        totalTicketsSold += ticketsSold;
        totalAddOnsSold += addOnsSold;
        totalRegistrations += registrations;
        totalSurveyCompletions += surveyCompletions;
        totalInviteCompletions += inviteCompletions;
        totalTriviaCompletions += triviaCompletions;

        return (
          <div key={event.eventID}>
            <FONTS.H3>{event.eventID}</FONTS.H3>
            <FONTS.P>${revenue.toFixed(2)} total revenue</FONTS.P>
            <br />
            <FONTS.P>${revenueTickets.toFixed(2)} ticket revenue</FONTS.P>
            <br />
            <FONTS.P>${revenueAddOns.toFixed(2)} add on revenue</FONTS.P>
            <br />
            <FONTS.P>{ticketsSold} tickets sold</FONTS.P>
            <br />
            <FONTS.P>{addOnsSold} addOns sold</FONTS.P>
            <br />
            <FONTS.P>{registrations} registrations</FONTS.P>
            <br />
            <FONTS.P>{surveyCompletions} surveys</FONTS.P>
            <br />
            <FONTS.P>{inviteCompletions} invites</FONTS.P>
            <br />
            <FONTS.P>{triviaCompletions} trivia</FONTS.P>
            <br />
          </div>
        );
      });
    }

    return (
      <Content>
        <FONTS.H1>Total Sales Summary</FONTS.H1>
        <FONTS.H3>
          ${totalRevenue.toFixed(2)} <FONTS.P>total revenue</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          ${totalRevenueTickets.toFixed(2)} <FONTS.P>total ticket revenue</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          ${totalRevenueAddOns.toFixed(2)} <FONTS.P>total addOn revenue</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          ${(totalRevenue * (1 - MEETSTA_COMMISSION)).toFixed(2)}{' '}
          <FONTS.P>influencer revenue</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          ${(totalRevenue * MEETSTA_COMMISSION).toFixed(2)} <FONTS.P>Meetsta revenue</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          {totalTicketsSold} <FONTS.P>tickets sold</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          {totalAddOnsSold} <FONTS.P>addOns sold</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          {totalRegistrations} <FONTS.P>registrations</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          {totalSurveyCompletions} <FONTS.P>surveys completed</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          {totalInviteCompletions} <FONTS.P>invites</FONTS.P>
        </FONTS.H3>
        <FONTS.H3>
          {totalTriviaCompletions} <FONTS.P>trivia completed</FONTS.P>
        </FONTS.H3>
        <Content.Seperator />
        <FONTS.H1>Revenue by Event</FONTS.H1>
        {eventsDiv}
        <br />
        <br />
      </Content>
    );
  }
}

// Sales.propTypes = propTypes;
// Sales.defaultProps = defaultProps;

export default Sales;
