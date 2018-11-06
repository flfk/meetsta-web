import mixpanel from 'mixpanel-browser';
// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import actions from '../data/actions';
import Coins from '../components/dashboard/Coins';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';
import { getTimestamp, getParams, getFormattedNumber } from '../utils/Helpers';
import { InfluencerProfile, Medals, MerchRow, Profile, Stats } from '../components/dashboard';
import PopupComingSoon from '../components/dashboard/PopupComingSoon';
import PopupGetPrize from '../components/dashboard/PopupGetPrize';
import PopupNoUser from '../components/dashboard/PopupNoUser';

import FAN_DATA from '../data/dashboards/fanData-jon_klaasen';

// const propTypes = {};

// const defaultProps = {};

class Dashboard extends React.Component {
  state = {
    influencer: {
      coinName: '',
      fanCount: 0,
      name: '',
      username: '',
    },
    merch: [],
    merchSelected: {
      merchID: '',
      name: '',
      price: 0,
    },
    showPopupComingSoon: false,
    showPopupGetPrize: false,
    showPopupNoUser: false,
    user: {
      postsCommented: [],
      postsLiked: [],
      username: '',
      points: 0,
      profilePicURL: '',
      rank: 0,
      uniqueTags: [],
    },
    usernameInput: '',
    usernameInputErrMsg: '',
  };

  componentDidMount() {
    this.setInfluencer();
    this.getFanUsername();
    this.setMerch();
    mixpanel.identify();
    console.log('mixpanel distinct ID is', mixpanel.get_distinct_id());
    mixpanel.track('Visited Dashboard');
  }

  addUsernameToURL = username => {
    const influencerID = this.getInfluencerID();
    const { history } = this.props;
    history.push({
      pathname: '/dashboard',
      search: `?i=${influencerID}&u=${username}`,
    });
  };

  formatUsername = username =>
    username
      .toLowerCase()
      .replace('@', '')
      .trim();

  getInfluencerID = () => {
    const { i } = getParams(this.props);
    return i;
  };

  getFanUsername = () => {
    const { u } = getParams(this.props);
    if (u) {
      const usernameFormatted = this.formatUsername(u);
      const user = this.getUser(usernameFormatted);
      this.setUser(user);
    } else {
      this.setState({ showPopupNoUser: true });
    }
    return u;
  };

  getUser = username => {
    const usernameFormatted = this.formatUsername(username);
    const user = FAN_DATA.find(data => data.username === usernameFormatted);
    if (user) {
      actions.leaderboardSignup({ username: user.username, date: getTimestamp() });
      mixpanel.people.set({
        $name: username,
      });
    }
    return user;
  };

  // getLevels = points => {
  //   const current = FAN_LEVELS.reduce((aggr, level) => {
  //     if (level.pointsReq <= points) {
  //       return level;
  //     }
  //     return aggr;
  //   }, {});
  //   const next = FAN_LEVELS[current.index + 1] ? FAN_LEVELS[current.index + 1] : null;
  //   return {
  //     current,
  //     next,
  //   };
  // };

  getMedals = user => {
    const { postsCommented, postsLiked, rank, uniqueTags } = user;
    const medals = {
      hasMedalComments: postsCommented.length >= MEDAL_REQUIREMENTS.comments,
      hasMedalLikes: postsLiked.length >= MEDAL_REQUIREMENTS.likes,
      hasMedalRank: rank <= MEDAL_REQUIREMENTS.rank,
      hasMedalTags: uniqueTags.length >= MEDAL_REQUIREMENTS.tags,
    };
    return medals;
  };

  handleBuyPoints = item => {
    mixpanel.track('Clicked Buy', { Item: item });
    // mixpanel.track('Visited Checkout', { eventID });
    this.setState({ showPopupGetPrize: false });
    this.setState({ showPopupComingSoon: true });
  };

  handleUsePoints = item => {
    mixpanel.track('Clicked Use Points', { Item: item });
    this.setState({ showPopupGetPrize: false });
    this.setState({ showPopupComingSoon: true });
  };

  handleChangeUsernameInput = event => this.setState({ usernameInput: event.target.value });

