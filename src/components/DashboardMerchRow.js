import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Btn from '../components/Btn';
import Content from '../components/Content';
import Fonts from '../utils/Fonts';
import { getFormattedNumber } from '../utils/Helpers';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  hasPointsReq: PropTypes.bool.isRequired,
  imgURL: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const defaultProps = {};

const DashboardMerchRow = ({ handleClick, hasPointsReq, imgURL, price, name }) => {
  const btn = hasPointsReq ? (
    <Btn primary narrow onClick={handleClick}>
      Get Prize
    </Btn>
  ) : (
    <Btn narrow onClick={handleClick}>
      Get More Points
    </Btn>
  );

  return (
    <div>
      <Content.Row>
        <MerchImg src={imgURL} />
        <Description>
          <Fonts.P>
            <strong>{name}</strong>
          </Fonts.P>
          <Fonts.P>{getFormattedNumber(price)} points</Fonts.P>
        </Description>
        {btn}
      </Content.Row>
      <Content.Spacing />
    </div>
  );
};

const Description = styled.div`
  flex-grow: 1;
  max-width: 156px;
`;

const MerchImg = styled.div`
  height: 32px;
  width: 32px;
  background-image: url(${props => props.src});
  background-size: cover;
`;

DashboardMerchRow.propTypes = propTypes;
DashboardMerchRow.defaultProps = defaultProps;

export default DashboardMerchRow;
