import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Btn from '../Btn';
import Content from '../Content';
import { POINTS_BY_TYPE, POINTS_PER_DOLLAR } from '../../utils/Constants';
import Fonts from '../../utils/Fonts';
import { getFormattedNumber } from '../../utils/Helpers';
import Popup from './Popup';

const propTypes = {
  handleBuyPoints: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUsePoints: PropTypes.func.isRequired,
  imgURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

const defaultProps = {};

class PopupGetPrize extends React.Component {
  state = {};

  render() {
    const {
      handleBuyPoints,
      handleClose,
      handleUsePoints,
      imgURL,
      name,
      points,
      price,
    } = this.props;

    const paidPointsReq = price - points;
    const priceDollars = (paidPointsReq / POINTS_PER_DOLLAR).toFixed(2);

    const prizeAvailable = (
      <div>
        <Content.Seperator />
        <Content.Spacing />
        <Btn primary fill="true" onClick={() => handleUsePoints(name)}>
          Buy With Points
        </Btn>
      </div>
    );

    const prizeUnavailable = (
      <div>
        <Content.Seperator />
        <Fonts.H1 centered>Looks like you need more points</Fonts.H1>
        <Fonts.H3 centered>Earn free points on @jon_klaasen's Instagram</Fonts.H3>
        <Fonts.P centered>{getFormattedNumber(POINTS_BY_TYPE.likes)} points - Like a post</Fonts.P>
        <br />
        <Fonts.P centered>
          {getFormattedNumber(POINTS_BY_TYPE.comments)} points - Comment on a post
        </Fonts.P>
        <br />
        <Fonts.P centered>
          {getFormattedNumber(POINTS_BY_TYPE.uniqueTags)} points - Tag a friend
        </Fonts.P>
        <Fonts.H3 centered>OR</Fonts.H3>
        <Btn primary fill="true" onClick={() => handleBuyPoints(name, priceDollars)}>
          Buy With Points + ${priceDollars}
        </Btn>
      </div>
    );

    const paymentDiv = paidPointsReq <= 0 ? prizeAvailable : prizeUnavailable;

    return (
      <div>
        <Popup.BackgroundLight />
        <Popup.CardTransparent>
          <Popup.BtnClose handleClose={handleClose} />
          <Content.Row>
            <Fonts.H3>Your Points Balance</Fonts.H3>
            <Fonts.H1>{getFormattedNumber(points)}</Fonts.H1>
          </Content.Row>

          <Content.Row>
            <Content.Row>
              <Fonts.H3>{name}</Fonts.H3>
            </Content.Row>
            <Fonts.H1>{getFormattedNumber(price)}</Fonts.H1>
          </Content.Row>
          {paymentDiv}
        </Popup.CardTransparent>
      </div>
    );
  }
}

const MerchImg = styled.div`
  height: 80px;
  width: 80px;
  align-self: center;
  background-image: url(${props => props.src});
  background-size: cover;
`;

PopupGetPrize.propTypes = propTypes;
PopupGetPrize.defaultProps = defaultProps;

export default PopupGetPrize;
