import React from 'react';

import Leaderboard from '../../components/leaderboard';

import DATA_LEADERBOARD from '../../data/leaderboards/Jacksonnfelt20181020';

const INFLUENCER_DISPLAY_NAME = 'Jackson Felt';
const INFLUENCER_USERNAME = 'jacksonnfelt';

class LeaderboardAlistarBruback extends React.Component {
  render() {
    const influencer = {
      displayName: INFLUENCER_DISPLAY_NAME,
      username: INFLUENCER_USERNAME
    };

    return <Leaderboard influencer={influencer} data={DATA_LEADERBOARD} />;
  }
}

export default LeaderboardAlistarBruback;
