import PropTypes from 'prop-types';
import React from 'react';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Countdown from '../components/Countdown';
import FONTS from '../utils/Fonts';
import PopupTrivia from '../components/PopupTrivia';
import PopupInvite from '../components/PopupInvite';
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
  state = {
    nameFirst: '',
    email: '',
    isWinner: false,
    ticketNumber: null,
    hasDoneTrivia: false,
    showPopupTrivia: false,
    hasDoneInvite: false,
    showPopupInvite: false,
    hasDoneSurvey: false,
    showPopupSurvey: false
  };

  handleVIPSelect = () => {
    //TODO
  };

  handleShowPopup = popupName => {
    const key = `showPopup${popupName}`;
    return () => this.setState({ [key]: true });
  };

  handleClosePopup = popupName => {
    const key = `showPopup${popupName}`;
    return () => this.setState({ [key]: false });
  };

  handleComplete = popupName => {
    const key = `hasDone${popupName}`;
    return () => this.setState({ [key]: true });
  };

  render() {
    const {
      hasDoneTrivia,
      showPopupTrivia,
      hasDoneInvite,
      showPopupInvite,
      hasDoneSurvey,
      showPopupSurvey
    } = this.state;

    const tickets = [TICKET];
    let ticketCards = <div />;
    if (tickets) {
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
          onSelect={this.handleVIPSelect}
          isPremium={ticket.isPremium}
          extras={ticket.extras}
        />
      ));
    }

    const triviaBtn = <Btn onClick={this.handleShowPopup('Trivia')}>Answer Trivia Question</Btn>;
    const triviaDone = (
      <FONTS.H3>
        <span role="img" aria-label="Tick">
          ✅
        </span>{' '}
        Trivia completed!
      </FONTS.H3>
    );
    const trivia = hasDoneTrivia ? triviaDone : triviaBtn;
    const popupTrivia = showPopupTrivia ? (
      <PopupTrivia
        handleClose={this.handleClosePopup('Trivia')}
        question="What was Cookie Cutters first band called?"
        answer="Urban Problems"
        handleComplete={this.handleComplete('Trivia')}
      />
    ) : null;

    const inviteBtn = <Btn onClick={this.handleShowPopup('Invite')}>Invite A Friend</Btn>;
    const inviteDone = (
      <FONTS.H3>
        <span role="img" aria-label="Tick">
          ✅
        </span>{' '}
        Friend Invited!
      </FONTS.H3>
    );
    const invite = hasDoneInvite ? inviteDone : inviteBtn;
    const popupInvite = showPopupInvite ? (
      <PopupInvite handleClose={this.handleClosePopup('Invite')} />
    ) : null;

    const surveyBtn = <Btn onClick={this.handleShowPopup('Survey')}>Answer Some Questions</Btn>;
    const surveyDone = (
      <FONTS.H3>
        <span role="img" aria-label="Tick">
          ✅
        </span>{' '}
        Questions Answered!
      </FONTS.H3>
    );
    const survey = hasDoneSurvey ? surveyDone : surveyBtn;

    return (
      <Content>
        <FONTS.H2 centered noMarginBottom>
          Next 5 winners announced in
        </FONTS.H2>
        <Countdown date={1537239600000} />
        <Content.Seperator />
        <FONTS.H2>Want to boost your chance of winning?</FONTS.H2>
        {trivia}
        <br />
        {invite}
        <br />
        {survey}
        <br />
        <Content.Seperator />
        <FONTS.H2 noMarginBottom>Want the VIP Experience?</FONTS.H2>
        {ticketCards}

        {popupTrivia}
        {popupInvite}
      </Content>
    );
  }
}

WinnerCountdown.propTypes = propTypes;
WinnerCountdown.defaultProps = defaultProps;

export default WinnerCountdown;
