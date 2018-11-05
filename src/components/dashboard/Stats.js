import PropTypes from 'prop-types';
import React from 'react';
import { FaComment, FaHeart, FaUser } from 'react-icons/fa';
import styled from 'styled-components';

import Content from '../Content';
import Fonts from '../../utils/Fonts';
import NotifBubble from '../../assets/NotifBubble.png';

const propTypes = {
  comments: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  uniqueTags: PropTypes.number.isRequired,
};

const defaultProps = {};

const DashboardStats = ({ comments, likes, uniqueTags }) => {
  return (
    <Content.Row>
      <Stat>
        <WrapperNotifBubble>
          <StatText>
            <FaHeart /> {likes}
          </StatText>
        </WrapperNotifBubble>
        <Fonts.P centered>Posts you've liked</Fonts.P>
      </Stat>
      <Stat>
        <WrapperNotifBubble>
          <StatText>
            <FaComment /> {comments}
          </StatText>
        </WrapperNotifBubble>
        <Fonts.P centered>Comments you've made</Fonts.P>
      </Stat>
      <Stat>
        <WrapperNotifBubble>
          <StatText>
            <FaUser /> {uniqueTags}
          </StatText>
        </WrapperNotifBubble>
        <Fonts.P centered>Friends you've tagged</Fonts.P>
      </Stat>
    </Content.Row>
  );
};

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatText = styled.span`
  color: white;
  font-weight: bold;
  font-weight: 16px;
  margin-top: 12px;
`;

const WrapperNotifBubble = styled.div`
  height: 56px;
  width: 64px;
  background-image: url(${NotifBubble});
  background-size: cover;
  margin-bottom: 4px;

  display: flex;
  justify-content: center;
`;

DashboardStats.propTypes = propTypes;
DashboardStats.defaultProps = defaultProps;

export default DashboardStats;
