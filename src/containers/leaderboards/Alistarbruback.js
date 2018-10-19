import PropTypes from 'prop-types';
import React from 'react';

import Btn from '../../components/Btn';
import Content from '../../components/Content';
import Fonts from '../../utils/Fonts';
import PopupInfo from '../../components/leaderboards/PopupInfo';

import DATA_LEADERBOARD from '../../data/leaderboards/Alistarbruback20181019';

const POINTS_MULTIPLIER = 257;

const propTypes = {};

const defaultProps = {};

class LeaderboardSocookiecutters extends React.Component {
  state = {
    showPopupInfo: false
  };

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

  handlePopupInfoClose = () => this.setState({ showPopupInfo: false });

  handlePopupInfoOpen = () => this.setState({ showPopupInfo: true });

  render() {
    const { showPopupInfo } = this.state;

    const leaderboardData = this.getLeaderBoardData();

    const leaderboard = leaderboardData.map((fan, index) => (
      <Content.Row key={fan.username}>
        <Fonts.H3>
          {index + 1}. {fan.username} {this.getTrophy(index)}
        </Fonts.H3>
        <Fonts.H3>{this.getFormattedNumber(fan.points * POINTS_MULTIPLIER)}</Fonts.H3>
      </Content.Row>
    ));

    const popupInfo = showPopupInfo ? <PopupInfo handleClose={this.handlePopupInfoClose} /> : null;
    console.log('showPopupInfo is', showPopupInfo);

    return (
      <Content>
        <Fonts.H1>
          {this.getInfluencerName()}
          's Top{' '}
          <span role="img" aria-label="100">
            💯
          </span>
        </Fonts.H1>
        <Btn.Tertiary onClick={this.handlePopupInfoOpen}>How does it work?</Btn.Tertiary>
        {leaderboard}
        <br />
        {popupInfo}
      </Content>
    );
  }
}

LeaderboardSocookiecutters.propTypes = propTypes;
LeaderboardSocookiecutters.defaultProps = defaultProps;

export default LeaderboardSocookiecutters;
