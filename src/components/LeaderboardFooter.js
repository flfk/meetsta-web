import React from 'react';
import PropTypes from 'prop-types';

import Btn from './Btn';
import Content from './Content';
import FooterEvents from './FooterEvents';
import Fonts from '../utils/Fonts';

const propTypes = {
  handleClaimPoints: PropTypes.func.isRequired,
};

// const defaultProps = {};

const LeaderboardFooter = ({ handleClaimPoints }) => {
  return (
    <FooterEvents>
      <Content>
        <Fonts.H3 centered>Use your points to get DMs, autographs and video calls.</Fonts.H3>
        <Btn primary onClick={handleClaimPoints}>
          Claim My Points
        </Btn>
        <br />
      </Content>
    </FooterEvents>
  );
};

LeaderboardFooter.propTypes = propTypes;

export default LeaderboardFooter;
