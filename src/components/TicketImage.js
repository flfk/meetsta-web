import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TICKET_PREMIUM from '../assets/ticketImages/TicketPremiumMackenzieSol.png';
import TICKET_STANDARD from '../assets/ticketImages/TicketStandardMackenzieSol.png';

const propTypes = {
  isPremium: PropTypes.bool
};

const defaultProps = {
  isPremium: false
};

const WrapperEventImage = styled.div`
  height: 200px;
  width: 344px;
  margin-bottom: 24px;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }
`;

const ImageTicket = props => {
  const { isPremium } = props;

  const ticketImg = isPremium ? (
    <img src={TICKET_PREMIUM} alt="Event ticket" />
  ) : (
    <img src={TICKET_STANDARD} alt="Event ticket" />
  );

  return <WrapperEventImage>{ticketImg}</WrapperEventImage>;
};

ImageTicket.propTypes = propTypes;
ImageTicket.defaultProps = defaultProps;

export default ImageTicket;
