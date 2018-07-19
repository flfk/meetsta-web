import EmailForm from './EmailForm';
import Header from './Header';
import React, { Component } from 'react';
import Screenshots from './Screenshots';
import styled from 'styled-components';

class App extends Component {
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
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#B73F69, #FF595E);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default App;
