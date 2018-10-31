import mixpanel from 'mixpanel-browser';
// import PropTypes from 'prop-types';
import React from 'react';

import actions from '../data/actions';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';
import { getParams, getFormattedNumber } from '../utils/Helpers';
import DashboardMedals from '../components/DashboardMedals';
import DashboardMerchRow from '../components/DashboardMerchRow';
import DashboardProfile from '../components/DashboardProfile';
import DashboardProgress from '../components/DashboardProgress';
import DashboardStats from '../components/DashboardStats';
import PopupBuyPoints from '../components/popups/PopupBuyPoints';
import PopupComingSoon from '../components/popups/PopupComingSoon';
import PopupNoUser from '../components/popups/PopupNoUser';

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
    username: '',
    showPopupBuyPoints: false,
    showPopupComingSoon: false,
    showPopupNoUser: false,
  };

  componentDidMount() {
    mixpanel.track('Visited Dashboard');
    this.setInfluencer();
    this.setMerch();
  }

  getInfluencerID = () => {
    const { i } = getParams(this.props);
    return i;
  };

  getLevels = points => {
    const current = FAN_LEVELS.reduce((aggr, level) => {
      if (level.pointsReq <= points) {
        return level;
      }
      return aggr;
    }, {});

    const next = FAN_LEVELS[current.index + 1] ? FAN_LEVELS[current.index + 1] : null;

    return {
      current,
      next,
    };
  };

  getMedals = user => {
    const { comments, likes, rank, uniqueTags } = user;
    const medals = {
      hasMedalComments: comments >= MEDAL_REQUIREMENTS.comments,
      hasMedalLikes: likes >= MEDAL_REQUIREMENTS.likes,
      hasMedalRank: rank <= MEDAL_REQUIREMENTS.rank,
      hasMedalTags: uniqueTags >= MEDAL_REQUIREMENTS.tags,
    };
    return medals;
  };

  handleBuyPoints = () => {
    mixpanel.track('Clicked Buy Points');
    this.setState({ showPopupBuyPoints: false });
    this.setState({ showPopupComingSoon: true });
  };

  handleGetPoints = () => {
    mixpanel.track('Clicked Get Points');
    this.setState({ showPopupBuyPoints: true });
  };

  handleGetPrize = () => {
    mixpanel.track('Clicked Get Prize');
    this.setState({ showPopupComingSoon: true });
  };

  handlePopupClose = popupName => {
    const key = `showPopup${popupName}`;
    return () => this.setState({ [key]: false });
  };

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
      showPopupBuyPoints,
      showPopupComingSoon,
      showPopupNoUser,
    } = this.state;

    const user = DEFAULT_USER;
    const levels = this.getLevels(user.points);
    const medals = this.getMedals(user);

    const merchDiv = merch.sort((a, b) => a.price - b.price).map(item => {
      const hasPointsReq = user.points >= item.price;
      const handleClick = hasPointsReq ? this.handleGetPrize : this.handleGetPoints;
      return (
        <DashboardMerchRow
          key={item.name}
          hasPointsReq={hasPointsReq}
          handleClick={handleClick}
          imgURL={item.imgURL}
          name={item.name}
          price={item.price}
        />
      );
    });

    const popupNoUser = showPopupNoUser ? (
      <PopupNoUser
        handleClose={this.handlePopupClose('NoUser')}
        influencerName={influencer.name}
        influencerUsername={influencer.username}
      />
    ) : null;

    const popupBuyPoints = showPopupBuyPoints ? (
      <PopupBuyPoints
        coinName={influencer.coinName}
        handleClose={this.handlePopupClose('BuyPoints')}
        influencerName={influencer.name}
        handleBuyPoints={this.handleBuyPoints}
      />
    ) : null;

    const popupComingSoon = showPopupComingSoon ? (
      <PopupComingSoon handleClose={this.handlePopupClose('ComingSoon')} />
    ) : null;

    return (
      <div>
        <Content centered>
          <Fonts.H3 centered noMarginBottom>
            {user.username}
          </Fonts.H3>
          <Fonts.P centered>
            <strong>
              #{user.rank} of {getFormattedNumber(influencer.fanCount)}
            </strong>
          </Fonts.P>
          <br />
          <DashboardProfile
            levelEmoji={levels.current.emoji}
            medals={medals}
            profileImgURL={user.profileImgURL}
          />
          <Fonts.H1 centered>
            <span role="img" aria-label="party popper">
              🎉
            </span>{' '}
            {getFormattedNumber(user.points)}{' '}
            <Content.FlipHorizontal>
              <span role="img" aria-label="party popper">
                🎉
              </span>{' '}
            </Content.FlipHorizontal>{' '}
          </Fonts.H1>
          <Fonts.P centered>
            Points earned on {influencer.name}
            's 50 most recents
          </Fonts.P>
          <Content.Spacing />
          <DashboardStats
            comments={user.comments}
            likes={user.likes}
            uniqueTags={user.uniqueTags}
          />
          <Content.Spacing />
          <DashboardProgress points={user.points} levels={levels} />
          <Content.Spacing />
          <DashboardMedals medals={medals} />
          <Content.Spacing />
          {merchDiv}

          {popupBuyPoints}
          {popupComingSoon}
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
  username: 'JaneDoe',
  points: 26980,
  profileImgURL:
    'https://instagram.faep4-1.fna.fbcdn.net/vp/6047d91c888be7a7da1de00c98f16519/5C643E3D/t51.2885-19/s320x320/38787686_2067233979976840_7161741697020329984_n.jpg',
  rank: 99,
  uniqueTags: 99,
};

const FAN_LEVELS = [
  { color: 'green', emoji: '💚', index: 0, name: 'Green Fan Club', pointsReq: 0 },
  { color: 'purple', emoji: '💜', index: 1, name: 'Purple Fan Club', pointsReq: 10000 },
  { color: 'orange', emoji: '🧡', index: 2, name: 'Orange Fan Club', pointsReq: 100000 },
];

const JON_KLAASEN = {
  coinName: 'Klassen Koins',
  fanCount: 16400,
  name: 'Jon Klaasen',
  username: 'jon_klaasen',
};

const MERCH = [
  {
    merchID: 'VidCall10Min',
    name: '10 min 1-on-1 facetime',
    price: 90000,
  },
  {
    merchID: 'VidCall5Min',
    name: '5 min 1-on-1 facetime',
    price: 80000,
  },
  {
    merchID: 'LikeCommentSpam',
    name: 'Like & comment spam',
    price: 50000,
  },
  {
    merchID: 'FollowBack',
    name: 'Follow back',
    price: 25000,
  },
  {
    merchID: 'Shoutout',
    name: 'Personal story shoutout',
    price: 20000,
  },
  {
    merchID: 'DMReply',
    name: 'Personal DM',
    price: 10000,
  },
  {
    merchID: 'SelfieVid',
    name: 'Selfie thank-you video',
    price: 25000,
  },
];

const MEDAL_REQUIREMENTS = {
  comments: 100,
  likes: 20,
  tags: 10,
  rank: 100,
};

// Dashboard.propTypes = propTypes;
// Dashboard.defaultProps = defaultProps;

export default Dashboard;
