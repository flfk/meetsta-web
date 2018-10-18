import PropTypes from 'prop-types';
import React from 'react';

import Content from '../components/Content';
import Fonts from '../utils/Fonts';

import DATA_LEADERBOARD from '../data/leaderboards/Socookiecutters';

const POINTS_MULTIPLIER = 257;

const propTypes = {};

const defaultProps = {};

class LeaderboardSocookiecutters extends React.Component {
  state = {};

  getFormattedNumber = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  getLeaderBoardData = () => DATA_LEADERBOARD;

  getInfluencerName = () => 'Cookie Cutters';

  getTrophy = index => {
    switch (true) {
      case index === 0:
        return (
          <span role="img" aria-label="1">
            👑
          </span>
        );
      case index <= 5:
        return (
          <span role="img" aria-label="1">
            ⭐
          </span>
        );
      case index <= 10:
        return (
          <span role="img" aria-label="1">
            🏅
          </span>
        );
      default:
        return null;
    }
  };

  render() {
    const leaderboardData = this.getLeaderBoardData();

    const leaderboard = leaderboardData.map((fan, index) => (
      <Content.Row key={fan.handle}>
        <Fonts.H3>
          {index + 1}. {fan.handle} {this.getTrophy(index)}
        </Fonts.H3>
        <Fonts.H3>{this.getFormattedNumber(fan.points * POINTS_MULTIPLIER)}</Fonts.H3>
      </Content.Row>
    ));

    return (
      <Content>
        <Fonts.H1>
          {this.getInfluencerName()}
          's Top{' '}
          <span role="img" aria-label="100">
            💯
          </span>
        </Fonts.H1>
        {leaderboard}
        <br />
      </Content>
    );
  }
}

LeaderboardSocookiecutters.propTypes = propTypes;
LeaderboardSocookiecutters.defaultProps = defaultProps;

export default LeaderboardSocookiecutters;
