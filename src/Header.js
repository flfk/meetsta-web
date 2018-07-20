import React from 'react';
import styled from 'styled-components';

const Header = (props) => {
  return (
      <Container>
        <BrandName>PleasedTo</BrandName>
        <Subheading>Set up online meet and greets in <Strong>seconds</Strong>.</Subheading>
      </Container>
  );
};

const Container = styled.div`
  // padding-top: 40px;
  text-align: center;
`;

const BrandName = styled.div`
  font-size: 48px;
  color: white;
  font-weight: 500;
`;

const Subheading = styled.div`
  font-size: 24px;
  color: #F2D9E0;
  // opacity: 0.80;
`;

const Strong = styled.span`
  color: white;
  font-weight: 500;
`;

export default Header;
