import PropTypes from 'prop-types';
import React from 'react';

import Btn from '../Btn';
import Content from '../Content';
import Fonts from '../../utils/Fonts';
import Popup from '../Popup';

const propTypes = {
  handleClose: PropTypes.func.isRequired
};

const defaultProps = {};

class PopupInfo extends React.Component {
  state = {};

  render() {
    const { handleClose } = this.props;

    return (
      <div>
        <Popup.Background />
        <Popup.Card>
          <Content>
            <Fonts.H1>How does it work?</Fonts.H1>
            <Fonts.H3>
              We analyse instagram to see which fans have been most active. <br />
              <br />
              Earn more points by liking and commenting on more posts.
            </Fonts.H3>
            <br />
            <Btn.Full primary onClick={handleClose}>
              Close
            </Btn.Full>
          </Content>
        </Popup.Card>
      </div>
    );
  }
}

PopupInfo.propTypes = propTypes;
PopupInfo.defaultProps = defaultProps;

export default PopupInfo;
