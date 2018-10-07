import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Btn from './Btn';
import FONTS from '../utils/Fonts';
import MEDIA from '../utils/Media';

const propTypes = {
  description: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  priceBase: PropTypes.number.isRequired,
  previewImgURL: PropTypes.string.isRequired,
  ticketID: PropTypes.string.isRequired
};

const defaultProps = {};

const CardOptions = props => {
  const { description, isPremium, handleSelect, name, priceBase, previewImgURL, ticketID } = props;

  const previewImg = previewImgURL ? <img src={previewImgURL} alt={description} /> : null;

  const btnTicket = isPremium ? (
    <Btn value={ticketID} primary fill="true" onClick={handleSelect}>
      Get Ticket
    </Btn>
  ) : (
    <Btn value={ticketID} fill="true" onClick={handleSelect}>
      Get Ticket
    </Btn>
  );

  return (
    <Container>
      <FONTS.H1>{name}</FONTS.H1>
      <WrapperPreviewImg>{previewImg}</WrapperPreviewImg>
      <br />
      <FONTS.P centered>{description}</FONTS.P>
      <FONTS.H3>From ${priceBase}</FONTS.H3>
      {btnTicket}
      <br />
      <br />
    </Container>
  );
};

CardOptions.propTypes = propTypes;
CardOptions.defaultProps = defaultProps;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperPreviewImg = styled.div`
  margin: auto;
  height: 400px;
  width: 600px;
  border-radius: 5px;
  margin: 8px 0;
  img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  ${MEDIA.tablet} {
    height: 224px;
    width: 336px;
  }
`;

export default CardOptions;
