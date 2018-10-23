import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import React from 'react';

import Content from '../Content';
import Countdown from '../Countdown';
import Footer from './Footer';
import Fonts from '../../utils/Fonts';
import { getTimestamp } from '../../utils/Helpers';
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
    hasClaimedPoints: false
  };

  getFormattedNumber = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
    mixpanel.track('Claiming points', { influencer: influencer.username });
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
