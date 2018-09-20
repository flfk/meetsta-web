import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import moment from 'moment-timezone';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

import actions from '../data/actions';

// const propTypes = {};

// const defaultProps = {};

class Status extends React.Component {
  state = {
    eventID: '',
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
    const surveyCompletions = registrations.reduce((total, registration) => {
      if (registration.hasDoneSurvey) {
        return total + 1;
      }
      return total;
    }, 0);
    const inviteCompletions = registrations.reduce((total, registration) => {
      if (registration.hasDoneInvite) {
        return total + 1;
      }
      return total;
    }, 0);
    const triviaCompletions = registrations.reduce((total, registration) => {
      if (registration.hasDoneTrivia) {
        return total + 1;
      }
      return total;
    }, 0);
    const totalSales = tickets.reduce((total, ticket) => total + ticket.priceTotal, 0);

    let registrations3complete = <div />;
    let registrationsSomeComplete = <div />;
    let registrations0complete = <div />;
    let winnersDiv = <div />;

    const registrationsAll = [];
    const registrationsSome = [];
    const registrationsNone = [];
    const registrationsWinners = registrations.filter(registration => registration.isWinner);

    if (registrations) {
      registrations.map(registration => {
        const { hasDoneTrivia, hasDoneInvite, hasDoneSurvey, isWinner } = registration;
        if (hasDoneSurvey && hasDoneInvite && hasDoneTrivia) {
          registrationsAll.push(registration.email);
        } else if (!hasDoneSurvey && !hasDoneInvite && !hasDoneTrivia) {
          registrationsNone.push(registration.email);
        } else {
          registrationsSome.push(registration.email);
        }
      });

      registrations3complete = registrationsAll.map(email => <div key={email}>{email}</div>);
      registrationsSomeComplete = registrationsSome.map(email => <div key={email}>{email}</div>);
      registrations0complete = registrationsNone.map(email => <div key={email}>{email}</div>);
      winnersDiv = registrationsWinners.map(registration => (
        <div key={registration.email}>{registration.email}</div>
      ));
    }

    return (
      <Content>
        <FONTS.H1>Registrations - {eventTitle}</FONTS.H1>
        <FONTS.P>{totalRegistrations} Total Registrations</FONTS.P>
        <FONTS.P>{surveyCompletions} Survey Completions</FONTS.P>
        <FONTS.P>{inviteCompletions} Friends Invited </FONTS.P>
        <FONTS.P>{triviaCompletions} Trivia Completed </FONTS.P>
        <FONTS.P>${totalSales} total sales </FONTS.P>
        <FONTS.H3>Winners</FONTS.H3>
        {winnersDiv}
        <FONTS.H3>3/3 tasks completed</FONTS.H3>
        {registrations3complete}
        <FONTS.H3>1/3 or 2/3 tasks completed</FONTS.H3>
        {registrationsSomeComplete}
        <FONTS.H3>0/3 tasks completed</FONTS.H3>
        {registrations0complete}
        <br />
      </Content>
    );
  }
}

// Status.propTypes = propTypes;
// Status.defaultProps = defaultProps;

export default Status;
