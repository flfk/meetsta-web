import mixpanel from 'mixpanel-browser';
import React from 'react';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';

class StorePoints extends React.Component {
  state = {};

  onComponentDidMount() {
    mixpanel.track('Visited Points Store');
  }

  render() {
    return (
      <Content>
        <Fonts.H2 centered>Earn points by commenting on and liking posts.</Fonts.H2>
        <Content.Seperator />
        <Fonts.H2 centered>You can also buy points</Fonts.H2>
        <Btn primary>Buy Points</Btn>
      </Content>
    );
  }
}

export default StorePoints;
