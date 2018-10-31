import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Medals from './Medals';

const propTypes = {
  levelEmoji: PropTypes.string.isRequired,
  medals: PropTypes.shape({
    hasMedalComments: PropTypes.bool,
    hasMedalLikes: PropTypes.bool,
    hasMedalRank: PropTypes.bool,
    hasMedalTags: PropTypes.bool,
  }).isRequired,
  profileImgURL: PropTypes.string.isRequired,
};

const defaultProps = {};

const DashboardProfile = ({ levelEmoji, medals, profileImgURL }) => {
  const { hasMedalComments, hasMedalLikes, hasMedalRank, hasMedalTags } = medals;

  return (
    <Container img={profileImgURL}>
      <Level>{levelEmoji}</Level>
      <MedalsContainer>
        <Medals.Likes hasMedal={hasMedalLikes} isSmall />
        <Medals.Comments hasMedal={hasMedalComments} isSmall />
        <Medals.Tags hasMedal={hasMedalTags} isSmall />
        <Medals.Rank hasMedal={hasMedalRank} isSmall />
      </MedalsContainer>
    </Container>
  );
};

const Container = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // border: 1px solid red;

  height: 96px;
  width: 96px;
  background-image: url(${props => props.img});
  background-size: cover;
  border-radius: 50%;
`;

// const ProfileImg = styled.div`
//   height: 80px;
//   width: 80px;
//   background-image: url(${props => props.profileImgURL});
//   background-size: cover;
//   border-radius: 50%;
// `;

const Level = styled.div`
  background-image: linear-gradient(#ffffff30, #ffffff00);
  font-size: 20px;
`;

const MedalsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;

  background-image: linear-gradient(#ffffff00, #ffffff30);
`;

DashboardProfile.propTypes = propTypes;
DashboardProfile.defaultProps = defaultProps;

export default DashboardProfile;
