import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Btn from './Btn';
import COLORS from '../utils/Colors';
import Content from './Content';
import FONTS from '../utils/Fonts';
import TicketImage from './TicketImage';
import MEDIA from '../utils/Media';

const propTypes = {
  ticketID: PropTypes.string.isRequired,
  eventID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lengthMins: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isPremium: PropTypes.bool.isRequired,
  extras: PropTypes.array
};

const defaultProps = {
  extras: []
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // max-width: 342px;
  border: 1px solid ${COLORS.greys.light};
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  padding-top: 0px;
  margin-bottom: 32px;

  ${MEDIA.tablet} {
    box-shadow: none;
    border: none;
    margin-bottom: 16px;
  }
`;

const H1 = FONTS.H1.extend`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const H2 = FONTS.H2.extend`
  margin-top: 0;
  margin-bottom: 16px;
`;

const P = FONTS.P.extend`
  margin: 8px 0;
`;

const Ticket = props => {
  const {
    ticketID,
    eventID,
    name,
    description,
    lengthMins,
    price,
    onSelect,
    isPremium,
    extras
  } = props;

  let extrasDiv = <div />;

  if (extras) {
    extrasDiv = extras.map(extra => <P key={extra}>{extra}</P>);
  }

  const descriptionDiv = description ? <FONTS.P>{description}</FONTS.P> : null;

  const header = name ? <H1>{name}</H1> : null;

  return (
    <Container>
      <H1>{header}</H1>
      <TicketImage isPremium={isPremium} eventID={eventID} />
      <P>{lengthMins} minute one-on-one video call</P>
      {extrasDiv}
      {descriptionDiv}
      <Content.Seperator />
      <Content.Center>
        <H2>$ {price}</H2>
      </Content.Center>
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
