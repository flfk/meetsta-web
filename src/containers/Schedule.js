import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import moment from 'moment-timezone';

import Content from '../components/Content';
import FONTS from '../utils/Fonts';

import actions from '../data/actions';

// const propTypes = {};

// const defaultProps = {};

class Schedule extends React.Component {
  state = {
    eventID: '',
    eventTitle: '',
    tickets: []
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
      this.setState({ tickets: ticketsSorted, eventTitle });
    } catch (error) {
      console.error('Error loading formatted data ', error);
    }
  };

  formatStartTime = startTime => {
    const time = moment.tz(startTime, 'America/Los_Angeles').format('H:mm a, dddd, MMM Do');
    return `${time} PDT`;
  };

  render() {
    const { tickets, eventTitle } = this.state;

    let schedule = <div />;

    if (tickets) {
      schedule = tickets.map(ticket => {
        const instaHandle = ticket.instaHandle ? (
          <FONTS.P>
            <strong>{ticket.instaHandle}</strong>
          </FONTS.P>
        ) : (
          <FONTS.ERROR noMargin>missing IG</FONTS.ERROR>
        );

        return (
          <div key={ticket.orderNum}>
            <Content.RowGrid>
              <div>
                {instaHandle}
                <FONTS.P>{this.formatStartTime(ticket.startTime)}</FONTS.P>
                <FONTS.P>{ticket.purchaseNameFirst}</FONTS.P>
                <FONTS.P>Order #{ticket.orderNum}</FONTS.P>
              </div>
              <div>
                <FONTS.P>
                  <strong>{ticket.name}</strong>
                </FONTS.P>
                {ticket.addOns.map(addOn => (
                  <div key={addOn}>
                    <FONTS.P>{addOn}</FONTS.P>
                  </div>
                ))}
              </div>
            </Content.RowGrid>
            <Content.Seperator />
          </div>
        );
      });
    }

    return (
      <Content>
        <FONTS.H1>Schedule - {eventTitle}</FONTS.H1>
        {schedule}
      </Content>
    );
  }
}

// Schedule.propTypes = propTypes;
// Schedule.defaultProps = defaultProps;

export default Schedule;
