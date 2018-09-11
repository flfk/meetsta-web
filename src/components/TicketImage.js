import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TICKET_PREMIUM_MACKENZIE from '../assets/ticketImages/TicketPremiumMackenzieSol.png';
import TICKET_STANDARD_MACKENZIE from '../assets/ticketImages/TicketStandardMackenzieSol.png';
import TICKET_PREMIUM_LEXI from '../assets/ticketImages/TicketPremiumLexiJayde.png';
import TICKET_STANDARD_LEXI from '../assets/ticketImages/TicketStandardLexiJayde.png';
import MEDIA from '../utils/Media';

const propTypes = {
  eventID: PropTypes.string.isRequired,
  isPremium: PropTypes.bool
};

const defaultProps = {
  isPremium: false
};

const WrapperTicketImage = styled.div`
  height: 200px;
  width: 416px;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  margin: 8px 0;
  img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  ${MEDIA.tablet} {
    height: 156px;
    width: 312px;
  }
`;

const ImageTicket = props => {
  const { isPremium, eventID } = props;

  let ticketImg = null;
  switch (eventID) {
    case 'meet-lexi-jayde':
      if (isPremium) {
        ticketImg = TICKET_PREMIUM_LEXI;
      } else {
        ticketImg = TICKET_STANDARD_LEXI;
      }
      break;
    case 'meet-mackenzie-sol':
      if (isPremium) {
        ticketImg = TICKET_PREMIUM_MACKENZIE;
      } else {
        ticketImg = TICKET_STANDARD_MACKENZIE;
      }
      break;
    default:
      if (isPremium) {
        ticketImg = TICKET_PREMIUM_MACKENZIE;
      } else {
        ticketImg = TICKET_STANDARD_MACKENZIE;
      }
  }

  return (
    <WrapperTicketImage>
      <img src={ticketImg} alt="Event ticket" />
    </WrapperTicketImage>
  );
};

ImageTicket.propTypes = propTypes;
ImageTicket.defaultProps = defaultProps;

export default ImageTicket;
