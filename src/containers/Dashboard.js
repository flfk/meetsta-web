// import PropTypes from 'prop-types';
import React from 'react';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';
import { getFormattedNumber } from '../utils/Helpers';
import DashboardMedals from '../components/DashboardMedals';
import DashboardProfile from '../components/DashboardProfile';
import DashboardProgress from '../components/DashboardProgress';
import DashboardStats from '../components/DashboardStats';
import PopupNoUser from '../components/popups/PopupNoUser';
import Wrapper from '../components/Wrapper';

// const propTypes = {};

// const defaultProps = {};

class Dashboard extends React.Component {
  state = {};

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

  render() {
    const popupNoUser = (
      <PopupNoUser influencerName={INFLUENCER.name} influencerUsername={INFLUENCER.username} />
    );

    const user = DEFAULT_USER;
    const levels = this.getLevels(user.points);
    const medals = this.getMedals(user);

    const merch = MERCH.sort((a, b) => a.price - b.price).map(item => {
      const btn =
        user.points > item.price ? (
          <Btn primary narrow>
            Get Prize
          </Btn>
        ) : (
          <Btn narrow>Get More Points</Btn>
        );
      return (
        <div key={item.name}>
          <Content.Row>
            <Fonts.P>{item.name}</Fonts.P>
            {btn}
          </Content.Row>
          <Content.Spacing />
        </div>
      );
    });

    return (
      <div>
        <Content centered>
          <Content.Spacing />
          <Fonts.P centered>
            #{user.rank} of {getFormattedNumber(INFLUENCER.fanCount)}
          </Fonts.P>
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
            Points earned on {INFLUENCER.name}
            's newest 50 posts
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
          {merch}
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

const MERCH = [
  {
    merchID: 'VidCall10Min',
    name: '10 minute one-on-one video call',
    price: 90000,
  },
  {
    merchID: 'VidCall5Min',
    name: '5 minute one-on-one video call',
    price: 80000,
  },
  {
    merchID: 'LikeCommentSpam',
    name: 'Like / comment spam',
    price: 50000,
  },
  {
    merchID: 'FollowBack',
    name: 'Follow back',
    price: 25000,
  },
  {
    merchID: 'Shoutout',
    name: 'Shoutout on story',
    price: 20000,
  },
  {
    merchID: 'DMReply',
    name: 'DM reply',
    price: 10000,
  },
  {
    merchID: 'SelfieVid',
    name: 'Personalised selfie video',
    price: 50,
  },
];

const INFLUENCER = {
  coinName: 'Klassen Koins',
  fanCount: 16400,
  name: 'Jon Klaasen',
  username: 'jon_klaasen',
};

const MEDAL_REQUIREMENTS = {
  comments: 100,
  likes: 20,
  tags: 10,
  rank: 100,
};

// Dashboard.propTypes = propTypes;
// Dashboard.defaultProps = defaultProps;

export default Dashboard;
