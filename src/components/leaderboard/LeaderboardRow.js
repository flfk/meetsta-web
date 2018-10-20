import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import BtnProfile from '../BtnProfile';
import Content from '../Content';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import Wrapper from '../Wrapper';

const INSTAGRAM_URL_BASE = 'https://www.instagram.com/';

const propTypes = {
  points: PropTypes.number.isRequired,
  profileImgUrl: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  rank: PropTypes.element.isRequired,
  username: PropTypes.string.isRequired
};

const defaultProps = {};

const LeaderboardRow = ({ points, profileImgUrl, rank, trophy, username }) => {
  return (
    <Content.Row key={username} alignCenter>
      <ContentLHS href={INSTAGRAM_URL_BASE + username} target="_blank">
        <Rank>{rank}</Rank>
        <Wrapper.ProfileImage>
          <img src={profileImgUrl} alt={''} />
        </Wrapper.ProfileImage>{' '}
        <Username>
          {username} {trophy}
        </Username>
      </ContentLHS>
      <Username>{points}</Username>
    </Content.Row>
  );
};

const Username = styled(Fonts.H3)`
  font-size: 16px;
`;

const Rank = styled(Fonts.P)`
  margin-right: 16px;
  font-weight: bold;
  color: ${Colors.greys.supporting};
`;

const ContentLHS = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

LeaderboardRow.propTypes = propTypes;
LeaderboardRow.defaultProps = defaultProps;

export default LeaderboardRow;
