import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

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
        <br />
        <Btn primary onClick={handleClaimPoints}>
          <FaSearch /> Search My Username
        </Btn>
        <br />
      </Content>
    </FooterEvents>
  );
};

LeaderboardFooter.propTypes = propTypes;

export default LeaderboardFooter;
