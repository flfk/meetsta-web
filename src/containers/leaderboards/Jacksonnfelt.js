import mixpanel from 'mixpanel-browser';
import React from 'react';

import Leaderboard from '../../components/leaderboard';

import DATA_LEADERBOARD from '../../data/leaderboards/Jacksonnfelt20181020';

const INFLUENCER_DISPLAY_NAME = 'Jackson Felt';
const INFLUENCER_USERNAME = 'jacksonnfelt';

class LeaderboardJacksonnfelt extends React.Component {
  componentDidMount() {
    mixpanel.track('Visited Leaderboard', { influencer: INFLUENCER_USERNAME });
  }

  render() {
    const influencer = {
      displayName: INFLUENCER_DISPLAY_NAME,
      username: INFLUENCER_USERNAME
    };

    return <Leaderboard influencer={influencer} data={DATA_LEADERBOARD} />;
  }
}

export default LeaderboardJacksonnfelt;
