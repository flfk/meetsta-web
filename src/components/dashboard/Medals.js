import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Content from '../Content';
import Fonts from '../../utils/Fonts';
import Medals from './MedalEmojis';

const propTypes = {
  medals: PropTypes.shape({
    hasMedalComments: PropTypes.bool,
    hasMedalFirst: PropTypes.bool,
    hasMedalRank: PropTypes.bool,
    hasMedalTags: PropTypes.bool,
  }).isRequired,
};

const defaultProps = {};

const DashboardMedals = ({ medals }) => {
  const { hasMedalComments, hasMedalFirst, hasMedalRank, hasMedalTags } = medals;

  return (
    <Content.Row alignTop>
      <MedalContainer>
        <Medals.Likes hasMedal={hasMedalFirst} />
        <MedalText hasMedal={hasMedalFirst} centered>
          First 10 fans to comment
        </MedalText>
      </MedalContainer>

      <MedalContainer>
        <Medals.Comments hasMedal={hasMedalComments} />
        <MedalText hasMedal={hasMedalComments} centered>
          100 Comments
        </MedalText>
      </MedalContainer>

      <MedalContainer>
        <Medals.Tags hasMedal={hasMedalTags} />
        <MedalText hasMedal={hasMedalTags} centered>
          10 Friends Tagged
        </MedalText>
      </MedalContainer>

      <MedalContainer>
        <Medals.Rank hasMedal={hasMedalRank} />
        <MedalText hasMedal={hasMedalRank} centered>
          Top 100
        </MedalText>
      </MedalContainer>
    </Content.Row>
  );
};

const MedalText = styled(Fonts.P)`
  opacity: ${props => (props.hasMedal ? '1' : '0.6')};
`;

const MedalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90px;
`;

DashboardMedals.propTypes = propTypes;
DashboardMedals.defaultProps = defaultProps;

export default DashboardMedals;
