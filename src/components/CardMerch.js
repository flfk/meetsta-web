import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Btn from './Btn';
import Fonts from '../utils/Fonts';
import Media from '../utils/Media';

const propTypes = {
  handleSelect: PropTypes.func.isRequired,
  imgURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

const defaultProps = {};

const CardOptions = ({ handleSelect, imgURL, name, price }) => (
  <Container>
    <WrapperPreviewImg>
      <img src={imgURL} alt="" />
    </WrapperPreviewImg>
    <Fonts.H2 centered>{name}</Fonts.H2>
    <Btn primary fill="true" onClick={handleSelect}>
      {price} Points
    </Btn>
    <br />
    <br />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapperPreviewImg = styled.div`
  margin: auto;
  height: 400px;
  width: 600px;
  border-radius: 5px;
  margin: 8px 0;
  img {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  ${Media.tablet} {
    height: 224px;
    width: 336px;
  }
`;

CardOptions.propTypes = propTypes;
CardOptions.defaultProps = defaultProps;

export default CardOptions;
