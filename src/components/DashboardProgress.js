import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'rc-progress';
import styled from 'styled-components';

import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const propTypes = {
  levels: PropTypes.shape({
    current: PropTypes.shape({
      color: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pointsReq: PropTypes.number.isRequired,
    }).isRequired,
    next: PropTypes.shape({
      color: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pointsReq: PropTypes.number.isRequired,
    }),
  }),
  points: PropTypes.number.isRequired,
};

const defaultProps = {
  next: null,
};

const DashboardProgress = ({ levels, points }) => {
  const { current, next } = levels;

  let percent = null;
  let levelUpTxt = null;
  let nextEmoji = null;
  if (next) {
    percent = ((points - current.pointsReq) / next.pointsReq) * 100;
    nextEmoji = next.emoji;
    levelUpTxt = (
      <Fonts.P centered>
        {next.pointsReq - points} points to{' '}
        <NextClubText color={next.color}>{next.name}</NextClubText>
      </Fonts.P>
    );
  } else {
    percent = 100;
    nextEmoji = current.emoji;
    levelUpTxt = (
      <Fonts.P centered>
        You made it to the <NextClubText color={current.color}>{current.name}</NextClubText>
      </Fonts.P>
    );
  }

  return (
    <div>
      <ProgressBarContainer>
        <Emoji>{current.emoji}</Emoji>
        <Line
          percent={percent}
          strokeWidth={4}
          strokeColor={Colors.primary.green}
          style={ProgressBar}
          trailWidth={4}
        />
        <Emoji>{nextEmoji}</Emoji>
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
