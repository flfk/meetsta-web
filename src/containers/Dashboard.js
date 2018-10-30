// import PropTypes from 'prop-types';
import React from 'react';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';
import { getFormattedNumber } from '../utils/Helpers';
import DashboardMedals from '../components/DashboardMedals';
import DashboardProgress from '../components/DashboardProgress';
import DashboardStats from '../components/DashboardStats';
import PopupNoUser from '../components/popups/PopupNoUser';
import Wrapper from '../components/Wrapper';

// const propTypes = {};

// const defaultProps = {};

class Dashboard extends React.Component {
  state = {};

  render() {
    const popupNoUser = (
      <PopupNoUser influencerName={INFLUENCER.name} influencerUsername={INFLUENCER.username} />
    );

    const user = DEFAULT_USER;

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
        <div>
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
          <Wrapper.ProfileImgLarge>
            <img src={user.profileImgURL} alt="profile" />
          </Wrapper.ProfileImgLarge>
          <Fonts.H1 centered>🎉 {getFormattedNumber(user.points)} 🎉</Fonts.H1>
          <Fonts.P centered>
            {INFLUENCER.coinName} earned on {INFLUENCER.name}
            's posts
          </Fonts.P>
          <Content.Spacing />
          <DashboardStats
            comments={user.comments}
            likes={user.likes}
            uniqueTags={user.uniqueTags}
          />
          <Content.Spacing />
          <DashboardProgress points={user.points} />
          <Content.Spacing />
          <DashboardMedals
            comments={user.comments}
            likes={user.likes}
            rank={user.rank}
            uniqueTags={user.uniqueTags}
          />
          <Content.Spacing />
          {merch}
        </Content>
      </div>
    );
  }
}

const DEFAULT_USER = {
  comments: 12,
  likes: 20,
  name: 'Jane Doe',
  username: 'JaneDoe',
  points: 269800,
  profileImgURL:
    'https://instagram.faep4-1.fna.fbcdn.net/vp/6047d91c888be7a7da1de00c98f16519/5C643E3D/t51.2885-19/s320x320/38787686_2067233979976840_7161741697020329984_n.jpg',
  rank: 4,
  uniqueTags: 10,
};

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

// Dashboard.propTypes = propTypes;
// Dashboard.defaultProps = defaultProps;

export default Dashboard;