  handleSelectPrize = event => {
    const { merch } = this.state;
    const merchID = event.target.value;
    const merchSelected = merch.find(item => item.merchID === merchID);
    this.setState({ merchSelected });
    mixpanel.track('Selected Merch', { item: merchSelected.name });
    // this.setState({ showPopupGetPrize: true });
    this.setState({ showPopupComingSoon: true });
  };

  handlePopupClose = popupName => {
    const key = `showPopup${popupName}`;
    return () => this.setState({ [key]: false });
  };

  handleSearch = () => {
    const { usernameInput } = this.state;
    const usernameFormatted = this.formatUsername(usernameInput);
    const user = this.getUser(usernameFormatted);
    if (user) {
      this.setUser(user);
      this.addUsernameToURL(usernameInput);
    } else {
      this.handleSearchError(usernameInput);
    }
  };

  handleSearchError = username => {
    if (username === '') {
      this.setState({
        usernameInputErrMsg: 'Type in your Instagram username above before clicking the button.',
      });
    } else {
      this.setState({
        usernameInputErrMsg: 'Oops, there are no results for that username. Please try again.',
      });
    }
  };

  setUser = user =>
    this.setState({
      showPopupNoUser: false,
      user,
      usernameInputErrMsg: '',
    });

  setInfluencer = () => {
    const influencerID = this.getInfluencerID();
    let influencer = {};
    switch (influencerID) {
      case 'jon_klaasen':
        influencer = JON_KLAASEN;
        break;
      default:
        influencer = JON_KLAASEN;
    }
    this.setState({ influencer });
  };

  setMerch = async () => {
    const merch = await Promise.all(
      MERCH.map(async item => {
        const imgURL = await actions.fetchMerchImgUrl(item.merchID);
        return { ...item, imgURL };
      })
    );
    this.setState({ merch });
  };

  render() {
    const {
      influencer,
      merch,
      merchSelected,
      showPopupComingSoon,
      showPopupGetPrize,
      showPopupNoUser,
      user,
      usernameInput,
      usernameInputErrMsg,
    } = this.state;

    // const levels = this.getLevels(user.points);
    const medals = this.getMedals(user);

    const merchDiv = merch
      .sort((a, b) => a.price - b.price)
      .map(item => (
        <MerchRow
          key={item.name}
          handleClick={this.handleSelectPrize}
          imgURL={item.imgURL}
          price={item.price}
          merchID={item.merchID}
          name={item.name}
        />
      ));

    const popupNoUser = showPopupNoUser ? (
      <PopupNoUser
        handleChangeUsername={this.handleChangeUsernameInput}
        handleClose={this.handlePopupClose('NoUser')}
        handleSearch={this.handleSearch}
        influencerName={influencer.name}
        influencerUsername={influencer.username}
        username={usernameInput}
        usernameErrMsg={usernameInputErrMsg}
      />
    ) : null;

    const popupGetPrize = showPopupGetPrize ? (
      <PopupGetPrize
        handleBuyPoints={this.handleBuyPoints}
        handleClose={this.handlePopupClose('GetPrize')}
        handleUsePoints={this.handleUsePoints}
        imgURL={merchSelected.imgURL}
        name={merchSelected.name}
        points={user.points}
        price={merchSelected.price}
      />
    ) : null;

    const popupComingSoon = showPopupComingSoon ? (
      <PopupComingSoon handleClose={this.handlePopupClose('ComingSoon')} />
    ) : null;

    return (
      <div>
        <Content centered>
          <Content.Spacing />
          <Fonts.P centered supporting>
            Your points are updated every 72 hours
          </Fonts.P>
          <Fonts.H3 centered marginBottom8px>
            @{user.username}
          </Fonts.H3>
          <Fonts.H3 centered marginBottom4px noMarginTop>
            #{getFormattedNumber(user.rank)} of {getFormattedNumber(influencer.fanCount)}
          </Fonts.H3>
          <Link
            to={`/top?i=${influencer.influencerID}`}
            style={{ textAlign: 'center', textDecoration: 'none' }}
          >
            <Fonts.Link>
              <strong>See Leaderboard</strong>
            </Fonts.Link>
          </Link>
          <br />
          <Profile medals={medals} profilePicURL={user.profilePicURL} />

          <Fonts.H1 centered marginBottom8px>
            <span role="img" aria-label="party popper">
              🎉
            </span>{' '}
            <Coins.Icon /> {getFormattedNumber(user.points)}{' '}
            <Content.FlipHorizontal>
              <span role="img" aria-label="party popper">
                🎉
              </span>{' '}
            </Content.FlipHorizontal>{' '}
          </Fonts.H1>
          <Fonts.H3 centered noMarginTop marginBottom4px>
            Earned on
          </Fonts.H3>
          <InfluencerProfile
            influencerUsername={influencer.username}
            influencerProfilePicURL={influencer.profilePicURL}
          />
          <br />
          <Stats
            comments={user.postsCommented.length}
            likes={user.postsLiked.length}
            uniqueTags={user.uniqueTags.length}
          />
          <Content.Spacing />
          <Medals medals={medals} />
          <br />
          <Content.Seperator />
          <Fonts.H3 noMarginTop>Spend your points</Fonts.H3>
          <br />
          {merchDiv}
          <Content.Spacing />

          {popupComingSoon}
          {popupGetPrize}
          {popupNoUser}
        </Content>
      </div>
    );
  }
}

