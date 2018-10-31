import React from 'react';
import PropTypes from 'prop-types';

import Fonts from '../../utils/Fonts';
import Popup from './Popup';

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
          <Fonts.H1 centered>This feature will be available really soon.</Fonts.H1>
          <Popup.Emoji>
            <span role="img" aria-label="lock">
              🔒
            </span>
          </Popup.Emoji>
          <Fonts.H3 centered>Meanwhile, keep stacking those points!</Fonts.H3>
        </Popup.CardTransparent>
      </div>
    );
  }
}

PopupComingSoon.propTypes = propTypes;
PopupComingSoon.defaultProps = defaultProps;

export default PopupComingSoon;
