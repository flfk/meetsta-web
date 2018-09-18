import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'qs';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Countdown from '../components/Countdown';
import FONTS from '../utils/Fonts';
import PopupTrivia from '../components/PopupTrivia';
import PopupInvite from '../components/PopupInvite';
import TicketCard from '../components/TicketCard';
import TicketImage from '../components/TicketImage';

import db from '../data/firebase';

const propTypes = {};

const defaultProps = {};

const DEFAULT_EVENT_ID = 'cookie-cutters';

const TICKET = {
  eventID: '',
  ticketID: '',
  name: 'VIP Package',
  price: 20,
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
  ],
  addOns: [
    { name: 'Additional 5 minutes', price: 5 },
    { name: 'Autographed selfie from your meet and greet', price: 5 },
    { name: 'Comment on your most recent photo', price: 5 },
    { name: 'Personalized thank you video', price: 5 },
    { name: 'Video recording of your meet and greet', price: 10 }
  ]
};

class WinnerCountdown extends React.Component {
  state = {
    nameFirst: '',
    email: '',
    eventID: '',
    influencerName: 'Cookie Cutters',
    isWinner: false,
    ticketNumber: null,
    hasDoneTrivia: false,
    showPopupTrivia: false,
    hasDoneInvite: false,
    showPopupInvite: false,
    hasDoneSurvey: false,
    surveyURL: 'https://goo.gl/forms/ArwJQbyWM0nkEfzN2',
    toCheckoutVIP: false
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
      eventID = DEFAULT_EVENT_ID;
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

  setFormattedData = async () => {
    const eventID = this.getEventId();

    try {
      const event = await this.getEventData(eventID);
      const formattedData = {
        eventID: eventID,
        title: event.title,
        influencerName: event.organiserName
      };
      this.setState({ eventID, ...formattedData });
    } catch (error) {
      console.error(error);
    }
  };

  handleVIPSelect = () => {
    this.setState({ toCheckoutVIP: true });
  };

  handleSurvey = () => {
    const { surveyURL } = this.state;
    window.open(surveyURL, '_blank');
    this.setState({ hasDoneSurvey: true });
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
      eventID,
      influencerName,
      isWinner,
      hasDoneTrivia,
      showPopupTrivia,
      hasDoneInvite,
      showPopupInvite,
      hasDoneSurvey,
      toCheckoutVIP
    } = this.state;

    if (toCheckoutVIP === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/checkout-vip',
            search: `?eventID=${eventID}`,
            state: { eventID: eventID, ticket: TICKET }
          }}
        />
      );

    const ticketVIPCard = (
      <TicketCard
        key={TICKET.ticketID}
        eventID={TICKET.eventID}
        ticketID={TICKET.ticketID}
        name={TICKET.name}
        description={TICKET.description}
        lengthMins={TICKET.lengthMins}
        price={TICKET.price}
        onSelect={this.handleVIPSelect}
        isPremium={TICKET.isPremium}
        extras={TICKET.extras}
      />
    );

    const triviaBtn = <Btn onClick={this.handleShowPopup('Trivia')}>Answer Trivia Question</Btn>;
    const triviaDone = (
      <FONTS.H3 noMarginBottom>
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
      <FONTS.H3 noMarginBottom>
        <span role="img" aria-label="Tick">
          ✅
        </span>{' '}
        Friend Invited!
      </FONTS.H3>
    );
    const invite = hasDoneInvite ? inviteDone : inviteBtn;
    const popupInvite = showPopupInvite ? (
      <PopupInvite
        handleClose={this.handleClosePopup('Invite')}
        handleComplete={this.handleComplete('Invite')}
        eventID={eventID}
        influencerName={influencerName}
      />
    ) : null;

    const surveyBtn = <Btn onClick={this.handleSurvey}>Answer Some Questions</Btn>;
    const surveyDone = (
      <FONTS.H3 noMarginBottom>
        <span role="img" aria-label="Tick">
          ✅
        </span>{' '}
        Questions Answered!
      </FONTS.H3>
    );
    const survey = hasDoneSurvey ? surveyDone : surveyBtn;

    const defaultContent = (
      <Content>
        <FONTS.H2 centered noMarginBottom>
          You haven't won yet. <br />
          <br />
          The next winners will be announced in:
        </FONTS.H2>
        <Countdown date={1537239600000} />
        <Content.Seperator />
        <FONTS.H2>Want to boost your chance of winning?</FONTS.H2>
        {survey}
        <br />
        {invite}
        <br />
        {trivia}
        <br />
        <br />
      </Content>
    );

    const winnerContent = (
      <Content>
        <FONTS.H1 centered noMarginBottom>
          <span role="img" aria-label="Party Popper">
            🎉
          </span>{' '}
          You won!
        </FONTS.H1>
        <br />
        <TicketImage eventID="meet-mackenzie-sol" isPremium={false} />
        <br />
        <Btn>Claim Your Free 1 min Meet & Greet</Btn>
        <br />
      </Content>
    );

    const status = isWinner ? winnerContent : defaultContent;

    return (
      <Content>
        {status}
        <Content.Seperator />
        <FONTS.H2 noMarginBottom>Want to {influencerName} for 10 mins not 1 min?</FONTS.H2>
        {ticketVIPCard}

        {popupTrivia}
        {popupInvite}
      </Content>
    );
  }
}

WinnerCountdown.propTypes = propTypes;
WinnerCountdown.defaultProps = defaultProps;

export default WinnerCountdown;
