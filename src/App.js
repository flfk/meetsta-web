import EmailForm from './EmailForm';
import Header from './Header';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Screenshots from './Screenshots';
import styled from 'styled-components';

import 'typeface-roboto';

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-122667442-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Background>
        <Container>
          <Header />
          <EmailForm />
          <Screenshots />
        </Container>
      </Background>
    );
  }
}

const Background = styled.div`
  min-width: calc(100vw - 48px);
  padding: 24px;
  min-height: calc(100vh - 48px);
  background: linear-gradient(#B73F69, #FF595E);

  display: flex;
  flex-direction: column;
  justify-content: center

  font-family: Roboto;
`;

const Container = styled.div`
  > :not(:first-child) {
    margin-top: 48px;
  }
`;

export default App;