const DEFAULT_USER = {
  comments: 100,
  likes: 21,
  name: 'Jane Doe',
  username: 'janedoe',
  points: 26980,
  profilePicURL:
    'https://firebasestorage.googleapis.com/v0/b/online-meet-and-greets.appspot.com/o/default_profile.png?alt=media&token=abd27f4c-31e9-499e-a3aa-a97f61a5e7ea',
  rank: 99,
  uniqueTags: 99,
};

const FAN_LEVELS = [
  { color: 'purple', emoji: '💜', index: 0, name: 'The Purple Hearts Club', pointsReq: 0 },
  { color: 'blue', emoji: '💙', index: 1, name: 'The Blue Hearts Club', pointsReq: 10000 },
  { color: 'green', emoji: '💚', index: 2, name: 'The Green Hearts Club', pointsReq: 25000 },
  { color: 'yellow', emoji: '💛', index: 3, name: 'The Yellow Hearts Club', pointsReq: 100000 },
  { color: 'orange', emoji: '🧡', index: 4, name: 'The Orange Hearts Club', pointsReq: 500000 },
  { color: 'red', emoji: '❤️', index: 5, name: 'The Red Hearts Club', pointsReq: 1000000 },
];

const JON_KLAASEN = {
  coinName: 'Klassen Koins',
  fanCount: 21941,
  influencerID: 'jon_klaasen',
  name: 'Jon Klaasen',
  profilePicURL:
    'https://instagram.faep4-1.fna.fbcdn.net/vp/4c623d035365d5ed4c537becae2afa94/5C87D8CD/t51.2885-19/s150x150/36563227_239821553286740_6380728175147614208_n.jpg',
  username: 'jon_klaasen',
};

const MERCH = [
  {
    merchID: 'VidCall10Min',
    name: '10 min 1-on-1 facetime',
    price: 1000000,
  },
  {
    merchID: 'VidCall5Min',
    name: '5 min 1-on-1 facetime',
    price: 600000,
  },
  {
    merchID: 'LikeCommentSpam',
    name: 'Like & comment spam',
    price: 50000,
  },
  // {
  //   merchID: 'FollowBack',
  //   name: 'Follow back',
  //   price: 500000,
  // },
  {
    merchID: 'Shoutout',
    name: 'Personal story shoutout',
    price: 1500000,
  },
  {
    merchID: 'DMReply',
    name: 'Personal DM',
    price: 300000,
  },
  {
    merchID: 'SelfieVid',
    name: 'Selfie thank-you video',
    price: 400000,
  },
];

const MEDAL_REQUIREMENTS = {
  comments: 100,
  likes: 10,
  tags: 20,
  rank: 100,
};

// Dashboard.propTypes = propTypes;
// Dashboard.defaultProps = defaultProps;

export default Dashboard;
