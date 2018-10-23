import mixpanel from 'mixpanel-browser';
import React from 'react';

import Btn from '../components/Btn';
import Card from '../components/Card';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';

class StoreMerch extends React.Component {
  state = {};

  onComponentDidMount() {
    mixpanel.track('Visited Merch Store');
  }

  render() {
    return <Content />;
  }
}

export default StoreMerch;
