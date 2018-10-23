import React from 'react';
import PropTypes from 'prop-types';

import Btn from '../Btn';
import Content from '../Content';
import FooterEvents from '../FooterEvents';
import Fonts from '../../utils/Fonts';
import InputText from '../InputText';

const propTypes = {
  errMsg: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hasClaimedPoints: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

// const defaultProps = {};

const LeaderboardFooter = ({ errMsg, handleSubmit, hasClaimedPoints, onChange, value }) => {
  const contentUnclaimed = (
    <FooterEvents>
      <Content>
        <Fonts.H3 centered>Use your points to get DMs, autographs and video calls.</Fonts.H3>
        <InputText
          placeholder="@YourInstagramHandle"
          value={value}
          errMsg={errMsg}
          onChange={onChange}
        />
        <Btn primary onClick={handleSubmit}>
          Use My Points
        </Btn>
      </Content>
    </FooterEvents>
  );

  const contentClaimed = (
    <FooterEvents>
      <Content>
        <Fonts.H1 centered>
          <span role="img" aria-label="Tick">
            ✅ You have claimed your points!
          </span>
        </Fonts.H1>
        <Fonts.H3 centered>
          {' '}
          Thanks {value}, we will reach out to you shortly on Instagram Messages with more more
          information.
        </Fonts.H3>
      </Content>
    </FooterEvents>
  );

  const content = hasClaimedPoints ? contentClaimed : contentUnclaimed;

  return content;
};

LeaderboardFooter.propTypes = propTypes;

export default LeaderboardFooter;
