import PropTypes from 'prop-types';
import React from 'react';
import { FaComment, FaHeart, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

import Content from './Content';
import Fonts from '../utils/Fonts';
import NotifBubble from '../assets/NotifBubble.png';

const propTypes = {
  comments: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
  uniqueTags: PropTypes.number.isRequired,
};

const defaultProps = {};

const DashboardMedals = ({ comments, likes, rank, uniqueTags }) => {
  return (
    <Content.Row>
      <Medal>
        <Emoji role="img" aria-label="medal">
          🍓
        </Emoji>
        <Fonts.P centered>20 POSTS LIKED</Fonts.P>
      </Medal>
      <Medal>
        <Emoji role="img" aria-label="medal">
          🦁
        </Emoji>
        <Fonts.P centered>100 COMMENTS</Fonts.P>
      </Medal>
      <Medal>
        <Emoji role="img" aria-label="medal">
          🔮
        </Emoji>
        <Fonts.P centered>10 FRIENDS TAGGED</Fonts.P>
      </Medal>
      <Medal>
        <Emoji role="img" aria-label="medal">
          💎
        </Emoji>
        <Fonts.P centered>TOP 100</Fonts.P>
      </Medal>
    </Content.Row>
  );
};

const Medal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90px;
`;

const Emoji = styled.span`
  font-size: 48px;
`;

const WrapperNotifBubble = styled.div`
  height: 55px;
  width: 55px;
  background-image: url(${NotifBubble});
  background-size: cover;

  display: flex;
  justify-content: center;
`;

DashboardMedals.propTypes = propTypes;
DashboardMedals.defaultProps = defaultProps;

export default DashboardMedals;
