import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TICKET_IMAGE from '../assets/TicketTest.png';

const propTypes = {};

const defaultProps = {};

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
  return (
    <WrapperEventImage>
      <img src={TICKET_IMAGE} alt="Event ticket" />
    </WrapperEventImage>
  );
};

ImageTicket.propTypes = propTypes;
ImageTicket.defaultProps = defaultProps;

export default ImageTicket;
