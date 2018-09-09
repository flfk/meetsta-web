import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Btn from '../components/Btn';
import COLORS from '../utils/Colors';
import Content from '../components/Content';
import FONTS from '../utils/Fonts';
import TicketImage from '../components/TicketImage';

const propTypes = {
  ticketID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lengthMins: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isPremium: PropTypes.bool.isRequired
};

const defaultProps = {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 342px;
  border: 1px solid ${COLORS.greys.light};
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin-bottom: 32px;
`;

const Ticket = props => {
  const { ticketID, name, description, lengthMins, price, onSelect, isPremium } = props;

  return (
    <Container>
      <FONTS.H2>{name}</FONTS.H2>
      <TicketImage isPremium={isPremium} />
      <FONTS.H1>{lengthMins} mins</FONTS.H1>
      <FONTS.H1>$ {price}</FONTS.H1>
      <FONTS.P>{description}</FONTS.P>
      <Content.Seperator />
      <div>
        <Btn.Full primary onClick={onSelect} id={ticketID}>
          Get Ticket
        </Btn.Full>
      </div>
    </Container>
  );
};

Ticket.propTypes = propTypes;
Ticket.defaultProps = defaultProps;

export default Ticket;
