import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Btn from '../components/Btn';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import { getParams } from '../utils/helpers';
import MEDIA from '../utils/Media';

import MasterclassTest0 from '../assets/teaserImages/MasterclassTest0.png';
import MasterclassTest1 from '../assets/teaserImages/MasterclassTest1.png';
import MasterclassTest2 from '../assets/teaserImages/MasterclassTest2.png';

import actions from '../data/actions';

class TicketOptions extends React.Component {
  state = {
    eventID: '',
    tickets: [],
    ticketSelectedID: '',
    toConfirmation: false
  };

  componentDidMount() {
    try {
      this.loadFormattedData();
      this.getEventID();
    } catch (err) {
      console.error('Error in getting documents', err);
    }
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
        influencerName: event.organiserName
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
    const { eventID, influencerName, tickets, ticketSelectedID, toCheckout } = this.state;

    if (toCheckout === true)
      return (
        <Redirect
          push
          to={{
            pathname: '/checkout',
            search: `?eventID=${eventID}&ticketID=${ticketSelectedID}`
          }}
        />
      );

    let ticketsDiv = null;
    if (tickets) {
      ticketsDiv = tickets.map((ticket, index) => {
        const btnTicket = ticket.isPremium ? (
          <Btn value={ticket.ticketID} primary fill="true" onClick={this.handleSelect}>
            Get Ticket
          </Btn>
        ) : (
          <Btn value={ticket.ticketID} fill="true" onClick={this.handleSelect}>
            Get Ticket
          </Btn>
        );

        let teaserImg = null;
        switch (index) {
          case 0:
            teaserImg = MasterclassTest0;
            break;
          case 1:
            teaserImg = MasterclassTest1;
            break;
          case 2:
            teaserImg = MasterclassTest2;
            break;
          default:
            teaserImg = null;
        }

        return (
          <OptionContainer key={ticket.ticketID}>
            <FONTS.H1>{ticket.name}</FONTS.H1>
            <WrapperTeaserImage>
              <img src={teaserImg} alt={influencerName} />
            </WrapperTeaserImage>
            <br />
            <FONTS.P centered>{ticket.description}</FONTS.P>
            <FONTS.H3>From ${ticket.priceBase}</FONTS.H3>
            {btnTicket}
            <br />
            <br />
          </OptionContainer>
        );
      });
    }

    return <Content>{ticketsDiv}</Content>;
  }
}

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperTeaserImage = styled.div`
  margin: auto;
  height: 272px;
  width: 416px;
  border-radius: 5px;
  margin: 8px 0;
  img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  ${MEDIA.tablet} {
    height: 208px;
    width: 312px;
  }
`;

export default TicketOptions;
