import React from 'react';
import styled from 'styled-components';

import deviceScreenShot1 from './assets/DeviceScreenshot1.png'
import deviceScreenShot2 from './assets/DeviceScreenshot2.png'
import deviceScreenShot3 from './assets/DeviceScreenshot3.png'
import deviceScreenShot4 from './assets/DeviceScreenshot4.png'


const Screenshots = (props) => {
  return (
      <Container>
        <Screenshot>
          <Image><img src={deviceScreenShot1} alt="Screenshot 1"/></Image>
          <Title>Set up new events in seconds.</Title>
        </Screenshot>
        <Screenshot>
          <Image><img src={deviceScreenShot2} alt="Screenshot 2"/></Image>
          <Title>We take care of ticket sales.</Title>
        </Screenshot>
        <Screenshot>
          <Image><img src={deviceScreenShot3} alt="Screenshot 3"/></Image>
          <Title>We take care of scheduling.</Title>
        </Screenshot>
        <Screenshot>
          <Image><img src={deviceScreenShot4} alt="Screenshot 4"/></Image>
          <Title>So you can focus on your fans.</Title>
        </Screenshot>
      </Container>
  );
};

const Container = styled.div`
  // margin-top: 96px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

`;

const Screenshot = styled.div`
  margin-right: 48px;

  @media only screen and (max-width: 768px) {
    margin-right: 0px;
    margin-bottom: 40px;
  }
`;

const Image = styled.div`
  height: 320px;
  width: 160px;
  img {
      height: 100%;
      width: 100%;
  }
`;

const Title = styled.div`
  margin-top: 16px;
  width: 168px;
  font-size: 20px;
  color: white;
  opacity: 0.80;
  text-align: center;

  text-weight: normal;
`;

export default Screenshots;
