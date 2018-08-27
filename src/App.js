import React, { Component } from 'react';
import ReactGA from 'react-ga';

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
      <div>
        <ContainerNav>
          <NavBar>
            <li>
              <a href="#home">
                <FONTS.LOGO>Meetsta</FONTS.LOGO>
              </a>
            </li>
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">FAQ</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </NavBar>
        </ContainerNav>

        <Main>
          <Events />
        </Main>
      </div>
    );
  }
}

export default App;
