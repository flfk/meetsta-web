import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Btn from '../Btn';
import Content from '../Content';
import Fonts from '../../utils/Fonts';
import { getFormattedNumber } from '../../utils/Helpers';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  imgURL: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  merchID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const defaultProps = {};

const DashboardMerchRow = ({ handleClick, imgURL, price, merchID, name }) => {
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
        <Btn primary narrow short onClick={handleClick} value={merchID}>
          Get Prize
        </Btn>
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
