import React from 'react';
import { Redirect } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

import actions from '../../data/actions';
import Btn from '../components/Btn';
import Content from '../components/Content';
import Countdown from '../components/Countdown';
import Currency from '../components/Currency';
import Fonts from '../utils/Fonts';
import { getDateAddDays, getParams } from '../utils/Helpers';
import GiftImg from '../components/GiftImg';

class OrderConfirmation extends React.Component {
  state = {
    influencer: {
      dateUpdateLast: 0,
      displayName: '',
      fandom: '',
    },
    gift: {
      gemsEarned: '-',
      imgURL: '',
      influencerID: '',
      id: '',
      name: '',
      prefix: '',
      price: '-',
    },
    order: {
      orderNum: '-',
      giftID: '',
    },
    toLeaderboard: false,
  };

  componentDidMount() {
    this.setData();
    mixpanel.track('Visited Order Confirmation');
  }

  getOrderID = () => {
    const { id } = getParams(this.props);
    return id;
  };

  goToLeaderboard = () => (
    <Redirect
      push
      to={{
        pathname: '/jon_klaasen',
      }}
    />
  );

  handleToLeaderboard = () => this.setState({ toLeaderboard: true });

  setData = async () => {
    const orderID = this.getOrderID();
    const order = await actions.fetchDocOrder(orderID);
    const gift = await actions.fetchDocGift(order.giftID);
    const influencer = await actions.fetchDocInfluencerByID(gift.influencerID);
    this.setState({ gift, influencer, order });
  };

  render() {
    const { gift, influencer, order, toLeaderboard } = this.state;

    if (toLeaderboard) return this.goToLeaderboard();

    const dateUpdateNext = getDateAddDays(influencer.dateUpdateLast, 7);

    return (
      <Content>
        <Fonts.H1 centered>Thanks for your gift!</Fonts.H1>
        <Fonts.H3 centered>
          You sent {influencer.displayName} {gift.prefix} {gift.name}
        </Fonts.H3>
        <Content.Row justifyCenter>
          <GiftImg src={gift.imgURL} />
        </Content.Row>
        <Fonts.H3 centered noMarginBottom>
          <strong>{order.username}</strong> received <Currency.GemsSingle small /> {gift.gemsEarned}
        </Fonts.H3>
        <Fonts.H3 centered noMarginBottom>
          This weeks winners announced in
        </Fonts.H3>
        <Countdown date={dateUpdateNext} />
        <Content.Spacing />
        <Fonts.P centered>Your order confirmation number is #{order.orderNum}</Fonts.P>
        <Content.Spacing />
        <Btn primary short onClick={this.handleToLeaderboard}>
          Back to leaderboard
        </Btn>
      </Content>
    );
  }
}

export default OrderConfirmation;
