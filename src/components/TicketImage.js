import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

import TicketRegular from '../assets/TicketRegular.png';
import TicketPremium from '../assets/TicketPremium.png';
import MEDIA from '../utils/Media';
import COLORS from '../utils/Colors';

const propTypes = {
  eventID: PropTypes.string.isRequired,
  influencerName: PropTypes.string.isRequired,
  dateEnd: PropTypes.number,
  dateStart: PropTypes.number,
  isPremium: PropTypes.bool,
};

const defaultProps = {
  isPremium: false,
  dateEnd: 0,
  dateStart: 0,
};

const TicketImage = props => {
  const { isPremium, influencerName, dateEnd, dateStart } = props;

  const ticketBackground = isPremium ? TicketPremium : TicketRegular;

  const title = isPremium ? (
    <Title isPremium>{influencerName.toUpperCase()}</Title>
  ) : (
    <Title>{influencerName.toUpperCase()}</Title>
  );

  const subtitle = isPremium ? (
    <Subtitle isPremium>ONLINE MEET & GREET</Subtitle>
  ) : (
    <Subtitle>ONLINE MEET & GREET</Subtitle>
  );

  const stubTitle = isPremium ? (
    <StubTitle isPremium>{influencerName.toUpperCase()}</StubTitle>
  ) : (
    <StubTitle>{influencerName.toUpperCase()}</StubTitle>
  );

  const timeStart = moment.tz(dateStart, 'America/Los_Angeles');
  const timeEnd = moment.tz(dateEnd, 'America/Los_Angeles');

  const day = timeStart.format('dddd');
  const dateLong = timeStart.format('MMM Do, YYYY');
  const dateShort = timeStart.format('MMM Do');
  const year = timeStart.format('YYYY');
  const timeRange = `${timeStart.format('H:mm')} - ${timeEnd.format('H:mm')} (PDT)`;

  return (
    <WrapperTicketImage>
      {title}
      {subtitle}
      <Time>
        <div>{day.toUpperCase()}</div>
        <div>{dateLong.toUpperCase()}</div>
        <div>{timeRange.toUpperCase()}</div>
      </Time>
      {stubTitle}
      <StubSubtitle>
        {dateShort} <br />
        {year}
      </StubSubtitle>
      <img src={ticketBackground} alt="Event ticket" />
    </WrapperTicketImage>
  );
};

const WrapperTicketImage = styled.div`
  align-self: center;
  position: relative;
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

const Title = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 64px;
  width: 292px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 32px;
  color: ${props => (props.isPremium ? 'white' : COLORS.primary.red)};
  font-family: PTSansNarrow;
  font-weight: 800;
  letter-spacing: 0.08em;

  ${MEDIA.tablet} {
    height: 48px;
    width: 220px;
    font-size: 24px;
  }

  // background-color: blue;
  // opacity: 0.5;
`;

const Subtitle = styled.div`
  position: absolute;
  left: 0px;
  top: 52px;
  height: 32px;
  width: 292px;
  font-size: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => (props.isPremium ? 'white' : COLORS.primary.red)};
  font-family: Nunito, sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;

  ${MEDIA.tablet} {
    left: 0px;
    top: 44px;
    height: 24px;
    width: 220px;
    font-size: 12px;
  }

  // background-color: green;
  // opacity: 0.5;
`;

const Time = styled.div`
  position: absolute;
  left: 0px;
  top: 96px;
  height: 58px;
  width: 292px;
  font-size: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: Nunito, sans-serif;
  font-weight: 600;
  color: white;

  ${MEDIA.tablet} {
    left: 0px;
    top: 74px;
    height: 46px;
    width: 220px;
    font-size: 8px;
  }

  // background-color: orange;
  // opacity: 0.5;
`;

const StubTitle = styled.div`
  position: absolute;
  right: 2px;
  top: 42px;
  height: 20px;
  width: 108px;
  font-size: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Nunito, sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;

  color: #c6c6c6;
  background-color: ${props => (props.isPremium ? '#f4f4f4' : '#F8F8F8')};

  ${MEDIA.tablet} {
    right: 2px;
    top: 32px;
    height: 16px;
    width: 82px;
    font-size: 6px;
  }

  // background-color: red;
  // opacity: 0.5;
`;

const StubSubtitle = styled.div`
  position: absolute;
  right: 52px;
  top: 68px;
  height: 40px;
  width: 56px;
  font-size: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-family: Nunito, sans-serif;
  font-weight: 400;
  letter-spacing: 0.05em;

  color: #c6c6c6;

  ${MEDIA.tablet} {
    right: 38px;
    top: 50px;
    height: 32px;
    width: 46px;
    font-size: 10px;
  }

  // background-color: red;
  // opacity: 0.5;
`;

TicketImage.propTypes = propTypes;
TicketImage.defaultProps = defaultProps;

export default TicketImage;
