import mixpanel from 'mixpanel-browser';
import React from 'react';
import { Redirect } from 'react-router-dom';

import Content from '../components/Content';
import Fonts from '../utils/Fonts';
import LeaderboardRow from '../components/LeaderboardRow';
import LeaderboardFooter from '../components/LeaderboardFooter';
import { getParams, getFormattedNumber } from '../utils/Helpers';

import DATA_LEADERBOARD_ALISTAR from '../data/leaderboards/Alistarbruback20181019';
import DATA_LEADERBOARD_JACKSON from '../data/leaderboards/Jacksonnfelt20181020';
import DATA_LEADERBOARD_JON from '../data/leaderboards/Jon_klaasen20181021';
import DATA_LEADERBOARD_SOCOOKIECUTTERS from '../data/leaderboards/Socookiecutters20181019';

const POINTS_MULTIPLIER = 257;

class Leaderboard extends React.Component {
  state = {
    fans: [],
    influencerDisplayName: '',
    influencerID: '',
    toStorePoints: false,
    toStoreMerch: false,
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
      case 'alistarbruback':
        return DATA_LEADERBOARD_ALISTAR;
      case 'jon_klaasen':
        return DATA_LEADERBOARD_JON;
      case 'jacksonnfelt':
        return DATA_LEADERBOARD_JACKSON;
      case 'socookiecutters':
        return DATA_LEADERBOARD_SOCOOKIECUTTERS;
      default:
        return null;
    }
  };

  getInfluencerDisplayName = influencerID => {
    switch (influencerID) {
      case 'alistarbruback':
        return 'Alistar Bruback';
      case 'jon_klaasen':
        return 'Jon Klaasen';
      case 'jacksonnfelt':
        return 'Jackson Felt';
      case 'socookiecutters':
        return 'Cookie Cutters';
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

  handleGetPoints = () => {
    console.log('handlingGetPoints');
    this.setState({ toStorePoints: true });
  };

  handleUsePoints = () => this.setState({ toStoreMerch: true });

  setLeaderboardData = () => {
    const influencerID = this.getInfluencerID();
    const fans = this.getFanData(influencerID);
    const influencerDisplayName = this.getInfluencerDisplayName(influencerID);
    this.setState({ fans, influencerDisplayName, influencerID });
  };

  goToGetPoints = influencerID => {
    return (
      <Redirect
        push
        to={{
          pathname: '/get-points',
          search: `?i=${influencerID}`,
        }}
      />
    );
  };

  goToGetMerch = influencerID => {
    return (
      <Redirect
        push
        to={{
          pathname: '/get-merch',
          search: `?i=${influencerID}`,
        }}
      />
    );
  };

  render() {
    // XX TODO replace with dynamic retrieval
    const { fans, influencerDisplayName, influencerID, toStorePoints, toStoreMerch } = this.state;

    if (toStorePoints) {
      return this.goToGetPoints(influencerID);
    }

    if (toStoreMerch) {
      return this.goToGetMerch(influencerID);
    }

    let leaderboard = null;
    if (fans) {
      leaderboard = fans.map((fan, index) => (
        <LeaderboardRow
          key={fan.username}
          points={getFormattedNumber(fan.points * POINTS_MULTIPLIER)}
          profileImgUrl={fan.profilePicUrl}
          rank={index + 1}
          trophy={this.getTrophy(index)}
          username={fan.username}
        />
      ));
    }

    return (
      <div>
        <Content.PaddingBottom>
          <Fonts.H1 centered noMarginBottom>
            {influencerDisplayName}
            's Top{' '}
            <span role="img" aria-label="100">
              💯
            </span>
          </Fonts.H1>
          <Fonts.H3 centered>Earn points by commenting on and liking posts.</Fonts.H3>
          {leaderboard}
          <br />
          <Content.Spacing />
          <Content.Spacing />
        </Content.PaddingBottom>
        <LeaderboardFooter
          handleGetPoints={this.handleGetPoints}
          handleUsePoints={this.handleUsePoints}
        />
      </div>
    );
  }
}

export default Leaderboard;
