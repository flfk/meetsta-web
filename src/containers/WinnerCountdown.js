import PropTypes from 'prop-types';
import React from 'react';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Countdown from '../components/Countdown';
import FONTS from '../utils/Fonts';
import TicketCard from '../components/TicketCard';

const propTypes = {};

const defaultProps = {};

const TICKET = {
  eventID: '',
  ticketID: '',
  name: '',
  price: 40,
  lengthMins: 7,
  description: '',
  isPremium: true,
  extras: [
    'Garaunteed Ticket to Meet & Greet',
    '10 minute one-on-one video call',
    'Autographed selfie from your meet and greet',
    'Comment on your most recent photo',
    'Personalized thank you video',
    'Video recording of your meet and greet'
  ]
};

class WinnerCountdown extends React.Component {
  state = {};

  handleTicketSelect = () => {
    //TODO
  };

  render() {
    const tickets = [TICKET];
    let ticketCards = <div />;
    if (tickets) {
      console.log('ticket exists');
      const ticketsSorted = tickets.sort((a, b) => a.price - b.price);
      ticketCards = ticketsSorted.map((ticket, index) => (
        <TicketCard
          key={ticket.ticketID}
          eventID={ticket.eventID}
          ticketID={ticket.ticketID}
          name={ticket.name}
          description={ticket.description}
          lengthMins={ticket.lengthMins}
          price={ticket.price}
          onSelect={this.handleTicketSelect}
          isPremium={ticket.isPremium}
          extras={ticket.extras}
        />
      ));
    }

    return (
      <Content>
        <FONTS.H2 centered noMarginBottom>
          Next 5 winners announced in
        </FONTS.H2>
        <Countdown date={1537239600000} />
        <Content.Seperator />
        <FONTS.H2>Want to boost your chance of winning?</FONTS.H2>
        <Btn>Answer a trivia question</Btn>
        <br />
        <Btn>Invite a friend</Btn>
        <br />
        <Btn>Submit a survey</Btn>
        <br />
        <Content.Seperator />
        <FONTS.H2 noMarginBottom>Get the VIP Package</FONTS.H2>
        {ticketCards}
      </Content>
    );
  }
}

WinnerCountdown.propTypes = propTypes;
WinnerCountdown.defaultProps = defaultProps;

export default WinnerCountdown;
