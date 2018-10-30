import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'rc-progress';
import styled from 'styled-components';

import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const propTypes = {
  points: PropTypes.number.isRequired,
};

const defaultProps = {};

const FAN_RANKS = [
  { color: 'green', index: 0, name: 'Green Fan Club', pointsReq: 0 },
  { color: 'purple', index: 1, name: 'Purple Fan Club', pointsReq: 10000 },
  { color: 'orange', index: 2, name: 'Orange Fan Club', pointsReq: 100000 },
];

const DashboardProgress = ({ points }) => {
  const getEmoji = rank => {
    switch (rank.color) {
      case 'green':
        return '💚';
      case 'purple':
        return '💜';
      case 'orange':
        return '🧡';
      default:
        return '';
    }
  };

  const fanRankCurrent = FAN_RANKS.reduce((aggr, rank) => {
    if (rank.pointsReq <= points) {
      return rank;
    }
    return aggr;
  }, {});

  const fanRankNext = FAN_RANKS[fanRankCurrent.index + 1]
    ? FAN_RANKS[fanRankCurrent.index + 1]
    : fanRankCurrent;

  const isFinalRank = fanRankCurrent.index === FAN_RANKS.length - 1;

  const percent = isFinalRank
    ? 100
    : ((points - fanRankCurrent.pointsReq) / fanRankNext.pointsReq) * 100;

  const levelUpTxt = isFinalRank ? (
    <Fonts.P centered>
      Congratulations you've made it to the{' '}
      <NextClubText color={fanRankNext.color}>{fanRankNext.name}</NextClubText>
    </Fonts.P>
  ) : (
    <Fonts.P centered>
      1250 points to <NextClubText color={fanRankNext.color}>{fanRankNext.name}</NextClubText>
    </Fonts.P>
  );

  return (
    <div>
      <ProgressBarContainer>
        <Emoji>{getEmoji(fanRankCurrent)}</Emoji>
        <Line
          percent={percent}
          strokeWidth={4}
          strokeColor={Colors.primary.green}
          style={ProgressBar}
          trailWidth={4}
        />
        <Emoji>{getEmoji(fanRankNext)}</Emoji>
      </ProgressBarContainer>
      {levelUpTxt}
    </div>
  );
};

const NextClubText = styled.span`
  font-weight: bold;
  color: ${props => (props.color ? props.color : '')};
`;

const Emoji = styled.span`
  font-size: 24px;
`;

const ProgressBar = { width: 'calc(100% - 64px)', height: '16px' };

const ProgressBarContainer = styled.div`
  display: flex;
  height: 32px;
  justify-content: space-between;
  align-items: center;
`;

DashboardProgress.propTypes = propTypes;
DashboardProgress.defaultProps = defaultProps;

export default DashboardProgress;
