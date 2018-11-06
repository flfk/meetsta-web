import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Coins from './Coins';
import Fonts from '../../utils/Fonts';
import Popup from '../popups/Popup';

const propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const defaultProps = {};

class PopupComingSoon extends React.Component {
  state = {};

  render() {
    const { handleClose } = this.props;

    return (
      <div>
        <Popup.BackgroundLight />
        <Popup.CardTransparent>
          <Popup.BtnClose handleClose={handleClose} />
          <Fonts.H1 centered>This feature will be available really soon!</Fonts.H1>
          <Popup.Emoji>
            <span role="img" aria-label="lock">
              🔒
            </span>
          </Popup.Emoji>
          <Fonts.H3 centered>Meanwhile, keep earning free points!</Fonts.H3>
          <Row>
            <Coins.Few /> <Fonts.P> Like a post</Fonts.P>
          </Row>
          <Row>
            <Coins.Some /> <Fonts.P> Comment on a post</Fonts.P>
          </Row>
          <Row>
            <Coins.Many /> <Fonts.P> Tag a friend</Fonts.P>
          </Row>
        </Popup.CardTransparent>
      </div>
    );
  }
}

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 8px;
`;

PopupComingSoon.propTypes = propTypes;
PopupComingSoon.defaultProps = defaultProps;

export default PopupComingSoon;
