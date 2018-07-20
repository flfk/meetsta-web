import EmailForm from './EmailForm';
import Header from './Header';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Screenshots from './Screenshots';
import styled from 'styled-components';

import "typeface-roboto";

class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-122667442-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Background>
        <Header>Header</Header>
        <EmailForm>Email Form</EmailForm>
        <Screenshots> ScreenShots</Screenshots>
      </Background>
    );
  }
}

const Background = styled.div`
  min-width: calc(100vw - 48px);
  padding-right: 24px;
  padding-left: 24px;
  min-height: 100vh;
  background: linear-gradient(#B73F69, #FF595E);

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  >div{
    margin-top: 40px;
  }

  // font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  font-family: Roboto;
`;

export default App;
