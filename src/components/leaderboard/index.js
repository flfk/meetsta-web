import PropTypes from 'prop-types';
import React from 'react';

import Content from '../Content';
import Footer from './Footer';
import Fonts from '../../utils/Fonts';
import { getTimestamp } from '../../utils/helpers';
import LeaderboardRow from './LeaderboardRow';

import actions from '../../data/actions';

const POINTS_MULTIPLIER = 257;

const propTypes = {
  influencer: PropTypes.shape({
    username: PropTypes.string,
    displayName: PropTypes.string
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      comments: PropTypes.number,
      username: PropTypes.string,
      likes: PropTypes.number,
      profilePicUrl: PropTypes.string,
      points: PropTypes.number
    })
  ).isRequired
};

const defaultProps = {};

class Leaderboard extends React.Component {
  state = {
    signupInput: '',
    signupInputErrMsg: '',
    hasClaimedPoints: false,
    showPopupInfo: false
  };

  getFormattedNumber = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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

  handleChangeInput = event => this.setState({ signupInput: event.target.value });

  handleClaimPoints = () => {
    const { signupInput } = this.state;
    const { influencer } = this.props;
    if (signupInput === '') {
      this.setState({
        signupInputErrMsg: 'Type in your instagram username above to claim your points.'
      });
      return;
    }
    const user = {
      username: signupInput,
      influencer: influencer.username,
      timestamp: getTimestamp()
    };
    actions.leaderboardSignup(user);
    this.setState({ hasClaimedPoints: true });
  };

  handlePopupInfoClose = () => this.setState({ showPopupInfo: false });

  handlePopupInfoOpen = () => this.setState({ showPopupInfo: true });

  render() {
    const { signupInput, signupInputErrMsg, hasClaimedPoints } = this.state;
    const { influencer, data } = this.props;

    const leaderboardData = data;

    const leaderboard = leaderboardData.map((fan, index) => (
      <LeaderboardRow
        key={fan.username}
        points={this.getFormattedNumber(fan.points * POINTS_MULTIPLIER)}
        profileImgUrl={fan.profilePicUrl}
        rank={index + 1}
        trophy={this.getTrophy(index)}
        username={fan.username}
      />
    ));

    return (
      <div>
        <Content.PaddingBottom>
          <Fonts.H1 centered noMarginBottom>
            {influencer.displayName}
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
        <Footer
          handleSubmit={this.handleClaimPoints}
          hasClaimedPoints={hasClaimedPoints}
          onChange={this.handleChangeInput}
          value={signupInput}
          errMsg={signupInputErrMsg}
        />
      </div>
    );
  }
}

Leaderboard.propTypes = propTypes;
Leaderboard.defaultProps = defaultProps;

export default Leaderboard;
