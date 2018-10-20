import React from 'react';

import Leaderboard from '../../components/leaderboard';

import DATA_LEADERBOARD from '../../data/leaderboards/Alistarbruback20181019';

const INFLUENCER_DISPLAY_NAME = 'Alistar Bruback';
const INFLUENCER_USERNAME = 'alistarbruback';

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
