import React, { Component } from 'react';
import ReactGA from 'react-ga';

import Events from './containers/Events';
import LandingPage from './containers/LandingPage';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-122667442-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Main>
        <Events />
      </Main>
    );
  }
}

export default App;
