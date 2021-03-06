import PropTypes from 'prop-types';
import React from 'react';
import { FaComment, FaTrophy, FaUserTag } from 'react-icons/fa';
import styled from 'styled-components';

import Coins from './Coins';
import Content from '../Content';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import { getShortenedNumber } from '../../utils/Helpers';
import NotifBubble from '../../assets/NotifBubble.png';

const propTypes = {
  pointsComments: PropTypes.number.isRequired,
  pointsTags: PropTypes.number.isRequired,
  pointsTrophies: PropTypes.number.isRequired,
};

const defaultProps = {};

const DashboardStats = ({ pointsComments, pointsTags, pointsTrophies }) => {
  return (
    <Content.Row alignTop>
      <Stat>
        <IconText>
          <FaComment />
        </IconText>{' '}
        <StatText>
          <Coins.Icon small /> {getShortenedNumber(pointsComments) || 0}
        </StatText>
        <Fonts.P centered>From your comments</Fonts.P>
      </Stat>

      <Stat>
        <IconText>
          <FaUserTag />
        </IconText>{' '}
        <StatText>
          <Coins.Icon small /> {getShortenedNumber(pointsTags) || 0}
        </StatText>
        <Fonts.P centered>From tagging your friends</Fonts.P>
      </Stat>

      <Stat>
        <IconText>
          <FaTrophy />
        </IconText>{' '}
        <StatText>
          <Coins.Icon small /> {getShortenedNumber(pointsTrophies) || 0}
        </StatText>
        <Fonts.P centered>From your unlocked trophies</Fonts.P>
      </Stat>
    </Content.Row>
  );
};

const IconText = styled.span`
  color: ${Colors.primary.red};
  font-size: 24px;
  margin-bottom: 4px;
`;

const Stat = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

const StatText = styled.span`
  color: ${Colors.greys.primary};
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 4px;
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
