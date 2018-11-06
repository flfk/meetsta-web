import mixpanel from 'mixpanel-browser';
import React from 'react';
import { Redirect } from 'react-router-dom';

import Content from '../components/Content';
import Fonts from '../utils/Fonts';
import LeaderboardRow from '../components/LeaderboardRow';
import LeaderboardFooter from '../components/LeaderboardFooter';
import { getParams } from '../utils/Helpers';

import DATA_LEADERBOARD_JON from '../data/dashboards/fanData-jon_klaasen';

class Leaderboard extends React.Component {
  state = {
    fans: [],
    influencerDisplayName: '',
    influencerID: '',
    toDashboard: false,
  };

  componentDidMount() {
    this.setLeaderboardData();
    const influencerID = this.getInfluencerID();
    mixpanel.track('Visited Leaderboard', { influencerID });
  }

  getInfluencerID = () => {
    const { i } = getParams(this.props);
    return i;
  };

  getFanData = influencerID => {
    switch (influencerID) {
      case 'jon_klaasen':
        return DATA_LEADERBOARD_JON.slice(0, 100);
      default:
        return DATA_LEADERBOARD_JON.slice(0, 100);
    }
  };

  getInfluencerDisplayName = influencerID => {
    switch (influencerID) {
      case 'jon_klaasen':
        return 'Jon Klaasen';
      case 'mackenziesol':
        return 'Mackenzie Sol';
      case 'raeganbeast':
        return 'Raegan Beast';
      case 'andreswilley':
        return 'Andre Swilley';
      default:
        return null;
    }
  };

  getTrophy = index => {
    switch (true) {
      case index === 0:
        return (
          <span role="img" aria-label="1">
            👑
          </span>
        );
      case index < 10:
        return (
          <span role="img" aria-label="1">
            ⭐
          </span>
        );
      case index < 30:
        return (
          <span role="img" aria-label="1">
            🏅
          </span>
        );
      default:
        return <span />;
    }
  };

  handleClaimPoints = () => {
    console.log('handleClaimPoints');
    const { influencerID } = this.state;
    this.setState({ toDashboard: true });
  };

  setLeaderboardData = () => {
    const influencerID = this.getInfluencerID();
    const fans = this.getFanData(influencerID);
    const influencerDisplayName = this.getInfluencerDisplayName(influencerID);
    this.setState({ fans, influencerDisplayName, influencerID });
  };

  goToDashboard = influencerID => (
    <Redirect
      push
      to={{
        pathname: '/dashboard',
        search: `?i=${influencerID}`,
      }}
    />
  );

  render() {
    // XX TODO replace with dynamic retrieval
    const { fans, influencerDisplayName, influencerID, toDashboard } = this.state;

    if (toDashboard) {
      return this.goToDashboard(influencerID);
    }

    let leaderboard = null;
    if (fans) {
      leaderboard = fans.map((fan, index) => (
        <LeaderboardRow
          key={fan.username}
          points={fan.points}
          profilePicURL={fan.profilePicURL}
          rank={index + 1}
          trophy={this.getTrophy(index)}
          username={fan.username}
        />
      ));
    }

    return (
      <div>
        <Content>
          <Fonts.H1 centered noMarginBottom>
            {influencerDisplayName}
            's Top{' '}
            <span role="img" aria-label="100">
              💯
            </span>
          </Fonts.H1>
          <br />
          <Fonts.P centered>
            Earn points by liking, commenting and tagging friends on @{influencerID}
            's Instagram posts.
          </Fonts.P>
          <br />
          {leaderboard}
          <Content.Spacing />
          <Content.Spacing />
          <Content.Spacing />
          <Content.Spacing />
        </Content>
        <LeaderboardFooter handleClaimPoints={this.handleClaimPoints} />
      </div>
    );
  }
}

export default Leaderboard;
