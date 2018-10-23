import React from 'react';
import PropTypes from 'prop-types';

import Btn from './Btn';
import Content from './Content';
import FooterEvents from './FooterEvents';
import Fonts from '../utils/Fonts';

const propTypes = {
  handleGetPoints: PropTypes.func.isRequired,
  handleUsePoints: PropTypes.func.isRequired
};

// const defaultProps = {};

const LeaderboardFooter = ({ handleGetPoints, handleUsePoints }) => {
  return (
    <FooterEvents>
      <Content>
        <Fonts.H3 centered>Use your points to get DMs, autographs and video calls.</Fonts.H3>
        <Btn primary onClick={handleUsePoints}>
          Use My Points
        </Btn>
        <br />
        <Btn onClick={handleGetPoints}>Get More Points</Btn>
      </Content>
    </FooterEvents>
  );
};

LeaderboardFooter.propTypes = propTypes;

export default LeaderboardFooter;
