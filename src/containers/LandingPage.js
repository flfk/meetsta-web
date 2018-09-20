import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import 'typeface-roboto';

import EmailForm from '../components/EmailForm';
import Header from '../components/Header';
import Screenshots from '../components/Screenshots';

const DEFAULT_EVENT_ID = 'meet-mackenzie-sol-2';

class LandingPage extends Component {
  // <Background>
  //       <Container>
  //         <Header />
  //         <EmailForm />
  //         <Screenshots />
  //       </Container>
  //     </Background>

  render() {
    return (
      <Redirect
        push
        to={{
          pathname: '/register',
          search: `?eventID=${DEFAULT_EVENT_ID}`
        }}
      />
    );

    // return <div>Meetsta Landing Page</div>;
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

export default LandingPage;
