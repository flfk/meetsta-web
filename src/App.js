import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

import ContainerNav from './components/ContainerNavBar';
import Events from './containers/Events';
import FONTS from './utils/Fonts';
import LandingPage from './containers/LandingPage';
import Main from './components/Main';
import NavBar from './components/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-122667442-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <ContainerNav>
            <NavBar>
              <li>
                <Link to="/">
                  <FONTS.LOGO>Meetsta</FONTS.LOGO>
                </Link>
              </li>
              <li>
                <Link to="/event">About Us</Link>
              </li>
              <li>
                <Link to="/event">FAQ</Link>
              </li>
              <li>
                <Link to="/event">Contact</Link>
              </li>
            </NavBar>
          </ContainerNav>

          <Main>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/event" component={Events} />
            </Switch>
          </Main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
