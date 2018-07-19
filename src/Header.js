import React from 'react';
import styled from 'styled-components';

const Header = (props) => {
  return (
      <Container>
        <BrandName>FanTime.</BrandName>
        <Subheading>Set up online meet and greets in seconds.</Subheading>
      </Container>
  );
};

const Container = styled.div`
  // padding-top: 40px;
  text-align: center;
`;

const BrandName = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: white;
`;

const Subheading = styled.div`
  font-size: 36px;
  color: white;
  opacity: 0.80;

`;

export default Header;
