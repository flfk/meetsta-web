import React, { Component } from 'react';
import ReactGA from 'react-ga';

import LandingPage from './containers/LandingPage';

import 'typeface-roboto';

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-122667442-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return <LandingPage />;
  }
}

export default App;
