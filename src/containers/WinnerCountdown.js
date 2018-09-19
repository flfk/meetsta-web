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

// const DEFAULT_EVENT_ID = 'freemium-test';

const DEFAULT_REGISTRATION_ID = 'oops';

// const TICKET = {
//   eventID: 'meet-cookie-cutters',
//   ticketID: '',
//   name: 'VIP Package',
//   price: 20,
//   lengthMins: 10,
//   description: '',
//   isPremium: true,
//   extras: [
//     'Garaunteed Ticket to Meet & Greet',
//     '10 minute one-on-one video call',
//     'Autographed selfie from your meet and greet',
//     'Comment on your most recent photo',
//     'Personalized thank you video',
//     'Video recording of your meet and greet'
//   ],
//   addOns: [
//     { name: 'Additional 5 minutes', price: 5 },
//     { name: 'Autographed selfie from your meet and greet', price: 5 },
//     { name: 'Comment on your most recent photo', price: 5 },
//     { name: 'Personalized thank you video', price: 5 },
//     { name: 'Video recording of your meet and greet', price: 10 }
//   ]
// };

const ADD_ONS = [
  { name: 'Additional 5 minutes', price: 5, isAddOn: true },
  { name: 'Autographed selfie from your meet and greet', price: 5, isAddOn: true },
  { name: 'Comment on your most recent photo', price: 5, isAddOn: true },
  { name: 'Personalized thank you video', price: 5, isAddOn: true },
  { name: 'Video recording of your meet and greet', price: 10, isAddOn: true }
];

class WinnerCountdown extends React.Component {
  state = {
    registrationID: '',
    nameFirst: '',
    email: '',
    eventID: '',
    influencerName: '',
    isWinner: false,
    ticketNumber: null,
    triviaQuestion: '',
    triviaAnswer: '',
    hasDoneTrivia: false,
    showPopupTrivia: false,
    hasDoneInvite: false,
    showPopupInvite: false,
    hasDoneSurvey: false,
    surveyURL: 'https://goo.gl/forms/lAbNKLOjzHx4Tamx1',
    toCheckoutVIP: false,
    ticketVIP: {}
  };

  componentDidMount() {
    try {
      this.loadFormattedData();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
  }

  componentDidUpdate() {
    this.updateDocRegistration();
  }

  getRegistrationID = () => {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let { id } = params;
    if (!id) {
      id = DEFAULT_REGISTRATION_ID;
    }
    return id;
  };

  getDocEvent = async eventID => {
    try {
      const eventRef = db.collection('events').doc(eventID);
      const snapshot = await eventRef.get();
      const data = await snapshot.data();
      return data;
    } catch (error) {
      console.error('error getting event ', error);
    }
  };

  getDocRegistration = async registrationID => {
    try {
      const registrationRef = db.collection('registrations').doc(registrationID);
      const snapshot = await registrationRef.get();
      const data = await snapshot.data();
      return data;
    } catch (error) {
      console.error('error loading registration ', error);
    }
    return {};
  };

  getCollTickets = async eventID => {
    try {
      const ticketsRef = db
        .collection('events')
        .doc(eventID)
        .collection('tickets');
      const snapshot = await ticketsRef.get();
      const tickets = [];
      snapshot.forEach(snap => {
        const ticket = snap.data();
        const { id } = snap;
        ticket.ticketID = id;
        ticket['addOns'] = ADD_ONS;
        tickets.push(ticket);
      });
      return tickets;
    } catch (error) {
      console.error('Error getting tickets ', error);
    }
  };

  updateDocRegistration = async () => {
    const { registrationID, hasDoneTrivia, hasDoneSurvey, hasDoneInvite } = this.state;
    const registrationRef = db.collection('registrations').doc(registrationID);
    const updateDocRegistration = registrationRef.update({
      hasDoneTrivia,
      hasDoneSurvey,
      hasDoneInvite
    });
  };

  loadFormattedData = async () => {
    const registrationID = this.getRegistrationID();
    console.log('registration ID is ', registrationID);

    try {
      const registration = await this.getDocRegistration(registrationID);
      const formattedDataRegistration = {
        isWinner: registration.isWinner,
        email: registration.email,
        eventID: registration.eventID,
        hasDoneTrivia: registration.hasDoneTrivia,
        hasDoneInvite: registration.hasDoneInvite,
        hasDoneSurvey: registration.hasDoneSurvey
      };

      const event = await this.getDocEvent(formattedDataRegistration.eventID);
      console.log('eventID is ', formattedDataRegistration.eventID);
      const formattedDataEvent = {
        influencerName: event.organiserName,
        triviaQuestion: event.triviaQuestion,
        triviaAnswer: event.triviaAnswer
      };

      const tickets = await this.getCollTickets(formattedDataRegistration.eventID);
      const ticketVIP = tickets[0];
      ticketVIP['addOns'] = ADD_ONS;
      this.setState({
        registrationID,
        ...formattedDataRegistration,
        ...formattedDataEvent,
        ticketVIP
      });
    } catch (error) {
      console.error('error formatting Data', error);
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
      triviaQuestion,
      triviaAnswer,
      hasDoneTrivia,
      showPopupTrivia,
      hasDoneInvite,
      showPopupInvite,
      hasDoneSurvey,
      toCheckoutVIP,
      ticketVIP
    } = this.state;

    if (toCheckoutVIP === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/checkout-vip',
            search: `?eventID=${eventID}`,
            state: { eventID: eventID }
          }}
        />
      );

    // let ticketVIPCard = <div />;

    // if (ticketVIP.name) {
    //   ticketVIPCard = (
    //     <TicketCard
    //       key={ticketVIP.ticketID}
    //       eventID={ticketVIP.eventID}
    //       ticketID={ticketVIP.ticketID}
    //       name={ticketVIP.name}
    //       description={ticketVIP.description}
    //       lengthMins={ticketVIP.lengthMins}
    //       price={ticketVIP.price}
    //       onSelect={this.handleVIPSelect}
    //       isPremium={ticketVIP.isPremium}
    //       extras={ticketVIP.addOns}
    //     />
    //   );
    // }

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
        question={triviaQuestion}
        answer={triviaAnswer}
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

    // TO DO INVITE
    // <br />
    // {invite}

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
        {trivia}
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
        <FONTS.H3 centered>You will recieve an email shortly with the details </FONTS.H3>
        <br />
      </Content>
    );

    const status = isWinner ? winnerContent : defaultContent;

    return (
      <Content>
        {status}
        <Content.Seperator />
        <FONTS.H2 noMarginBottom>Want to talk to {influencerName} for 10 mins not 1 min?</FONTS.H2>
        <br />
        <Btn primary onClick={this.handleVIPSelect}>
          Get VIP Package
        </Btn>
        <br />
        <br />

        {popupTrivia}
        {popupInvite}
      </Content>
    );
  }
}

WinnerCountdown.propTypes = propTypes;
WinnerCountdown.defaultProps = defaultProps;

export default WinnerCountdown;
