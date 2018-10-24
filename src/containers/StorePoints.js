import mixpanel from 'mixpanel-browser';
import React from 'react';
import { Redirect } from 'react-router-dom';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';

class StorePoints extends React.Component {
  state = {
    toAuth: false
  };

  onComponentDidMount() {
    mixpanel.track('Visited Points Store');
  }

  goToAuth = () => {
    return (
      <Redirect
        push
        to={{
          pathname: '/auth'
        }}
      />
    );
  };

  handleBuyPoints = () => this.setState({ toAuth: true });

  render() {
    const { toAuth } = this.state;

    if (toAuth) {
      return this.goToAuth();
    }

    return (
      <Content>
        <Fonts.H2 centered>Earn points by commenting on and liking posts.</Fonts.H2>
        <Content.Seperator />
        <Fonts.H2 centered>You can also buy points</Fonts.H2>
        <Btn primary onClick={this.handleBuyPoints}>
          Buy Points
        </Btn>
      </Content>
    );
  }
}

export default StorePoints;
