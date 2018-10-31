import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import Fonts from '../utils/Fonts';
import Medals from './Medals';

const propTypes = {
  medals: PropTypes.shape({
    hasMedalComments: PropTypes.bool,
    hasMedalLikes: PropTypes.bool,
    hasMedalRank: PropTypes.bool,
    hasMedalTags: PropTypes.bool,
  }).isRequired,
};

const defaultProps = {};

const DashboardMedals = ({ medals }) => {
  const { hasMedalComments, hasMedalLikes, hasMedalRank, hasMedalTags } = medals;

  return (
    <Content.Row>
      <MedalContainer>
        <Medals.Likes hasMedal={hasMedalLikes} />
        <Fonts.P centered>20 Posts Liked</Fonts.P>
      </MedalContainer>
      <MedalContainer>
        <Medals.Comments hasMedal={hasMedalComments} />
        <Fonts.P centered>100 Comments</Fonts.P>
      </MedalContainer>
      <MedalContainer>
        <Medals.Tags hasMedal={hasMedalTags} />
        <Fonts.P centered>10 Friends Tagged</Fonts.P>
      </MedalContainer>
      <MedalContainer>
        <Medals.Rank hasMedal={hasMedalRank} />
        <Fonts.P centered>Top 100</Fonts.P>
      </MedalContainer>
    </Content.Row>
  );
};

const MedalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90px;
`;

DashboardMedals.propTypes = propTypes;
DashboardMedals.defaultProps = defaultProps;

export default DashboardMedals;
