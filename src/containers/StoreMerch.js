import mixpanel from 'mixpanel-browser';
import React from 'react';

import actions from '../data/actions';
import CardMerch from '../components/CardMerch';
import Content from '../components/Content';

const MERCH = [
  {
    merchID: 'VidCall10Min',
    name: '10 minute one-on-one video call',
    price: 123
  },
  {
    merchID: 'VidCall5Min',
    name: '5 minute one-on-one video call',
    price: 100
  },
  {
    merchID: 'LikeCommentSpam',
    name: 'Like / comment spam',
    price: 80
  },
  {
    merchID: 'FollowBack',
    name: 'Follow back',
    price: 60
  },
  {
    merchID: 'Shoutout',
    name: 'Shoutout on story',
    price: 60
  },
  {
    merchID: 'DMReply',
    name: 'DM reply',
    price: 100
  },
  {
    merchID: 'SelfieVid',
    name: 'Personalised selfie video',
    price: 50
  }
];

class StoreMerch extends React.Component {
  state = {
    merch: []
  };

  componentDidMount() {
    mixpanel.track('Visited Merch Store');
    this.setMerch();
  }

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
    const { merch } = this.state;
    const merchDiv = merch.map(item => (
      <CardMerch key={item.merchID} name={item.name} price={item.price} imgURL={item.imgURL} />
    ));

    return <Content>{merchDiv}</Content>;
  }
}

export default StoreMerch;
